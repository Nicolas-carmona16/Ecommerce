USE ecommerce;

-- Creating the 'role' table
CREATE TABLE role (
  role_id INT AUTO_INCREMENT PRIMARY KEY,
  role_name VARCHAR(255) NOT NULL
);

-- Creating the 'user' table
CREATE TABLE user (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role_id INT,
  FOREIGN KEY (role_id) REFERENCES role(role_id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Creating the 'category' table
CREATE TABLE category (
  category_id INT AUTO_INCREMENT PRIMARY KEY,
  category_name VARCHAR(255) NOT NULL
);

-- Creating the 'product' table
CREATE TABLE product (
  product_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category_id INT,
  image_url VARCHAR(255),
  FOREIGN KEY (category_id) REFERENCES category(category_id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Creating the 'inventory' table
CREATE TABLE inventory (
  inventory_id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT,
  quantity INT NOT NULL,
  FOREIGN KEY (product_id) REFERENCES product(product_id)
);

-- Creating the 'shopping_cart' table
CREATE TABLE shopping_cart (
  cart_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  status VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES user(user_id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Creating the 'cart_product' table
CREATE TABLE cart_product (
  cart_id INT,
  product_id INT,
  quantity INT NOT NULL,
  PRIMARY KEY (cart_id, product_id),
  FOREIGN KEY (cart_id) REFERENCES shopping_cart(cart_id),
  FOREIGN KEY (product_id) REFERENCES product(product_id)
);

-- Creating the 'address' table
CREATE TABLE address (
  address_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  street VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  state VARCHAR(255) NOT NULL,
  country VARCHAR(255) NOT NULL,
  zip_code VARCHAR(255) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(user_id)
);

-- Creating the 'payment_method' table
CREATE TABLE payment_method (
  payment_method_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  method_type VARCHAR(255) NOT NULL,
  provider VARCHAR(255) NOT NULL,
  account_number VARCHAR(255) NOT NULL,
  expiry DATE NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(user_id)
);

-- Creating the 'payment_form' table
CREATE TABLE payment_form (
  payment_id INT AUTO_INCREMENT PRIMARY KEY,
  cart_id INT,
  address_id INT,
  payment_method_id INT,
  FOREIGN KEY (cart_id) REFERENCES shopping_cart(cart_id),
  FOREIGN KEY (address_id) REFERENCES address(address_id),
  FOREIGN KEY (payment_method_id) REFERENCES payment_method(payment_method_id)
);

INSERT INTO role (role_name) VALUES
('Admin'),
('Customer');