"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/language-context";
import ParameterCard from "@/components/parameter-card";
import { fetchTelemetry } from "@/lib/api";
import { generateTelemetryData } from "@/lib/dummy-data";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

interface TelemetryData {
	id: number;
	telegram: string;
	timestamp: Date;
	v_Solar_Xp: number;
	v_Solar_Xm: number;
	v_Solar_Ym: number;
	mppt_VBus: number;
	mppt_CURR: number;
	bat_VBUS: number;
	bat_CURR: number;
	bat_TEMP: number;
	ina_VBUS: number;
	ina_CURR: number;
	eps_VBUS: number;
	eps_CURR: number;
	obc_VBUS: number;
	obc_CURR: number;
	com_VBUS: number;
	com_CURR: number;
	epsuptime: number;
	obcuptime: number;
	gyro_X_ROT: number;
	gyro_Y_ROT: number;
	gyro_Z_ROT: number;
	x_MAG: number;
	y_MAG: number;
	z_MAG: number;
	magn_OBC_TEMP: number;
	laser_CH1: number;
	laser_CH2: number;
}

export default function Dashboard() {
	const { t } = useLanguage();
	const [telemetryData, setTelemetryData] = useState<TelemetryData[] | null>(
		[]
	);
	const [latestData, setLatestData] = useState<TelemetryData | null>();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchMessages() {
			try {
				const latestTelegram = await fetchTelemetry("/getLatestTelegram");
				setLatestData(latestTelegram);
				const allData = await fetchTelemetry("/getTelegramsWithProperties");
				setTelemetryData(allData);
			} catch (err: any) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		}
		fetchMessages();
	}, []);

	const v_Solar_XpHistory = (telemetryData ?? []).map((d) => ({
		timestamp: d.timestamp,
		value: d.v_Solar_Xp,
	}));

	const v_Solar_XmHistory = (telemetryData ?? []).map((d) => ({
		timestamp: d.timestamp,
		value: d.v_Solar_Xm,
	}));

	const v_Solar_YmHistory = (telemetryData ?? []).map((d) => ({
		timestamp: d.timestamp,
		value: d.v_Solar_Ym,
	}));

	const MPPT_VBusHistory = (telemetryData ?? []).map((d) => ({
		timestamp: d.timestamp,
		value: d.mppt_VBus,
	}));

	const MPPT_CURRHistory = (telemetryData ?? []).map((d) => ({
		timestamp: d.timestamp,
		value: d.mppt_CURR,
	}));

	const BAT_VBusHistory = (telemetryData ?? []).map((d) => ({
		timestamp: d.timestamp,
		value: d.bat_VBUS,
	}));

	const BAT_CURRHistory = (telemetryData ?? []).map((d) => ({
		timestamp: d.timestamp,
		value: d.bat_CURR,
	}));

	const BAT_TEMPHistory = (telemetryData ?? []).map((d) => ({
		timestamp: d.timestamp,
		value: d.bat_TEMP,
	}));

	const INA_VBUSHistory = (telemetryData ?? []).map((d) => ({
		timestamp: d.timestamp,
		value: d.ina_VBUS,
	}));

	const INA_CURRHistory = (telemetryData ?? []).map((d) => ({
		timestamp: d.timestamp,
		value: d.ina_CURR,
	}));

	const EPS_VBUSHistory = (telemetryData ?? []).map((d) => ({
		timestamp: d.timestamp,
		value: d.eps_VBUS,
	}));

	const EPS_CURRHistory = (telemetryData ?? []).map((d) => ({
		timestamp: d.timestamp,
		value: d.eps_CURR,
	}));

	const OBC_VBUSHistory = (telemetryData ?? []).map((d) => ({
		timestamp: d.timestamp,
		value: d.obc_VBUS,
	}));

	const OBC_CURRHistory = (telemetryData ?? []).map((d) => ({
		timestamp: d.timestamp,
		value: d.obc_CURR,
	}));

	const COM_VBUSHistory = (telemetryData ?? []).map((d) => ({
		timestamp: d.timestamp,
		value: d.com_VBUS,
	}));

	const COM_CURRHistory = (telemetryData ?? []).map((d) => ({
		timestamp: d.timestamp,
		value: d.com_CURR,
	}));

	const epsuptimeHistory = (telemetryData ?? []).map((d) => ({
		timestamp: d.timestamp,
		value: d.epsuptime,
	}));

	const obcuptimeHistory = (telemetryData ?? []).map((d) => ({
		timestamp: d.timestamp,
		value: d.obcuptime,
	}));

	const gyro_X_ROTHistory = (telemetryData ?? []).map((d) => ({
		timestamp: d.timestamp,
		value: d.gyro_X_ROT,
	}));

	const gyro_Y_ROTHistory = (telemetryData ?? []).map((d) => ({
		timestamp: d.timestamp,
		value: d.gyro_Y_ROT,
	}));

	const gyro_Z_ROTHistory = (telemetryData ?? []).map((d) => ({
		timestamp: d.timestamp,
		value: d.gyro_Z_ROT,
	}));

	const x_MAGHistory = (telemetryData ?? []).map((d) => ({
		timestamp: d.timestamp,
		value: d.x_MAG,
	}));

	const y_MAGHistory = (telemetryData ?? []).map((d) => ({
		timestamp: d.timestamp,
		value: d.y_MAG,
	}));

	const z_MAGHistory = (telemetryData ?? []).map((d) => ({
		timestamp: d.timestamp,
		value: d.z_MAG,
	}));

	const magn_OBC_TempHistory = (telemetryData ?? []).map((d) => ({
		timestamp: d.timestamp,
		value: d.magn_OBC_TEMP,
	}));

	const laserCH1History = (telemetryData ?? []).map((d) => ({
		timestamp: d.timestamp,
		value: d.laser_CH1,
	}));

	const laserCH2History = (telemetryData ?? []).map((d) => ({
		timestamp: d.timestamp,
		value: d.laser_CH2,
	}));

	if (loading || !latestData) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;

	return (
		<div className="container py-6 scrollable-container custom-scrollbar overflow-auto h-[calc(100vh-70px)]">
			<h1 className="text-2xl font-bold mb-6">{t("app.dashboard")}</h1>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
				<ParameterCard
					title={"V_Solar_Xp"}
					value={latestData.v_Solar_Xp}
					unit="V"
					min={0}
					max={5}
					historyData={v_Solar_XpHistory}
				/>

				<ParameterCard
					title={"V_Solar_Xm"}
					value={latestData.v_Solar_Xm}
					unit="V"
					min={0}
					max={5}
					historyData={v_Solar_XmHistory}
				/>

				<ParameterCard
					title={"V_Solar_Ym"}
					value={latestData.v_Solar_Ym}
					unit="V"
					min={0}
					max={5}
					historyData={v_Solar_YmHistory}
				/>

				<ParameterCard
					title={"MPPT_VBus"}
					value={latestData.mppt_VBus}
					unit="V"
					min={0}
					max={5}
					historyData={MPPT_VBusHistory}
				/>

				<ParameterCard
					title={"MPPT_CURR"}
					value={latestData.mppt_CURR}
					unit="A"
					min={0}
					max={0.5}
					historyData={MPPT_CURRHistory}
				/>

				<ParameterCard
					title={"BAT_VBUS"}
					value={latestData.bat_VBUS}
					unit="V"
					min={0}
					max={5}
					historyData={BAT_VBusHistory}
				/>

				<ParameterCard
					title={"BAT_CURR"}
					value={latestData.bat_CURR}
					unit="A"
					min={0}
					max={0.5}
					historyData={BAT_CURRHistory}
				/>

				<ParameterCard
					title={"BAT_TEMP"}
					value={latestData.bat_TEMP}
					unit="°C"
					min={0}
					max={50}
					historyData={BAT_TEMPHistory}
				/>

				<ParameterCard
					title={"INA_VBUS"}
					value={latestData.ina_VBUS}
					unit="V"
					min={0}
					max={5}
					historyData={INA_VBUSHistory}
				/>

				<ParameterCard
					title={"INA_CURR"}
					value={latestData.ina_CURR}
					unit="A"
					min={0}
					max={0.5}
					historyData={INA_CURRHistory}
				/>

				<ParameterCard
					title={"EPS_VBUS"}
					value={latestData.eps_VBUS}
					unit="V"
					min={0}
					max={5}
					historyData={EPS_VBUSHistory}
				/>

				<ParameterCard
					title={"EPS_CURR"}
					value={latestData.eps_CURR}
					unit="A"
					min={0}
					max={0.5}
					historyData={EPS_CURRHistory}
				/>

				<ParameterCard
					title={"OBC_VBUS"}
					value={latestData.obc_VBUS}
					unit="V"
					min={0}
					max={5}
					historyData={OBC_VBUSHistory}
				/>

				<ParameterCard
					title={"OBC_CURR"}
					value={latestData.obc_CURR}
					unit="A"
					min={0}
					max={0.5}
					historyData={OBC_CURRHistory}
				/>

				<ParameterCard
					title={"COM_VBUS"}
					value={latestData.com_VBUS}
					unit="V"
					min={0}
					max={5}
					historyData={COM_VBUSHistory}
				/>

				<ParameterCard
					title={"COM_CURR"}
					value={latestData.com_CURR}
					unit="A"
					min={0}
					max={0.5}
					historyData={COM_CURRHistory}
				/>

				<ParameterCard
					title={"EPS_Uptime"}
					value={latestData.epsuptime}
					unit="s"
					min={0}
					max={10000}
					historyData={epsuptimeHistory}
				/>

				<ParameterCard
					title={"OBC_Uptime"}
					value={latestData.obcuptime}
					unit="s"
					min={0}
					max={10000}
					historyData={obcuptimeHistory}
				/>

				<ParameterCard
					title={"GYRO_X_ROT"}
					value={latestData.gyro_X_ROT}
					unit="°"
					min={0}
					max={100}
					historyData={gyro_X_ROTHistory}
				/>

				<ParameterCard
					title={"GYRO_Y_ROT"}
					value={latestData.gyro_Y_ROT}
					unit="°"
					min={0}
					max={100}
					historyData={gyro_Y_ROTHistory}
				/>

				<ParameterCard
					title={"GYRO_Z_ROT"}
					value={latestData.gyro_Z_ROT}
					unit="°"
					min={0}
					max={100}
					historyData={gyro_Z_ROTHistory}
				/>

				<ParameterCard
					title={"X_MAG"}
					value={latestData.x_MAG}
					unit="T"
					min={0}
					max={100}
					historyData={x_MAGHistory}
				/>

				<ParameterCard
					title={"Y_MAG"}
					value={latestData.y_MAG}
					unit="T"
					min={0}
					max={100}
					historyData={y_MAGHistory}
				/>

				<ParameterCard
					title={"Z_MAG"}
					value={latestData.z_MAG}
					unit="s"
					min={0}
					max={100}
					historyData={z_MAGHistory}
				/>

				<ParameterCard
					title={"Magn_OBC_TEMP"}
					value={latestData.magn_OBC_TEMP}
					unit="°"
					min={0}
					max={100}
					historyData={magn_OBC_TempHistory}
				/>

				<ParameterCard
					title={"Laser_CH1"}
					value={latestData.laser_CH1}
					unit=""
					min={0}
					max={1000}
					historyData={laserCH1History}
				/>

				<ParameterCard
					title={"Laser_CH2"}
					value={latestData.laser_CH2}
					unit=""
					min={0}
					max={1000}
					historyData={laserCH2History}
				/>
			</div>
		</div>
	);
}
