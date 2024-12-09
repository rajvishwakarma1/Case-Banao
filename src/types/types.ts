export interface shippingAddressType {
    name: string,
    street: string,
    city: string,
    postalCode: string,
    state: string,
    country: string,
    phoneNo: string,
    orders: [orderType]
}
export interface billingAddressType {
    name: string,
    street: string,
    city: string,
    postalCode: string,
    state: string,
    country: string,
    phoneNo: string
}
enum OrderStatus {
    fullfilled,
    shipped,
    awaiting_shipment,
}

export interface orderType {
    configurationId: string,
    userId: string,
    amount: number,
    isPaid: boolean,
    status: OrderStatus,
    shippingAddress: shippingAddressType,
    billingAddress: billingAddressType
}