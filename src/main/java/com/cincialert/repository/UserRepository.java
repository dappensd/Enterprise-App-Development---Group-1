package com.cincialert.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.cincialert.dto.User;

public interface UserRepository extends JpaRepository<User, Long> {
}