package com.ryandevelopments.salarymanagement.util;

public class Generators {
    static String getAlphaNum(int n)
    {
        String AlphaNumString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "0123456789" + "abcdefghijklmnopqrstuvxyz";

        StringBuilder sb = new StringBuilder(n);

        for (int i = 0; i < n; i++){
            int index = (int)(AlphaNumString.length() * Math.random());
            sb.append(AlphaNumString.charAt(index));
        }

        return sb.toString();
    }
}
