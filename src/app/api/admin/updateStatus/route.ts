import { NextApiResponse } from 'next';
import connectDB from "@/lib/connectDB";
import Order from "@/models/order.model";
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { orderId, newStatus } = await req.json();
        await connectDB();
        const order = await Order.findByIdAndUpdate(orderId, {
            status: newStatus
        }, { new: true }).select("status");

        if (!order) {
            throw new Error("Order not found.")
        }

        return NextResponse.json({ order: order }, {status:200});
    } catch (err:any) {
        console.log(err.message);
        return NextResponse.json({ message: err.message }, {status:500});
    }
}