import Link from "next/link"
import { ArrowRight, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import DashStatsCard from "@/components/app/dashboard/stats-card"
import { DASHBOARD_STATS_CARD_DATA } from "@/utils/constants.utils"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-gray-400">Welcome back, John! Here's an overview of your tasks.</p>
        </div>
        <Button className="bg-gradient-to-r from-[#3C82F6] to-[#8BAEF4] hover:opacity-90 transition-opacity">
          <Plus className="mr-2 h-4 w-4" />
          New Task
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 text-white md:grid-cols-2 lg:grid-cols-4">
        {DASHBOARD_STATS_CARD_DATA.map((card) => (
          <DashStatsCard key={card.title} {...card} />
        ))}
      </div>

      {/* Project Progress */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-[#161616] border-gray-800">
          <CardHeader className="text-white">
            <CardTitle>Project Progress</CardTitle>
            <CardDescription className="text-gray-400">Track your ongoing projects</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-gray-200">{project.name}</div>
                  <div className="text-sm text-gray-400">{project.progress}%</div>
                </div>
                <Progress value={project.progress} className="h-2 bg-gray-800" />
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Link href="/dashboard/projects" className="text-[#3C82F6] text-sm hover:underline">
              View all projects
            </Link>
          </CardFooter>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-[#161616] text-white border-gray-800">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription className="text-gray-400">Latest updates from your team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div key={index} className="flex items-start gap-4">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={activity.userAvatar || "/placeholder.svg"} alt={activity.userName} />
                    <AvatarFallback className="bg-gradient-to-r from-[#3C82F6] to-[#8BAEF4]">
                      {activity.userName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">{activity.userName}</span>{" "}
                      <span className="text-gray-400">{activity.action}</span>
                    </p>
                    <p className="text-xs text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/dashboard/activity" className="text-[#3C82F6] text-sm hover:underline">
              View all activity
            </Link>
          </CardFooter>
        </Card>
      </div>

      {/* Recent Tasks */}
      <Card className="bg-[#161616] text-white border-gray-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Tasks</CardTitle>
            <CardDescription className="text-gray-400">Your most recent tasks</CardDescription>
          </div>
          <Link href="/dashboard/tasks">
            <Button variant="outline" size="sm" className="text-gray-700 ">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-4 rounded-xl bg-[#0F0F0F]">
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-10 rounded-full ${getPriorityColor(task.priority)}`}></div>
                  <div>
                    <h3 className="font-medium">{task.title}</h3>
                    <p className="text-sm text-gray-400">Due {task.dueDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
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
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const projects = [
  { id: 1, name: "Website Redesign", progress: 75 },
  { id: 2, name: "Mobile App Development", progress: 45 },
  { id: 3, name: "Marketing Campaign", progress: 90 },
  { id: 4, name: "Product Launch", progress: 30 },
]

const activities = [
  {
    userName: "Sarah Johnson",
    userAvatar: "https://i.pravatar.cc/150?img=2",
    action: 'completed the task "Update homepage design"',
    time: "2 hours ago",
  },
  {
    userName: "Michael Chen",
    userAvatar: "https://i.pravatar.cc/150?img=3",
    action: 'commented on "API Integration"',
    time: "4 hours ago",
  },
  {
    userName: "Emily Rodriguez",
    userAvatar: "https://i.pravatar.cc/150?img=4",
    action: 'created a new task "Prepare Q2 report"',
    time: "Yesterday at 3:45 PM",
  },
  {
    userName: "David Kim",
    userAvatar: "https://i.pravatar.cc/150?img=5",
    action: "joined the team",
    time: "Yesterday at 10:30 AM",
  },
]

const tasks = [
  {
    id: 1,
    title: "Finalize design system",
    dueDate: "Today",
    status: "In Progress",
    priority: "high",
    assignee: {
      name: "John Doe",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
  },
  {
    id: 2,
    title: "User testing for new features",
    dueDate: "Tomorrow",
    status: "To Do",
    priority: "medium",
    assignee: {
      name: "Sarah Johnson",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
  },
  {
    id: 3,
    title: "API integration with payment gateway",
    dueDate: "May 15",
    status: "In Progress",
    priority: "high",
    assignee: {
      name: "Michael Chen",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
  },
  {
    id: 4,
    title: "Create onboarding documentation",
    dueDate: "May 18",
    status: "Completed",
    priority: "low",
    assignee: {
      name: "Emily Rodriguez",
      avatar: "https://i.pravatar.cc/150?img=4",
    },
  },
]

function getPriorityColor(priority: string) {
  switch (priority) {
    case "high":
      return "bg-red-500"
    case "medium":
      return "bg-yellow-500"
    case "low":
      return "bg-green-500"
    default:
      return "bg-blue-500"
  }
}

function getStatusBadgeColor(status: string) {
  switch (status) {
    case "To Do":
      return "bg-gray-800 text-gray-300"
    case "In Progress":
      return "bg-blue-900/30 text-blue-400"
    case "Completed":
      return "bg-green-900/30 text-green-400"
    default:
      return "bg-gray-800 text-gray-300"
  }
}
