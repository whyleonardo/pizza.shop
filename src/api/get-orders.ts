import { Order } from "@/@types/order"
import { api } from "@/lib/axios"

export interface GetOrdersResponse {
	orders: Order[]
	meta: {
		pageIndex: number
		perPage: number
		totalCount: number
	}
}

export const getOrders = async () => {
	const response = await api.get<GetOrdersResponse>("/orders", {
		params: {
			pageIndex: 0
		}
	})

	return response.data
}