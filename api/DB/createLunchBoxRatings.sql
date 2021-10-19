CREATE DATABASE IF NOT EXISTS LunchBoxRatingsDB;
USE LunchBoxRatingsDB;

CREATE TABLE IF NOT EXISTS rating(
    id INT NOT NULL UNIQUE AUTO_INCREMENT,
    userId INT NOT NULL UNIQUE,
    foodId INT NOT NULL, 
    rating INT NOT NULL,
    comment Text NOT NULL DEFAULT "",
    CHECK (rating > 0 AND rating < 6),
    PRIMARY KEY (id)
    FOREIGN KEY (foodId)  REFERENCES -- other db 
);