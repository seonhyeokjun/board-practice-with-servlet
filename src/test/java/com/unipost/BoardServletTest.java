package com.unipost;

import org.junit.Test;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Administrator on 2017-03-02.
 */
public class BoardServletTest {


    @Test
    public void testObjectMapper() throws Exception {
        HashMap<String, String> map = new HashMap<String, String>();
        map.put("key", "value");
        ArrayList<Map<String, String>> list = new ArrayList<Map<String, String>>();
        list.add(map);
    }
}