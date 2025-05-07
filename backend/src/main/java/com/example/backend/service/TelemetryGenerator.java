package com.example.backend.service;

import com.example.backend.entity.Telegram;
import com.example.backend.repository.TelegramRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Random;
import java.util.StringJoiner;

@Service
public class TelemetryGenerator {
    @Autowired
    private TelegramRepository telegramRepository;

    public void generateTelemetry(int n) {
        Random random = new Random();
        ArrayList<Telegram> telegrams = new ArrayList<>();
        for (int i = 1; i <= n; i++) {
            Telegram telegram = new Telegram();
            StringJoiner telegramMessage = new StringJoiner(",");

            // Fields 1–4: Floats 0.00–5.00
            for (int j = 0; j < 4; j++) {
                telegramMessage.add(String.format("%.2f", random.nextDouble() * 5));
            }

            // Field 5: Float 0.00–0.50
            telegramMessage.add(String.format("%.2f", random.nextDouble() * 0.5));

            // Fields 6–7: Binary (0 or 1)
            telegramMessage.add(String.valueOf(random.nextInt(2)));
            telegramMessage.add(String.valueOf(random.nextInt(2)));

            // Field 8: Float 0.00–5.00
            telegramMessage.add(String.format("%.2f", random.nextDouble() * 5));

            // Field 9: Float 0.00–0.50
            telegramMessage.add(String.format("%.2f", random.nextDouble() * 0.5));

            // Field 10: Float 0.00–50.00
            telegramMessage.add(String.format("%.2f", random.nextDouble() * 50));

            // Fields 11–12: Binary (0 or 1)
            telegramMessage.add(String.valueOf(random.nextInt(2)));
            telegramMessage.add(String.valueOf(random.nextInt(2)));

            // Fields 13–18: Three pairs of (0.00–5.00, 0.00–0.50)
            for (int j = 0; j < 3; j++) {
                telegramMessage.add(String.format("%.2f", random.nextDouble() * 5));
                telegramMessage.add(String.format("%.2f", random.nextDouble() * 0.5));
            }

            // Field 19: Binary (0 or 1)
            telegramMessage.add(String.valueOf(random.nextInt(2)));

            // Field 20: Float 0.00–5.00
            telegramMessage.add(String.format("%.2f", random.nextDouble() * 5));

            // Field 21: Float 0.00–0.50
            telegramMessage.add(String.format("%.2f", random.nextDouble() * 0.5));

            // Field 22: Binary (0 or 1)
            telegramMessage.add(String.valueOf(random.nextInt(2)));

            // Field 23: 10-digit integer (0–9999, padded)
            int field23 = random.nextInt(10_000);
            telegramMessage.add(String.format("%010d", field23));

            // Field 24: 10-digit integer (0–9999, padded)
            int field24 = random.nextInt(10_000);
            telegramMessage.add(String.format("%010d", field24));

            // Fields 25–31: 3-digit doubles (100–999)
            for (int j = 0; j < 7; j++) {
                telegramMessage.add(String.format("%.2f", random.nextDouble() * 100));
            }

            // Fields 32–34: 5-digit integers (0–999)
            for (int j = 0; j < 2; j++) {
                int value = random.nextInt(1_000);
                telegramMessage.add(String.format("%05d", value));
            }

            telegram.setTelegram(telegramMessage.toString());

            LocalDate date = LocalDate.of(2025, 5, 7);
            int secondsInDay = 24 * 60 * 60;
            int randomSeconds = random.nextInt() % secondsInDay;
            telegram.setTimestamp(date.atStartOfDay().plusSeconds(randomSeconds));

            telegrams.add(telegram);
        }
        telegramRepository.saveAll(telegrams);
    }
}
