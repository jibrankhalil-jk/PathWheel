-- Drop existing tables if they exist (in reverse order of dependencies)
DROP TABLE IF EXISTS order_details;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS saved_locations;
DROP TABLE IF EXISTS medical_record;
DROP TABLE IF EXISTS wheelchairs;
DROP TABLE IF EXISTS user;

-- Create USER table
CREATE TABLE user (
    uid INT AUTO_INCREMENT  PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    dob DATE,
    address VARCHAR(255),
    status BOOLEAN DEFAULT TRUE,
    INDEX (email)
);

-- Create WHEELCHAIRS table
CREATE TABLE wheelchairs (
    wid INT AUTO_INCREMENT PRIMARY KEY,
    model VARCHAR(100) NOT NULL,
    name VARCHAR(100) NOT NULL,
    specifications VARCHAR(255),
    size VARCHAR(50),
    speed INT,
    battery INT,
    price INT NOT NULL,
    stock INT DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create MEDICAL_RECORD table
CREATE TABLE medical_record (
    mid INT AUTO_INCREMENT PRIMARY KEY,
    uid INT NOT NULL,
    info BLOB,
    disabilities VARCHAR(255),
    blood_group VARCHAR(10),
    emergency_contact VARCHAR(20),
    FOREIGN KEY (uid) REFERENCES user(uid) ON DELETE CASCADE
);

-- Create SAVED_LOCATIONS table
CREATE TABLE saved_locations (
    slid INT AUTO_INCREMENT PRIMARY KEY,
    uid INT NOT NULL,
    wid INT NOT NULL,
    label VARCHAR(100) NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (uid) REFERENCES user(uid) ON DELETE CASCADE,
    FOREIGN KEY (wid) REFERENCES wheelchairs(wid) ON DELETE CASCADE
);

-- Create ORDERS table
CREATE TABLE orders (
    oid INT AUTO_INCREMENT PRIMARY KEY,
    uid INT NOT NULL,
    total_amount INT NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (uid) REFERENCES user(uid) ON DELETE CASCADE
);

-- Create ORDER_DETAILS table
CREATE TABLE order_details (
    odid INT AUTO_INCREMENT PRIMARY KEY,
    oid INT NOT NULL,
    wid INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    price INT NOT NULL,
    FOREIGN KEY (oid) REFERENCES orders(oid) ON DELETE CASCADE,
    FOREIGN KEY (wid) REFERENCES wheelchairs(wid) ON DELETE RESTRICT
);




