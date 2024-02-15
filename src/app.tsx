import { RouterProvider } from "react-router-dom"

import { router } from "@/lib/router-dom/routes"

export const App = () => {
	return <RouterProvider router={router} />
}
