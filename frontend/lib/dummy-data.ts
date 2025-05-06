import { randomInt, randomFloat } from "./utils";

export const orbitParameters = {
	altitude: 420, // km
	velocity: 7.66, // km/s
	inclination: 51.6, // degrees
	eccentricity: 0.0002,
	period: 92.68, // minutes
};

export function generateUpcomingPasses(count = 3) {
	const now = new Date();
	const passes = [];

	for (let i = 0; i < count; i++) {
		const passDate = new Date(now);
		passDate.setHours(now.getHours() + randomInt(i * 8, (i + 1) * 8));

		passes.push({
			date: passDate,
			duration: randomInt(5, 12), // minutes
			maxElevation: randomInt(15, 85), // degrees
		});
	}

	return passes;
}

export function generateTelemetryData(count = 100) {
	const data = [];
	const now = new Date();

	for (let i = 0; i < count; i++) {
		const timestamp = new Date(now);
		timestamp.setMinutes(now.getMinutes() - (count - i));

		data.push({
			timestamp,
			solarVoltage1: randomFloat(4.5, 5.2),
			solarVoltage2: randomFloat(4.6, 5.3),
			solarVoltage3: randomFloat(4.4, 5.1),
			batteryVoltage: randomFloat(3.6, 4.2),
			temperature1: randomFloat(-10, 40),
			temperature2: randomFloat(-5, 35),
			temperature3: randomFloat(0, 45),
			current1: randomFloat(0.1, 0.5),
			current2: randomFloat(0.2, 0.6),
			current3: randomFloat(0.15, 0.55),
			current4: randomFloat(0.25, 0.65),
		});
	}

	return data;
}

export function generateTelemetryMessages(count = 20) {
	const messages = [];
	const now = new Date();

	for (let i = 0; i < count; i++) {
		const timestamp = new Date(now);
		timestamp.setMinutes(now.getMinutes() - i * 5);

		const messageType = randomInt(1, 4);
		let payload: number[] = [];

		switch (messageType) {
			case 1:
				payload = [
					randomInt(0, 255),
					randomInt(0, 255),
					randomInt(0, 255),
					randomInt(150, 200),
				];
				break;
			case 2:
				payload = [randomInt(0, 255), randomInt(0, 255), randomInt(0, 255)];
				break;
			case 3:
				payload = [
					randomInt(0, 100),
					randomInt(0, 100),
					randomInt(0, 100),
					randomInt(0, 100),
				];
				break;
			case 4:
				payload = [randomInt(0, 1), randomInt(0, 3), randomInt(0, 255)];
				break;
		}

		messages.push({
			id: i,
			timestamp,
			type: messageType,
			payload,
		});
	}

	return messages;
}

export const availableCommands = [
	{
		id: 1,
		name: "Reset System",
		description: "Perform a soft reset of the satellite system",
		parameters: [],
	},
	{
		id: 2,
		name: "Reboot",
		description: "Perform a complete reboot of the satellite",
		parameters: [
			{
				name: "delay",
				type: "number",
				min: 0,
				max: 60,
				default: 0,
				unit: "seconds",
				description: "Delay before reboot",
			},
		],
	},
	{
		id: 3,
		name: "Take Picture",
		description: "Capture an image with the onboard camera",
		parameters: [
			{
				name: "resolution",
				type: "select",
				options: ["low", "medium", "high"],
				default: "medium",
				description: "Image resolution",
			},
			{
				name: "exposure",
				type: "number",
				min: 1,
				max: 1000,
				default: 100,
				unit: "ms",
				description: "Exposure time",
			},
		],
	},
	{
		id: 4,
		name: "Adjust Power Mode",
		description: "Change the power consumption mode",
		parameters: [
			{
				name: "mode",
				type: "select",
				options: ["low", "normal", "high"],
				default: "normal",
				description: "Power mode",
			},
		],
	},
	{
		id: 5,
		name: "Adjust Orientation",
		description: "Change the satellite's orientation",
		parameters: [
			{
				name: "roll",
				type: "number",
				min: -180,
				max: 180,
				default: 0,
				unit: "degrees",
				description: "Roll angle",
			},
			{
				name: "pitch",
				type: "number",
				min: -90,
				max: 90,
				default: 0,
				unit: "degrees",
				description: "Pitch angle",
			},
			{
				name: "yaw",
				type: "number",
				min: -180,
				max: 180,
				default: 0,
				unit: "degrees",
				description: "Yaw angle",
			},
		],
	},
];
