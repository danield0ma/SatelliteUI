"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { getStatusColor } from "@/lib/utils";
import EnhancedChart from "./enhanced-chart";

interface ParameterCardProps {
	title: string;
	value: number;
	unit: string;
	min: number;
	max: number;
	historyData: Array<{ timestamp: Date; value: number }>;
}

export default function ParameterCard({
	title,
	value,
	unit,
	min,
	max,
	historyData,
}: ParameterCardProps) {
	const { t } = useLanguage();
	const [isOpen, setIsOpen] = useState(false);

	const statusColor = getStatusColor(value, min, max);

	const textColorClass =
		statusColor === "success"
			? "text-green-500"
			: statusColor === "danger"
			? "text-red-500"
			: statusColor === "warning"
			? "text-yellow-500"
			: "text-primary";

	const backgroundColorClass =
		statusColor === "success"
			? "bg-success"
			: statusColor === "danger"
			? "bg-danger"
			: statusColor === "warning"
			? "bg-warning"
			: "bg-primary";

	return (
		<>
			<Card
				className="cursor-pointer hover:shadow-md transition-shadow"
				onClick={() => setIsOpen(true)}
			>
				<CardHeader className="pb-2">
					<CardTitle className={`text-base font-medium ${textColorClass}`}>
						{title}
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className={`text-2xl font-bold ${textColorClass}`}>
						{value.toFixed(2)} {unit}
					</div>
					<div className="mt-2 h-1 w-full bg-muted overflow-hidden rounded-full">
						<div
							className={`h-full ${backgroundColorClass}`}
							style={{
								width: `${Math.max(
									0,
									Math.min(100, ((value - min) / (max - min)) * 100)
								)}%`,
							}}
						/>
					</div>
				</CardContent>
			</Card>

			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogContent className="w-[90vw] h-[90vh] !max-w-none">
					<DialogHeader>
						<DialogTitle>{t("dashboard.chartTitle")}</DialogTitle>
					</DialogHeader>
					<div className="h-full w-full">
						<EnhancedChart
							data={historyData}
							title={title}
							min={min}
							max={max}
							unit={unit}
							color={"primary"}
						/>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
}
