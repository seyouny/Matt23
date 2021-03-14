CREATE DATABASE Mattdb;

//DO THE FOLLOWING IN SUBSEQUENT STEPS IN MYSQL WORKBENCH

//1 - Create Users Table - Skip this step if using Sequelize
USE Mattdb;

DROP TABLE IF EXISTS Songs;

CREATE TABLE Songs  (
        id varchar(4) NOT NULL,
        song varchar(20),
        artist varchar(20),
        PRIMARY KEY (id)
)
