package com.example.backend.controller;

import com.example.backend.entity.Dto.TelegramDto;
import com.example.backend.entity.Dto.TelegramPropertiesDto;
import com.example.backend.service.TelemetryGenerator;
import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
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
import java.util.Optional;

@RestController
@RequestMapping("/telegrams")
public class TelegramController {
    @Autowired
    private TelemetryGenerator telemetryGenerator;

    @Autowired
    private TelegramRepository telegramRepository;

    @Operation(summary = "Save a telegram", description = "Creates a new telegram in the database")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Telegram created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid telegram")
    })
    @PostMapping
    @Transactional
    public ResponseEntity<Telegram> createTelegram(@RequestBody TelegramDto telegramDto) {
        try {
            Telegram telegram = telegramDto.mapTelegramDtoToTelegram();
            telegramRepository.save(telegram);
            return ResponseEntity.ok(telegram);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @Operation(summary = "Get latest telegram with properties", description = "Returns latest telegram")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Telegrams found"),
            @ApiResponse(responseCode = "404", description = "Telegrams not found")
    })
    @GetMapping("/getLatestTelegram")
    public ResponseEntity<TelegramPropertiesDto> getLatestTelegramsWithProperties() {
        Optional<Telegram> telegram = telegramRepository.findTopByOrderByTimestampDesc();
        return telegram.map(value -> ResponseEntity.ok(value.mapTelegramToTelegramPropertiesDto())).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @Operation(summary = "Get every telegram in raw format", description = "Returns every telegram")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Telegrams found"),
            @ApiResponse(responseCode = "404", description = "Telegrams not found")
    })
    @GetMapping("/getRawTelegrams")
    public List<TelegramDto> getAllTelegramsRaw() {
        return telegramRepository.findAll().stream()
                .map(Telegram::mapTelegramToTelegramDto)
                .toList();
    }

    @Operation(summary = "Get every telegram in processed format", description = "Returns every telegram")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Telegrams found"),
            @ApiResponse(responseCode = "404", description = "Telegrams not found")
    })
    @GetMapping("/getTelegramsWithProperties")
    public List<TelegramPropertiesDto> getAllTelegramsWithProperties() {
        return telegramRepository.findAllByOrderByTimestampDesc().stream()
                .map(Telegram::mapTelegramToTelegramPropertiesDto)
                .toList();
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


    @PostMapping("/generateTelegrams")
    public void generateTelegrams(int n) {
        telemetryGenerator.generateTelemetry(n);
    }
}
