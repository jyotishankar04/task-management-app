"use client"

import { useState } from "react"
import { Bell, Check, CheckCheck, Clock, MoreHorizontal, Search, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

export default function NotificationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [notificationToDelete, setNotificationToDelete] = useState<number | null>(null)

  // Filter notifications based on search query and active tab
  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch = notification.message.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "unread" && !notification.read) ||
      (activeTab === "read" && notification.read)
    return matchesSearch && matchesTab
  })

  const handleDeleteNotification = (id: number) => {
    setNotificationToDelete(id)
    setIsDeleteDialogOpen(true)
  }

  const confirmDeleteNotification = () => {
    // In a real app, you would delete the notification from the database
    console.log(`Deleting notification with ID: ${notificationToDelete}`)
    setIsDeleteDialogOpen(false)
    setNotificationToDelete(null)
  }

  const markAllAsRead = () => {
    // In a real app, you would update all notifications in the database
    console.log("Marking all notifications as read")
  }

  const clearAllNotifications = () => {
    // In a real app, you would delete all notifications from the database
    console.log("Clearing all notifications")
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
          <p className="text-gray-400">Stay updated with your team's activities</p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="border-gray-800" onClick={markAllAsRead}>
            <CheckCheck className="mr-2 h-4 w-4" />
            Mark All as Read
          </Button>
          <Button
            variant="outline"
            className="border-gray-800 text-red-400 hover:text-red-300"
            onClick={clearAllNotifications}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Clear All
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search notifications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-[#161616] border-gray-800"
          />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
          <TabsList className="w-full sm:w-auto grid grid-cols-3 bg-[#161616] border border-gray-800 p-1">
            <TabsTrigger value="all" className="data-[state=active]:bg-[#0F0F0F] data-[state=active]:text-white">
              All
            </TabsTrigger>
            <TabsTrigger value="unread" className="data-[state=active]:bg-[#0F0F0F] data-[state=active]:text-white">
              Unread
            </TabsTrigger>
            <TabsTrigger value="read" className="data-[state=active]:bg-[#0F0F0F] data-[state=active]:text-white">
              Read
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex items-start justify-between p-4 rounded-xl border ${
                notification.read ? "bg-[#161616] border-gray-800" : "bg-[#161616] border-[#3C82F6]/30"
              }`}
            >
              <div className="flex gap-4">
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${getNotificationIconBackground(
                    notification.type,
                  )}`}
                >
                  {getNotificationIcon(notification.type)}
                </div>
                <div>
                  <p className="font-medium">{notification.message}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-sm text-gray-400">{notification.time}</p>
                    {!notification.read && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-900/30 text-blue-400">
                        New
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!notification.read && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-400 hover:text-white"
                    title="Mark as read"
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[180px] bg-[#161616] border-gray-800">
                    {notification.read ? (
                      <DropdownMenuItem>Mark as unread</DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem>Mark as read</DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-500"
                      onClick={() => handleDeleteNotification(notification.id)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#161616] mb-4">
              <Bell className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium">No notifications found</h3>
            <p className="text-gray-400 mt-1">
              {activeTab === "all"
                ? "You don't have any notifications yet"
                : activeTab === "unread"
                  ? "You don't have any unread notifications"
                  : "You don't have any read notifications"}
            </p>
          </div>
        )}
      </div>

      {/* Delete Notification Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-[#161616] border-gray-800">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this notification?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-800 bg-transparent text-white hover:bg-[#0F0F0F]">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteNotification}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

const notifications = [
  {
    id: 1,
    type: "task",
    message: "Sarah Johnson assigned you a new task: 'Finalize Q2 report'",
    time: "Just now",
    read: false,
  },
  {
    id: 2,
    type: "comment",
    message: "Michael Chen commented on your task: 'Looking good, just a few minor changes needed'",
    time: "10 minutes ago",
    read: false,
  },
  {
    id: 3,
    type: "mention",
    message: "Emily Rodriguez mentioned you in a comment: '@johndoe can you review this by EOD?'",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 4,
    type: "status",
    message: "Task 'Update privacy policy' status changed to 'Completed'",
    time: "2 hours ago",
    read: true,
  },
  {
    id: 5,
    type: "team",
    message: "David Kim joined the Marketing team",
    time: "Yesterday at 3:45 PM",
    read: true,
  },
  {
    id: 6,
    type: "deadline",
    message: "Reminder: Task 'Prepare presentation slides' is due tomorrow",
    time: "Yesterday at 10:30 AM",
    read: true,
  },
  {
    id: 7,
    type: "system",
    message: "System maintenance scheduled for this weekend. No downtime expected.",
    time: "2 days ago",
    read: true,
  },
  {
    id: 8,
    type: "task",
    message: "You completed the task 'Review competitor analysis'",
    time: "3 days ago",
    read: true,
  },
]

function getNotificationIcon(type: string) {
  switch (type) {
    case "task":
      return <Check className="h-5 w-5 text-white" />
    case "comment":
      return <MessageSquare className="h-5 w-5 text-white" />
    case "mention":
      return <AtSign className="h-5 w-5 text-white" />
    case "status":
      return <RefreshCw className="h-5 w-5 text-white" />
    case "team":
      return <Users className="h-5 w-5 text-white" />
    case "deadline":
      return <Clock className="h-5 w-5 text-white" />
    case "system":
      return <Bell className="h-5 w-5 text-white" />
    default:
      return <Bell className="h-5 w-5 text-white" />
  }
}

function getNotificationIconBackground(type: string) {
  switch (type) {
    case "task":
      return "bg-green-600"
    case "comment":
      return "bg-blue-600"
    case "mention":
      return "bg-purple-600"
    case "status":
      return "bg-yellow-600"
    case "team":
      return "bg-indigo-600"
    case "deadline":
      return "bg-red-600"
    case "system":
      return "bg-gray-600"
    default:
      return "bg-gray-600"
  }
}

// Import these at the top of the file
import { MessageSquare, AtSign, RefreshCw, Users } from "lucide-react"
