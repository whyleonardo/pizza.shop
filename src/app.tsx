import { HelmetProvider, Helmet } from "react-helmet-async"
import { RouterProvider } from "react-router-dom"

import { Toaster } from "@/components/ui/sonner"

import { queryClient } from "@/lib/react-query"
import { router } from "@/lib/routes"
import { ThemeProvider } from "@/providers/theme-provider"
import { QueryClientProvider } from "@tanstack/react-query"

export const App = () => {
	return (
		<HelmetProvider>
			<Helmet titleTemplate="%s | pizza.shop" />
			<ThemeProvider defaultTheme="system" storageKey="pizza-shop-theme">
				<QueryClientProvider client={queryClient}>
					<RouterProvider router={router} />
				</QueryClientProvider>
				<Toaster richColors closeButton invert />
			</ThemeProvider>
		</HelmetProvider>
	)
}
