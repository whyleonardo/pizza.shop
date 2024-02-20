import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious
} from "@/components/ui/pagination"

interface ComponentProps {
	pageIndex: number
	totalCount: number
	perPage: number
}

export const PaginationC = ({
	pageIndex,
	perPage,
	totalCount
}: ComponentProps) => {
	const pages = Math.ceil(totalCount / perPage) || 1
	return (
		<Pagination>
			<span>Total de {totalCount} item(s)</span>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious href="#" />
				</PaginationItem>
				{Array.from({ length: pages / 4 }).map((item, index) => (
					<PaginationItem key={index}>
						<PaginationLink href="#">{index + 1}</PaginationLink>
					</PaginationItem>
				))}
				<PaginationItem>
					<PaginationEllipsis />
				</PaginationItem>
				<PaginationItem>
					<PaginationNext href="#" />
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	)
}
