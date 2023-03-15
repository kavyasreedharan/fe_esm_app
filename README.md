# fe_esm_app
Frontend source code of MVP Employee Salary Management Application

## About the application
ESM web application is a frontend Angular application developed in order to help the HR department to manage the employees' salaries. This application runs along with the backend Java Spring Boot application (be_esm_app) to carry out REST APIs calls and and performing CRUD operations. Using this application we can perform below functionalities.
1) Add new employee data
2) Update employee data
3) Delete employee data
4) View employee data
5) Search for employee data using employee id
6) Display all employee records in dashboard. Filter using salary. Sort by ID, Login, Name or Salary fields in ascending or descending order
7) Upload employees' data using CSV file

## Tecnologies
Angular


## Installation
1) Download or check out source code for be_esm_app
	   git clone https://github.com/kavyasreedharan/fe_esm_app.git
2) Import source code in your ide (if you plan to run the application from your local machine and IDE)
3) Build frontend application using below command from \fe_esm_app\esm-web-app folder location
	   npm install
4) Start your application from IDE or command line using below command
	   ng serve
   Note: Application is configured to start in 4200 port. If this port is already in use, kindly change the port number in application.properties file.
      ng server --port 4300
	
	




