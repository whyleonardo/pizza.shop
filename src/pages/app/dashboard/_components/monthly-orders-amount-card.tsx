import { Fragment } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { MetricCardSkeleton } from "./metric-card-skeleton"
import { getMonthOrdersAmount } from "@/api/get-month-orders-amount"
import { useQuery } from "@tanstack/react-query"
import { Utensils } from "lucide-react"

export const MonthlyOrdersAmountCard = () => {
	const { data: monthOrdersAmount } = useQuery({
		queryFn: getMonthOrdersAmount,
		queryKey: ["month-orders-amount", "metrics"]
	})

	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-base font-semibold">Pedidos (mês)</CardTitle>
				<Utensils />
			</CardHeader>
			<CardContent className="space-y-1">
				{monthOrdersAmount ? (
					<Fragment>
						<span className="text-2xl font-bold">
							{monthOrdersAmount.amount.toLocaleString("pt-BR")}
						</span>
						<p className="text-xs text-muted-foreground">
							{monthOrdersAmount.diffFromLastMonth >= 0 ? (
								<span className="text-emerald-500 dark:text-emerald-400">
									+{monthOrdersAmount.diffFromLastMonth}%{" "}
								</span>
							) : (
								<span className="text-red-500 dark:text-red-400">
									{monthOrdersAmount.diffFromLastMonth}%{" "}
								</span>
							)}
							em relação ao mês passado
						</p>
					</Fragment>
				) : (
					<MetricCardSkeleton />
				)}
			</CardContent>
		</Card>
	)
}
