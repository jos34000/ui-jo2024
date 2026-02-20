import { useFormContext } from "@/lib/hooks/useAppForm"
import { Loader2 } from "lucide-react"
import { ComponentProps } from "react"
import { Button } from "@/components/ui/button"

export const ButtonField = (props: ComponentProps<typeof Button>) => {
  const form = useFormContext()
  return (
    <form.Subscribe selector={state => state.isSubmitting}>
      {isSubmitting => (
        <Button disabled={isSubmitting} {...props}>
          {isSubmitting ? <Loader2 className="animate-spin" /> : props.children}
        </Button>
      )}
    </form.Subscribe>
  )
}
