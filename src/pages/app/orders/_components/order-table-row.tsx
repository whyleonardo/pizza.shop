import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { TableCell, TableRow } from "@/components/ui/table"

import { OrderDetails } from "./order-details"

import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { ArrowRight, Search, X } from "lucide-react"

interface OrderTableRowProps {}

export const OrderTableRow = (props: OrderTableRowProps) => {
	const formatedDate = formatDistanceToNow(new Date("02-12-2024"), {
		locale: ptBR,
		addSuffix: true
	})
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

					<OrderDetails />
				</Dialog>
			</TableCell>

			<TableCell className="font-mono text-xs font-medium tracking-normal">
				ohuq2n3wrf890
			</TableCell>
			<TableCell className="text-muted-foreground">{formatedDate}</TableCell>
			<TableCell>
				<div className="flex items-center gap-2">
					<span className="size-2 rounded-full bg-slate-400" />
					<span className="text-muted-foreground">Pendente</span>
				</div>
			</TableCell>
			<TableCell className="font-medium">Christian Leonardo</TableCell>
			<TableCell className="font-medium">R$ 49,90</TableCell>

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
