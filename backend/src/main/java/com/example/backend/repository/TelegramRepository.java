package com.example.backend.repository;

import com.example.backend.entity.Telegram;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TelegramRepository extends JpaRepository<Telegram, Long> {
    List<Telegram> findAllByOrderByTimestampAsc();
    List<Telegram> findAllByOrderByTimestampDesc();
    Optional<Telegram> findTopByOrderByTimestampDesc();
}
