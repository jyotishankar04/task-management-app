import { ArrowRight, CheckCircle2, Clock, ListTodo, Plus, Users } from "lucide-react"


export const DASHBOARD_STATS_CARD_DATA = [
    {
        title: "Total Tasks",
        value: 10,
        icon: <ListTodo className="h-4 w-4 text-gray-400" />,
        description: "+2 from yesterday",
    },
    {
        title: "Completed Tasks",
        value: 0,
        icon: <CheckCircle2 className="h-4 w-4 text-gray-400" />,
        description: "+5 this week",
    },
    {
        title: "In Progress Tasks",
        value: 6,
        icon: <Clock className="h-4 w-4 text-gray-400" />,
        description: "Due today",
    },
    {
        title: "Team Members",
        value: 5,
        icon: <Users className="h-4 w-4 text-gray-400" />,
        description: "+1 this month",
    },
]


export const TASKS_TABLE_DATA = [
    {
        id: 1,
        title: "Finalize design system",
        description: "Complete the design system documentation and component library",
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
        description: "Conduct user testing sessions for the new dashboard features",
        dueDate: "Tomorrow",
        status: "To Do",
        priority: "medium",
        assignee: {
            name: "Sarah Johnson",
            avatar: "https://i.pravatar.cc/150?img=1",
        },
    },
    {
        id: 3,
        title: "API integration with payment gateway",
        description: "Integrate the payment gateway API with our checkout process",
        dueDate: "May 15",
        status: "In Progress",
        priority: "high",
        assignee: {
            name: "Michael Chen",
            avatar: "https://i.pravatar.cc/150?img=1",
        },
    },
    {
        id: 4,
        title: "Create onboarding documentation",
        description: "Write comprehensive onboarding documentation for new team members",
        dueDate: "May 18",
        status: "Completed",
        priority: "low",
        assignee: {
            name: "Emily Rodriguez",
            avatar: "https://i.pravatar.cc/150?img=1",
        },
    },
    {
        id: 5,
        title: "Prepare Q2 marketing report",
        description: "Compile and analyze Q2 marketing metrics and prepare the report",
        dueDate: "May 20",
        status: "To Do",
        priority: "medium",
        assignee: {
            name: "David Kim",
            avatar: "https://i.pravatar.cc/150?img=1",
        },
    },
    {
        id: 6,
        title: "Review competitor analysis",
        description: "Review the competitor analysis report and provide feedback",
        dueDate: "May 22",
        status: "To Do",
        priority: "low",
        assignee: {
            name: "John Doe",
            avatar: "https://i.pravatar.cc/150?img=1",
        },
    },
    {
        id: 7,
        title: "Update privacy policy",
        description: "Update the privacy policy to comply with new regulations",
        dueDate: "May 25",
        status: "Completed",
        priority: "high",
        assignee: {
            name: "Sarah Johnson",
            avatar: "https://i.pravatar.cc/150?img=1",
        },
    },
    {
        id: 8,
        title: "Fix login page bugs",
        description: "Address the reported bugs on the login page",
        dueDate: "May 14",
        status: "In Progress",
        priority: "high",
        assignee: {
            name: "Michael Chen",
            avatar: "https://i.pravatar.cc/150?img=1",
        },
    },
]