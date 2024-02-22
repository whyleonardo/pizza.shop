import { OrderStatus } from "@/@types/order-status"

export type Order = {
	orderId: string
	createdAt: string
	status: OrderStatus
	customerName: string
	total: number
}
