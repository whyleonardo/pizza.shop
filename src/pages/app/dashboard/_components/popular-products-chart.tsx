import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { getPopularProducts } from "@/api/get-popular-products"
import { useQuery } from "@tanstack/react-query"
import { BarChart, Loader2 } from "lucide-react"
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

const COLORS = [
	colors.sky[500],
	colors.amber[500],
	colors.violet[500],
	colors.emerald[500],
	colors.rose[500]
]

export const PopularProductsChart = () => {
	const { data: popularProducts } = useQuery({
		queryKey: ["metrics", "popular-products"],
		queryFn: getPopularProducts
	})

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

		if (!popularProducts) {
			return null
		}

		return (
			<text
				x={x}
				y={y}
				className="fill-muted-foreground text-xs"
				textAnchor={x > cx ? "start" : "end"}
				dominantBaseline="central"
			>
				{popularProducts[index].product.length > 22
					? popularProducts[index].product.substring(0, 22).concat("...")
					: popularProducts[index].product}
				({value})
			</text>
		)
	}

	return (
		<Card className="md:col-span-3 col-span-10">
			<CardHeader className="flex-row items-center justify-between pb-8">
				<div className="flex w-full items-center justify-between space-y-1">
					<CardTitle>Produtos Populares</CardTitle>
					<BarChart className="size-4 text-muted-foreground" />
				</div>
			</CardHeader>

			<CardContent>
				{popularProducts ? (
					<ResponsiveContainer width="100%" height={240}>
						<PieChart style={{ fontSize: 12 }}>
							<Pie
								data={popularProducts}
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
								{popularProducts.map((_, index) => (
									<Cell
										key={`cell-${index}`}
										fill={COLORS[index]}
										className="stroke-background transition hover:opacity-80 focus:outline-none focus:ring-0"
									/>
								))}
							</Pie>
						</PieChart>
					</ResponsiveContainer>
				) : (
					<div className="flex h-[240px] w-full items-center justify-center">
						<Loader2 className="animate-spin size-8 text-muted-foreground" />
					</div>
				)}
			</CardContent>
		</Card>
	)
}
