import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/components/ui/select"

import { Search, X } from "lucide-react"

interface ComponentProps {}

export const OrdersTableFilter = (props: ComponentProps) => {
	return (
		<form className="flex items-center gap-2">
			<span className="text-sm font-semibold">Filtros</span>
			<Input className="h-8 w-auto" placeholder="ID do pedido" />
			<Input className="h-8 w-[320px]" placeholder="Nome do cliente" />

			<Select>
				<SelectTrigger className="h-8 w-[180px]">
					<SelectValue placeholder="Status" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="all">Todos status</SelectItem>
					<SelectItem value="pending">Pendente</SelectItem>
					<SelectItem value="canceled">Cancelado</SelectItem>
					<SelectItem value="processing">Em preparo</SelectItem>
					<SelectItem value="delivering">Em entrega</SelectItem>
					<SelectItem value="delivered">Entregue</SelectItem>
				</SelectContent>
			</Select>

			<Button type="submit" variant="secondary" size="sm">
				<Search className="mr-2 size-4" />
				Filtrar resultados
			</Button>

			<Button type="button" variant="outline" size="sm">
				<X className="mr-2 size-4" />
				Remover filtros
			</Button>
		</form>
	)
}
