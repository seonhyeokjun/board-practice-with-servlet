package com.unipost;

import org.apache.commons.lang3.StringUtils;
import org.codehaus.jackson.map.ObjectMapper;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by Administrator on 2017-03-02.
 */
@WebServlet("/data/board")
public class BoardServlet extends HttpServlet {
    List<Map<String, String>> maps = new ArrayList<Map<String, String>>();
    int _sequence = 0;
    int _hit = 0;

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse res) throws IOException {
        String action = req.getParameter("action");

        String sequence = req.getParameter("sequence");
        String title = req.getParameter("title");
        String contents = req.getParameter("contents");
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        Date time = new Date();

        String today = format.format(time);
        req.setCharacterEncoding("UTF-8");
        res.setContentType("text/html;charset=utf-8");
        if (action.equals("create")) {
            _sequence++;
            Map<String, String> map = new HashMap<String, String>();
            map.put("sequence", String.valueOf(_sequence));
            map.put("title", title);
            map.put("contents", contents);
            map.put("time", today);
            map.put("hit", String.valueOf(_hit));
            maps.add(map);
        } else if (action.equals("read")) {
            res.getWriter().append(new ObjectMapper().writeValueAsString(maps));
            return;
        } else if (action.equals("update")) {
            for (Map<String, String> map : maps) {
                if (StringUtils.equals(map.get("sequence"), sequence)) {
                    map.put("title", title);
                    map.put("contents", contents);
                }
            }
        } else if (action.equals("detail")){
            int matchIndex = getMatchIndex(sequence);
            Map<String, String> map = maps.get(matchIndex);
            int hit = Integer.parseInt(map.get("hit"));
            hit++;
            map.put("hit", String.valueOf(hit));
            res.getWriter().append(new ObjectMapper().writeValueAsString(map));
            return;
        } else if (action.equals("delete")) {
            int matchIndex = getMatchIndex(sequence);
            maps.remove(matchIndex);
        } else {
            throw new RuntimeException("action does not exist. action: " + action);
        }
        res.getWriter().append(new ObjectMapper().writeValueAsString(maps));
    }

    private int getMatchIndex(String sequence) {
        for (int i = 0; i < maps.size(); i++) if (StringUtils.equals(maps.get(i).get("sequence"), sequence)) return i;
        return -1;
    }
}
