import {
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle
} from "@/components/ui/dialog"
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow
} from "@/components/ui/table"

import { OrderDetailsSkeleton } from "./order-details-skeleton"
import { OrderStatus } from "./order-status"

import { getOrderDetails } from "@/api/get-order-details"
import { formatCurrency } from "@/utils/format-currency"
import { formatDateDistanceToNow } from "@/utils/format-date-distance-to-now"
import { useQuery } from "@tanstack/react-query"

interface OrderDetailsProps {
	orderId: string
	open: boolean
}

export const OrderDetails = ({ orderId, open }: OrderDetailsProps) => {
	const { data: order } = useQuery({
		queryKey: ["order-details", orderId],
		queryFn: () => getOrderDetails({ orderId }),
		enabled: open
	})

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Pedido: {orderId}</DialogTitle>
				<DialogDescription>Detalhes do pedido</DialogDescription>
			</DialogHeader>

			{order ? (
				<div className="space-y-6">
					<Table>
						<TableBody>
							<TableRow>
								<TableCell className="text-muted-foreground">Status</TableCell>
								<TableCell className="flex justify-end">
									<OrderStatus status={order.status} />
								</TableCell>
							</TableRow>

							<TableRow>
								<TableCell className="text-muted-foreground">Cliente</TableCell>
								<TableCell className="flex justify-end">
									{order.customer.name}
								</TableCell>
							</TableRow>

							<TableRow>
								<TableCell className="text-muted-foreground">
									Telefone
								</TableCell>
								<TableCell className="flex justify-end">
									{order.customer.phone ?? "Não informado"}
								</TableCell>
							</TableRow>

							<TableRow>
								<TableCell className="text-muted-foreground">Email</TableCell>
								<TableCell className="flex justify-end">
									{order.customer.email}
								</TableCell>
							</TableRow>

							<TableRow>
								<TableCell className="text-muted-foreground">
									Realizado há
								</TableCell>
								<TableCell className="flex justify-end">
									{formatDateDistanceToNow(order?.createdAt)}
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>

					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Produto</TableHead>
								<TableHead className="text-right">Qtd.</TableHead>
								<TableHead className="text-right">Preço</TableHead>
								<TableHead className="text-right">Subtotal</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{order.orderItems.map((item) => (
								<TableRow key={item.id}>
									<TableCell>{item.product.name}</TableCell>
									<TableCell className="text-right">{item.quantity}</TableCell>
									<TableCell className="text-right">
										{formatCurrency(item.priceInCents / 100)}
									</TableCell>
									<TableCell className="text-right">
										{formatCurrency((item.priceInCents * item.quantity) / 100)}
									</TableCell>
								</TableRow>
							))}
						</TableBody>

						<TableFooter>
							<TableRow>
								<TableCell colSpan={3}>Total do pedido</TableCell>
								<TableCell className="text-right font-medium">
									{formatCurrency(order.totalInCents / 100)}
								</TableCell>
							</TableRow>
						</TableFooter>
					</Table>
				</div>
			) : (
				<OrderDetailsSkeleton />
			)}
		</DialogContent>
	)
}
