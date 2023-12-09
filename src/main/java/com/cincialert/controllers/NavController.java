package com.cincialert.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class NavController {

    @GetMapping("/")
    public String home() {
        return "home";
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/signup")
    public String signup() {
        return "signup";
    }

    @GetMapping("/report")
    public String sendReportPage() {
        return "traffic-report-send";
    }

    @GetMapping("/traffic")
    public String traffic() {
        return "traffic";
    }
}