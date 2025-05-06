"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useLanguage } from "@/lib/language-context";
import EarthView from "@/components/earth-view";
import { orbitParameters, generateUpcomingPasses } from "@/lib/dummy-data";
import { formatDate } from "@/lib/utils";

export default function Home() {
	const { t } = useLanguage();
	const [params, setParams] = useState(orbitParameters);
	const upcomingPasses = generateUpcomingPasses(3);

	const handleAltitudeChange = (value: number[]) => {
		setParams({ ...params, altitude: value[0] });
	};

	const handleInclinationChange = (value: number[]) => {
		setParams({ ...params, inclination: value[0] });
	};

	const handleEccentricityChange = (value: number[]) => {
		setParams({ ...params, eccentricity: value[0] / 10000 });
	};

	return (
		<div className="content-container flex flex-col md:flex-row">
			<div className="w-full md:w-2/3 h-full">
				<EarthView orbitParams={params} />
			</div>
			<div className="w-full md:w-1/3 p-4 scrollable-container custom-scrollbar">
				<Card>
					<CardHeader>
						<CardTitle>{t("home.orbitParameters")}</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<div className="flex justify-between">
								<span>{t("home.altitude")}</span>
								<span>{params.altitude} km</span>
							</div>
							<Slider
								defaultValue={[params.altitude]}
								min={200}
								max={800}
								step={10}
								onValueChange={handleAltitudeChange}
							/>
						</div>

						<div className="space-y-2">
							<div className="flex justify-between">
								<span>{t("home.inclination")}</span>
								<span>{params.inclination}°</span>
							</div>
							<Slider
								defaultValue={[params.inclination]}
								min={0}
								max={90}
								step={1}
								onValueChange={handleInclinationChange}
							/>
						</div>

						<div className="space-y-2">
							<div className="flex justify-between">
								<span>{t("home.eccentricity")}</span>
								<span>{params.eccentricity.toFixed(4)}</span>
							</div>
							<Slider
								defaultValue={[params.eccentricity * 10000]}
								min={0}
								max={100}
								step={1}
								onValueChange={handleEccentricityChange}
							/>
						</div>

						<div className="flex justify-between">
							<span>{t("home.velocity")}</span>
							<span>{params.velocity.toFixed(2)} km/s</span>
						</div>

						<div className="flex justify-between">
							<span>{t("home.period")}</span>
							<span>{params.period.toFixed(2)} min</span>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>{t("home.upcomingPasses")}</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						{upcomingPasses.map((pass, index) => (
							<div key={index} className="border rounded-md p-3">
								<div className="font-medium">
									{index === 0 ? t("home.nextPass") : `Pass #${index + 1}`}
								</div>
								<div className="text-sm text-muted-foreground">
									{formatDate(pass.date)}
								</div>
								<div className="flex justify-between mt-2 text-sm">
									<span>Duration: {pass.duration} min</span>
									<span>Max Elevation: {pass.maxElevation}°</span>
								</div>
							</div>
						))}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
