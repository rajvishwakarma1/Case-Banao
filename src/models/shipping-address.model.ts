    import mongoose from "mongoose";

    const shippingAddressSchema = new mongoose.Schema({
        name: {
            type: String,
            required:true
        },
        street: {
            type: String,
            required:true
        },
        city: {
            type: String,
            required:true
        },
        postalCode: {
            type: String,
            required:true
        },
        state: {
            type: String,
            required:true
        },
        country: {
            type: String,
            required:true
        },
        phoneNo: {
            type: String
        },
        orders: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Order",
                required:true
            }
        ]
    })

    const ShippingAddress = mongoose.models.ShippingAddress || mongoose.model('ShippingAddress', shippingAddressSchema);
    export default ShippingAddress;