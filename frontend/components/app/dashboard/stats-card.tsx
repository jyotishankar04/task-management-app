import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TDashStatsCardData } from '@/types'
import { ListTodo } from 'lucide-react'
import React from 'react'



const DashStatsCard: React.FC<TDashStatsCardData> = ({
    title,
    icon,
    value,
    description
}) => {
    return (
        <Card className="bg-[#161616] border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm text-white font-medium">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-white">{value}</div>
                <p className="text-xs text-gray-400">{description}</p>
            </CardContent>
        </Card>
    )
}

export default DashStatsCard