package com.example.bookbuddy.backend.infrastructure.config;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class FrontendController {

    @RequestMapping(value = {"/{path:[^\\.]*}"})
    public String forward() {
        // Forward all non-file routes (like /search, /library, /WishBook)
        // to React's index.html so React Router can handle them.
        return "forward:/index.html";
    }
}

