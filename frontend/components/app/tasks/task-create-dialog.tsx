import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"

const TaskCreateDialog = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-[#3C82F6] to-[#8BAEF4] hover:opacity-90 transition-opacity">
                    <Plus className="mr-2 h-4 w-4" />
                    New Task
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-[#161616] border-gray-800">
                <DialogHeader>
                    <DialogTitle>Create New Task</DialogTitle>
                    <DialogDescription className="text-gray-400">
                        Add a new task to your list. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" placeholder="Task title" className="bg-[#0F0F0F] border-gray-800" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" placeholder="Task description" className="bg-[#0F0F0F] border-gray-800" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="priority">Priority</Label>
                            <Select>
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
                            <Label htmlFor="status">Status</Label>
                            <Select>
                                <SelectTrigger className="bg-[#0F0F0F] border-gray-800">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#161616] border-gray-800">
                                    <SelectItem value="todo">To Do</SelectItem>
                                    <SelectItem value="inprogress">In Progress</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="dueDate">Due Date</Label>
                        <Input id="dueDate" type="date" className="bg-[#0F0F0F] border-gray-800" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="assignee">Assignee</Label>
                        <Select>
                            <SelectTrigger className="bg-[#0F0F0F] border-gray-800">
                                <SelectValue placeholder="Select team member" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#161616] border-gray-800">
                                <SelectItem value="john">John Doe</SelectItem>
                                <SelectItem value="sarah">Sarah Johnson</SelectItem>
                                <SelectItem value="michael">Michael Chen</SelectItem>
                                <SelectItem value="emily">Emily Rodriguez</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" className="border-gray-800">
                        Cancel
                    </Button>
                    <Button className="bg-gradient-to-r from-[#3C82F6] to-[#8BAEF4]">Save Task</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default TaskCreateDialog