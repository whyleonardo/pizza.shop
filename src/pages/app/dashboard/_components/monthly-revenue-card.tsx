import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { DollarSign } from "lucide-react"

export const MonthlyRevenueCard = () => {
	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-base font-semibold">
					Receita Total (mês)
				</CardTitle>
				<DollarSign />
			</CardHeader>
			<CardContent className="space-y-1">
				<span className="text-2xl font-bold">R$ 1248,76</span>
				<p className="text-xs text-muted-foreground">
					<span className="text-emerald-500 dark:text-emerald-400">+2%</span>{" "}
					{""}
					em relação ao mês passado
				</p>
			</CardContent>
		</Card>
	)
}
