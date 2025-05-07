package com.example.backend.entity;

import com.example.backend.entity.Dto.TelegramDto;
import com.example.backend.entity.Dto.TelegramPropertiesDto;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "telegrams")
public class Telegram {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Getter
    @Setter
    private String telegram;

    @Getter
    @Setter
    private LocalDateTime timestamp;

    public TelegramPropertiesDto mapTelegramToTelegramPropertiesDto() {
        TelegramPropertiesDto telegramPropertiesDto = new TelegramPropertiesDto();
        telegramPropertiesDto.setId(this.id);
        telegramPropertiesDto.setTelegram(this.telegram);
        telegramPropertiesDto.setTimestamp(this.timestamp);

        String[] values = this.telegram.split(",");
        telegramPropertiesDto.setV_Solar_Xp(Double.parseDouble(values[0]));
        telegramPropertiesDto.setV_Solar_Xm(Double.parseDouble(values[1]));
        telegramPropertiesDto.setV_Solar_Ym(Double.parseDouble(values[2]));
        telegramPropertiesDto.setMPPT_VBus(Double.parseDouble(values[3]));
        telegramPropertiesDto.setMPPT_CURR(Double.parseDouble(values[4]));
        telegramPropertiesDto.setCharger1Active(Boolean.parseBoolean(values[5]));
        telegramPropertiesDto.setCharger2Active(Boolean.parseBoolean(values[6]));
        telegramPropertiesDto.setBAT_VBUS(Double.parseDouble(values[7]));
        telegramPropertiesDto.setBAT_CURR(Double.parseDouble(values[8]));
        telegramPropertiesDto.setBAT_TEMP(Double.parseDouble(values[9]));
        telegramPropertiesDto.setDCDC1Active(Boolean.parseBoolean(values[10]));
        telegramPropertiesDto.setDCDC2Active(Boolean.parseBoolean(values[11]));
        telegramPropertiesDto.setINA_VBUS(Double.parseDouble(values[12]));
        telegramPropertiesDto.setINA_CURR(Double.parseDouble(values[13]));
        telegramPropertiesDto.setEPS_VBUS(Double.parseDouble(values[14]));
        telegramPropertiesDto.setEPS_CURR(Double.parseDouble(values[15]));
        telegramPropertiesDto.setOBC_VBUS(Double.parseDouble(values[16]));
        telegramPropertiesDto.setOBC_CURR(Double.parseDouble(values[17]));
        telegramPropertiesDto.setFLT_OBC_1(Boolean.parseBoolean(values[18]));
        telegramPropertiesDto.setCOM_VBUS(Double.parseDouble(values[19]));
        telegramPropertiesDto.setCOM_CURR(Double.parseDouble(values[20]));
        telegramPropertiesDto.setFLT_COM_1(Boolean.parseBoolean(values[21]));
        telegramPropertiesDto.setEPSUptime(Long.parseLong(values[22]));
        telegramPropertiesDto.setOBCUptime(Long.parseLong(values[23]));
        telegramPropertiesDto.setGYRO_X_ROT(Double.parseDouble(values[24]));
        telegramPropertiesDto.setGYRO_Y_ROT(Double.parseDouble(values[25]));
        telegramPropertiesDto.setGYRO_Z_ROT(Double.parseDouble(values[26]));
        telegramPropertiesDto.setX_MAG(Double.parseDouble(values[27]));
        telegramPropertiesDto.setY_MAG(Double.parseDouble(values[28]));
        telegramPropertiesDto.setZ_MAG(Double.parseDouble(values[29]));
        telegramPropertiesDto.setMagn_OBC_TEMP(Double.parseDouble(values[30]));
        telegramPropertiesDto.setLaser_CH1(Integer.parseInt(values[31]));
        telegramPropertiesDto.setLaser_CH2(Integer.parseInt(values[32]));

        return telegramPropertiesDto;
    }

    public TelegramDto mapTelegramToTelegramDto() {
        TelegramDto telegramDto = new TelegramDto();
        telegramDto.setTelegram(this.telegram);
        telegramDto.setTimestamp(this.timestamp);
        return telegramDto;
    }
}
