export interface Order {
  id: number,
  userId: number,
  address: string,
  email: string,
  total: number
}

export interface OrderItem {
  quantity: number
}