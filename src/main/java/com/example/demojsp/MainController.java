package com.example.demojsp;

import com.example.demojsp.utils.FilterConfigJsonUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

@Controller
public class MainController {
    @RequestMapping(value="/")
    public ModelAndView list(Model model) {
        ModelAndView mv = new ModelAndView("main");
        mv.setViewName("main");
        mv.addObject("title", "main");
        return mv;
    }

    @RequestMapping(value = "/main.json", method = {RequestMethod.GET, RequestMethod.POST})
    public @ResponseBody
    String updateJson(HttpServletRequest request) throws InterruptedException {

        User user = new User("sehee", 1);
        String json = FilterConfigJsonUtils.toJson(user);
        return json;
    }
}
