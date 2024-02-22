import { ORDER_STATUS } from "@/@enums/order-status"
import { OrderStatus as OrderStatusType } from "@/@types/order-status"
import { cn } from "@/lib/utils"

interface OrderStatusProps {
	status: OrderStatusType
}

// const orderStatusMap: Record<OrderStatus, string> = {
// 	canceled: "Cancelado",
// 	processing: "Em preparo",
// 	pending: "Pendente",
// 	delivering: "Em entrega",
// 	delivered: "Entregue"
// }

export const OrderStatus = ({ status }: OrderStatusProps) => {
	return (
		<div className="flex items-center gap-2">
			<span
				className={cn(
					"size-2.5 relative rounded-full",
					status === "pending" && "bg-zinc-400",
					status === "canceled" && "bg-rose-500",
					status === "delivered" && "bg-emerald-500",
					status === "delivering" && "bg-sky-500",
					status === "processing" && "bg-amber-500"
				)}
			/>

			<span
				className={cn(
					"size-2.5 rounded-full absolute",
					status === "pending" && "bg-zinc-400 animate-ping",
					status === "canceled" && "bg-rose-500",
					status === "delivered" && "bg-emerald-500",
					status === "delivering" && "bg-sky-500 animate-ping",
					status === "processing" && "bg-amber-500 animate-ping"
				)}
			/>
			<span className="text-muted-foreground">{ORDER_STATUS[status]}</span>
		</div>
	)
}
