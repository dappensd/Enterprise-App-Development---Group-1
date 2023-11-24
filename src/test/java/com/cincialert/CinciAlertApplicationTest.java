package com.cincialert;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;

@SpringBootTest
public class CinciAlertApplicationTest {

    @Autowired
    private ApplicationContext ctx;

    @Test
    public void contextLoads() {
        assert(ctx != null);
    }
}