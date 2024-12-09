"use server";

import connectDB from "@/lib/connectDB";
import BillingAddress from "@/models/billing-address.model";
import Configuration from "@/models/configuration.model";
import Order from "@/models/order.model";
import ShippingAddress from "@/models/shipping-address.model";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const getPaymentStatus = async ({ orderId }: { orderId: string }) => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user?.id || !user?.email) {
        throw new Error("User not found");
    }

    connectDB();
    let order = await Order.findOne({ _id: orderId, userId: user.id });
    const billingAddress = await BillingAddress.findById(order.billingAddress );
    const configuration = await Configuration.findById(order.configurationId );
    const shippingAddress = await ShippingAddress.findById( order.shippingAddress );
    if (!order) throw new Error("This order does not exist.");
    if (order.isPaid) {
        order = {
            ...order._doc,
            billingAddress: billingAddress,
            configuration: configuration,
            shippingAddress: shippingAddress
        }
        return JSON.parse(JSON.stringify(order));
    }
    else {
        return false
    }
}