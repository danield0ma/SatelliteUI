package com.example.backend.controller;

import jakarta.transaction.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.backend.entity.Telegram;
import com.example.backend.repository.TelegramRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import java.util.List;

@RestController
@RequestMapping("/telegrams")
public class TelegramController {
    @Autowired
    private TelegramRepository telegramRepository;

    @Operation(summary = "Save a telegram", description = "Creates a new telegram in the database")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Telegram created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid telegram")
    })
    @PostMapping
    @Transactional
    public Telegram createTelegram(@RequestBody Telegram telegram) {
        return telegramRepository.save(telegram);
    }

    @GetMapping
    public List<Telegram> getAllTelegrams() {
        return telegramRepository.findAll();
    }

    //TODO pagination

    @Operation(summary = "Get a telegram by ID", description = "Retrieves a telegram by its ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Telegram found"),
            @ApiResponse(responseCode = "404", description = "Telegram not found")
    })
    @GetMapping("/{id}")
    public Telegram getTelegram(@PathVariable Long id) {
        return telegramRepository.findById(id).orElse(null);
    }

}
