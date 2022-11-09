package com.ryandevelopments.salarymanagement.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.ryandevelopments.salarymanagement.service.CSVService;
import com.ryandevelopments.salarymanagement.util.CSVhelper;
import com.ryandevelopments.salarymanagement.util.ResponseMessage;

@Controller
@RequestMapping("/api")
public class CSVController {
    
    @Autowired
    CSVService filService;

    @PostMapping("/employees/csvupload")
    public ResponseEntity<ResponseMessage> uploadFile(@RequestParam("file") MultipartFile file){
        String message = "";

        if (CSVhelper.hasCSVFormat(file)){
            try {
                filService.save(file);
                message = "Successful Fil upload of: " + file.getOriginalFilename();
                return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
            } catch (Exception e) {
                message = "Unsuccessful File upload of: " + file.getOriginalFilename() + e;
                return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
            }
        }

        message = "No files Uploaded";
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseMessage(message));
    }
}
