package com.cincialert.cincialert;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


/**
 * The CinciAlertController class is responsible for handling HTTP requests and
 * rendering the corresponding web pages for the CinciAlert application.
 *
 * This controller is annotated with {@code @Controller}, which indicates that it
 * plays a role in processing web requests. It defines three request mappings for the
 * root ("/"), "/login", and "/signup" paths, each of which handles specific web page
 * requests.
 *
 * @author [Insert Name]
 * @version 1.0
 * @since [Date]
 */
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
