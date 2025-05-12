"use client"

import { useState } from "react"
import { Bell, Globe, Lock, Save, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-gray-400">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-[#161616] border border-gray-800 p-1">
          <TabsTrigger value="profile" className="data-[state=active]:bg-[#0F0F0F] data-[state=active]:text-white">
            <User className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="data-[state=active]:bg-[#0F0F0F] data-[state=active]:text-white"
          >
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="organization" className="data-[state=active]:bg-[#0F0F0F] data-[state=active]:text-white">
            <Globe className="h-4 w-4 mr-2" />
            Organization
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-[#0F0F0F] data-[state=active]:text-white">
            <Lock className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-4">
          <Card className="bg-[#161616] border-gray-800">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription className="text-gray-400">
                Update your personal information and profile picture
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder.svg" alt="Profile" />
                    <AvatarFallback className="bg-gradient-to-r from-[#3C82F6] to-[#8BAEF4] text-xl">JD</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" className="border-gray-800">
                    Change Avatar
                  </Button>
                </div>

                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        defaultValue="John"
                        className="bg-[#0F0F0F] border-gray-800 focus:border-[#3C82F6]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        defaultValue="Doe"
                        className="bg-[#0F0F0F] border-gray-800 focus:border-[#3C82F6]"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="john@example.com"
                      className="bg-[#0F0F0F] border-gray-800 focus:border-[#3C82F6]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title</Label>
                    <Input
                      id="title"
                      defaultValue="Product Manager"
                      className="bg-[#0F0F0F] border-gray-800 focus:border-[#3C82F6]"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself"
                  defaultValue="Product Manager with 5+ years of experience in SaaS products."
                  className="min-h-[100px] bg-[#0F0F0F] border-gray-800 focus:border-[#3C82F6]"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="bg-gradient-to-r from-[#3C82F6] to-[#8BAEF4] hover:opacity-90 transition-opacity">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-[#161616] border-gray-800">
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription className="text-gray-400">Customize your experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger className="bg-[#0F0F0F] border-gray-800">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#161616] border-gray-800">
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="zh">Chinese</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="utc-8">
                  <SelectTrigger className="bg-[#0F0F0F] border-gray-800">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#161616] border-gray-800">
                    <SelectItem value="utc-12">UTC-12:00</SelectItem>
                    <SelectItem value="utc-8">UTC-08:00 (Pacific Time)</SelectItem>
                    <SelectItem value="utc-5">UTC-05:00 (Eastern Time)</SelectItem>
                    <SelectItem value="utc-0">UTC+00:00 (London)</SelectItem>
                    <SelectItem value="utc+1">UTC+01:00 (Paris)</SelectItem>
                    <SelectItem value="utc+8">UTC+08:00 (Singapore)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="bg-gradient-to-r from-[#3C82F6] to-[#8BAEF4] hover:opacity-90 transition-opacity">
                <Save className="mr-2 h-4 w-4" />
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-4">
          <Card className="bg-[#161616] border-gray-800">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription className="text-gray-400">Choose how and when you want to be notified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                <div className="space-y-3">
                  {emailNotifications.map((notification) => (
                    <div key={notification.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{notification.title}</p>
                        <p className="text-sm text-gray-400">{notification.description}</p>
                      </div>
                      <Switch defaultChecked={notification.enabled} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">In-App Notifications</h3>
                <div className="space-y-3">
                  {inAppNotifications.map((notification) => (
                    <div key={notification.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{notification.title}</p>
                        <p className="text-sm text-gray-400">{notification.description}</p>
                      </div>
                      <Switch defaultChecked={notification.enabled} />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="bg-gradient-to-r from-[#3C82F6] to-[#8BAEF4] hover:opacity-90 transition-opacity">
                <Save className="mr-2 h-4 w-4" />
                Save Notification Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Organization Settings */}
        <TabsContent value="organization" className="space-y-4">
          <Card className="bg-[#161616] border-gray-800">
            <CardHeader>
              <CardTitle>Organization Details</CardTitle>
              <CardDescription className="text-gray-400">
                Update your organization information and settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex flex-col items-center gap-4">
                  <div className="h-24 w-24 rounded-xl bg-gradient-to-r from-[#3C82F6] to-[#8BAEF4] flex items-center justify-center text-white text-2xl font-bold">
                    TC
                  </div>
                  <Button variant="outline" className="border-gray-800">
                    Change Logo
                  </Button>
                </div>

                <div className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="orgName">Organization Name</Label>
                    <Input
                      id="orgName"
                      defaultValue="TechCorp"
                      className="bg-[#0F0F0F] border-gray-800 focus:border-[#3C82F6]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="orgEmail">Organization Email</Label>
                    <Input
                      id="orgEmail"
                      type="email"
                      defaultValue="info@techcorp.com"
                      className="bg-[#0F0F0F] border-gray-800 focus:border-[#3C82F6]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="orgWebsite">Website</Label>
                    <Input
                      id="orgWebsite"
                      type="url"
                      defaultValue="https://techcorp.com"
                      className="bg-[#0F0F0F] border-gray-800 focus:border-[#3C82F6]"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="orgDescription">Organization Description</Label>
                <Textarea
                  id="orgDescription"
                  placeholder="Describe your organization"
                  defaultValue="TechCorp is a leading technology company specializing in innovative software solutions."
                  className="min-h-[100px] bg-[#0F0F0F] border-gray-800 focus:border-[#3C82F6]"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="bg-gradient-to-r from-[#3C82F6] to-[#8BAEF4] hover:opacity-90 transition-opacity">
                <Save className="mr-2 h-4 w-4" />
                Save Organization
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-[#161616] border-gray-800">
            <CardHeader>
              <CardTitle>Subscription & Billing</CardTitle>
              <CardDescription className="text-gray-400">Manage your subscription and billing details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-[#0F0F0F] border border-gray-800">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="font-medium">Current Plan: Free</h3>
                    <p className="text-sm text-gray-400">5 team members, 100 tasks, basic features</p>
                  </div>
                  <Button className="bg-gradient-to-r from-[#3C82F6] to-[#8BAEF4] hover:opacity-90 transition-opacity">
                    Upgrade Plan
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Available Plans</h3>
                <div className="grid gap-4 sm:grid-cols-3">
                  {plans.map((plan) => (
                    <div
                      key={plan.id}
                      className={`p-4 rounded-lg border ${
                        plan.id === "free" ? "border-gray-800 bg-[#0F0F0F]" : "border-[#3C82F6] bg-[#0F0F0F]"
                      }`}
                    >
                      <h4 className="font-medium">{plan.name}</h4>
                      <p className="text-2xl font-bold mt-2">
                        ${plan.price}
                        <span className="text-sm font-normal text-gray-400">/month</span>
                      </p>
                      <ul className="mt-4 space-y-2 text-sm">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <span className="mr-2 text-green-400">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button
                        className={`w-full mt-4 ${
                          plan.id === "free"
                            ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                            : "bg-gradient-to-r from-[#3C82F6] to-[#8BAEF4] hover:opacity-90 transition-opacity"
                        }`}
                        disabled={plan.id === "free"}
                      >
                        {plan.id === "free" ? "Current Plan" : "Select Plan"}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-4">
          <Card className="bg-[#161616] border-gray-800">
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription className="text-gray-400">Manage your account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Change Password</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      placeholder="••••••••"
                      className="bg-[#0F0F0F] border-gray-800 focus:border-[#3C82F6]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="••••••••"
                      className="bg-[#0F0F0F] border-gray-800 focus:border-[#3C82F6]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      className="bg-[#0F0F0F] border-gray-800 focus:border-[#3C82F6]"
                    />
                  </div>
                  <Button className="bg-gradient-to-r from-[#3C82F6] to-[#8BAEF4] hover:opacity-90 transition-opacity">
                    Update Password
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Enable Two-Factor Authentication</p>
                    <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
                  </div>
                  <Switch />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Sessions</h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-[#0F0F0F] border border-gray-800">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Current Session</p>
                        <p className="text-sm text-gray-400">MacBook Pro • San Francisco, CA • Active now</p>
                      </div>
                      <div className="text-xs px-2 py-1 rounded-full bg-green-900/30 text-green-400">Active</div>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-[#0F0F0F] border border-gray-800">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">iPhone 13</p>
                        <p className="text-sm text-gray-400">San Francisco, CA • Last active 2 hours ago</p>
                      </div>
                      <Button variant="outline" size="sm" className="border-gray-800 text-red-400 hover:text-red-300">
                        Sign Out
                      </Button>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="border-gray-800">
                  Sign Out All Devices
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

const emailNotifications = [
  {
    id: "task-assigned",
    title: "Task Assignments",
    description: "Receive emails when tasks are assigned to you",
    enabled: true,
  },
  {
    id: "task-updates",
    title: "Task Updates",
    description: "Receive emails when tasks you're involved with are updated",
    enabled: true,
  },
  {
    id: "comments",
    title: "Comments",
    description: "Receive emails when someone comments on your tasks",
    enabled: true,
  },
  {
    id: "team-updates",
    title: "Team Updates",
    description: "Receive emails about team changes and announcements",
    enabled: false,
  },
  {
    id: "weekly-summary",
    title: "Weekly Summary",
    description: "Receive a weekly summary of your tasks and progress",
    enabled: true,
  },
]

const inAppNotifications = [
  {
    id: "task-assigned-app",
    title: "Task Assignments",
    description: "Receive notifications when tasks are assigned to you",
    enabled: true,
  },
  {
    id: "task-updates-app",
    title: "Task Updates",
    description: "Receive notifications when tasks you're involved with are updated",
    enabled: true,
  },
  {
    id: "comments-app",
    title: "Comments",
    description: "Receive notifications when someone comments on your tasks",
    enabled: true,
  },
  {
    id: "team-updates-app",
    title: "Team Updates",
    description: "Receive notifications about team changes and announcements",
    enabled: true,
  },
  {
    id: "mentions",
    title: "Mentions",
    description: "Receive notifications when you're mentioned in comments or tasks",
    enabled: true,
  },
]

const plans = [
  {
    id: "free",
    name: "Free",
    price: 0,
    features: ["5 team members", "100 tasks", "Basic reporting", "1GB storage"],
  },
  {
    id: "pro",
    name: "Pro",
    price: 29,
    features: ["Unlimited team members", "Unlimited tasks", "Advanced reporting", "10GB storage", "Priority support"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 99,
    features: [
      "Unlimited team members",
      "Unlimited tasks",
      "Custom reporting",
      "100GB storage",
      "24/7 support",
      "Custom integrations",
    ],
  },
]
