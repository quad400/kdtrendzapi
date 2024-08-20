## KDTrendz
KDtrendz is a robust B2B e-commerce platform that facilitates seamless interactions between businesses and customers. Below is a broad breakdown of the key features and components of the project:


### Key Features

1. Product Management
Brands can list their products, each with detailed descriptions, images, and pricing information.
Categories allow for organized browsing, ensuring customers can find products easily.
Support for variant options like color and size to provide more choices to customers.

2. Order Management
Customers can place orders which are then tracked within the system.
Order statuses are updated in real-time, helping both the customer and the brand to monitor progress.

3. Payment Processing
Integrated with Paystack for secure payment processing.
Payment Splitting: Payments are automatically divided between the platform admin and brand owners based on pre-set commissions.
Automated Payouts to brand owners, ensuring they receive their earnings promptly.

4. Bank Account Verification
Brands can link their bank accounts, which are verified using Paystack to ensure authenticity and prevent errors.

5. Webhooks for Real-time Updates
The platform listens for payment success events via Paystack Webhooks to update order statuses automatically.

## Tech Stack
- Backend: NestJS, TypeORM, PostgreSQL
- Payment Integration: Paystack API
- Authentication: JWT
- Deployment: Azure/AWS

KDtrends aims to provide a streamlined, reliable, and secure platform for businesses to manage their e-commerce needs efficiently.


