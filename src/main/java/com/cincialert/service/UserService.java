package com.cincialert.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cincialert.dto.User;
import com.cincialert.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements IUserService{

    @Autowired
    private UserRepository userRepository;

    public User save(User user) {
        return userRepository.save(user);
    }

    public User getUserById(Long id) { return userRepository.getById(id); }

    public List<User> findAll() {
        return userRepository.findAll();
    }


    public void delete(User user) {
        userRepository.delete(user);
    }
}
