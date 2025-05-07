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
		name: "Set Time",
		description:
			"Sets the UTC time on the clock of the sattelite's on-board computer",
		parameters: [
			{
				name: "time",
				type: "time",
				description: "Current UTC time",
			},
		],
		command: "$TIME,2025-01-01T10:00:00*ASDF",
	},
	{
		id: 2,
		name: "Take Picture",
		description:
			"Capture an image with the onboard camera and store it in the flash memory",
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
		command: "$PICT*ASDF",
	},
	{
		id: 4,
		name: "Adjust Power Mode",
		description: "Change the power consumption mode",
		parameters: [
			{
				name: "Power mode",
				type: "select",
				options: ["solar-only", "low-power", "normal"],
				default: "normal",
				description: "Power mode",
			},
		],
		command: "$POWR,1*ASDF",
	},
	{
		id: 5,
		name: "Read from flash memory",
		description: "Reads from the flash memory of the selected processor",
		parameters: [
			{
				name: "MCU number",
				type: "select",
				options: ["solar-only", "low-power", "normal"],
				default: "normal",
				description: "Power mode",
			},
			{
				name: "Flash start address",
				type: "select",
				options: ["solar-only", "low-power", "normal"],
				default: "normal",
				description: "Power mode",
			},
			{
				name: "Length",
				type: "select",
				options: ["solar-only", "low-power", "normal"],
				default: "normal",
				description: "Power mode",
			},
		],
		command: "$RDFL,03,0x08005000,0x400*ASDF",
	},
	{
		id: 6,
		name: "Write to flash memory",
		description:
			"Writes a binary file to the flash memory of the selected processor",
		parameters: [
			{
				name: "MCU number",
				type: "select",
				options: ["solar-only", "low-power", "normal"],
				default: "normal",
				description: "Power mode",
			},
			{
				name: "Flash start address",
				type: "select",
				options: ["solar-only", "low-power", "normal"],
				default: "normal",
				description: "Power mode",
			},
			{
				name: "Binary file",
				type: "select",
				options: ["solar-only", "low-power", "normal"],
				default: "normal",
				description: "Power mode",
			},
		],
		command: "$WRFL,03,0x08005000,123456789*ASDF",
	},
	{
		id: 7,
		name: "Perform update",
		description: "Restart the selected module to perform software update",
		parameters: [
			{
				name: "MCU number",
				type: "select",
				options: ["solar-only", "low-power", "normal"],
				default: "normal",
				description: "Power mode",
			},
		],
		command: "$RST,03*ASDF",
	},
	{
		id: 8,
		name: "Init laser measurement",
		description:
			"Start the laser measurement process with the given parameters",
		parameters: [
			{
				name: "Number of measurements",
				type: "select",
				options: ["solar-only", "low-power", "normal"],
				default: "normal",
				description: "Power mode",
			},
			{
				name: "Delay between measurements",
				type: "select",
				options: ["solar-only", "low-power", "normal"],
				default: "normal",
				description: "Power mode",
			},
			{
				name: "Start time",
				type: "select",
				options: ["solar-only", "low-power", "normal"],
				default: "normal",
				description: "Power mode",
			},
		],
		command: "$LASR,60,1,2025-06-01T10:00:00*ASDF",
	},
];
