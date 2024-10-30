CREATE TABLE files (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    filePath VARCHAR(255),
    fileSize INT,
    uploadedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id)
);
