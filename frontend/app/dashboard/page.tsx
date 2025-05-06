"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/language-context"
import ParameterCard from "@/components/parameter-card"
import { generateTelemetryData } from "@/lib/dummy-data"

export default function Dashboard() {
  const { t } = useLanguage()
  const [telemetryData, setTelemetryData] = useState(generateTelemetryData(100))

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetryData((prevData) => {
        const newData = [...prevData]
        // Remove oldest data point
        newData.shift()
        // Add new data point
        const lastData = newData[newData.length - 1]
        const now = new Date()

        newData.push({
          timestamp: now,
          solarVoltage1: Math.max(4.5, Math.min(5.2, lastData.solarVoltage1 + (Math.random() - 0.5) * 0.1)),
          solarVoltage2: Math.max(4.6, Math.min(5.3, lastData.solarVoltage2 + (Math.random() - 0.5) * 0.1)),
          solarVoltage3: Math.max(4.4, Math.min(5.1, lastData.solarVoltage3 + (Math.random() - 0.5) * 0.1)),
          batteryVoltage: Math.max(3.6, Math.min(4.2, lastData.batteryVoltage + (Math.random() - 0.5) * 0.05)),
          temperature1: Math.max(-10, Math.min(40, lastData.temperature1 + (Math.random() - 0.5) * 2)),
          temperature2: Math.max(-5, Math.min(35, lastData.temperature2 + (Math.random() - 0.5) * 2)),
          temperature3: Math.max(0, Math.min(45, lastData.temperature3 + (Math.random() - 0.5) * 2)),
          current1: Math.max(0.1, Math.min(0.5, lastData.current1 + (Math.random() - 0.5) * 0.02)),
          current2: Math.max(0.2, Math.min(0.6, lastData.current2 + (Math.random() - 0.5) * 0.02)),
          current3: Math.max(0.15, Math.min(0.55, lastData.current3 + (Math.random() - 0.5) * 0.02)),
          current4: Math.max(0.25, Math.min(0.65, lastData.current4 + (Math.random() - 0.5) * 0.02)),
        })

        return newData
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Get latest data
  const latestData = telemetryData[telemetryData.length - 1]

  // Prepare history data for each parameter
  const solarVoltage1History = telemetryData.map((d) => ({ timestamp: d.timestamp, value: d.solarVoltage1 }))
  const solarVoltage2History = telemetryData.map((d) => ({ timestamp: d.timestamp, value: d.solarVoltage2 }))
  const solarVoltage3History = telemetryData.map((d) => ({ timestamp: d.timestamp, value: d.solarVoltage3 }))
  const batteryVoltageHistory = telemetryData.map((d) => ({ timestamp: d.timestamp, value: d.batteryVoltage }))
  const temperature1History = telemetryData.map((d) => ({ timestamp: d.timestamp, value: d.temperature1 }))
  const temperature2History = telemetryData.map((d) => ({ timestamp: d.timestamp, value: d.temperature2 }))
  const temperature3History = telemetryData.map((d) => ({ timestamp: d.timestamp, value: d.temperature3 }))
  const current1History = telemetryData.map((d) => ({ timestamp: d.timestamp, value: d.current1 }))
  const current2History = telemetryData.map((d) => ({ timestamp: d.timestamp, value: d.current2 }))
  const current3History = telemetryData.map((d) => ({ timestamp: d.timestamp, value: d.current3 }))
  const current4History = telemetryData.map((d) => ({ timestamp: d.timestamp, value: d.current4 }))

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">{t("app.dashboard")}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <ParameterCard
          title={`${t("dashboard.solarVoltage")} 1`}
          value={latestData.solarVoltage1}
          unit="V"
          min={4.5}
          max={5.2}
          historyData={solarVoltage1History}
        />

        <ParameterCard
          title={`${t("dashboard.solarVoltage")} 2`}
          value={latestData.solarVoltage2}
          unit="V"
          min={4.6}
          max={5.3}
          historyData={solarVoltage2History}
        />

        <ParameterCard
          title={`${t("dashboard.solarVoltage")} 3`}
          value={latestData.solarVoltage3}
          unit="V"
          min={4.4}
          max={5.1}
          historyData={solarVoltage3History}
        />

        <ParameterCard
          title={t("dashboard.batteryVoltage")}
          value={latestData.batteryVoltage}
          unit="V"
          min={3.6}
          max={4.2}
          historyData={batteryVoltageHistory}
        />

        <ParameterCard
          title={`${t("dashboard.temperature")} 1`}
          value={latestData.temperature1}
          unit="°C"
          min={-10}
          max={40}
          historyData={temperature1History}
        />

        <ParameterCard
          title={`${t("dashboard.temperature")} 2`}
          value={latestData.temperature2}
          unit="°C"
          min={-5}
          max={35}
          historyData={temperature2History}
        />

        <ParameterCard
          title={`${t("dashboard.temperature")} 3`}
          value={latestData.temperature3}
          unit="°C"
          min={0}
          max={45}
          historyData={temperature3History}
        />

        <ParameterCard
          title={`${t("dashboard.current")} 1`}
          value={latestData.current1}
          unit="A"
          min={0.1}
          max={0.5}
          historyData={current1History}
        />

        <ParameterCard
          title={`${t("dashboard.current")} 2`}
          value={latestData.current2}
          unit="A"
          min={0.2}
          max={0.6}
          historyData={current2History}
        />

        <ParameterCard
          title={`${t("dashboard.current")} 3`}
          value={latestData.current3}
          unit="A"
          min={0.15}
          max={0.55}
          historyData={current3History}
        />

        <ParameterCard
          title={`${t("dashboard.current")} 4`}
          value={latestData.current4}
          unit="A"
          min={0.25}
          max={0.65}
          historyData={current4History}
        />
      </div>
    </div>
  )
}
