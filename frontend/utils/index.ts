

export function getPriorityColor(priority: string) {
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

export function getStatusBadgeColor(status: string) {
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
