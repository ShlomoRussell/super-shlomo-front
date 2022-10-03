export default class OrderModel {
  constructor(
    public customerId?: string,
    public cartId?: string,
    public city?: string,
    public deliveryDate?: Date,
    public lastFourDigitsOfCC?: number,
    public orderedDate?: Date,
    public street?: string,
    public totalPrice?: string
  ) {}
}
