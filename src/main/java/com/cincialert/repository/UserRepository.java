package com.cincialert.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.cincialert.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
}
