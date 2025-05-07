"use client";

import {
	createContext,
	useContext,
	useState,
	useEffect,
	type ReactNode,
} from "react";

type Language = "en" | "hu";

type Translations = {
	[key: string]: {
		[key in Language]: string;
	};
};

const translations: Translations = {
	"app.title": {
		en: "SatelliteUI",
		hu: "SatelliteUI",
	},
	"app.home": {
		en: "Home",
		hu: "Főoldal",
	},
	"app.dashboard": {
		en: "Dashboard",
		hu: "Áttekintés",
	},
	"app.telemetry": {
		en: "Telemetry",
		hu: "Telemetria",
	},
	"app.commands": {
		en: "Commands",
		hu: "Parancsok",
	},
	"app.darkMode": {
		en: "Dark Mode",
		hu: "Sötét Mód",
	},
	"app.lightMode": {
		en: "Light Mode",
		hu: "Világos Mód",
	},
	"app.yes": {
		en: "Yes",
		hu: "Igen",
	},
	"app.no": {
		en: "No",
		hu: "Nem",
	},
	"home.satelliteInfo": {
		en: "Satellite Information",
		hu: "Műhold Információk",
	},
	"home.orbitParameters": {
		en: "Current orbital parameters",
		hu: "Aktuális pálya paraméterek",
	},
	"home.upcomingPasses": {
		en: "Upcoming Passes",
		hu: "Közelgő áthaladások",
	},
	"home.altitude": {
		en: "Altitude",
		hu: "Magasság",
	},
	"home.velocity": {
		en: "Velocity",
		hu: "Sebesség",
	},
	"home.inclination": {
		en: "Inclination",
		hu: "Inklináció",
	},
	"home.eccentricity": {
		en: "Eccentricity",
		hu: "Excentricitás",
	},
	"home.period": {
		en: "Orbital period",
		hu: "Orbitális periódus",
	},
	"home.nextPass": {
		en: "Next Pass",
		hu: "Következő Áthaladás",
	},
	"dashboard.chartTitle": {
		en: "Detailed chart",
		hu: "Részletes diagram",
	},
	"dashboard.solarVoltage": {
		en: "Solar Voltage",
		hu: "Napelem Feszültség",
	},
	"dashboard.batteryVoltage": {
		en: "Battery Voltage",
		hu: "Akkumulátor Feszültség",
	},
	"dashboard.temperature": {
		en: "Temperature",
		hu: "Hőmérséklet",
	},
	"dashboard.current": {
		en: "Current",
		hu: "Áramerősség",
	},
	"dashboard.history": {
		en: "History",
		hu: "Előzmények",
	},
	"dashboard.timeRange": {
		en: "Time Range",
		hu: "Időtartomány",
	},
	"telemetry.telemetries": {
		en: "Telemetry messages",
		hu: "Telemetria üzenetek",
	},
	"telemetry.messagedetails": {
		en: "Message details",
		hu: "Üzenet részletei",
	},
	"telemetry.details": {
		en: "Details",
		hu: "Részletek",
	},
	"telemetry.raw": {
		en: "Raw",
		hu: "Nyers",
	},
	"telemetry.binary": {
		en: "Binary",
		hu: "Bináris",
	},
	"telemetry.decimal": {
		en: "Decimal",
		hu: "Decimális",
	},
	"telemetry.hexadecimal": {
		en: "Hexadecimal",
		hu: "Hexadecimális",
	},
	"commands.available": {
		en: "Available Commands",
		hu: "Elérhető Parancsok",
	},
	"commands.preview": {
		en: "Message Preview",
		hu: "Előnézet",
	},
	"commands.details": {
		en: "Command Details",
		hu: "Parancs Részletek",
	},
	"commands.send": {
		en: "Send Command",
		hu: "Parancs Küldése",
	},
	"commands.reset": {
		en: "Reset",
		hu: "Visszaállítás",
	},
	"commands.reboot": {
		en: "Reboot",
		hu: "Újraindítás",
	},
	"commands.takePicture": {
		en: "Take Picture",
		hu: "Fénykép Készítése",
	},
	"commands.adjustPower": {
		en: "Adjust Power",
		hu: "Teljesítmény Beállítása",
	},
	"commands.adjustOrientation": {
		en: "Adjust Orientation",
		hu: "Orientáció Beállítása",
	},
	"commands.confirm": {
		en: "Confirm action",
		hu: "Művelet megerősítése",
	},
	"commands.confirmQuestion": {
		en: "Do you really want to send the following command?",
		hu: "Biztos el szeretnéd küldeni a következő parancsot?",
	},
};

type LanguageContextType = {
	language: Language;
	setLanguage: (lang: Language) => void;
	t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
	undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
	const [language, setLanguage] = useState<Language>("en");

	useEffect(() => {
		const savedLanguage = localStorage.getItem("language") as Language;
		if (savedLanguage && (savedLanguage === "en" || savedLanguage === "hu")) {
			setLanguage(savedLanguage);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("language", language);
	}, [language]);

	const t = (key: string): string => {
		if (translations[key] && translations[key][language]) {
			return translations[key][language];
		}
		return key;
	};

	return (
		<LanguageContext.Provider value={{ language, setLanguage, t }}>
			{children}
		</LanguageContext.Provider>
	);
}

export function useLanguage() {
	const context = useContext(LanguageContext);
	if (context === undefined) {
		throw new Error("useLanguage must be used within a LanguageProvider");
	}
	return context;
}
