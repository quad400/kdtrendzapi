# B2B E-commerce API

Welcome to the B2B E-commerce API repository! This project provides a robust backend solution for a business-to-business e-commerce platform, designed to handle various aspects of e-commerce operations efficiently.

## 🚀 Project Overview

This API serves as the backbone for a B2B e-commerce application, featuring functionalities for user management, product handling, shopping cart operations, and payment processing. It’s built using NestJS with a focus on scalability, security, and maintainability.

## 🔧 Key Features

- User Authentication: Secure user registration, login, and profile management.
- Shopping Cart: Add, remove, and update items in the shopping cart.
- Product Management: CRUD operations for products and categories.
- Order Processing: Handle orders and track order statuses.
- Payment Integration: Integration with payment gateways (e.g., Paystack) for seamless transactions.
- Role-Based Access Control: Different access levels based on user roles.

## 📚 API Documentation

The API is documented using Postman. You can explore and test the API endpoints using the following link:

https://documenter.getpostman.com/view/34498096/2sAXjDfbRE

🛠️ Technologies Used

- NestJS: A progressive Node.js framework for building efficient and scalable server-side applications.
- TypeORM: ORM for TypeScript and JavaScript that supports various databases.
- PostgreSQL: Relational database management system.
- Paystack: Payment gateway integration for handling transactions.

## 💡 Setup and Installation

1. Clone the Repository

```sh
git clone https://github.com/yourusername/your-repository.git
cd your-repository
```

2. Install Dependencies:

```sh
npm install
```

3. Generate Migrations

```sh
npm run migration:generate -- src/lib/db/migrations/{name}
mpn run migration:run
```

4. Run Application

```sh
npm run start:dev
```

## 🔒 Contributing
Contributions are welcome! If you find any issues or have suggestions, please open an issue or submit a pull request.

## 📧 Contact
For any questions or further information, feel free to reach out:

- Email: adedijiabdulquadri@gmail.com
- LinkedIn: https://www.linkedin.com/in/abdulquadri-adediji-161925209/
