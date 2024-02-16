import { z } from "zod"

export const signUpSchema = z.object({
	restaurantName: z.string().min(1, {
		message: "O nome do seu restaurante não pode estar vazio"
	}),
	managerName: z.string().min(1, {
		message: "Seu nome não pode estar vazio"
	}),
	phone: z.string().min(11, {
		message: "Digite um número de telefone válido"
	}),
	email: z.string().email({
		message: "Por favor, insira um email válido"
	})
})

export type SignUpForm = z.infer<typeof signUpSchema>
