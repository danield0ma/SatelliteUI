package com.example.backend.Repository;

import com.example.backend.Entity.Telegram;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TelegramRepository extends JpaRepository<Telegram, Long> {

}
