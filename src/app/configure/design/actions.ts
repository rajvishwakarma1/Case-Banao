"use server";

import connectDB from "@/lib/connectDB";
import Configuration from "@/models/configuration.model";
export type saveConfigArgsType = {
    color: string,
    finish: string,
    material: string,
    model: string,
    configId: string
}
export async function saveConfig({
    color,
    finish,
    material,
    model,
    configId
}:
    saveConfigArgsType
) {
    await connectDB();
    const configuration = await Configuration.findOneAndUpdate({ _id: configId }, {
        color: color,
        finish: finish,
        material: material,
        model: model
    });
}       