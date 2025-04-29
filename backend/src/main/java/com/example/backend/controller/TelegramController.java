package com.example.backend.controller;

import com.example.backend.Entity.Telegram;
import com.example.backend.Repository.TelegramRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/telegrams")
public class TelegramController {
    @Autowired
    private TelegramRepository telegramRepository;

    @PostMapping
    public Telegram createTelegram(@RequestBody Telegram telegram) {
        return telegramRepository.save(telegram);
    }

    @GetMapping("/{id}")
    public Telegram getTelegram(@PathVariable Long id) {
        return telegramRepository.findById(id).orElse(null);
    }

}
