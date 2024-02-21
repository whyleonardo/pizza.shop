import { api } from "@/lib/axios"

export interface RegisterRestaurantBody {
	restaurantName: string
	managerName: string
	email: string
	phone: string
}

export const registerRestaurant = async ({
	email,
	managerName,
	phone,
	restaurantName
}: RegisterRestaurantBody) => {
	await api.post("/restaurants", { email, managerName, phone, restaurantName })
}
