package com.ryandevelopments.salarymanagement.util;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.ryandevelopments.salarymanagement.common.Employee;

@Repository
public interface EmployeeRepository extends CrudRepository<Employee, String>{}
