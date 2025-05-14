package com.jsconf.rocketlaptop.util;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class DateUtil {
    public static String toStringFormat(LocalDateTime localDateTime) {
        if (localDateTime == null) {
            return "0000-00-00 00:00:00";
        }
        return localDateTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
    }
}
