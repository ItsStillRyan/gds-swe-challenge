package com.ryandevelopments.salarymanagement.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ryandevelopments.salarymanagement.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, String> {
  List<Employee> findByNameContaining(String name);
}
