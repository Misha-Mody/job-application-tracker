# Job Application Tracker

A software to track and manage applied jobs, interviews and online assessments. Lets users make an online resume and share their academic/ educational journey online.

## How to run

1. `git clone https://github.com/Misha-Mody/job-application-tracker.git`
2. `cd job-application-tracker/job-application-tracker`
3. `npm install`
4. `npm run initdb`
5. `npm start`
6. Go to browser -> [Localhost-3000](http://localhost:3000)

## Author : Misha Mody

## Class Link : https://johnguerra.co/classes/webDevelopment_fall_2022/

## Project Objectives :

Job-Application-Tracker software helps the user track his/her job application process and also store their resume online.
It has two parts to it:-
PRT - 1: Job Application Tracker
PRT - 2: Online Resume

### PRT - 1 Job Application Tracker Functionalities ➖

Users can create a new job application by clicking on the plus icon to the top right. He can mention which phase of the application it is currently in.
Users can edit the application and also change the phase or/and any other information like date, company or positions. This can be done by clicking on the pen icon on top right of each application card.

1. Users can delete an application permanently by clicking on the trash icon on bottom right of the application cards.
2. Users can search for a job application by the name of the company. It also used regular expressions hence the entire company name is not required.
3. Paginations are provided at the bottom of each column. Users can select to view the next or previous page for each column separately.
4. On loading the application for the first time, the user get to view an instruction pop-up which explains the important functionalities of the application.
5. Drag and drop the cards to place them under different columns which updates in the backend

### PRT - 2 Online Resume Functionalities

1. You can create new users along with their information
2. You can update the information of the users
3. You can delete a user
4. You can view the list of all users on the application
5. You can click on a particular user to individually see all their personal information
