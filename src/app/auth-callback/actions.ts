"use server";

import connectDB from "@/lib/connectDB";
import User from "@/models/user.model";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const getAuthStatus = async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user?.id || !user?.email) {
        throw new Error("Invalid user data.");
    }

    connectDB();
    const existingUser = await User.findOne({ email: user.email });
    if (!existingUser) {
        const newUser = await User.create({
            _id: user.id,
            email: user.email
        })
        await newUser.save();
    }
    return { success: true }
}