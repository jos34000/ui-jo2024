import { TableCell, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { AdminUser } from "@/lib/types/user.types"
import { formatDateClassic } from "@/lib/utils/date"

interface UserRowProps {
  user: AdminUser
}

export const UserRow = ({ user }: UserRowProps) => {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold shrink-0">
            {user.firstName?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="font-medium truncate">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-sm text-muted-foreground truncate">
              {user.email}
            </p>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Badge
          variant={user.role === "ROLE_ADMIN" ? "default" : "secondary"}
          className={user.role === "ROLE_ADMIN" ? "bg-primary" : ""}
        >
          {user.role === "ROLE_ADMIN" ? "Admin" : "Utilisateur"}
        </Badge>
      </TableCell>
      <TableCell>
        <Badge
          variant="outline"
          className={
            user.mfaEnabled
              ? "border-[#00A651]/30 text-[#00A651]"
              : "border-muted-foreground/30 text-muted-foreground"
          }
        >
          {user.mfaEnabled ? "2FA actif" : "2FA inactif"}
        </Badge>
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDateClassic(user.createdAt)}
      </TableCell>
    </TableRow>
  )
}
