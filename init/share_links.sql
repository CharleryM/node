CREATE TABLE share_links (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fileId INT,
    userId INT,
    token VARCHAR(255),
    expiresAt TIMESTAMP,
    FOREIGN KEY (fileId) REFERENCES files(id)
);
