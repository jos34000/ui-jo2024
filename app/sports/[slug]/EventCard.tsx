import { OlympicEvent } from "@/lib/types/event.type"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EventCardProps {
  event: OlympicEvent
}

const statusConfig = {
  available: { label: "Disponible", dot: "bg-[#00A651]" },
  limited: { label: "Dernieres places", dot: "bg-[#FCB131]" },
  soldout: { label: "Complet", dot: "bg-[#EE334E]" },
}

export const EventCard = ({ event }: EventCardProps) => {
  const status = statusConfig[event.status]

  return (
    <Card className="group hover:border-primary/30 transition-all border-border/50">
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-start gap-4">
          {/* Time column */}
          <div className="shrink-0 w-14 text-center pt-0.5">
            <span className="text-lg font-bold font-mono text-foreground leading-none">
              {event.time}
            </span>
          </div>

          {/* Divider */}
          <div className="shrink-0 flex flex-col items-center gap-1 pt-1.5">
            <div className={`h-2.5 w-2.5 rounded-full ${status.dot}`} />
            <div className="w-px flex-1 bg-border min-h-[40px]" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-medium text-primary mb-0.5">
                  {event.sport}
                </p>
                <h3 className="text-sm sm:text-base font-semibold leading-tight group-hover:text-primary transition-colors">
                  {event.title}
                </h3>
              </div>
              <Badge
                variant="outline"
                className={`shrink-0 text-[10px] whitespace-nowrap ${
                  event.status === "available"
                    ? "border-[#00A651]/30 text-[#00A651]"
                    : event.status === "limited"
                      ? "border-[#FCB131]/30 text-[#FCB131]"
                      : "border-[#EE334E]/30 text-[#EE334E]"
                }`}
              >
                {status.label}
              </Badge>
            </div>

            <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {event.location}
              </span>
            </div>

            <div className="mt-3 flex justify-end">
              <Button
                size="sm"
                disabled={event.status === "soldout"}
                variant={event.status === "soldout" ? "outline" : "default"}
                className="text-xs h-8"
              >
                {event.status === "soldout" ? "Complet" : "Reserver"}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
