package com.ryandevelopments.salarymanagement.model;
import javax.persistence.*;

@Entity
@Table(name= "employee")
public class Employee {
    
    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "login")
    private String login;

    @Column(name = "name")
    private String name;

    @Column(name = "salary")
    private float salary;

    public Employee(){}

    public Employee(String id, String login, String name, float salary){
        this.id = id;
        this.login = login;
        this.name = name;
        this.salary = salary;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public float getSalary() {
        return salary;
    }

    public void setSalary(float salary) {
        this.salary = salary;
    }

    @Override
    public String toString(){
        return "Employee [id: " + id + ", login: " + login + ", name: " + name + ", salary: " + salary + "]";
    }
}
