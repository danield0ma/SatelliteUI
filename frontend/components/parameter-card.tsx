"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { getStatusColor } from "@/lib/utils"

interface ParameterCardProps {
  title: string
  value: number
  unit: string
  min: number
  max: number
  historyData: Array<{ timestamp: Date; value: number }>
}

export default function ParameterCard({ title, value, unit, min, max, historyData }: ParameterCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [timeRange, setTimeRange] = useState(100) // percentage of data to show

  const statusColor = getStatusColor(value, min, max)

  // Calculate the slice of data to show based on timeRange
  const dataToShow = historyData.slice(Math.floor(historyData.length * (1 - timeRange / 100)))

  // Format data for chart
  const chartData = dataToShow.map((item) => ({
    timestamp: item.timestamp.toISOString(),
    value: item.value,
  }))

  return (
    <>
      <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setIsOpen(true)}>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold text-${statusColor}`}>
            {value.toFixed(2)} {unit}
          </div>
          <div className="mt-2 h-1 w-full bg-muted overflow-hidden rounded-full">
            <div
              className={`h-full bg-${statusColor}`}
              style={{
                width: `${Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100))}%`,
              }}
            />
          </div>
        </CardContent>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <div className="h-[400px] w-full">
            <ChartContainer
              config={{
                value: {
                  label: title,
                  color: `hsl(var(--${statusColor}))`,
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" tickFormatter={(value) => new Date(value).toLocaleTimeString()} />
                  <YAxis domain={[min, max]} />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                    labelFormatter={(value) => new Date(value).toLocaleString()}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={`var(--color-value)`}
                    dot={false}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Time Range</span>
              <span>{timeRange}%</span>
            </div>
            <Slider value={[timeRange]} min={10} max={100} step={5} onValueChange={(value) => setTimeRange(value[0])} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
