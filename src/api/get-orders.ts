import { Order } from "@/@types/order"
import { api } from "@/lib/axios"

interface GetOrdersQuery {
	pageIndex?: number | null
}

export interface GetOrdersResponse {
	orders: Order[]
	meta: {
		pageIndex: number
		perPage: number
		totalCount: number
	}
}

export const getOrders = async ({ pageIndex }: GetOrdersQuery) => {
	const response = await api.get<GetOrdersResponse>("/orders", {
		params: {
			pageIndex
		}
	})

	return response.data
}
