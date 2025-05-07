"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/language-context";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { availableCommands } from "@/lib/dummy-data";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Check } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Commands() {
	const { t } = useLanguage();
	const [selectedCommand, setSelectedCommand] = useState(availableCommands[0]);
	const [paramValues, setParamValues] = useState<Record<string, any>>({});
	const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
	const [currentTime, setCurrentTime] = useState(new Date().toUTCString());

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentTime(new Date().toISOString());
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	const handleParamChange = (name: string, value: any) => {
		setSelectedCommand((prevCommand) => {
			if (!prevCommand) return prevCommand;
			const updatedParameters = prevCommand.parameters.map((param) =>
				param.name === name ? { ...param, value } : param
			);
			return { ...prevCommand, parameters: updatedParameters };
		});
	};

	const handleSendCommand = () => {
		setConfirmDialogOpen(true);
	};

	const confirmSendCommand = () => {
		setConfirmDialogOpen(false);
		toast({
			variant: "success",
			title: "Command Sent",
			description: `${selectedCommand.name} command has been sent successfully.`,
			icon: <Check className="text-green-500" />,
		});
	};

	const generateFullCommand = () => {
		let fullCommand = "$";
		fullCommand += selectedCommand.command;
		selectedCommand.parameters.forEach((param) => {
			if (param.type === "autotime") {
				fullCommand += `,${currentTime}`;
			} else if (param.type === "time") {
				fullCommand += `,${new Date(param.value).toISOString()}`;
			} else {
				fullCommand += ",";
				fullCommand += param.value;
			}
		});
		fullCommand += "*AAAA\r\n";

		return fullCommand;
	};

	return (
		<div className="container py-6 scrollable-container custom-scrollbar overflow-auto h-[calc(100vh-70px)]">
			<h1 className="text-2xl font-bold mb-6">{t("commands.available")}</h1>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div className="md:col-span-1 space-y-4">
					<div className="space-y-2 max-h-[calc(100vh-12rem)] overflow-y-auto custom-scrollbar">
						{availableCommands.map((command) => (
							<Card
								key={command.id}
								className={`cursor-pointer hover:bg-muted/50 transition-colors mr-2 ${
									selectedCommand.id === command.id ? "border-primary" : ""
								}`}
								onClick={() => {
									setSelectedCommand(command);
									setParamValues({});
								}}
							>
								<CardContent className="p-4">
									<div className="font-medium">{command.name}</div>
									<div className="text-sm text-muted-foreground mt-1">
										{command.description}
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>

				<div className="md:col-span-2">
					<Card className="h-full">
						<CardContent className="p-6">
							<h2 className="text-xl font-bold mb-4">{selectedCommand.name}</h2>
							<p className="text-muted-foreground mb-6">
								{selectedCommand.description}
							</p>

							<div className="space-y-6">
								{selectedCommand.parameters.map((param) => (
									<div key={param.name} className="space-y-2">
										<Label htmlFor={param.name}>
											{param.name} {param.unit ? `[${param.unit}]` : ""}
										</Label>

										{param.type === "number" && (
											<div className="space-y-2">
												<input
													type="text"
													placeholder="Enter additional info"
													className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
													value={
														selectedCommand.parameters.find(
															(p) => p.name === param.name
														)?.value || ""
													}
													onChange={(e) =>
														handleParamChange(param.name, e.target.value)
													}
												/>
											</div>
										)}

										{param.type === "time" && (
											<div className="space-y-2">
												<DatePicker
													selected={param.value ? new Date(param.value) : null}
													showTimeSelect
													showTimeInput
													timeFormat="HH:mm:ss"
													timeCaption="Time"
													dateFormat="yyyy-MM-dd HH:mm:ss"
													placeholderText="Select date & time (including seconds)"
													className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
													defaultValue={param.value}
													onChange={(v) => handleParamChange(param.name, v)}
												/>
											</div>
										)}

										{param.type === "autotime" && (
											<div className="space-y-2">
												<input
													disabled
													type="text"
													placeholder="Enter additional info"
													className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
													value={currentTime}
												/>
											</div>
										)}

										{param.type === "hexa" && (
											<div className="space-y-2">
												<div className="flex items-center">
													<span className="px-3 py-2 border border-gray-300 rounded-l bg-gray-100 select-none">
														0x
													</span>
													<input
														type="text"
														placeholder="Enter hex value"
														className="w-full border-t border-b border-r border-gray-300 rounded-r px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
														value={
															// Remove "0x" prefix if present so the user sees only the editable part.
															(
																selectedCommand.parameters.find(
																	(p) => p.name === param.name
																)?.value || ""
															).replace(/^0x/, "")
														}
														onChange={(e) =>
															handleParamChange(
																param.name,
																"0x" + e.target.value
															)
														}
													/>
												</div>
											</div>
										)}

										{param.type === "file" && (
											<div className="space-y-2">
												<input
													type="file"
													accept=".bin, .hex"
													className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
												/>
											</div>
										)}

										{param.type === "select" && (
											<Select
												defaultValue={param.value}
												onValueChange={(v) => handleParamChange(param.name, v)}
											>
												<SelectTrigger>
													<SelectValue placeholder={`Select ${param.name}`} />
												</SelectTrigger>
												<SelectContent>
													{param.options.map((option) => (
														<SelectItem key={option} value={option}>
															{option}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										)}
									</div>
								))}

								<div className="text-sm text-muted-foreground">
									<h2 className="text-xl font-bold mb-4">
										{t("commands.preview")}
									</h2>
									<p className="mb-2">{generateFullCommand()}</p>
								</div>

								<div className="space-x-4 mt-8">
									<Button onClick={handleSendCommand}>
										{t("commands.send")}
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
			<Toaster />

			{confirmDialogOpen && (
				<Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>{t("commands.confirm")}</DialogTitle>
						</DialogHeader>
						<div className="py-4">
							<p className="mb-4">{t("commands.confirmQuestion")}</p>
							<p className="mb-4 font-mono break-all">
								{generateFullCommand()}
							</p>
						</div>
						<div className="flex justify-end space-x-4">
							<Button
								variant="outline"
								onClick={() => setConfirmDialogOpen(false)}
							>
								{t("app.no")}
							</Button>
							<Button onClick={confirmSendCommand}>{t("app.yes")}</Button>
						</div>
					</DialogContent>
				</Dialog>
			)}
		</div>
	);
}
