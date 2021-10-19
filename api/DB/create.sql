CREATE DATABASE IF NOT EXISTS LunchBoxFoodDB;
USE LunchBoxFoodDB


CREATE TABLE IF NOT EXISTS provider (
    id INTEGER NOT NULL UNIQUE AUTO_INCREMENT,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    url TEXT NOT NULL,
    PRIMARY KEY (id) -- check --> limit range
);

CREATE TABLE IF NOT EXISTS offer (
    id INT NOT NULL UNIQUE AUTO_INCREMENT, -- check --> limit range
    providerId INT NOT NULL UNIQUE,
    tagsId INT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    day DATE NOT NULL,
    price INT NOT NULL, -- in cent
    PRIMARY KEY (id),
    FOREIGN KEY (providerId) REFERENCES provider(id),
    FOREIGN KEY (tagsId) REFERENCES tags(id)
);

CREATE TABLE IF NOT EXISTS tags (
    id INT NOT NULL UNIQUE AUTO_INCREMENT,
    tag TEXT NOT NULL,
    PRIMARY KEY (id)
);

