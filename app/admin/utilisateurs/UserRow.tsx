import { AdminUser } from "@/lib/stores/admin-users.store"
import { TableCell, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface UserRowProps {
  user: AdminUser
}

export const UserRow = ({ user }: UserRowProps) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

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
          variant={user.role === "admin" ? "default" : "secondary"}
          className={user.role === "admin" ? "bg-primary" : ""}
        >
          {user.role === "admin" ? "Admin" : "Utilisateur"}
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
        {formatDate(user.createdAt)}
      </TableCell>
    </TableRow>
  )
}
