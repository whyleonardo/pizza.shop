import { Controller, useForm } from "react-hook-form"
import { useSearchParams } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/components/ui/select"

import { zodResolver } from "@hookform/resolvers/zod"
import { Search, X } from "lucide-react"
import { z } from "zod"

const orderFilterSchema = z.object({
	orderId: z.string().optional(),
	customerName: z.string().optional(),
	status: z.string().optional()
})

type OrderFiltersSchema = z.infer<typeof orderFilterSchema>

export const OrdersTableFilter = () => {
	const [searchParams, setSearchParams] = useSearchParams()

	const orderId = searchParams.get("orderId")
	const customerName = searchParams.get("customerName")
	const status = searchParams.get("status")

	const { register, handleSubmit, control, reset } =
		useForm<OrderFiltersSchema>({
			resolver: zodResolver(orderFilterSchema),
			defaultValues: {
				customerName: customerName ?? "",
				orderId: orderId ?? "",
				status: status ?? "all"
			}
		})

	function handleFilter({ customerName, status, orderId }: OrderFiltersSchema) {
		setSearchParams((state) => {
			if (orderId) {
				state.set("orderId", orderId)
			} else {
				state.delete("orderId")
			}

			if (customerName) {
				state.set("customerName", customerName)
			} else {
				state.delete("customerName")
			}

			if (status) {
				state.set("status", status)
			} else {
				state.delete("status")
			}

			state.set("page", "1")
			return state
		})
	}

	function handleClearFilters() {
		setSearchParams((state) => {
			state.delete("orderId")
			state.delete("customerName")
			state.delete("status")
			state.set("page", "1")

			return state
		})

		reset({
			customerName: "",
			orderId: "",
			status: ""
		})
	}

	return (
		<form
			className="flex items-center gap-2 md:flex-row flex-col"
			onSubmit={handleSubmit(handleFilter)}
		>
			<span className="text-sm font-semibold">Filtros</span>
			<Input
				className="h-8 md:w-auto w-[220px]"
				placeholder="ID do pedido"
				{...register("orderId")}
			/>
			<Input
				className="h-8 md:w-[320px] w-[220px]"
				placeholder="Nome do cliente"
				{...register("customerName")}
			/>

			<Controller
				name="status"
				control={control}
				render={({ field: { name, onChange, value, disabled } }) => {
					return (
						<Select
							name={name}
							onValueChange={onChange}
							value={value}
							disabled={disabled}
						>
							<SelectTrigger className="h-8 md:w-[180px] w-[220px]">
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
					)
				}}
			/>

			<div className="flex items-center gap-2">
				<Button type="submit" variant="secondary" size="sm">
					<Search className="mr-2 size-4" />
					Filtrar resultados
				</Button>

				<Button
					onClick={handleClearFilters}
					type="button"
					variant="outline"
					size="sm"
				>
					<X className="mr-2 size-4" />
					Remover filtros
				</Button>
			</div>
		</form>
	)
}
