package com.cincialert.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.cincialert.dto.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    User getById(Long id);
}
