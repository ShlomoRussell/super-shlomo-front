import { Items } from "./item.model";

export class ShoppingCartItem {
  constructor(
    public itemId?: string,
    public quantity?: number,
    public totalPrice?: number|string
  ) {}
}
export class ShoppingCart {
  constructor(
    public items: ShoppingCartItem[],
    public customerId?: string,
    public dateCreated?: Date,
    public id?:string
  ) {}
}
export interface CartItemMapped extends Items, ShoppingCartItem {}
