"use client"

import { useState } from "react"
import { ChevronDown, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30days")

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
          <p className="text-gray-400">Track your team's performance and productivity</p>
        </div>

        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px] bg-[#161616] border-gray-800">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent className="bg-[#161616] border-gray-800">
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">Last year</SelectItem>
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-gray-800">
                <Download className="mr-2 h-4 w-4" />
                Export
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-[#161616] border-gray-800">
              <DropdownMenuItem>Export as PDF</DropdownMenuItem>
              <DropdownMenuItem>Export as CSV</DropdownMenuItem>
              <DropdownMenuItem>Export as Excel</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-[#161616] border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
            <CardDescription className="text-gray-400">vs. previous period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-green-400">+23% from last month</p>
            <div className="mt-4 h-1 w-full bg-gray-800 rounded-full overflow-hidden">
              <div className="bg-green-500 h-full rounded-full" style={{ width: "75%" }}></div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#161616] border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <CardDescription className="text-gray-400">vs. previous period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-green-400">+5% from last month</p>
            <div className="mt-4 h-1 w-full bg-gray-800 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full rounded-full" style={{ width: "87%" }}></div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#161616] border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overdue Tasks</CardTitle>
            <CardDescription className="text-gray-400">vs. previous period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-red-400">+3 from last month</p>
            <div className="mt-4 h-1 w-full bg-gray-800 rounded-full overflow-hidden">
              <div className="bg-red-500 h-full rounded-full" style={{ width: "15%" }}></div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#161616] border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Completion Time</CardTitle>
            <CardDescription className="text-gray-400">vs. previous period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4 days</div>
            <p className="text-xs text-green-400">-0.5 days from last month</p>
            <div className="mt-4 h-1 w-full bg-gray-800 rounded-full overflow-hidden">
              <div className="bg-purple-500 h-full rounded-full" style={{ width: "65%" }}></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Task Completion Trend */}
      <Card className="bg-[#161616] border-gray-800">
        <CardHeader>
          <CardTitle>Task Completion Trend</CardTitle>
          <CardDescription className="text-gray-400">Number of tasks completed over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={taskCompletionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3C82F6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3C82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#6b7280" tick={{ fill: "#9ca3af" }} tickLine={{ stroke: "#6b7280" }} />
                <YAxis stroke="#6b7280" tick={{ fill: "#9ca3af" }} tickLine={{ stroke: "#6b7280" }} />
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    borderColor: "#374151",
                    color: "#f9fafb",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="completed"
                  stroke="#3C82F6"
                  fillOpacity={1}
                  fill="url(#colorCompleted)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Task Status Distribution & Team Performance */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-[#161616] border-gray-800">
          <CardHeader>
            <CardTitle>Task Status Distribution</CardTitle>
            <CardDescription className="text-gray-400">Current distribution of tasks by status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={taskStatusData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#6b7280" tick={{ fill: "#9ca3af" }} tickLine={{ stroke: "#6b7280" }} />
                  <YAxis stroke="#6b7280" tick={{ fill: "#9ca3af" }} tickLine={{ stroke: "#6b7280" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      borderColor: "#374151",
                      color: "#f9fafb",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="value" fill="#3C82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#161616] border-gray-800">
          <CardHeader>
            <CardTitle>Team Performance</CardTitle>
            <CardDescription className="text-gray-400">Tasks completed by team members</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={teamPerformanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#6b7280" tick={{ fill: "#9ca3af" }} tickLine={{ stroke: "#6b7280" }} />
                  <YAxis stroke="#6b7280" tick={{ fill: "#9ca3af" }} tickLine={{ stroke: "#6b7280" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      borderColor: "#374151",
                      color: "#f9fafb",
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="John" stroke="#3C82F6" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="Sarah" stroke="#10b981" />
                  <Line type="monotone" dataKey="Michael" stroke="#f59e0b" />
                  <Line type="monotone" dataKey="Emily" stroke="#ef4444" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Priority Distribution */}
      <Card className="bg-[#161616] border-gray-800">
        <CardHeader>
          <CardTitle>Task Priority Distribution</CardTitle>
          <CardDescription className="text-gray-400">Distribution of tasks by priority level</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-40 h-40">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    className="text-gray-800 stroke-current"
                    strokeWidth="10"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                  ></circle>
                  <circle
                    className="text-red-500 stroke-current"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={`${40 * 2 * Math.PI * 0.35} ${40 * 2 * Math.PI * 0.65}`}
                    strokeDashoffset="0"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                  ></circle>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold">35%</span>
                </div>
              </div>
              <h3 className="mt-4 text-lg font-medium">High Priority</h3>
              <p className="text-sm text-gray-400">28 tasks</p>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="relative w-40 h-40">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    className="text-gray-800 stroke-current"
                    strokeWidth="10"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                  ></circle>
                  <circle
                    className="text-yellow-500 stroke-current"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={`${40 * 2 * Math.PI * 0.45} ${40 * 2 * Math.PI * 0.55}`}
                    strokeDashoffset="0"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                  ></circle>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold">45%</span>
                </div>
              </div>
              <h3 className="mt-4 text-lg font-medium">Medium Priority</h3>
              <p className="text-sm text-gray-400">36 tasks</p>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="relative w-40 h-40">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    className="text-gray-800 stroke-current"
                    strokeWidth="10"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                  ></circle>
                  <circle
                    className="text-green-500 stroke-current"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={`${40 * 2 * Math.PI * 0.2} ${40 * 2 * Math.PI * 0.8}`}
                    strokeDashoffset="0"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                  ></circle>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold">20%</span>
                </div>
              </div>
              <h3 className="mt-4 text-lg font-medium">Low Priority</h3>
              <p className="text-sm text-gray-400">16 tasks</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const taskCompletionData = [
  { date: "Jan", completed: 45 },
  { date: "Feb", completed: 52 },
  { date: "Mar", completed: 49 },
  { date: "Apr", completed: 63 },
  { date: "May", completed: 59 },
  { date: "Jun", completed: 80 },
  { date: "Jul", completed: 75 },
  { date: "Aug", completed: 82 },
  { date: "Sep", completed: 90 },
  { date: "Oct", completed: 101 },
  { date: "Nov", completed: 125 },
  { date: "Dec", completed: 150 },
]

const taskStatusData = [
  { name: "To Do", value: 40 },
  { name: "In Progress", value: 30 },
  { name: "Review", value: 20 },
  { name: "Completed", value: 60 },
]

const teamPerformanceData = [
  { date: "Week 1", John: 12, Sarah: 10, Michael: 8, Emily: 7 },
  { date: "Week 2", John: 15, Sarah: 12, Michael: 10, Emily: 9 },
  { date: "Week 3", John: 18, Sarah: 14, Michael: 12, Emily: 11 },
  { date: "Week 4", John: 20, Sarah: 16, Michael: 14, Emily: 13 },
]
