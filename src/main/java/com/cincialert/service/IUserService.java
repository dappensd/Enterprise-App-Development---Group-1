package com.cincialert.service;

import com.cincialert.dto.User;

import java.io.IOException;
import java.util.List;

public interface IUserService {
    User save(User user) throws IOException;

    List<User> findAll() throws IOException;

    User getUserById(Long id) throws IOException;

    void delete(User user) throws IOException;
}
