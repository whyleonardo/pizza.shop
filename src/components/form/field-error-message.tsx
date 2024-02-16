import { ReactNode } from "react"

import { XCircle } from "lucide-react"

interface FieldErrorMessageProps {
	children: ReactNode
}

export const FieldErrorMessage = ({ children }: FieldErrorMessageProps) => {
	return (
		<p className="flex items-center gap-1 text-xs font-medium text-destructive">
			<XCircle className="size-4 text-destructive" />
			{children}
		</p>
	)
}
