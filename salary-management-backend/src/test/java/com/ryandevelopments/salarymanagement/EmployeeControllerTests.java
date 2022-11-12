package com.ryandevelopments.salarymanagement;

import static org.mockito.BDDMockito.given;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mysql.cj.xdevapi.Result;
import com.ryandevelopments.salarymanagement.model.Employee;
import com.ryandevelopments.salarymanagement.repository.EmployeeRepository;
import com.ryandevelopments.salarymanagement.service.CSVService;

import static org.hamcrest.CoreMatchers.is;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.BDDMockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

@WebMvcTest
public class EmployeeControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CSVService csvService;

    @MockBean
    private EmployeeRepository employeeRepository;

    @Autowired
    ObjectMapper objectMapper;


    // get all employee (positive)
    @Test
    public void givenListOfEmployees_whenGetAllEmployees_thenReturnEmployeesList() throws Exception {
        List<Employee> listOfEmployees = new ArrayList<>();
        listOfEmployees
                .add(Employee.builder().id("e0020").login("test1@login.com").name("test1name").salary(3000.12).build());
        given(employeeRepository.findAll()).willReturn(listOfEmployees);

        ResultActions response = mockMvc.perform(get("/api/users"));

        response.andExpect(status().isOk())
        .andDo(print())
        .andExpect(jsonPath("$.size()", is(listOfEmployees.size())));
    }

    // get employee by id (positive)
    @Test
    public void givenEmployeeId_whenGetEmployeeById_thenReturnEmployeeObject() throws Exception{
        String employeeid = "e0020";
        Employee employee = Employee.builder().id("e0020").login("test1@login.com").name("test1name").salary(3000.12).build();
        
        given(employeeRepository.findById(employeeid)).willReturn(Optional.of(employee));
        
        ResultActions response = mockMvc.perform(get("/api/users/{id}", employeeid));

        response.andExpect(status().isOk())
        .andDo(print())
        .andExpect(jsonPath("$.name", is(employee.getName())))
        .andExpect(jsonPath("$.login", is(employee.getLogin())))
        .andExpect(jsonPath("$.salary", is(employee.getSalary())));
    }

    // get employee by id (negative)
    @Test
    public void givenInvalidEmployeeId_whenGetEmployeeById_thenReturnEmployeeObject() throws Exception{
        String employeeid = "e0020";
        Employee employee = Employee.builder().id("e0020").login("test1@login.com").name("test1name").salary(3000.12).build();
        
        given(employeeRepository.findById(employeeid)).willReturn(Optional.empty());
        
        ResultActions response = mockMvc.perform(get("/api/users/{id}", employeeid));

        response.andExpect(status().isNotFound()).andDo(print());
    }

    // delete
    @Test
    public void givenEmployeeId_whenDeleteEmployee_thenReturn200() throws Exception{
        String employeeid = "e0020";
        willDoNothing().given(employeeRepository).deleteById(employeeid);

        ResultActions response = mockMvc.perform(delete("/api/users/{id}", employeeid));

        response.andExpect(status().isOk())
                .andDo(print());
    }
}
