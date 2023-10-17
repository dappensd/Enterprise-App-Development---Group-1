package com.cincialert.cincialert;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class CinciAlertController {
    @RequestMapping("/")

    @GetMapping("/")
    public String home() { return "home"; }

    @GetMapping("/login")
    public String login() { return "login"; }

    @GetMapping("/signup")
    public String signup() { return "signup"; }



}
