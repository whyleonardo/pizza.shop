import { Fragment } from "react"

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/components/ui/card"

import { useTheme } from "@/providers/theme-provider"
import { formatCurrency } from "@/utils/format-currency"
import {
	ResponsiveContainer,
	LineChart,
	XAxis,
	YAxis,
	CartesianGrid,
	Line,
	Tooltip
} from "recharts"
import colors from "tailwindcss/colors"

const data = [
	{
		date: "10/12",
		revenue: 1522
	},
	{
		date: "11/12",
		revenue: 700
	},
	{
		date: "12/12",
		revenue: 1200
	},
	{
		date: "13/12",
		revenue: 1100
	},
	{
		date: "14/12",
		revenue: 1200
	},
	{
		date: "15/12",
		revenue: 1253
	},
	{
		date: "16/12",
		revenue: 1200
	},
	{
		date: "17/12",
		revenue: 1500
	}
]

export const RevenueChart = () => {
	const { theme } = useTheme()

	const isDarkMode = theme === "dark"
	return (
		<Card className="col-span-6">
			<CardHeader className="flex-row items-center justify-between pb-8">
				<div className="space-y-1">
					<CardTitle>Receita no período</CardTitle>

					<CardDescription>Receita diária no período</CardDescription>
				</div>
			</CardHeader>

			<CardContent>
				<ResponsiveContainer width="100%" height={240}>
					<LineChart data={data} style={{ fontSize: 12 }}>
						<XAxis
							stroke={colors.zinc[500]}
							axisLine={false}
							tickLine={false}
							dy={16}
							dataKey="date"
						/>

						<YAxis
							stroke={colors.zinc[500]}
							axisLine={false}
							tickLine={false}
							width={80}
							tickFormatter={(value: number) => formatCurrency(value)}
						/>

						<CartesianGrid vertical={false} className="stroke-muted" />

						<Line
							type="linear"
							strokeWidth={2}
							dataKey="revenue"
							stroke={isDarkMode ? colors.indigo[400] : colors.indigo[500]}
						/>

						<Tooltip
							content={({ active, payload }) => {
								return (
									<Card>
										{active &&
											payload &&
											payload.map((item, index) => (
												<Fragment key={`chart-tooltip-${index}`}>
													<CardHeader>
														<CardTitle className="text-sm font-medium">
															Receita no dia {item.payload.date}
														</CardTitle>
													</CardHeader>
													<CardContent>
														<span className="text-xl font-bold">
															R$ {item.payload.revenue}
														</span>
													</CardContent>
												</Fragment>
											))}
									</Card>
								)
							}}
						/>
					</LineChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	)
}
