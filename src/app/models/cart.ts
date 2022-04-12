
export interface cart {
  _id: string,
  Product: {
    _id: string,
    name: string,
    price: number
    description: string,
    productImage: string,
  }
  Quantity: number,
  totalPrice: number
}

