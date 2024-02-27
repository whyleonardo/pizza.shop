import { Fragment } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { getMonthCanceledOrdersAmount } from "@/api/get-month-cancel-orders-amount"
import { useQuery } from "@tanstack/react-query"
import { DollarSign } from "lucide-react"

export const CanceledOrdersAmountCard = () => {
	const { data: monthCanceledOrdersAmount } = useQuery({
		queryFn: getMonthCanceledOrdersAmount,
		queryKey: ["month-canceled-orders-amount", "metrics"]
	})

	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-base font-semibold">
					Cancelamentos (mês)
				</CardTitle>
				<DollarSign />
			</CardHeader>
			<CardContent className="space-y-1">
				{monthCanceledOrdersAmount && (
					<Fragment>
						<span className="text-2xl font-bold">
							{monthCanceledOrdersAmount.amount}
						</span>
						<p className="text-xs text-muted-foreground">
							{monthCanceledOrdersAmount.diffFromLastMonth >= 0 ? (
								<span className="text-red-500 dark:text-red-400">
									+{monthCanceledOrdersAmount.diffFromLastMonth}%{" "}
								</span>
							) : (
								<span className="text-emerald-500 dark:text-emerald-400">
									{monthCanceledOrdersAmount.diffFromLastMonth}%{" "}
								</span>
							)}
							em relação ao mês passado
						</p>
					</Fragment>
				)}
			</CardContent>
		</Card>
	)
}
