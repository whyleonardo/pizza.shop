import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { TableCell, TableRow } from "@/components/ui/table"

import { OrderDetails } from "./order-details"
import { OrderStatus } from "./order-status"

import { Order } from "@/@types/order"
import { formatDateDistanceToNow } from "@/utils/format-date-distance-to-now"
import { ArrowRight, Search, X } from "lucide-react"

interface OrderTableRowProps {
	order: Order
}

export const OrderTableRow = ({ order }: OrderTableRowProps) => {
	return (
		<TableRow>
			<TableCell>
				<Dialog>
					<DialogTrigger asChild>
						<Button variant="outline" size="xs">
							<Search className="size-3" />
							<span className="sr-only">Detalhes do pedido</span>
						</Button>
					</DialogTrigger>

					<OrderDetails order={order} />
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
				{order.total.toLocaleString("pt-BR", {
					style: "currency",
					currency: "BRL"
				})}
			</TableCell>

			<TableCell>
				<Button variant="ghost" size="xs">
					<ArrowRight className="mr-2 size-3" />
					Aprovar
				</Button>
			</TableCell>

			<TableCell>
				<Button variant="ghost" size="xs">
					<X className="mr-2 size-3" />
					Cancelar
				</Button>
			</TableCell>
		</TableRow>
	)
}
