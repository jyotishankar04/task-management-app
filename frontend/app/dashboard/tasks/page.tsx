"use client"

import { useState } from "react"
import { ArrowUpDown, CheckCircle, ChevronDown, Clock, Filter, Plus, Search, Trash2, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { Textarea } from "@/components/ui/textarea"
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
import TaskCreateDialog from "@/components/app/tasks/task-create-dialog"
import { TASKS_TABLE_DATA } from "@/utils/constants.utils"
import TaskCard from "@/components/app/tasks/task-card"

export default function TasksPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false)
  const [taskToChangeStatus, setTaskToChangeStatus] = useState<any | null>(null)





  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Tasks</h1>
          <p className="text-gray-400">Manage and organize your tasks</p>
        </div>

        <TaskCreateDialog />
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-[#161616] border-gray-800"
          />
        </div>

        <div className="flex gap-2">
          {/* Status Filter */}
          {/* Priority Filter */}
          {/* Sort By */}
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {TASKS_TABLE_DATA.length > 0 ? (
          TASKS_TABLE_DATA.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#161616] mb-4">
              <Search className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium">No tasks found</h3>
            <p className="text-gray-400 mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}

