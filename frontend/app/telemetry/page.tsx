"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/language-context";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDate, convertToBinary, convertToHex } from "@/lib/utils";
import { fetchTelemetry } from "@/lib/api";

export default function Telemetry() {
	const { t } = useLanguage();
	const [messages, setMessages] = useState<any[]>([]);
	const [selectedMessage, setSelectedMessage] = useState(messages[0]);
	const [displayMode, setDisplayMode] = useState<
		"raw" | "binary" | "decimal" | "hexadecimal"
	>("decimal");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchMessages() {
			try {
				const data = await fetchTelemetry("/getTelegramsWithProperties");
				setMessages(data);
				setSelectedMessage(data[0]);
			} catch (err: any) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		}
		fetchMessages();
	}, []);

	const getParameterNames = (type: number) => {
		switch (type) {
			case 1:
				return [
					"Solar Voltage 1",
					"Solar Voltage 2",
					"Solar Voltage 3",
					"Battery Voltage",
				];
			case 2:
				return ["Temperature 1", "Temperature 2", "Temperature 3"];
			case 3:
				return ["Current 1", "Current 2", "Current 3", "Current 4"];
			case 4:
				return ["System Status", "Operation Mode", "Error Code"];
			default:
				return [];
		}
	};

	const formatValue = (value: number) => {
		switch (displayMode) {
			case "raw":
				return value.toString();
			case "binary":
				return convertToBinary(value);
			case "decimal":
				return value.toString();
			case "hexadecimal":
				return "0x" + convertToHex(value);
			default:
				return value.toString();
		}
	};

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;

	return (
		<div className="content-container">
			<div className="container py-6">
				<h1 className="text-2xl font-bold mb-6">
					{t("telemetry.telemetries")}
				</h1>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<div className="md:col-span-1 space-y-4">
						<Card className="h-full p-2">
							<div className="space-y-2 max-h-[calc(100vh-16rem)] overflow-y-auto custom-scrollbar">
								{messages.map((message) => (
									<Card
										key={message.id}
										className={`h-full cursor-pointer hover:bg-muted/50 transition-colors mr-1 ${
											selectedMessage.id === message.id ? "border-primary" : ""
										}`}
										onClick={() => setSelectedMessage(message)}
									>
										<CardContent className="p-3">
											<div className="text-sm text-muted-foreground">
												{message.timestamp}
											</div>
										</CardContent>
									</Card>
								))}
							</div>
						</Card>
					</div>

					<div className="md:col-span-2">
						<Card className="h-full p-2">
							<div className="flex justify-between items-center space-x-2 m-4">
								<h1 className="text-xl">{selectedMessage.timestamp}</h1>
								<div className="flex space-x-2">
									<Button
										variant={displayMode === "raw" ? "default" : "outline"}
										size="sm"
										onClick={() => setDisplayMode("raw")}
									>
										{t("telemetry.raw")}
									</Button>
									<Button
										variant={displayMode === "binary" ? "default" : "outline"}
										size="sm"
										onClick={() => setDisplayMode("binary")}
									>
										{t("telemetry.binary")}
									</Button>
									<Button
										variant={displayMode === "decimal" ? "default" : "outline"}
										size="sm"
										onClick={() => setDisplayMode("decimal")}
									>
										{t("telemetry.decimal")}
									</Button>
									<Button
										variant={
											displayMode === "hexadecimal" ? "default" : "outline"
										}
										size="sm"
										onClick={() => setDisplayMode("hexadecimal")}
									>
										{t("telemetry.hexadecimal")}
									</Button>
								</div>
							</div>

							<div className="m-10">
								<h2 className="text-s w-full break-all">
									{selectedMessage.telegram}
								</h2>
								<div className="flex justify-between items-center space-x-2">
									<h2 className="text-s w-full break-all">Solar xp</h2>
									<h2 className="text-s w-full break-all">
										{formatValue(selectedMessage.v_Solar_Xp)}
									</h2>
								</div>
								<h2 className="text-s w-full break-all">
									{selectedMessage.v_Solar_Xm}
								</h2>
								<h2 className="text-s w-full break-all">
									{selectedMessage.v_Solar_Ym}
								</h2>
							</div>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
