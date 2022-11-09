package com.ryandevelopments.salarymanagement.common;

import org.springframework.data.annotation.Id;

public class Employee {
    private final String id;
    private final String login;
    private final String name;
    private final float salary;

    public Employee(
        String id,
        String login,
        String name,
        float salary
    ){
        this.id = id;
        this.login = login;
        this.name = name;
        this.salary = salary;
    }
    
    @Id
    public String getId() {
        return id;
    }


    public String getLogin() {
        return login;
    }


    public String getName() {
        return name;
    }


    public float getSalary() {
        return salary;
    }

    public Employee updateWith(Employee employee) {
        return new Employee(this.id, employee.login, employee.name, employee.salary);
    }

}
