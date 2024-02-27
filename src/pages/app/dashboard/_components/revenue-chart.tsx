import { Fragment, useMemo, useState } from "react"
import { DateRange } from "react-day-picker"

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/components/ui/card"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { Label } from "@/components/ui/label"

import { getDailyRevenueInPeriod } from "@/api/get-daily-revenue-in-period"
import { useTheme } from "@/providers/theme-provider"
import { formatCurrency } from "@/utils/format-currency"
import { useQuery } from "@tanstack/react-query"
import { subDays } from "date-fns"
import { Loader2 } from "lucide-react"
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

export const RevenueChart = () => {
	const [dateRange, setDateRange] = useState<DateRange | undefined>({
		from: subDays(new Date(), 7),
		to: new Date()
	})

	const { data: dailyRevenueInPeriod } = useQuery({
		queryKey: ["metrics", "daily-revenue-in-period", dateRange],
		queryFn: () =>
			getDailyRevenueInPeriod({
				from: dateRange?.from,
				to: dateRange?.to
			})
	})

	const chartData = useMemo(() => {
		return dailyRevenueInPeriod?.map((chartItem) => {
			return {
				date: chartItem.date,
				receipt: chartItem.receipt / 100
			}
		})
	}, [dailyRevenueInPeriod])

	const { theme } = useTheme()

	const isDarkMode = theme === "dark"
	return (
		<Card className="md:col-span-6 col-span-10">
			<CardHeader className="flex-row items-center justify-between pb-8">
				<div className="space-y-1">
					<CardTitle>Receita no período</CardTitle>

					<CardDescription>Receita diária no período</CardDescription>
				</div>

				<div className="items-center gap-3 lg:flex hidden">
					<Label>Período</Label>
					<DateRangePicker date={dateRange} onDateChange={setDateRange} />
				</div>
			</CardHeader>

			<CardContent>
				{dailyRevenueInPeriod ? (
					<ResponsiveContainer width="100%" height={240}>
						<LineChart data={chartData} style={{ fontSize: 12 }}>
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
								dataKey="receipt"
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
																{formatCurrency(item.payload.receipt)}
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
				) : (
					<div className="flex h-[240px] w-full items-center justify-center">
						<Loader2 className="animate-spin size-8 text-muted-foreground" />
					</div>
				)}
			</CardContent>
		</Card>
	)
}
