import { Fragment } from "react"
import { Helmet } from "react-helmet-async"

import { OrderTableRow } from "./_components/order-table-row"
import { OrdersTableFilter } from "./_components/orders-table-filters"
import { PaginationC } from "@/components/pagination"
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow
} from "@/components/ui/table"

export const Orders = () => {
	return (
		<Fragment>
			<Helmet title="Pedidos" />

			<div className="flex flex-col gap-4">
				<h1 className="text-3xl font-bold">Pedidos</h1>
			</div>

			<div className="space-y-2.5">
				<OrdersTableFilter />

				<div className="rounded-md border">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[64px]"></TableHead>
								<TableHead className="w-[140px]">Identificador</TableHead>
								<TableHead className="w-[180px]">Realizado há</TableHead>
								<TableHead className="w-[140px]">Status</TableHead>
								<TableHead>Cliente</TableHead>
								<TableHead className="w-[148px]">Total do pedido</TableHead>
								<TableHead className="w-[164px]"></TableHead>
								<TableHead className="w-[132px]"></TableHead>
							</TableRow>
						</TableHeader>

						<TableBody>
							{Array.from({ length: 10 }).map((_, index) => (
								<OrderTableRow key={index} />
							))}
						</TableBody>
					</Table>
				</div>

				<PaginationC pageIndex={0} perPage={10} totalCount={200} />
			</div>
		</Fragment>
	)
}
