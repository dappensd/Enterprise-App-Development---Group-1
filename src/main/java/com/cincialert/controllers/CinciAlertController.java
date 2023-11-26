package com.cincialert.controllers;
import com.cincialert.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class CinciAlertController {
    private final IUserService userService;

    @Autowired
    public CinciAlertController(IUserService userService) {
        this.userService = userService;
    }

    @RequestMapping("/")
    public String index() { return "home"; }


    @RequestMapping("/login")
    public String login() { return "login"; }
    @RequestMapping("/signup")
    public String signup() { return "signup"; }
}
