const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export async function fetchTelemetry(endpoint: string) {
	const response = await fetch(`${API_BASE_URL}${endpoint}`);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response.json();
}
