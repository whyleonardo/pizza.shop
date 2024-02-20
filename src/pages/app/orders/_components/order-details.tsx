import { Button } from "@/components/ui/button"
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

interface OrderDetailsProps {}

export const OrderDetails = (props: OrderDetailsProps) => {
	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Pedido: wjrgojwoerjo</DialogTitle>
				<DialogDescription>Detalhes do pedido</DialogDescription>
			</DialogHeader>

			<div className="space-y-6">
				<Table>
					<TableBody>
						<TableRow>
							<TableCell className="text-muted-foreground">Status</TableCell>
							<TableCell className="flex justify-end">
								<div className="flex items-center gap-2">
									<span className="size-2 rounded-full bg-slate-400" />
									<span className="text-muted-foreground">Pendente</span>
								</div>
							</TableCell>
						</TableRow>

						<TableRow>
							<TableCell className="text-muted-foreground">Cliente</TableCell>
							<TableCell className="flex justify-end">
								Christian Leonardo
							</TableCell>
						</TableRow>

						<TableRow>
							<TableCell className="text-muted-foreground">Telefone</TableCell>
							<TableCell className="flex justify-end">
								(31) 97304-1202
							</TableCell>
						</TableRow>

						<TableRow>
							<TableCell className="text-muted-foreground">Email</TableCell>
							<TableCell className="flex justify-end">
								whyleonardo.dev@gmail.com
							</TableCell>
						</TableRow>

						<TableRow>
							<TableCell className="text-muted-foreground">
								Realizado há
							</TableCell>
							<TableCell className="flex justify-end">há 3 minutos</TableCell>
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
						<TableRow>
							<TableCell>Pizza Pepperoni Família</TableCell>
							<TableCell className="text-right">1</TableCell>
							<TableCell className="text-right">R$ 59,90</TableCell>
							<TableCell className="text-right">R$ 59,90</TableCell>
						</TableRow>

						<TableRow>
							<TableCell>Pizza Muçarela</TableCell>
							<TableCell className="text-right">2</TableCell>
							<TableCell className="text-right">R$ 49,90</TableCell>
							<TableCell className="text-right">R$ 99,80</TableCell>
						</TableRow>
					</TableBody>
					<TableFooter>
						<TableRow>
							<TableCell colSpan={3}>Total do pedido</TableCell>
							<TableCell className="text-right font-medium">
								R$ 159,70
							</TableCell>
						</TableRow>
					</TableFooter>
				</Table>
			</div>
		</DialogContent>
	)
}
