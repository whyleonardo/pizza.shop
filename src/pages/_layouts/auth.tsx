import { Outlet } from "react-router-dom"

import { ModeToggle } from "@/components/mode-toggle"

import { Pizza } from "lucide-react"

export const AuthLayout = () => {
	return (
		<div className="grid min-h-screen grid-cols-2">
			<div className="flex h-full flex-col justify-between border-r border-foreground/5 bg-muted p-10 text-muted-foreground">
				<div className="flex items-center gap-3 text-lg font-medium text-foreground">
					<Pizza className="size-5" />
					<span className="font-semibold">pizza.shop</span>
				</div>
				<footer className="text-sm">
					Painel do parceiro &copy;{" "}
					<strong>pizza.shop - {new Date().getFullYear()}</strong>
				</footer>
			</div>

			<div className="relative flex flex-col items-center justify-center p-10">
				<div className="absolute right-10 top-10">
					<ModeToggle />
				</div>
				<Outlet />
			</div>
		</div>
	)
}
