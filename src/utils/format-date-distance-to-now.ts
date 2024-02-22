import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

export const formatDateDistanceToNow = (date: string) => {
	return formatDistanceToNow(new Date(date), {
		locale: ptBR,
		addSuffix: true
	})
}
