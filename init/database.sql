CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    email VARCHAR(255),
    quotaMax BIGINT DEFAULT 2147483648,
    spaceUsed INT DEFAULT 0
);

CREATE TABLE files (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    fileName VARCHAR(255),
    size INT,
    uploadedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users (id)
);

CREATE TABLE share_links (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fileId INT,
    userId INT,
    token VARCHAR(255),
    expiresAt TIMESTAMP,
    FOREIGN KEY (fileId) REFERENCES files (id)
);