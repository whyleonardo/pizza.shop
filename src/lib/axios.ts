import { env } from "@/lib/env"
import axios from "axios"

export const api = axios.create({
	baseURL: env.VITE_API_BASE_URL,
	withCredentials: true
})

if (env.VITE_ENABLE_API_DELAY) {
	api.interceptors.request.use(async (config) => {
		await new Promise((resolve) => setTimeout(resolve, 2000))

		return config
	})
}