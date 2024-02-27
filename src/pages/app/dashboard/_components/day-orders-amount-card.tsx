import { Fragment } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { MetricCardSkeleton } from "./metric-card-skeleton"
import { getDayOrdersAmount } from "@/api/get-day-orders-amount"
import { useQuery } from "@tanstack/react-query"
import { Utensils } from "lucide-react"

export const DayOrdersAmountCard = () => {
	const { data: dayOrdersAmount } = useQuery({
		queryFn: getDayOrdersAmount,
		queryKey: ["day-orders-amount", "metrics"]
	})

	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-base font-semibold">Pedidos (dia)</CardTitle>
				<Utensils />
			</CardHeader>
			<CardContent className="space-y-1">
				{dayOrdersAmount ? (
					<Fragment>
						<span className="text-2xl font-bold">
							{dayOrdersAmount.amount.toLocaleString("pt-BR")}
						</span>
						<p className="text-xs text-muted-foreground">
							{dayOrdersAmount.diffFromYesterday >= 0 ? (
								<span className="text-emerald-500 dark:text-emerald-400">
									+{dayOrdersAmount.diffFromYesterday}%{" "}
								</span>
							) : (
								<span className="text-red-500 dark:text-red-400">
									{dayOrdersAmount.diffFromYesterday}%{" "}
								</span>
							)}
							em relação a ontem
						</p>
					</Fragment>
				) : (
					<MetricCardSkeleton />
				)}
			</CardContent>
		</Card>
	)
}
