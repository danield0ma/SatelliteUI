package com.example.backend.repository;

import com.example.backend.entity.Telegram;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TelegramRepository extends JpaRepository<Telegram, Long> {

}
