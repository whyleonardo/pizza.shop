import { Order } from "@/@types/order"
import { api } from "@/lib/axios"

interface GetOrdersQuery {
	pageIndex?: number | null
	orderId?: string | null
	customerName?: string | null
	status?: string | null
}

export interface GetOrdersResponse {
	orders: Order[]
	meta: {
		pageIndex: number
		perPage: number
		totalCount: number
	}
}

export const getOrders = async ({
	pageIndex,
	customerName,
	status,
	orderId
}: GetOrdersQuery) => {
	const response = await api.get<GetOrdersResponse>("/orders", {
		params: {
			pageIndex,
			customerName,
			status,
			orderId
		}
	})

	return response.data
}
