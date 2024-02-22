import { Fragment } from "react"
import { Helmet } from "react-helmet-async"
import { useSearchParams } from "react-router-dom"

import { OrderTableRow } from "./_components/order-table-row"
import { OrdersTableFilter } from "./_components/orders-table-filters"
import { Pagination } from "@/components/pagination"
import { Skeleton } from "@/components/ui/skeleton"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from "@/components/ui/table"

import { getOrders } from "@/api/get-orders"
import { useQuery } from "@tanstack/react-query"
import { z } from "zod"

export const Orders = () => {
	const [searchParams, setSearchParams] = useSearchParams()

	const pageIndex = z.coerce
		.number()
		.transform((page) => page - 1)
		.parse(searchParams.get("page") ?? "1")

	const {
		data: result,
		isLoading: isResultLoading,
		isFetching: isResultFetching
	} = useQuery({
		queryKey: ["orders", pageIndex],
		queryFn: () => getOrders({ pageIndex })
	})

	function handlePaginate(pageIndex: number) {
		setSearchParams((prev) => {
			prev.set("page", (pageIndex + 1).toString())
			return prev
		})
	}

	const ordersPerPage = (result?.meta && result.meta.perPage) || 10

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
							{isResultLoading &&
								Array.from({ length: ordersPerPage }).map((_, index) => (
									<TableRow key={`order-skeleton-row-${index}`}>
										{Array.from({ length: 8 }).map((_, i) => (
											<TableCell key={`order-skeleton-cell-${i}`}>
												<Skeleton className="h-7" />
											</TableCell>
										))}
									</TableRow>
								))}

							{result?.orders &&
								result.orders.map((order) => (
									<OrderTableRow key={order.orderId} order={order} />
								))}
						</TableBody>
					</Table>
				</div>

				{result && (
					<Pagination
						pageIndex={result.meta.pageIndex}
						perPage={result.meta.perPage}
						totalCount={result.meta.totalCount}
						onPageChange={handlePaginate}
					/>
				)}
			</div>
		</Fragment>
	)
}
