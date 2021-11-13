CREATE DATABASE IF NOT EXISTS LunchBoxFoodDB;
USE LunchBoxFoodDB;

CREATE TABLE IF NOT EXISTS provider(
    id INTEGER NOT NULL UNIQUE AUTO_INCREMENT,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    url TEXT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS tags (
    id INT NOT NULL UNIQUE AUTO_INCREMENT,
    tag TEXT NOT NULL UNIQUE,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS offer(
    id INT NOT NULL UNIQUE AUTO_INCREMENT,
    providerId INT NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    date DATE NOT NULL,
    price INT NOT NULL COMMENT "in cent", -- in cent
    averageRating INT NOT NULL DEFAULT 0 COMMENT "Have to Calc",
    PRIMARY KEY (id),
    FOREIGN KEY (providerId) REFERENCES provider(id)
);

CREATE TABLE IF NOT EXISTS offer2tags(
    offerId INT NOT NULL,
    tagId INT NOT NULL,
    PRIMARY KEY (offerId,tagId),
    FOREIGN KEY (offerId) REFERENCES offer(id),
    FOREIGN KEY (tagId) REFERENCES tags(id)
);

CREATE TABLE IF NOT EXISTS userId(
    id INT NOT NULL UNIQUE AUTO_INCREMENT,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS ratings(
    id INT NOT NULL UNIQUE AUTO_INCREMENT,
    userId INT NOT NULL,
    offerId INT NOT NULL, 
    rating INT NOT NULL,
    comment Text NOT NULL DEFAULT "",
    CHECK (rating > 0 AND rating < 6),
    PRIMARY KEY (id),
    FOREIGN KEY (offerId) REFERENCES offer(id)
);
