import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"

type NavLink = {
	title: string
	href: string
	Icon: LucideIcon
}

export const NavLinks = ({ navLinks }: { navLinks: NavLink[] }) => {
	const navigate = useNavigate()
	const [active, setActive] = useState<NavLink>(navLinks[0])

	const [, setNavLinks] = useState<NavLink[]>(navLinks)

	const handleNavigateToLink = (index: number, href: string) => {
		const newNavLinks = [...navLinks]
		const selectedNavLink = newNavLinks.splice(index, 1)
		newNavLinks.unshift(selectedNavLink[0])
		setNavLinks(newNavLinks)
		setActive(newNavLinks[0])

		navigate(href)
	}

	return (
		<div className="relative flex w-full max-w-full flex-wrap items-center justify-center gap-1	">
			{navLinks.map((navLink, index) => (
				<button
					key={navLink.title}
					onClick={() => {
						handleNavigateToLink(index, navLink.href)
					}}
					className={cn(
						"group relative flex items-center gap-2 rounded-sm px-4 py-1.5 transition-colors hover:text-foreground/80 focus-visible:outline-none focus-visible:ring focus-visible:ring-primary/50 hover:dark:text-foreground/70",
						active.href === navLink.href &&
							"text-primary-foreground hover:text-primary-foreground dark:text-foreground"
					)}
					style={{
						transformStyle: "preserve-3d"
					}}
				>
					{active.href === navLink.href && (
						<motion.div
							layoutId="clickedbutton"
							transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
							className="absolute inset-0 rounded-sm bg-primary transition-colors group-hover:bg-primary/90 dark:bg-foreground/5 group-hover:dark:bg-foreground/10"
						/>
					)}

					<navLink.Icon className="relative size-4" />

					<span className="relative block">{navLink.title}</span>
				</button>
			))}
		</div>
	)
}
