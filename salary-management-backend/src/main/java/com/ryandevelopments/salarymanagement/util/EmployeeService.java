package com.ryandevelopments.salarymanagement.util;

import org.springframework.data.map.repository.config.EnableMapRepositories;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import com.ryandevelopments.salarymanagement.common.Employee;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@EnableMapRepositories
public class EmployeeService {
    private final CrudRepository<Employee, String> repository;

    public EmployeeService(CrudRepository<Employee, String> repository) {
        this.repository = repository;
    }

    private static List<Employee> testPlaceholders() {
        return List.of(
            new Employee("abc123", "123abc", "Ryan", 1000)
        );
    } 

    public List<Employee> findAll() {
        List<Employee> list = new ArrayList<>();
        Iterable<Employee> employees = repository.findAll();
        employees.forEach(list::add);
        return list;
    }

    public Optional<Employee> find(String id){
        return repository.findById(id);
    }

    public Employee create(Employee employee) {
        Employee copy = new Employee(
            Generators.getAlphaNum(10), 
            Generators.getAlphaNum(10), 
            employee.getName(), 
            employee.getSalary()
            );
            return repository.save(copy);
    }

    public Optional<Employee> update(String id, Employee newEmployee){
        return repository.findById(id).map(oldEmployee -> {
            Employee updated = oldEmployee.updateWith(newEmployee);
            return repository.save(updated);
        });
    }

    public void delete(String id){
        repository.deleteById(id);
    }


    
}
