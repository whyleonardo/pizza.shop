import { Fragment } from "react"
import { Helmet } from "react-helmet-async"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"

import { FieldErrorMessage } from "@/components/form/field-error-message"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

import { SignUpForm, signUpSchema } from "@/schemas/sign-up"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

export const SignUp = () => {
	const navigate = useNavigate()

	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting }
	} = useForm<SignUpForm>({
		resolver: zodResolver(signUpSchema)
	})

	async function handleSignUp(data: SignUpForm) {
		const { email } = data

		await new Promise((resolve) => setTimeout(resolve, 2000))

		email.split("@")

		try {
			toast.success("Restaurante cadastrado com sucesso", {
				classNames: {
					actionButton:
						"!ring-1 !ring-[var(--success-border)] !border-red-500 !text-[var(--success-text)] !bg-transparent hover:opacity-70"
				},
				action: {
					label: "Login",
					onClick: () => navigate("/sign-in")
				}
			})
		} catch (error) {
			toast.error("Erro ao cadastrar restaurante", {
				description: "Por favor, tente novamente."
			})
		}
	}
	return (
		<Fragment>
			<Helmet title="Cadastro" />
			<div className="rounded-md border p-8">
				<div className="flex w-[350px] flex-col justify-center gap-6">
					<div className="flex flex-col gap-2 text-center">
						<h1 className="text-2xl font-bold tracking-tight">
							Crie uma conta grátis
						</h1>
						<p className="text-sm text-muted-foreground">
							Seja um parceiro e comece suas vendas
						</p>
					</div>

					<form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="restaurantName">Nome do estabelecimento</Label>
							<Input
								id="restaurantName"
								type="text"
								placeholder="Digite o nome do seu estabelecimento"
								disabled={isSubmitting}
								{...register("restaurantName")}
							/>

							{errors.restaurantName && (
								<FieldErrorMessage>
									{errors.restaurantName.message}
								</FieldErrorMessage>
							)}
						</div>

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

						<div className="space-y-2">
							<Label htmlFor="managerName">Nome do propietário</Label>
							<Input
								id="managerName"
								type="text"
								placeholder="Digite seu nome"
								disabled={isSubmitting}
								{...register("managerName")}
							/>

							{errors.managerName && (
								<FieldErrorMessage>
									{errors.managerName.message}
								</FieldErrorMessage>
							)}
						</div>

						<div className="space-y-2">
							<Label htmlFor="phone">Telefone</Label>
							<Input
								id="phone"
								type="tel"
								placeholder="Digite seu telefone"
								disabled={isSubmitting}
								{...register("phone")}
							/>

							{errors.phone && (
								<FieldErrorMessage>{errors.phone.message}</FieldErrorMessage>
							)}
						</div>

						<p className="text-balance px-6 text-center text-sm text-muted-foreground">
							Ao continuar, você concorda com nossos{" "}
							<a
								href="#"
								className="underline underline-offset-4 transition hover:brightness-125"
							>
								termos de serviço
							</a>{" "}
							e{" "}
							<a
								href="#"
								className="underline underline-offset-4 transition hover:brightness-125"
							>
								políticas de privacidade
							</a>
						</p>

						<Button disabled={isSubmitting} className="w-full" type="submit">
							{isSubmitting ? (
								<Loader2 className="animate-spin" />
							) : (
								"Finalizar cadastro"
							)}
						</Button>
					</form>

					<Separator className="mx-auto w-3/4" />
					<span className="my-0 block text-center font-medium text-muted-foreground">
						Já possui uma conta?{" "}
						<span className="relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-bottom-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100">
							<Link className="text-primary" to="/sign-in">
								Entre agora!
							</Link>
						</span>
					</span>
				</div>
			</div>
		</Fragment>
	)
}
