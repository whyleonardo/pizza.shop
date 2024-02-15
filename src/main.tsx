import React from "react"
import ReactDOM from "react-dom/client"

import { App } from "@/app"
import { ThemeProvider } from "@/providers/theme-provider"

import "@/styles/globals.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<App />
		</ThemeProvider>
	</React.StrictMode>
)
