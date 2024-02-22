import { Button } from "@/components/ui/button"
import {
	Pagination as PaginationRoot,
	PaginationContent
} from "@/components/ui/pagination"

import {
	ChevronsLeft,
	ChevronsRight,
	ChevronRight,
	ChevronLeft
} from "lucide-react"

interface ComponentProps {
	pageIndex: number
	totalCount: number
	perPage: number
	onPageChange: (pageIndex: number) => Promise<void> | void
}

export const Pagination = ({
	pageIndex,
	perPage,
	totalCount,
	onPageChange
}: ComponentProps) => {
	const pages = Math.ceil(totalCount / perPage)

	return (
		<PaginationRoot>
			<PaginationContent className="w-full justify-between select-none">
				<span className="text-muted-foreground text-xs">
					Total de {totalCount} item(s) em {pages} página(s)
				</span>

				<div className="flex items-center">
					<span className="text-muted-foreground text-xs">
						Página {pageIndex + 1} de {pages}
					</span>

					<Button
						variant="ghost"
						size="icon"
						disabled={pageIndex === 0}
						onClick={() => onPageChange(0)}
						className="disabled:opacity-50 disabled:cursor-not-allowed"
					>
						<ChevronsLeft className="size-4" />
					</Button>

					<Button
						variant="ghost"
						size="icon"
						disabled={pageIndex === 0}
						onClick={() => onPageChange(pageIndex - 1)}
						className="disabled:opacity-50 disabled:cursor-not-allowed"
					>
						<ChevronLeft className="size-4" />
					</Button>

					<Button
						variant="ghost"
						size="icon"
						disabled={pageIndex + 1 >= pages}
						onClick={() => onPageChange(pageIndex + 1)}
						className="disabled:opacity-50 disabled:cursor-not-allowed"
					>
						<ChevronRight className="size-4" />
					</Button>

					<Button
						variant="ghost"
						size="icon"
						disabled={pageIndex + 1 >= pages}
						onClick={() => onPageChange(pages - 1)}
						className="disabled:opacity-50 disabled:cursor-not-allowed"
					>
						<ChevronsRight className="size-4" />
					</Button>
				</div>
			</PaginationContent>
		</PaginationRoot>
	)
}
