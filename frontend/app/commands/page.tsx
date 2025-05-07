"use client";

import { useState } from "react";
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
import { Slider } from "@/components/ui/slider";
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

export default function Commands() {
	const { t } = useLanguage();
	const [selectedCommand, setSelectedCommand] = useState(availableCommands[0]);
	const [paramValues, setParamValues] = useState<Record<string, any>>({});
	const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

	const handleParamChange = (name: string, value: any) => {
		setParamValues((prev) => ({
			...prev,
			[name]: value,
		}));
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

	return (
		<div className="content-container">
			<div className="container py-6">
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
								<h2 className="text-xl font-bold mb-4">
									{selectedCommand.name}
								</h2>
								<p className="text-muted-foreground mb-6">
									{selectedCommand.description}
								</p>

								<div className="space-y-6">
									{selectedCommand.parameters.map((param) => (
										<div key={param.name} className="space-y-2">
											<Label htmlFor={param.name}>
												{param.name} {param.unit ? `(${param.unit})` : ""}
											</Label>

											{param.type === "number" && (
												<div className="space-y-2">
													<div className="flex justify-between text-sm">
														<span>{param.min}</span>
														<span>
															{paramValues[param.name] ?? param.default}
														</span>
														<span>{param.max}</span>
													</div>
													<Slider
														id={param.name}
														min={param.min}
														max={param.max}
														step={1}
														defaultValue={[param.default]}
														onValueChange={(value) =>
															handleParamChange(param.name, value[0])
														}
													/>
												</div>
											)}

											{param.type === "select" && (
												<Select
													defaultValue={param.default}
													onValueChange={(value) =>
														handleParamChange(param.name, value)
													}
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
										<p className="mb-2">{selectedCommand.command}</p>
									</div>

									<div className="flex justify-end space-x-4 mt-8">
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
								<DialogTitle>Confirm Command</DialogTitle>
							</DialogHeader>
							<div className="py-4">
								<p className="mb-4">
									Do you really want to send the following command?
								</p>
								<p className="mb-4 font-mono break-all">
									{selectedCommand.command}
								</p>
							</div>
							<div className="flex justify-end space-x-4">
								<Button
									variant="outline"
									onClick={() => setConfirmDialogOpen(false)}
								>
									No
								</Button>
								<Button onClick={confirmSendCommand}>Yes</Button>
							</div>
						</DialogContent>
					</Dialog>
				)}
			</div>
		</div>
	);
}
