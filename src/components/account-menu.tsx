import { Fragment } from "react"
import { useNavigate } from "react-router-dom"

import { StoreProfileDialog } from "@/components/store-profile-dialog"
import { StoreProfileDrawer } from "@/components/store-profile-drawer"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { Drawer, DrawerTrigger } from "@/components/ui/drawer"
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"

import { getManagedRestaurant } from "@/api/get-managed-restaurant"
import { getProfile } from "@/api/get-profile"
import { signOut } from "@/api/sign-out"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Building, ChevronDown, Loader2, LogOut } from "lucide-react"

export const AccountMenu = () => {
	const navigate = useNavigate()

	const { data: profile, isLoading: isLoadingProfile } = useQuery({
		queryFn: getProfile,
		queryKey: ["profile"],
		staleTime: Infinity
	})

	const { mutateAsync: signOutFn, isPending: isSigningOut } = useMutation({
		mutationFn: signOut,
		onSuccess() {
			navigate("/sign-in", { replace: true })
		}
	})

	const { data: managedRestaurant, isLoading: isLoadingManagedRestaurant } =
		useQuery({
			queryFn: getManagedRestaurant,
			queryKey: ["managed-restaurant"],
			staleTime: Infinity
		})

	return (
		<Fragment>
			<Drawer>
				<DrawerTrigger className="flex md:hidden" asChild>
					<Button
						variant="outline"
						className="flex select-none items-center gap-2 md:hidden"
					>
						{isLoadingManagedRestaurant ? (
							<Skeleton className="size-6 rounded-full" />
						) : (
							<span className="bg-red-300 rounded-full size-6 p-0.5">
								{managedRestaurant?.name.at(0)}
							</span>
						)}
						<ChevronDown />
					</Button>
				</DrawerTrigger>
				<StoreProfileDrawer />
			</Drawer>

			<Dialog>
				<DropdownMenu>
					<DropdownMenuTrigger className="hidden md:flex" asChild>
						<Button
							variant="outline"
							className="select-none items-center gap-2"
						>
							{isLoadingManagedRestaurant ? (
								<Skeleton className="h-4 w-40" />
							) : (
								managedRestaurant?.name
							)}
							<ChevronDown />
						</Button>
					</DropdownMenuTrigger>

					<DropdownMenuContent align="end" className="w-56">
						<DropdownMenuLabel className="flex flex-col">
							{isLoadingProfile ? (
								<div className="space-y-1.5">
									<Skeleton className="w-36 h-3" />
									<Skeleton className="w-28 h-2.5" />
								</div>
							) : (
								<Fragment>
									<span>{profile?.name}</span>
									<span className="text-xs font-normal text-muted-foreground">
										{profile?.email}
									</span>
								</Fragment>
							)}
						</DropdownMenuLabel>

						<DropdownMenuSeparator />
						<DialogTrigger asChild>
							<DropdownMenuItem>
								<Building className="mr-2 size-4" />
								<span>Perfil da loja</span>
							</DropdownMenuItem>
						</DialogTrigger>

						<DropdownMenuItem
							asChild
							disabled={isSigningOut}
							className="text-rose-500 dark:text-rose-400"
						>
							<button className="w-full" onClick={() => signOutFn()}>
								{isSigningOut ? (
									<Loader2 className="mr-2 size-4 animate-spin" />
								) : (
									<LogOut className="mr-2 size-4" />
								)}

								<span>Sair</span>
							</button>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
				<StoreProfileDialog />
			</Dialog>
		</Fragment>
	)
}
