import { Fragment } from "react"
import { Helmet } from "react-helmet-async"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"

import { FieldErrorMessage } from "@/components/form/field-error-message"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

import { signInSchema, SignInForm } from "@/schemas/sign-in"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

export const SignIn = () => {
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting }
	} = useForm<SignInForm>({
		resolver: zodResolver(signInSchema)
	})

	async function handleSignIn(data: SignInForm) {
		const { email } = data

		await new Promise((resolve) => setTimeout(resolve, 2000))

		email.split("@")

		try {
			toast.success("Um link de acesso foi enviado para o seu email!", {
				classNames: {
					actionButton:
						"!ring-1 !ring-[var(--success-border)] !border-red-500 !text-[var(--success-text)] !bg-transparent hover:opacity-70"
				},
				action: {
					label: "Reenviar",
					onClick: () => handleSignIn
				}
			})
		} catch (error) {
			toast.error("Credenciais inválidas", {
				description: "Por favor, tente novamente."
			})
		}
	}
	return (
		<Fragment>
			<Helmet title="Login" />
			<div className="rounded-md border p-8">
				<div className="flex w-[350px] flex-col justify-center gap-6">
					<div className="flex flex-col gap-2 text-center">
						<h1 className="text-2xl font-bold tracking-tight">
							Acessar painel
						</h1>
						<p className="text-sm text-muted-foreground">
							Acompanhe suas vendas pelo painel do parceiro!
						</p>
					</div>

					<form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="email">Seu e-mail</Label>
							<Input
								id="email"
								type="email"
								placeholder="Digite seu e-mail"
								disabled={isSubmitting}
								{...register("email")}
							/>

							{errors.email && (
								<FieldErrorMessage>{errors.email.message}</FieldErrorMessage>
							)}
						</div>
						<Button disabled={isSubmitting} className="w-full" type="submit">
							{isSubmitting ? <Loader2 className="animate-spin" /> : "Login"}
						</Button>
					</form>

					<Separator className="mx-auto w-3/4" />
					<span className="my-0 block text-center font-medium text-muted-foreground">
						Não tem uma conta?{" "}
						<span className="relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-bottom-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100">
							<Link className="text-primary" to="/sign-up">
								Registre-se
							</Link>
						</span>
					</span>
				</div>
			</div>
		</Fragment>
	)
}
