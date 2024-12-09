"use server"

import { BASE_PRICE, PRODUCT_PRICES } from "@/config/products";
import connectDB from "@/lib/connectDB"
import { stripe } from "@/lib/stripe";
import Configuration from "@/models/configuration.model";
import Order from "@/models/order.model";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const createCheckoutSession = async ({configId}:{configId:string}) => {
    await connectDB();
    const configuration = await Configuration.findById(configId);
    if (!configuration) {
        throw new Error("Configuration not found");
    }
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
        throw new Error("You need to be logged in to create a checkout session");
    }
    const { finish, material } = configuration;
    let price = BASE_PRICE;
    if (finish === "textured") price += PRODUCT_PRICES.finish.textured;
    if (material === "polycarbonate") price += PRODUCT_PRICES.material.polycarbonate;

    const existingOrder = await Order.findOne({
        userId: user.id,
        configurationId: configuration.id
    })
    let order;
    if (existingOrder) {
        order = existingOrder;
    }
    else {
        order = new Order({
            amount: price,
            userId: user.id,
            configurationId: configuration.id,
        })
        await order.save();
    }
    const product = await stripe.products.create({
        name: "Custome iPhone Case",
        images: [configuration.imageUrl],
        default_price_data: {
            currency: "INR",
            unit_amount: price*100,
        }
    })

    const stripeSession = await stripe.checkout.sessions.create({
        success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
        cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/configure/preview?id=${configuration.id}`,
        payment_method_types: ["card"],
        mode: "payment",
        shipping_address_collection: {allowed_countries: ["IN"]},
        metadata:{
            userId: user.id,
            orderId: order.id,
        },
        line_items: [{price: product.default_price as string, quantity: 1}]
    })
    return {url: stripeSession.url}
}