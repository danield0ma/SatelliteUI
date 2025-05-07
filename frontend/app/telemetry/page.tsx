"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/language-context";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { fetchTelemetry } from "@/lib/api";

export default function Telemetry() {
	const { t } = useLanguage();
	const [messages, setMessages] = useState<any[]>([]);
	const [selectedMessage, setSelectedMessage] = useState(messages[0]);
	const [displayMode, setDisplayMode] = useState<"raw" | "processed">("raw");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const orderedKeys = [
		"v_Solar_Xp",
		"v_Solar_Xm",
		"v_Solar_Ym",
		"mppt_VBus",
		"mppt_CURR",
		"bat_VBUS",
		"bat_CURR",
		"bat_TEMP",
		"ina_VBUS",
		"ina_CURR",
		"eps_VBUS",
		"eps_CURR",
		"obc_VBUS",
		"obc_CURR",
		"com_VBUS",
		"com_CURR",
		"epsuptime",
		"obcuptime",
		"gyro_X_ROT",
		"gyro_Y_ROT",
		"gyro_Z_ROT",
		"x_MAG",
		"y_MAG",
		"z_MAG",
		"magn_OBC_TEMP",
		"laser_CH1",
		"laser_CH2",
	];

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

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;

	return (
		<div className="container py-6 scrollable-container custom-scrollbar overflow-auto h-[calc(100vh-70px)]">
			<h1 className="text-2xl font-bold mb-6">{t("telemetry.telemetries")}</h1>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div className="md:col-span-1 space-y-4">
					<Card className="p-2">
						<div className="space-y-2 max-h-[calc(100vh-14rem)] overflow-y-auto custom-scrollbar">
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
					<Card className="p-2 overflow-y-auto custom-scrollbar">
						<div className="max-h-[calc(100vh-14rem)] overflow-y-auto custom-scrollbar">
							<div className="flex justify-between items-center space-x-2 mx-4 mt-4">
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
										variant={
											displayMode === "processed" ? "default" : "outline"
										}
										size="sm"
										onClick={() => setDisplayMode("processed")}
									>
										{t("telemetry.processed")}
									</Button>
								</div>
							</div>

							<div className="mx-10 my-6">
								{displayMode === "raw" ? (
									<h2 className="text-s w-full break-all">
										{selectedMessage.telegram}
									</h2>
								) : (
									<div className="mx-4 overflow-auto rounded-lg shadow border border-gray-200">
										<table className="min-w-full divide-y divide-gray-200">
											<thead className="bg-gray-50">
												<tr>
													<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
														Parameter
													</th>
													<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
														Value
													</th>
												</tr>
											</thead>
											<tbody className="bg-white divide-y divide-gray-200">
												{orderedKeys.map((key) => (
													<tr key={key} className="hover:bg-gray-100">
														<td className="px-6 py-2 whitespace-nowrap">
															{key}
														</td>
														<td className="px-6 py-2 whitespace-nowrap">
															{selectedMessage[key]}
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								)}
							</div>
						</div>
					</Card>
				</div>
			</div>
		</div>
	);
}
