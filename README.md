![logosalaries](/README-assets/logosalaries.png)
## GDS SWE Challenge and Assignment for TOPPAN 


## **Context**

### _Opening Statement & Summary_

You’re on a mission to help our HR dept build an MVP employee salary management webapp
to manage employees' salaries.

This assignment is done using: 
* Springboot 2.7.5
* Angular 14

## Demo
No live demo for this project.

___
## **Content: Chosen User Stories**

### USER STORY 1 (Backend)

Using these data to populate .csv file:

```
e0001,hpotter,Harry Potter,1234.00
e0002,rwesley,Ron Weasley,19234.50
e0003,ssnape,Severus Snape,4000.0
e0004,rhagrid,Rubeus Hagrid,3999.999
e0005,voldemort,Lord Voldemort,523.4
e0006,gwesley,Ginny	Weasley,4000.004
e0007,hgranger,Hermione	Granger,0.0
e0008,adumbledore,Albus	Dumbledore,34.23
e0009,dmalfoy,Draco	Malfoy,34234.5
```

Uploading via Postman using URL:

```
POST http://localhost:8080/api/users/upload
```
Chose form-data as format, set value to be able to take in a file.
![upload CSV in postman](/README-assets/US1-1.jpg)



### USER STORY 2
After doing `ng serve`, go into URL to see webpage
```
http://localhost:4200/users
```
You will be greeted with the homepage.
![homepage](/README-assets/US2-1.jpg)
### USER STORY 3

***C***reate

- As shown in USER STORY 1, creating users via CSV file

***R***ead
- As shown in picture, getAll() displaying from DB


***U***pdate
```
PATCH http://localhost:8080/api/users/e0001
```
Using JSONPATCH dependency to effeciently carry out PATCH
```
[{
    "op": "replace", 
    "path": "/name",
    "value": "Barry Bobber"
}]
```
![PATCH in postman](/README-assets/US3-1.jpg)
***D***elete
- As shown in picture, delete() displaying as a logo, will be asked to confirm deletion upon click.
___
## **Bugs or Features to be implemented**
1. ```.setAllowMissingColumnNames``` not working as intended in CSVFormat builder. Empty columns submitted into csv POST will appear as " " or value 0 in DB


2. Attempted but unable to implement a Salary range filter in Webpage.


3. Edit function to be enabled in front-end for individual users
___
## **Local Build**
### Spring Boot
1. Build Project
```
./gradlew build
```
2. Run Project
```
./gradlew bootrun
```
___
### mySQL
1. Make sure port is to default 3306

```
http://localhost:3306/employees
```
2. Create Database
```
CREATE DATABASE employees
    DEFAULT CHARACTER SET = 'utf8mb4';
```
3. Create Table
```
CREATE TABLE `employees`.`employee` (
  `id` VARCHAR(255) NOT NULL,
  `login` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `salary` DECIMAL(12,2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `login_UNIQUE` (`login` ASC) VISIBLE);
```
___
### Angular
1. General start for Angular.

```
ng serve
```
___
## Technologies Used
- Springboot
  - starter
  - data-keyvalue
  - web
  - data
  - jdbc
- Mysql 
- Commons CSV
- JSONPatch
- lombok
- assertJ