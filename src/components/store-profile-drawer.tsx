import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import {
	GetManagedRestaurantResponse,
	getManagedRestaurant
} from "@/api/get-managed-restaurant"
import { updateProfile } from "@/api/update-profile"
import { StoreProfileSchema, storeProfileSchema } from "@/schemas/store-profile"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

export const StoreProfileDrawer = () => {
	const queryClient = useQueryClient()

	const { data: managedRestaurant } = useQuery({
		queryFn: getManagedRestaurant,
		queryKey: ["managed-restaurant"],
		staleTime: Infinity
	})

	function updateManagedRestaurantCache({
		description,
		name
	}: StoreProfileSchema) {
		const cached = queryClient.getQueryData<GetManagedRestaurantResponse>([
			"managed-restaurant"
		])

		if (cached) {
			queryClient.setQueryData<GetManagedRestaurantResponse>(
				["managed-restaurant"],
				{
					...cached,
					name,
					description
				}
			)
		}

		return { cached }
	}

	const { mutateAsync: updateProfileFn } = useMutation({
		mutationFn: updateProfile,
		onMutate({ description, name }) {
			const { cached } = updateManagedRestaurantCache({ description, name })

			return { previousProfileInfo: cached }
		},
		onError(_error, _variables, context) {
			if (context?.previousProfileInfo) {
				updateManagedRestaurantCache(context.previousProfileInfo)
			}
		}
	})

	const {
		register,
		handleSubmit,
		formState: { isSubmitting }
	} = useForm<StoreProfileSchema>({
		resolver: zodResolver(storeProfileSchema),
		values: {
			name: managedRestaurant?.name ?? "",
			description: managedRestaurant?.description ?? ""
		}
	})

	async function handleUpdateProfile({
		description,
		name
	}: StoreProfileSchema) {
		try {
			await updateProfileFn({
				name,
				description
			})

			toast.success("Perfil atualizado com sucesso!")
		} catch (_error) {
			toast.error("Falha ao atualizar o perfil. Tente novamente!")
		}
	}
	return (
		<DrawerContent className="px-4">
			<DrawerHeader>
				<DrawerTitle>Perfil da Loja</DrawerTitle>
				<DrawerDescription>
					Atualize as informações do seu estabelecimento visíveis ao seu cliente
				</DrawerDescription>
			</DrawerHeader>
			<form onSubmit={handleSubmit(handleUpdateProfile)}>
				<div className="space-y-4 py-4">
					<div className="grid grid-cols-5 items-center gap-4">
						<Label htmlFor="name">Nome</Label>
						<Input
							id="name"
							spellCheck={false}
							className="col-span-4"
							{...register("name")}
						/>
					</div>

					<div className="grid grid-cols-5 items-center gap-4">
						<Label htmlFor="description">Descrição</Label>
						<Textarea
							id="description"
							spellCheck={false}
							className="col-span-4 h-24 resize-none scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted-foreground"
							{...register("description")}
						/>
					</div>
				</div>
				<DrawerFooter>
					<Button disabled={isSubmitting} type="submit" variant="success">
						{isSubmitting ? (
							<Loader2 className="size-4 animate-spin" />
						) : (
							"Salvar"
						)}
					</Button>

					<DrawerClose asChild>
						<Button variant="outline" type="button">
							Cancelar
						</Button>
					</DrawerClose>
				</DrawerFooter>
			</form>
		</DrawerContent>
	)
}
