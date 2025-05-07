"use client";

import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { useTheme } from "next-themes";

interface EnhancedChartProps {
	data: Array<{ timestamp: Date; value: number }>;
	title: string;
	min: number;
	max: number;
	unit: string;
	color: string;
}

export default function EnhancedChart({
	data,
	title,
	min,
	max,
	unit,
	color,
}: EnhancedChartProps) {
	const chartRef = useRef<HTMLDivElement>(null);
	const chartInstance = useRef<echarts.ECharts | null>(null);
	const { theme } = useTheme();

	useEffect(() => {
		if (chartRef.current) {
			chartInstance.current = echarts.init(
				chartRef.current,
				theme === "dark" ? "dark" : undefined
			);

			const handleResize = () => {
				chartInstance.current?.resize();
			};
			window.addEventListener("resize", handleResize);

			return () => {
				window.removeEventListener("resize", handleResize);
				chartInstance.current?.dispose();
			};
		}
	}, [theme]);

	useEffect(() => {
		if (!chartInstance.current || !data.length) return;

		const formattedData = data.map((item) => [
			item.timestamp,
			item.value,
		]);

		const adjustColorOpacity = (color: string, opacity: number): string => {
			if (color.startsWith("hsl")) {
				const tempElement = document.createElement("div");
				tempElement.style.color = color;
				document.body.appendChild(tempElement);
				const computedColor = getComputedStyle(tempElement).color;
				document.body.removeChild(tempElement);

				if (computedColor.startsWith("rgb(")) {
					const rgb = computedColor.match(/\d+/g);
					if (rgb && rgb.length >= 3) {
						return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`;
					}
				}
				return computedColor;
			}

			if (color.startsWith("rgba")) {
				return color.replace(/[\d.]+\)$/, `${opacity})`);
			}

			if (color.startsWith("rgb(")) {
				return color.replace("rgb(", "rgba(").replace(")", `, ${opacity})`);
			}

			if (color.startsWith("#")) {
				const r = Number.parseInt(color.slice(1, 3), 16);
				const g = Number.parseInt(color.slice(3, 5), 16);
				const b = Number.parseInt(color.slice(5, 7), 16);
				return `rgba(${r}, ${g}, ${b}, ${opacity})`;
			}

			return `rgba(0, 123, 255, ${opacity})`;
		};

		const bottomErrorThreshold = min + (max - min) * 0.1;
		const bottomWarningThreshold = min + (max - min) * 0.2;
		const topWarningThreshold = min + (max - min) * 0.8;
		const topErrorThreshold = min + (max - min) * 0.9;

		const option: echarts.EChartsOption = {
			animation: false,
			title: {
				text: title,
				left: "center",
			},
			tooltip: {
				trigger: "axis",
				formatter: (params: any) => {
					const date = new Date(params[0].value[0]);
					const value = params[0].value[1];
					return `${date.toLocaleString()}<br/>${title}: ${value.toFixed(
						2
					)} ${unit}`;
				},
				axisPointer: {
					animation: false,
				},
			},
			grid: {
				left: "5%",
				right: "5%",
				bottom: "15%",
			},
			xAxis: {
				type: "time",
				splitLine: {
					show: false,
				},
			},
			yAxis: {
				type: "value",
				min: min,
				max: max,
				splitLine: {
					show: true,
				},
				axisLabel: {
					formatter: `{value} ${unit}`,
				},
			},
			series: [
				{
					name: title,
					type: "line",
					showSymbol: false,
					data: formattedData,
					lineStyle: {
						color: color,
						width: 2,
					},
					areaStyle: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
							{
								offset: 0,
								color: adjustColorOpacity(color, 0.9),
							},
							{
								offset: 1,
								color: adjustColorOpacity(color, 0.6),
							},
						]),
					},
					emphasis: {
						lineStyle: {
							color: "blue",
							width: 2,
						},
						itemStyle: {
							color: "blue",
						},
					},
					markArea: {
						silent: true,
						data: [
							[
								{
									yAxis: min,
									itemStyle: { color: "rgba(255, 0, 0, 0.3)" },
								},
								{
									yAxis: bottomErrorThreshold,
								},
							],
							[
								{
									yAxis: bottomErrorThreshold,
									itemStyle: { color: "rgba(255, 255, 0, 0.3)" },
								},
								{
									yAxis: bottomWarningThreshold,
								},
							],
							[
								{
									yAxis: topWarningThreshold,
									itemStyle: { color: "rgba(255, 255, 0, 0.3)" },
								},
								{
									yAxis: topErrorThreshold,
								},
							],
							[
								{
									yAxis: topErrorThreshold,
									itemStyle: { color: "rgba(255, 0, 0, 0.3)" },
								},
								{
									yAxis: max,
								},
							],
						],
					},
				},
			],
			dataZoom: [
				{
					type: "inside",
					start: 0,
					end: 100,
				},
				{
					start: 0,
					end: 100,
				},
			],
			toolbox: {
				feature: {
					dataZoom: {
						yAxisIndex: "none",
					},
					restore: {},
					saveAsImage: {},
				},
			},
		};

		chartInstance.current.setOption(option);
	}, [data, title, min, max, unit, color]);

	return <div ref={chartRef} className="w-full h-full" />;
}
