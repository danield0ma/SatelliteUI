package com.example.backend.entity.Dto;

import com.example.backend.entity.Telegram;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

public class TelegramDto {
    @Getter
    @Setter
    private String telegram;

    @Getter
    @Setter
    private LocalDateTime timestamp;

    public Telegram mapTelegramDtoToTelegram() {
        Telegram telegram = new Telegram();
        telegram.setTelegram(this.telegram);
        telegram.setTimestamp(this.timestamp);
        return telegram;
    }
}
