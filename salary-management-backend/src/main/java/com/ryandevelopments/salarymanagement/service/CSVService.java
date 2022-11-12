package com.ryandevelopments.salarymanagement.service;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ryandevelopments.salarymanagement.model.Employee;
import com.ryandevelopments.salarymanagement.repository.EmployeeRepository;
import com.ryandevelopments.salarymanagement.util.CSVhelper;


@Service
public class CSVService {
    @Autowired
    EmployeeRepository repository;

    public void save(MultipartFile file){
        try {
            List<Employee> employee = CSVhelper.csvToEmployees(file.getInputStream());
            repository.saveAll(employee);
        }catch(IOException e){
            throw new RuntimeException("Failed"+ e.getMessage());
        }
    }

    public List<Employee> getAllEmployees() {
        return repository.findAll();
    }
}
