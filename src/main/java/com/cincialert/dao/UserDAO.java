package com.cincialert.dao;

import com.cincialert.dto.User;
import com.cincialert.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.util.List;

@Repository
public class UserDAO implements IUserDAO{

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> findAll() throws IOException {
        return userRepository.findAll();
    }

    @Override
    public User save(User user) throws IOException {
        return userRepository.save(user);
    }

    @Override
    public void delete(User user) throws IOException {
        userRepository.delete(user);
    }

    @Override
    public User getById(Long userId) throws IOException {
        return userRepository.findById(userId).get();
    }
}
