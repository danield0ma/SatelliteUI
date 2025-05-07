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

export const availableCommands = [
	{
		id: 1,
		name: "Set Time",
		description:
			"Sets the UTC time on the clock of the sattelite's on-board computer",
		parameters: [
			{
				name: "UTC time",
				type: "autotime",
				value: "2025-05-01T10:00:00.000Z",
			},
		],
		command: "TIME",
	},
	{
		id: 2,
		name: "Take Picture",
		description:
			"Capture an image with the onboard camera and store it in the flash memory",
		parameters: [],
		command: "PICT",
	},
	{
		id: 3,
		name: "Adjust Power Mode",
		description: "Change the power consumption mode",
		parameters: [
			{
				name: "Power mode",
				type: "select",
				options: ["1", "2", "3"],
				value: "3",
				description: "Power mode",
			},
		],
		command: "POWR",
	},
	{
		id: 4,
		name: "Read from flash memory",
		description: "Reads from the flash memory of the selected processor",
		parameters: [
			{
				name: "MCU number",
				type: "number",
				value: "01",
			},
			{
				name: "Flash start address",
				type: "hexa",
				value: "0x08005000",
			},
			{
				name: "Length",
				type: "hexa",
				value: "0x400",
			},
		],
		command: "RDFL",
	},
	{
		id: 5,
		name: "Write to flash memory",
		description:
			"Writes a binary file to the flash memory of the selected processor",
		parameters: [
			{
				name: "MCU number",
				type: "number",
				value: "01",
			},
			{
				name: "Flash start address",
				type: "hexa",
				value: "0x08005000",
			},
			{
				name: "Binary file",
				type: "file",
				value: "",
			},
		],
		command: "WRFL",
	},
	{
		id: 6,
		name: "Perform update",
		description: "Restart the selected module to perform software update",
		parameters: [
			{
				name: "MCU number",
				type: "number",
				value: "01",
			},
		],
		command: "UPDT",
	},
	{
		id: 7,
		name: "Init laser measurement",
		description:
			"Start the laser measurement process with the given parameters",
		parameters: [
			{
				name: "Number of measurements",
				type: "number",
				value: "60",
			},
			{
				name: "Delay between measurements in seconds",
				type: "number",
				value: "1",
			},
			{
				name: "Start time",
				type: "time",
				value: "2025-06-01T10:00:00",
			},
		],
		command: "LASR",
	},
];
