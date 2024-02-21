import { Fragment } from "react"

import { Button } from "@/components/ui/button"
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
import { useQuery } from "@tanstack/react-query"
import { Building, ChevronDown, LogOut } from "lucide-react"

export const AccountMenu = () => {
	const { data: profile, isLoading: isLoadingProfile } = useQuery({
		queryFn: getProfile,
		queryKey: ["profile"]
	})

	const { data: managedRestaurant, isLoading: isLoadingManagedRestaurant } =
		useQuery({
			queryFn: getManagedRestaurant,
			queryKey: ["managed-restaurant"]
		})

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					className="flex select-none items-center gap-2"
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

				<DropdownMenuItem>
					<Building className="mr-2 size-4" />
					<span>Perfil da loja</span>
				</DropdownMenuItem>

				<DropdownMenuItem className="text-rose-500 dark:text-rose-400">
					<LogOut className="mr-2 size-4" />
					<span>Sair</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
