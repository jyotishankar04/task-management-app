import { AlertDialogHeader } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

const TaskEditDialog = () => {
    const [taskToEdit, setTaskToEdit] = React.useState({
        title: "",
        description: "",
        priority: "medium",
        status: "To Do",
        dueDate: "",
    })
    return (
        <Dialog >
            <DialogContent className="sm:max-w-[425px] bg-[#161616] border-gray-800">
                <DialogHeader>
                    <DialogTitle>Edit Task</DialogTitle>
                    <DialogDescription className="text-gray-400">
                        Make changes to your task here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                {taskToEdit && (
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="edit-title">Title</Label>
                            <Input
                                id="edit-title"
                                value={taskToEdit.title}
                                onChange={(e) => setTaskToEdit({ ...taskToEdit, title: e.target.value })}
                                className="bg-[#0F0F0F] border-gray-800"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-description">Description</Label>
                            <Textarea
                                id="edit-description"
                                placeholder="Task description"
                                value={taskToEdit.description || ""}
                                onChange={(e) => setTaskToEdit({ ...taskToEdit, description: e.target.value })}
                                className="bg-[#0F0F0F] border-gray-800"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="edit-priority">Priority</Label>
                                <Select
                                    value={taskToEdit.priority}
                                    onValueChange={(value) => setTaskToEdit({ ...taskToEdit, priority: value })}
                                >
                                    <SelectTrigger className="bg-[#0F0F0F] border-gray-800">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#161616] border-gray-800">
                                        <SelectItem value="high">High</SelectItem>
                                        <SelectItem value="medium">Medium</SelectItem>
                                        <SelectItem value="low">Low</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-status">Status</Label>
                                <Select
                                    value={taskToEdit.status}
                                    onValueChange={(value) => setTaskToEdit({ ...taskToEdit, status: value })}
                                >
                                    <SelectTrigger className="bg-[#0F0F0F] border-gray-800">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#161616] border-gray-800">
                                        <SelectItem value="To Do">To Do</SelectItem>
                                        <SelectItem value="In Progress">In Progress</SelectItem>
                                        <SelectItem value="Completed">Completed</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-dueDate">Due Date</Label>
                            <Input
                                id="edit-dueDate"
                                type="text"
                                value={taskToEdit.dueDate}
                                onChange={(e) => setTaskToEdit({ ...taskToEdit, dueDate: e.target.value })}
                                className="bg-[#0F0F0F] border-gray-800"
                            />
                        </div>
                    </div>
                )}
                <DialogFooter>
                    <Button variant="outline" className="border-gray-800">
                        Cancel
                    </Button>
                    <Button
                        className="bg-gradient-to-r from-[#3C82F6] to-[#8BAEF4]"
                        onClick={() => {
                            // In a real app, you would update the task in the database
                            console.log("Saving edited task:", taskToEdit)
                        }}
                    >
                        Save Changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default TaskEditDialog