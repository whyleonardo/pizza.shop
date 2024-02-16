import { z } from "zod"

export const signInSchema = z.object({
	email: z.string().email({
		message: "Por favor, insira um email válido"
	})
})

export type SignInForm = z.infer<typeof signInSchema>
