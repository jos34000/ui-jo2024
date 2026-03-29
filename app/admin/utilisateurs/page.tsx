"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Search, Shield, User, UserCheck, Users } from "lucide-react"
import { useAdminUsersStore } from "@/lib/stores/admin-users.store"
import { useEffect, useMemo, useState } from "react"
import { UserRow } from "@/app/admin/utilisateurs/UserRow"
import { StatCard } from "@/app/admin/StatCard"

const AdminUsersPage = () => {
  const users = useAdminUsersStore(state => state.users)
  const isLoading = useAdminUsersStore(state => state.isLoading)
  const fetchUsers = useAdminUsersStore(state => state.fetchUsers)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetchUsers().then()
  }, [fetchUsers])

  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return users
    const query = searchQuery.toLowerCase()
    return users.filter(
      user =>
        user.email.toLowerCase().includes(query) ||
        user.firstName.toLowerCase().includes(query) ||
        user.lastName.toLowerCase().includes(query),
    )
  }, [users, searchQuery])

  const totalCount = users.length
  const adminCount = users.filter(u => u.role === "admin").length
  const verifiedCount = users.filter(u => u.isVerified).length

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold font-mono">Utilisateurs</h1>
          <p className="text-muted-foreground mt-1">
            {totalCount} utilisateur{totalCount > 1 ? "s" : ""} enregistre
            {totalCount > 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard
          label="Total utilisateurs"
          value={totalCount}
          icon={<Users className="h-5 w-5 text-primary" />}
          iconWrapperClassName="bg-primary/10"
        />
        <StatCard
          label="Administrateurs"
          value={adminCount}
          icon={<Shield className="h-5 w-5 text-primary" />}
          iconWrapperClassName="bg-primary/10"
        />
        <StatCard
          label="Comptes verifies"
          value={verifiedCount}
          icon={<UserCheck className="h-5 w-5 text-[#00A651]" />}
          iconWrapperClassName="bg-[#00A651]/10"
          valueClassName="text-[#00A651]"
        />
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher par nom ou email..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="py-12 text-center">
              <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-muted-foreground">
                Chargement des utilisateurs...
              </p>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="py-12 text-center">
              <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {searchQuery ? "Aucun resultat" : "Aucun utilisateur"}
              </h3>
              <p className="text-muted-foreground">
                {searchQuery
                  ? "Aucun utilisateur ne correspond a votre recherche"
                  : "Les utilisateurs apparaitront ici une fois connectes a l'API"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Utilisateur</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Inscription</TableHead>
                    <TableHead>Derniere connexion</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map(user => (
                    <UserRow key={user.id} user={user} />
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminUsersPage
