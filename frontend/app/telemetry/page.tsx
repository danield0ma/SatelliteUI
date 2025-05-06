"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { generateTelemetryMessages } from "@/lib/dummy-data"
import { formatDate, convertToBinary, convertToHex } from "@/lib/utils"

export default function Telemetry() {
  const { t } = useLanguage()
  const [messages] = useState(generateTelemetryMessages(20))
  const [selectedMessage, setSelectedMessage] = useState(messages[0])
  const [displayMode, setDisplayMode] = useState<"raw" | "binary" | "decimal" | "hexadecimal">("decimal")

  // Get message type name
  const getMessageTypeName = (type: number) => {
    switch (type) {
      case 1:
        return "Power"
      case 2:
        return "Temperature"
      case 3:
        return "Current"
      case 4:
        return "Status"
      default:
        return "Unknown"
    }
  }

  // Get parameter names based on message type
  const getParameterNames = (type: number) => {
    switch (type) {
      case 1: // Power message
        return ["Solar Voltage 1", "Solar Voltage 2", "Solar Voltage 3", "Battery Voltage"]
      case 2: // Temperature message
        return ["Temperature 1", "Temperature 2", "Temperature 3"]
      case 3: // Current message
        return ["Current 1", "Current 2", "Current 3", "Current 4"]
      case 4: // Status message
        return ["System Status", "Operation Mode", "Error Code"]
      default:
        return []
    }
  }

  // Format value based on display mode
  const formatValue = (value: number) => {
    switch (displayMode) {
      case "raw":
        return value.toString()
      case "binary":
        return convertToBinary(value)
      case "decimal":
        return value.toString()
      case "hexadecimal":
        return "0x" + convertToHex(value)
      default:
        return value.toString()
    }
  }

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">{t("telemetry.messages")}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-4">
          <div className="flex space-x-2 mb-4">
            <Button variant={displayMode === "raw" ? "default" : "outline"} onClick={() => setDisplayMode("raw")}>
              {t("telemetry.raw")}
            </Button>
            <Button variant={displayMode === "binary" ? "default" : "outline"} onClick={() => setDisplayMode("binary")}>
              {t("telemetry.binary")}
            </Button>
            <Button
              variant={displayMode === "decimal" ? "default" : "outline"}
              onClick={() => setDisplayMode("decimal")}
            >
              {t("telemetry.decimal")}
            </Button>
            <Button
              variant={displayMode === "hexadecimal" ? "default" : "outline"}
              onClick={() => setDisplayMode("hexadecimal")}
            >
              {t("telemetry.hexadecimal")}
            </Button>
          </div>

          <div className="space-y-2 max-h-[calc(100vh-12rem)] overflow-y-auto">
            {messages.map((message) => (
              <Card
                key={message.id}
                className={`cursor-pointer hover:bg-muted/50 transition-colors ${
                  selectedMessage.id === message.id ? "border-primary" : ""
                }`}
                onClick={() => setSelectedMessage(message)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">{getMessageTypeName(message.type)} Message</div>
                    <div className="text-sm text-muted-foreground">ID: {message.id}</div>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{formatDate(message.timestamp)}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <Card className="h-full">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{getMessageTypeName(selectedMessage.type)} Message</h2>
                <div className="text-sm text-muted-foreground">{formatDate(selectedMessage.timestamp)}</div>
              </div>

              <div className="space-y-6">
                {getParameterNames(selectedMessage.type).map((name, index) => (
                  <div key={index} className="space-y-1">
                    <div className="text-sm font-medium text-muted-foreground">{name}</div>
                    <div className="text-2xl font-mono">
                      {selectedMessage.payload[index] !== undefined
                        ? formatValue(selectedMessage.payload[index])
                        : "N/A"}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
