CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    email VARCHAR(255),
    quotaMax INT DEFAULT 2147483648,
    spaceUsed INT DEFAULT 0
);
