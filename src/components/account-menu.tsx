import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"

import { Building, ChevronDown, LogOut } from "lucide-react"

interface AccountMenuProps {}

export const AccountMenu = (props: AccountMenuProps) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					className="flex select-none items-center gap-2"
				>
					Pizza Shop
					<ChevronDown />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-56">
				<DropdownMenuLabel className="flex flex-col">
					<span>Christian Leonardo</span>
					<span className="text-xs font-normal text-muted-foreground">
						christian.lsb16@gmail.com
					</span>
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
