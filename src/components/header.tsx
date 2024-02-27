import { Fragment } from "react"

import { AccountMenu } from "@/components/account-menu"
import { Logo } from "@/components/logo"
import { ModeToggle } from "@/components/mode-toggle"
import { NavLinks } from "@/components/nav-links"
import { Separator } from "@/components/ui/separator"

import { navLinks } from "@/config/nav-links-tabs"

export const Header = () => {
	return (
		<header className="flex h-16 items-center gap-4 md:gap-6 border-b px-4 md:px-6 shadow-md">
			<Fragment>
				<Logo />
				<Separator className="h-6" orientation="vertical" />

				<nav className="flex items-center space-x-2 lg:space-x-6">
					<NavLinks navLinks={navLinks} />
				</nav>
			</Fragment>

			<div className="ml-auto flex items-center gap-2">
				<ModeToggle />
				<AccountMenu />
			</div>
		</header>
	)
}
