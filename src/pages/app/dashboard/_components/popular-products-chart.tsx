import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { BarChart } from "lucide-react"
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import colors from "tailwindcss/colors"

interface RenderCustomizedLabelProps {
	cx: number
	cy: number
	midAngle: number
	innerRadius: number
	outerRadius: number
	percent: number
	value: number
	index: number
}

const data = [
	{
		product: "Pepperoni",
		amount: 15
	},
	{
		product: "Muçarela",
		amount: 50
	},
	{
		product: "Frango com Catupiry",
		amount: 27
	},
	{
		product: "Calabresa",
		amount: 42
	},
	{
		product: "Alho",
		amount: 12
	}
]

const COLORS = [
	colors.sky[500],
	colors.amber[500],
	colors.violet[500],
	colors.emerald[500],
	colors.rose[500]
]

export const PopularProductsChart = () => {
	const renderCustomizedLabel = ({
		cx,
		cy,
		midAngle,
		innerRadius,
		outerRadius,
		value,
		index
	}: RenderCustomizedLabelProps) => {
		const RADIAN = Math.PI / 180
		const radius = innerRadius + (outerRadius - innerRadius) * 1.3
		const x = cx + radius * Math.cos(-midAngle * RADIAN)
		const y = cy + radius * Math.sin(-midAngle * RADIAN)

		return (
			<text
				x={x}
				y={y}
				className="fill-muted-foreground text-xs"
				textAnchor={x > cx ? "start" : "end"}
				dominantBaseline="central"
			>
				{data[index].product.length > 22
					? data[index].product.substring(0, 22).concat("...")
					: data[index].product}
				({value})
			</text>
		)
	}

	return (
		<Card className="col-span-3">
			<CardHeader className="flex-row items-center justify-between pb-8">
				<div className="flex w-full items-center justify-between space-y-1">
					<CardTitle>Produtos Populares</CardTitle>
					<BarChart className="size-4 text-muted-foreground" />
				</div>
			</CardHeader>

			<CardContent>
				<ResponsiveContainer width="100%" height={240}>
					<PieChart style={{ fontSize: 12 }}>
						<Pie
							data={data}
							dataKey="amount"
							nameKey="product"
							cx="50%"
							cy="50%"
							outerRadius={86}
							innerRadius={64}
							strokeWidth={8}
							labelLine={false}
							label={renderCustomizedLabel}
						>
							{data.map((_, index) => (
								<Cell
									key={`cell-${index}`}
									fill={COLORS[index]}
									className="stroke-background transition hover:opacity-80 focus:outline-none focus:ring-0"
								/>
							))}
						</Pie>
					</PieChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	)
}
