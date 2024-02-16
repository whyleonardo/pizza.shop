import { ModeToggle } from "@/components/mode-toggle"
import { NavLinks } from "@/components/nav-links"
import { Separator } from "@/components/ui/separator"

import { navLinks } from "@/config/nav-links-tabs"
import { Pizza } from "lucide-react"

export const Header = () => {
	return (
		<header className="flex h-16 items-center gap-6 border-b px-6 shadow-md">
			<Pizza className="size-6 transition hover:scale-105" />

			<Separator className="h-6" orientation="vertical" />

			<nav className="flex  items-center space-x-4 lg:space-x-6">
				<NavLinks navLinks={navLinks} />
			</nav>
			<ModeToggle />
		</header>
	)
}
