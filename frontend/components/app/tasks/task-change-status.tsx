import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

const TaskChangeStatus = () => {
    const [taskToChangeStatus, setTaskToChangeStatus] = React.useState({
        status: "To Do",
        comment: "",
    })
    return (
        < Dialog  >
            <DialogContent className="sm:max-w-[425px] bg-[#161616] border-gray-800">
                <DialogHeader>
                    <DialogTitle>Change Task Status</DialogTitle>
                    <DialogDescription className="text-gray-400">
                        Update the status of "title"
                    </DialogDescription>
                </DialogHeader>
                {taskToChangeStatus && (
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="change-status">Status</Label>
                            <Select
                                value={taskToChangeStatus.status}
                                onValueChange={(value) => setTaskToChangeStatus({ ...taskToChangeStatus, status: value })}
                            >
                                <SelectTrigger className="bg-[#0F0F0F] border-gray-800">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#161616] border-gray-800">
                                    <SelectItem value="To Do">To Do</SelectItem>
                                    <SelectItem value="In Progress">In Progress</SelectItem>
                                    <SelectItem value="Completed">Completed</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="status-comment">Comment (optional)</Label>
                            <Textarea
                                id="status-comment"
                                placeholder="Add a comment about this status change"
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
                            // In a real app, you would update the task status in the database
                            console.log("Changing status for task:", taskToChangeStatus)
                        }}
                    >
                        Update Status
                    </Button>
                </DialogFooter>
            </DialogContent>
        </ Dialog>
    )
}

export default TaskChangeStatus