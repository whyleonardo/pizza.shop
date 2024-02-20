import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Utensils } from "lucide-react"

export const DayOrdersAmountCard = () => {
	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-base font-semibold">Pedidos (dia)</CardTitle>
				<Utensils />
			</CardHeader>
			<CardContent className="space-y-1">
				<span className="text-2xl font-bold">6</span>
				<p className="text-xs text-muted-foreground">
					<span className="text-red-500 dark:text-red-400">-4%</span> {""}
					em relação ao mês passado
				</p>
			</CardContent>
		</Card>
	)
}
