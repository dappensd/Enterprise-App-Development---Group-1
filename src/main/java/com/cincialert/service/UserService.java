package com.cincialert.service;

import com.cincialert.dao.UserDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cincialert.dto.User;
import com.cincialert.repository.UserRepository;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements IUserService{

    @Autowired
    private UserDAO userDAO;

    public User save(User user) throws IOException {
        return userDAO.save(user);
    }

    public User getUserById(Long id) throws IOException { return userDAO.getById(id); }

    public List<User> findAll() throws IOException {
        return userDAO.findAll();
    }


    public void delete(User user) throws IOException {
        userDAO.delete(user);
    }
}
