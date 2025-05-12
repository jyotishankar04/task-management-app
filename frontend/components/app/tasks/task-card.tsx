import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { TTaskTableData } from '@/types'
import { getPriorityColor, getStatusBadgeColor } from '@/utils'
import { ChevronDown, Trash2 } from 'lucide-react'
import React from 'react'

const TaskCard: React.FC<{
    task: TTaskTableData
}> = (
    { task }
) => {
        return (
            <div
                key={task.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-[#161616] border border-gray-800 hover:border-gray-700 transition-colors"
            >
                <div className="flex items-center gap-4 mb-4 sm:mb-0">
                    <div className={`w-2 h-10 sm:h-full rounded-full ${getPriorityColor(task.priority)}`}></div>
                    <div>
                        <h3 className="font-medium">{task.title}</h3>
                        <p className="text-sm text-gray-400">Due {task.dueDate}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 ml-6 sm:ml-0">
                    <div className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeColor(task.status)}`}>
                        {task.status}
                    </div>
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={task.assignee.avatar || "/placeholder.svg"} alt={task.assignee.name} />
                        <AvatarFallback className="bg-gradient-to-r from-[#3C82F6] to-[#8BAEF4]">
                            {task.assignee.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                        </AvatarFallback>
                    </Avatar>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <ChevronDown className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 text-white bg-[#161616] border-gray-800">
                            <DropdownMenuItem onClick={() => alert("Edit Task")}>Edit Task</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => alert("Change Status")}>Change Status</DropdownMenuItem>
                            <DropdownMenuItem>Reassign</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-500" onClick={() => alert("Delete Task")}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Task
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        )
    }

export default TaskCard