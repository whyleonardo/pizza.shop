import { Outlet } from "react-router-dom"

import { Header } from "@/components/header"

export const AppLayout = () => {
	return (
		<div className="flex min-h-screen flex-col">
			<Header />

			<div className="flex flex-1 flex-col gap-4 p-8 pt-6">
				<Outlet />
			</div>
		</div>
	)
}
