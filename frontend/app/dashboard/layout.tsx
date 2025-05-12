"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Bell,
  ChevronDown,
  Home,
  LogOut,
  Menu,
  MessageSquare,
  PanelLeft,
  Plus,
  Settings,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  // Ensure hydration is complete before rendering state-dependent UI
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "My Tasks", href: "/dashboard/tasks", icon: MessageSquare },
    { name: "Team", href: "/dashboard/team", icon: Users },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ]

  // Get recent notifications
  const recentNotifications = notifications.slice(0, 5)
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white">
      {/* Mobile sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden fixed top-4 left-4 z-50">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0 bg-[#161616] border-r border-gray-800">
          <MobileSidebar navigation={navigation} pathname={pathname} />
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      {isMounted && (
        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#161616] border-r border-gray-800 transition-transform duration-300 ease-in-out md:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } hidden md:block`}
        >
          <DesktopSidebar navigation={navigation} pathname={pathname} />
        </div>
      )}

      {/* Toggle sidebar button */}
      <button
        className="fixed left-64 top-4 z-50 hidden md:flex items-center justify-center h-8 w-8 rounded-full bg-[#161616] border border-gray-800 shadow-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <PanelLeft className="h-4 w-4" /> : <PanelLeft className="h-4 w-4 rotate-180" />}
        <span className="sr-only">Toggle sidebar</span>
      </button>

      {/* Main content */}
      <div className={`transition-all duration-300 ${isMounted && sidebarOpen ? "md:ml-64" : "md:ml-0"}`}>
        <header className="sticky top-0 z-40 bg-[#0F0F0F] border-b border-gray-800 px-4 md:px-6 h-16 flex items-center">
          <div className="flex-1 flex justify-end">
            <div className="flex items-center gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="icon" className="relative rounded-full border-gray-800">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-red-500 text-white border-none">
                        {unreadCount}
                      </Badge>
                    )}
                    <span className="sr-only">Notifications</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0 bg-[#161616] border-gray-800" align="end">
                  <div className="flex items-center justify-between p-4 border-b border-gray-800">
                    <h3 className="font-medium">Notifications</h3>
                    <Link href="/dashboard/notifications">
                      <Button variant="ghost" size="sm" className="h-8 text-xs">
                        View All
                      </Button>
                    </Link>
                  </div>
                  <div className="max-h-[400px] overflow-y-auto">
                    {recentNotifications.length > 0 ? (
                      <div className="divide-y divide-gray-800">
                        {recentNotifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-4 hover:bg-[#0F0F0F] transition-colors ${!notification.read ? "bg-[#0F0F0F]/50" : ""}`}
                          >
                            <div className="flex gap-3">
                              <div
                                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${getNotificationIconBackground(notification.type)}`}
                              >
                                {getNotificationIcon(notification.type)}
                              </div>
                              <div>
                                <p className="text-sm">{notification.message}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <p className="text-xs text-gray-400">{notification.time}</p>
                                  {!notification.read && (
                                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-blue-900/30 text-blue-400">
                                      New
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 text-center text-gray-400">
                        <p>No notifications yet</p>
                      </div>
                    )}
                  </div>
                  <div className="p-2 border-t border-gray-800">
                    <Button
                      variant="outline"
                      className="w-full border-gray-800 text-xs"
                      onClick={() => console.log("Mark all as read")}
                    >
                      Mark all as read
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" alt="User" />
                      <AvatarFallback className="bg-gradient-to-r from-[#3C82F6] to-[#8BAEF4]">JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-[#161616] border-gray-800" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">John Doe</p>
                      <p className="text-xs leading-none text-muted-foreground">john@example.com</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-800" />
                  <DropdownMenuItem>
                    <Link href="/dashboard/settings" className="flex w-full">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/dashboard/settings" className="flex w-full">
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-800" />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <main className="p-4 md:p-6 max-w-7xl mx-auto">{children}</main>
      </div>
    </div>
  )
}

function MobileSidebar({ navigation, pathname }: { navigation: any[]; pathname: string }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center gap-2 border-b border-gray-800 px-6">
        <div className="h-8 w-8 rounded-md bg-gradient-to-r from-[#3C82F6] to-[#8BAEF4]"></div>
        <span className="font-bold text-xl">TaskFlow</span>
      </div>

      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                pathname === item.href ? "bg-[#0F0F0F] text-white" : "text-gray-400 hover:text-white hover:bg-[#0F0F0F]"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
              {item.name === "Notifications" && (
                <Badge className="ml-auto bg-red-500 text-white border-none">
                  {notifications.filter((n) => !n.read).length}
                </Badge>
              )}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-auto border-t border-gray-800 p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start text-left font-normal">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[#3C82F6] to-[#8BAEF4] flex items-center justify-center text-white font-medium">
                  TC
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm">TechCorp</p>
                  <p className="text-xs text-gray-400 truncate">Free Plan</p>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-[#161616] border-gray-800">
            <DropdownMenuItem>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-medium">
                  TC
                </div>
                <span>TechCorp</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-white font-medium">
                  SC
                </div>
                <span>StartupCo</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-800" />
            <DropdownMenuItem>
              <Plus className="mr-2 h-4 w-4" />
              <span>Create Organization</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

function DesktopSidebar({ navigation, pathname }: { navigation: any[]; pathname: string }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center gap-2 border-b border-gray-800 px-6">
        <div className="h-8 w-8 rounded-md bg-gradient-to-r from-[#3C82F6] to-[#8BAEF4]"></div>
        <span className="font-bold text-xl">TaskFlow</span>
      </div>

      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                pathname === item.href ? "bg-[#0F0F0F] text-white" : "text-gray-400 hover:text-white hover:bg-[#0F0F0F]"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
              {item.name === "Notifications" && (
                <Badge className="ml-auto bg-red-500 text-white border-none">
                  {notifications.filter((n) => !n.read).length}
                </Badge>
              )}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-auto border-t border-gray-800 p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start text-left font-normal">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[#3C82F6] to-[#8BAEF4] flex items-center justify-center text-white font-medium">
                  TC
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm">TechCorp</p>
                  <p className="text-xs text-gray-400 truncate">Free Plan</p>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-[#161616] border-gray-800">
            <DropdownMenuItem>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-medium">
                  TC
                </div>
                <span>TechCorp</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-white font-medium">
                  SC
                </div>
                <span>StartupCo</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-800" />
            <DropdownMenuItem>
              <Plus className="mr-2 h-4 w-4" />
              <span>Create Organization</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

// Notification data
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
]

function getNotificationIcon(type: string) {
  switch (type) {
    case "task":
      return <Check className="h-4 w-4 text-white" />
    case "comment":
      return <MessageSquare className="h-4 w-4 text-white" />
    case "mention":
      return <AtSign className="h-4 w-4 text-white" />
    case "status":
      return <RefreshCw className="h-4 w-4 text-white" />
    case "team":
      return <Users className="h-4 w-4 text-white" />
    case "deadline":
      return <Clock className="h-4 w-4 text-white" />
    case "system":
      return <Bell className="h-4 w-4 text-white" />
    default:
      return <Bell className="h-4 w-4 text-white" />
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
import { Check, AtSign, RefreshCw, Clock } from "lucide-react"
