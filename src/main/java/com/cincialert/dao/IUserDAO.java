package com.cincialert.dao;

import com.cincialert.dto.User;

import java.io.IOException;
import java.util.List;

public interface IUserDAO {

    List<User> findAll() throws IOException;

    User save(User user) throws IOException;

    void delete(User user) throws IOException;

    User getById(Long userId) throws IOException;

}
