import { Fragment } from "react"
import { Helmet } from "react-helmet-async"

import { DayOrdersAmountCard } from "./_components/day-orders-amount-card"
import { CanceledOrdersAmountCard } from "./_components/monthly-canceled-orders-amount"
import { MonthlyOrdersAmountCard } from "./_components/monthly-orders-amount-card"
import { MonthlyRevenueCard } from "./_components/monthly-revenue-card"
import { PopularProductsChart } from "./_components/popular-products-chart"
import { RevenueChart } from "./_components/revenue-chart"

export const Dashboard = () => {
	return (
		<Fragment>
			<Helmet title="Dashboard" />
			<div className="flex flex-col gap-4">
				<h1 className="text-3xl font-bold">Dashboard</h1>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
				<MonthlyRevenueCard />
				<MonthlyOrdersAmountCard />
				<DayOrdersAmountCard />
				<CanceledOrdersAmountCard />
			</div>

			<div className="grid grid-cols-1 md:grid-cols-9 gap-4">
				<RevenueChart />
				<PopularProductsChart />
			</div>
		</Fragment>
	)
}
