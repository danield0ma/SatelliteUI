package com.example.backend.entity.Dto;

import com.example.backend.entity.Telegram;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@NoArgsConstructor
public class TelegramPropertiesDto {
    @Getter
    @Setter
    private Long id;

    @Getter
    @Setter
    private String telegram;

    @Getter
    @Setter
    private LocalDateTime timestamp;

    @Getter
    @Setter
    private double V_Solar_Xp;

    @Getter
    @Setter
    private double V_Solar_Xm;

    @Getter
    @Setter
    private double V_Solar_Ym;

    @Getter
    @Setter
    private double MPPT_VBus;

    @Getter
    @Setter
    private double MPPT_CURR;

    @Getter
    @Setter
    private boolean Charger1Active;

    @Getter
    @Setter
    private boolean Charger2Active;

    @Getter
    @Setter
    private double BAT_VBUS;

    @Getter
    @Setter
    private double BAT_CURR;

    @Getter
    @Setter
    private double BAT_TEMP;

    @Getter
    @Setter
    private boolean DCDC1Active;

    @Getter
    @Setter
    private boolean DCDC2Active;

    @Getter
    @Setter
    private double INA_VBUS;

    @Getter
    @Setter
    private double INA_CURR;

    @Getter
    @Setter
    private double EPS_VBUS;

    @Getter
    @Setter
    private double EPS_CURR;

    @Getter
    @Setter
    private double OBC_VBUS;

    @Getter
    @Setter
    private double OBC_CURR;

    @Getter
    @Setter
    private boolean FLT_OBC_1;

    @Getter
    @Setter
    private double COM_VBUS;

    @Getter
    @Setter
    private double COM_CURR;

    @Getter
    @Setter
    private boolean FLT_COM_1;

    @Getter
    @Setter
    private long EPSUptime;

    @Getter
    @Setter
    private long OBCUptime;

    @Getter
    @Setter
    private double GYRO_X_ROT;

    @Getter
    @Setter
    private double GYRO_Y_ROT;

    @Getter
    @Setter
    private double GYRO_Z_ROT;

    @Getter
    @Setter
    private double X_MAG;

    @Getter
    @Setter
    private double Y_MAG;

    @Getter
    @Setter
    private double Z_MAG;

    @Getter
    @Setter
    private double Magn_OBC_TEMP;

    @Getter
    @Setter
    private int Laser_CH1;

    @Getter
    @Setter
    private int Laser_CH2;

}
