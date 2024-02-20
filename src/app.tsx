import { HelmetProvider, Helmet } from "react-helmet-async"
import { RouterProvider } from "react-router-dom"

import { Toaster } from "@/components/ui/sonner"

import { router } from "@/lib/router-dom/routes"
import { ThemeProvider } from "@/providers/theme-provider"

export const App = () => {
	return (
		<HelmetProvider>
			<Helmet titleTemplate="%s | pizza.shop" />
			<ThemeProvider defaultTheme="system" storageKey="pizza-shop-theme">
				<RouterProvider router={router} />
				<Toaster richColors closeButton invert />
			</ThemeProvider>
		</HelmetProvider>
	)
}
