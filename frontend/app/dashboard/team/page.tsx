"use client"

import { useState } from "react"
import { Mail, MoreHorizontal, Plus, Search, Shield, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function TeamPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false)
  const [memberToRemove, setMemberToRemove] = useState<any | null>(null)
  const [isChangeRoleDialogOpen, setIsChangeRoleDialogOpen] = useState(false)
  const [memberToChangeRole, setMemberToChangeRole] = useState<any | null>(null)
  const [selectedRole, setSelectedRole] = useState<string>("")

  // Filter team members based on search query
  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleRemoveMember = (member: any) => {
    setMemberToRemove(member)
    setIsRemoveDialogOpen(true)
  }

  const confirmRemoveMember = () => {
    // In a real app, you would remove the member from the database
    console.log(`Removing member: ${memberToRemove?.name}`)
    setIsRemoveDialogOpen(false)
    setMemberToRemove(null)
  }

  const handleChangeRole = (member: any) => {
    setMemberToChangeRole(member)
    setSelectedRole(member.role)
    setIsChangeRoleDialogOpen(true)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Team Management</h1>
          <p className="text-gray-400">Manage your team members and their roles</p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-[#3C82F6] to-[#8BAEF4] hover:opacity-90 transition-opacity">
              <Plus className="mr-2 h-4 w-4" />
              Invite Member
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-[#161616] border-gray-800">
            <DialogHeader>
              <DialogTitle>Invite Team Member</DialogTitle>
              <DialogDescription className="text-gray-400">Send an invitation to join your team.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="colleague@example.com"
                  className="bg-[#0F0F0F] border-gray-800"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Select>
                  <SelectTrigger className="bg-[#0F0F0F] border-gray-800">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#161616] border-gray-800">
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="member">Member</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Personal message (optional)</Label>
                <Input
                  id="message"
                  placeholder="I'd like to invite you to our team..."
                  className="bg-[#0F0F0F] border-gray-800"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" className="border-gray-800">
                Cancel
              </Button>
              <Button className="bg-gradient-to-r from-[#3C82F6] to-[#8BAEF4]">Send Invitation</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search team members..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 bg-[#161616] border-gray-800"
        />
      </div>

      {/* Team Members List */}
      <div className="bg-[#161616] rounded-xl border border-gray-800 overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-800 text-sm font-medium text-gray-400">
          <div className="col-span-5 sm:col-span-4">Member</div>
          <div className="hidden sm:block sm:col-span-4">Email</div>
          <div className="col-span-5 sm:col-span-2">Role</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        <div className="divide-y divide-gray-800">
          {filteredMembers.map((member) => (
            <div key={member.id} className="grid grid-cols-12 gap-4 p-4 items-center">
              <div className="col-span-5 sm:col-span-4 flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                  <AvatarFallback className={getRoleColor(member.role)}>
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{member.name}</p>
                  <p className="text-xs text-gray-400 sm:hidden">{member.email}</p>
                </div>
              </div>

              <div className="hidden sm:block sm:col-span-4 text-gray-300">{member.email}</div>

              <div className="col-span-5 sm:col-span-2">
                <div className="flex items-center gap-1.5">
                  {getRoleIcon(member.role)}
                  <span className={getRoleTextColor(member.role)}>{member.role}</span>
                </div>
              </div>

              <div className="col-span-2 text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[180px] bg-[#161616] border-gray-800">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Mail className="mr-2 h-4 w-4" />
                      <span>Send Message</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>View Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleChangeRole(member)}>
                      <Shield className="mr-2 h-4 w-4" />
                      <span>Change Role</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-500" onClick={() => handleRemoveMember(member)}>
                      <span>Remove Member</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pending Invitations */}
      <div>
        <h2 className="text-lg font-medium mb-4">Pending Invitations</h2>

        <div className="bg-[#161616] rounded-xl border border-gray-800 overflow-hidden">
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-800 text-sm font-medium text-gray-400">
            <div className="col-span-5 sm:col-span-4">Email</div>
            <div className="hidden sm:block sm:col-span-4">Invited By</div>
            <div className="col-span-5 sm:col-span-2">Role</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          <div className="divide-y divide-gray-800">
            {pendingInvitations.map((invitation) => (
              <div key={invitation.id} className="grid grid-cols-12 gap-4 p-4 items-center">
                <div className="col-span-5 sm:col-span-4 text-gray-300">{invitation.email}</div>

                <div className="hidden sm:block sm:col-span-4 text-gray-300">{invitation.invitedBy}</div>

                <div className="col-span-5 sm:col-span-2">
                  <div className="flex items-center gap-1.5">
                    {getRoleIcon(invitation.role)}
                    <span className={getRoleTextColor(invitation.role)}>{invitation.role}</span>
                  </div>
                </div>

                <div className="col-span-2 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[180px] bg-[#161616] border-gray-800">
                      <DropdownMenuItem>
                        <Mail className="mr-2 h-4 w-4" />
                        <span>Resend Invite</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-500">
                        <span>Cancel Invitation</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Remove Member Dialog */}
      <AlertDialog open={isRemoveDialogOpen} onOpenChange={setIsRemoveDialogOpen}>
        <AlertDialogContent className="bg-[#161616] border-gray-800">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to remove this member?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              This will remove {memberToRemove?.name} from your team. They will no longer have access to your
              organization's projects and tasks.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-800 bg-transparent text-white hover:bg-[#0F0F0F]">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmRemoveMember} className="bg-red-600 hover:bg-red-700 focus:ring-red-600">
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Change Role Dialog */}
      <Dialog open={isChangeRoleDialogOpen} onOpenChange={setIsChangeRoleDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-[#161616] border-gray-800">
          <DialogHeader>
            <DialogTitle>Change Member Role</DialogTitle>
            <DialogDescription className="text-gray-400">
              Update the role for {memberToChangeRole?.name}
            </DialogDescription>
          </DialogHeader>
          {memberToChangeRole && (
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={memberToChangeRole.avatar || "/placeholder.svg"} alt={memberToChangeRole.name} />
                  <AvatarFallback className={getRoleColor(memberToChangeRole.role)}>
                    {memberToChangeRole.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{memberToChangeRole.name}</p>
                  <p className="text-sm text-gray-400">{memberToChangeRole.email}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className="bg-[#0F0F0F] border-gray-800">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#161616] border-gray-800">
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="Member">Member</SelectItem>
                    <SelectItem value="Viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role-description">Role Description</Label>
                <div className="p-3 rounded-md bg-[#0F0F0F] text-sm text-gray-400">
                  {selectedRole === "Admin" && (
                    <p>Admins have full access to all settings and can manage team members and billing.</p>
                  )}
                  {selectedRole === "Manager" && (
                    <p>Managers can create and manage projects, assign tasks, and view analytics.</p>
                  )}
                  {selectedRole === "Member" && <p>Members can create and complete tasks assigned to them.</p>}
                  {selectedRole === "Viewer" && (
                    <p>Viewers can only view tasks and projects but cannot make changes.</p>
                  )}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" className="border-gray-800" onClick={() => setIsChangeRoleDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-gradient-to-r from-[#3C82F6] to-[#8BAEF4]"
              onClick={() => {
                // In a real app, you would update the member's role in the database
                console.log(`Changing role for ${memberToChangeRole?.name} to ${selectedRole}`)
                setIsChangeRoleDialogOpen(false)
              }}
            >
              Update Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

const teamMembers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    avatar: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "Manager",
    avatar: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Michael Chen",
    email: "michael@example.com",
    role: "Member",
    avatar: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    email: "emily@example.com",
    role: "Member",
    avatar: "/placeholder.svg",
  },
  {
    id: 5,
    name: "David Kim",
    email: "david@example.com",
    role: "Viewer",
    avatar: "/placeholder.svg",
  },
]

const pendingInvitations = [
  {
    id: 1,
    email: "alex@example.com",
    invitedBy: "John Doe",
    role: "Member",
    date: "2023-05-10",
  },
  {
    id: 2,
    email: "lisa@example.com",
    invitedBy: "Sarah Johnson",
    role: "Manager",
    date: "2023-05-11",
  },
]

function getRoleIcon(role: string) {
  switch (role) {
    case "Admin":
      return <Shield className="h-4 w-4 text-red-400" />
    case "Manager":
      return <Shield className="h-4 w-4 text-yellow-400" />
    case "Member":
      return <User className="h-4 w-4 text-blue-400" />
    case "Viewer":
      return <User className="h-4 w-4 text-gray-400" />
    default:
      return <User className="h-4 w-4 text-gray-400" />
  }
}

function getRoleTextColor(role: string) {
  switch (role) {
    case "Admin":
      return "text-red-400"
    case "Manager":
      return "text-yellow-400"
    case "Member":
      return "text-blue-400"
    case "Viewer":
      return "text-gray-400"
    default:
      return "text-gray-400"
  }
}

function getRoleColor(role: string) {
  switch (role) {
    case "Admin":
      return "bg-gradient-to-r from-red-500 to-red-400"
    case "Manager":
      return "bg-gradient-to-r from-yellow-500 to-yellow-400"
    case "Member":
      return "bg-gradient-to-r from-[#3C82F6] to-[#8BAEF4]"
    case "Viewer":
      return "bg-gradient-to-r from-gray-600 to-gray-500"
    default:
      return "bg-gradient-to-r from-gray-600 to-gray-500"
  }
}
