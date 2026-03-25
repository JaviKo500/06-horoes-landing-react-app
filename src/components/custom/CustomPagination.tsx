import { ChevronLeft, MoreHorizontal, ChevronRight } from "lucide-react"
import { Button } from "../ui/button"

interface Props {
  totalPages: number;
}

export const CustomPagination = ( { totalPages }: Props ) => {
  const page = 1;
  return (
    <div className="flex items-center justify-center space-x-2 mb-4">
      <Button variant="outline" size="sm" disabled = {
        page === 1
      }>
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>

      {
        Array.from({ length: totalPages }).map( (_, index ) => (
          <Button key={index} variant={ page === index ? 'default' : 'outline' } size="sm">
            {index + 1}
          </Button>
        ))
      }
      <Button variant="ghost" size="sm" disabled>
        <MoreHorizontal className="h-4 w-4" />
      </Button>

      <Button variant="outline" size="sm" disabled = {
        page === totalPages
      }>
        Next
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
