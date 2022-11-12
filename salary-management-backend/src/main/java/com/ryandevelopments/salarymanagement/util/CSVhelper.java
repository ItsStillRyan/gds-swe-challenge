package com.ryandevelopments.salarymanagement.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.web.multipart.MultipartFile;

import com.ryandevelopments.salarymanagement.model.Employee;

public class CSVhelper {
    public static String TYPE = "text/csv";

    public static boolean hasCSVFormat(MultipartFile file) {
        if (!TYPE.equals(file.getContentType())){
            return false;
        }
        return true;
    }

    public static List<Employee> csvToEmployees(InputStream inS){

        try (BufferedReader fileReader = new BufferedReader(new InputStreamReader(inS, StandardCharsets.UTF_8));
        CSVParser csvParser = new CSVParser(fileReader,  
        CSVFormat.RFC4180.builder()
        .setHeader()
        .setSkipHeaderRecord(true)
        .setIgnoreHeaderCase(true)
        .setAllowMissingColumnNames(false)
        .setCommentMarker('#')
        .setIgnoreEmptyLines(true)
        .setIgnoreSurroundingSpaces(true)
        .setTrim(true)
        .build());){
            
            List<Employee> employees = new ArrayList<Employee>();
            
            Iterable<CSVRecord> csvRecords = csvParser.getRecords();

            for(CSVRecord csvRecord : csvRecords){
                Employee employee = new Employee(
                    csvRecord.get("Id"),
                    csvRecord.get("Login"),
                    csvRecord.get("Name"),
                    Double.parseDouble(csvRecord.get("Salary"))
                );
                employees.add(employee);
            }
            return employees;

        }catch (IOException e){
            throw new RuntimeException("Failed" + e.getMessage());
        }
    }
    
}
