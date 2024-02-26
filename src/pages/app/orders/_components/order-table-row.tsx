import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { TableCell, TableRow } from "@/components/ui/table"

import { OrderDetails } from "./order-details"
import { OrderStatus } from "./order-status"

import { Order } from "@/@types/order"
import { OrderStatus as OrderStatusType } from "@/@types/order-status"
import { approveOrder } from "@/api/approve-order"
import { cancelOrder } from "@/api/cancel-order"
import { deliverOrder } from "@/api/deliver-order"
import { dispatchOrder } from "@/api/dispatch-order"
import { GetOrdersResponse } from "@/api/get-orders"
import { formatCurrency } from "@/utils/format-currency"
import { formatDateDistanceToNow } from "@/utils/format-date-distance-to-now"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ArrowRight, Search, X } from "lucide-react"

interface OrderTableRowProps {
	order: Order
}

export const OrderTableRow = ({ order }: OrderTableRowProps) => {
	const [isDetailsOpen, setIsDetailsOpen] = useState(false)
	const queryClient = useQueryClient()

	function updateOrderStatusOnCache(orderId: string, status: OrderStatusType) {
		const ordersListcache = queryClient.getQueriesData<GetOrdersResponse>({
			queryKey: ["orders"]
		})

		ordersListcache.forEach(([cacheKey, cacheData]) => {
			if (!cacheData) {
				// eslint-disable-next-line no-useless-return
				return
			}

			queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
				...cacheData,
				orders: cacheData.orders.map((order) => {
					if (order.orderId === orderId) {
						return {
							...order,
							status
						}
					}

					return order
				})
			})
		})
	}

	const { mutateAsync: cancelOrderFn, isPending: isCancellingOrder } =
		useMutation({
			mutationFn: cancelOrder,
			async onSuccess(_, { orderId }) {
				updateOrderStatusOnCache(orderId, "canceled")
			}
		})

	const { mutateAsync: approveOrderFn, isPending: isApprovingOrder } =
		useMutation({
			mutationFn: approveOrder,
			async onSuccess(_, { orderId }) {
				updateOrderStatusOnCache(orderId, "processing")
			}
		})

	const { mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder } =
		useMutation({
			mutationFn: dispatchOrder,
			async onSuccess(_, { orderId }) {
				updateOrderStatusOnCache(orderId, "delivering")
			}
		})

	const { mutateAsync: deliverOrderFn, isPending: isDeliveringOrder } =
		useMutation({
			mutationFn: deliverOrder,
			async onSuccess(_, { orderId }) {
				updateOrderStatusOnCache(orderId, "delivered")
			}
		})

	return (
		<TableRow>
			<TableCell>
				<Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
					<DialogTrigger asChild>
						<Button variant="outline" size="xs">
							<Search className="size-3" />
							<span className="sr-only">Detalhes do pedido</span>
						</Button>
					</DialogTrigger>

					<OrderDetails open={isDetailsOpen} orderId={order.orderId} />
				</Dialog>
			</TableCell>

			<TableCell className="font-mono text-xs font-medium tracking-normal">
				{order.orderId}
			</TableCell>
			<TableCell className="text-muted-foreground">
				{formatDateDistanceToNow(order.createdAt)}
			</TableCell>
			<TableCell>
				<OrderStatus status={order.status} />
			</TableCell>
			<TableCell className="font-medium">{order.customerName}</TableCell>
			<TableCell className="font-medium">
				{formatCurrency(order.total / 100)}
			</TableCell>

			<TableCell>
				{order.status === "pending" && (
					<Button
						onClick={() => approveOrderFn({ orderId: order.orderId })}
						disabled={isApprovingOrder}
						variant="ghost"
						size="xs"
					>
						<ArrowRight className="mr-2 size-3" />
						Aprovar
					</Button>
				)}

				{order.status === "processing" && (
					<Button
						onClick={() => dispatchOrderFn({ orderId: order.orderId })}
						disabled={isDispatchingOrder}
						variant="ghost"
						size="xs"
					>
						<ArrowRight className="mr-2 size-3" />
						Em entrega
					</Button>
				)}

				{order.status === "delivering" && (
					<Button
						onClick={() => deliverOrderFn({ orderId: order.orderId })}
						disabled={isDeliveringOrder}
						variant="ghost"
						size="xs"
					>
						<ArrowRight className="mr-2 size-3" />
						Entregue
					</Button>
				)}
			</TableCell>

			<TableCell>
				<Button
					onClick={() => cancelOrderFn({ orderId: order.orderId })}
					disabled={
						!["pending", "processing"].includes(order.status) ||
						isCancellingOrder
					}
					variant="ghost"
					size="xs"
				>
					<X className="mr-2 size-3" />
					Cancelar
				</Button>
			</TableCell>
		</TableRow>
	)
}
