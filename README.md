E-commerce Admin Dashboard
Overview
This is a Vue.js and Node.js based admin dashboard for e-commerce management. The dashboard provides comprehensive tools for revenue analysis, inventory management, and product registration, helping managers make data-driven decisions.

Features
Revenue Analysis: Interactive charts for sales trends, filterable by time periods and product categories

Inventory Management: Product listing with search/sort/filter capabilities, low stock alerts

Product Registration: Form for adding new products with image upload functionality

Technologies Used
Frontend: Vue.js 3, Vue Router, Chart.js (for data visualization), AG-Grid (for data tables)

Backend: Node.js, Express.js

Database: JSON (sample data) - would be MongoDB in production

UI Framework: Tailwind CSS

Setup Instructions
Prerequisites
Node.js (v16 or higher)

npm or yarn

Installation
Clone the repository:

bash
git clone https://github.com/yourusername/ecommerce-admin-dashboard.git
cd ecommerce-admin-dashboard
Install dependencies for both frontend and backend:

bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
Set up environment variables:

Create a .env file in the backend directory based on .env.example

Running the Application
Start the backend server:

bash
cd backend
npm start
In a separate terminal, start the frontend development server:

bash
cd frontend
npm run dev
Access the application at http://localhost:5173 (or the port specified in your frontend configuration)

Project Structure
ecommerce-admin-dashboard/
├── frontend/               # Vue.js frontend
│   ├── public/            # Static files
│   ├── src/               # Application source code
│   │   ├── assets/        # Images, styles
│   │   ├── components/    # Reusable components
│   │   ├── router/        # Vue router configuration
│   │   ├── stores/        # Pinia stores (state management)
│   │   ├── views/         # Page components
│   │   └── main.js        # Vue application entry point
│   └── package.json       # Frontend dependencies
│
├── backend/               # Node.js backend
│   ├── controllers/       # Route controllers
│   ├── data/             # Sample data files
│   ├── routes/           # API routes
│   ├── app.js            # Express application
│   └── package.json      # Backend dependencies
│
├── README.md             # This file
└── screenshots/          # Application screenshots
Navigating the Dashboard
Revenue Analysis Page

View summary cards with total orders and revenue

Use date filters to analyze trends (daily, weekly, monthly)

Filter by product categories to see specific performance

Inventory Management

View all products in a sortable/searchable table

Edit inventory levels directly in the table

Identify low-stock items highlighted in red

Product Registration

Fill out the form to add new products

Upload product images

See immediate updates in the inventory

Sample Data
The application comes pre-loaded with sample data for:

50+ sample products across various categories

6 months of sales data

Inventory levels with some items marked as low stock

Live Demo
A hosted version of this dashboard is available at: [Insert Your Hosted URL Here]

License
This project is licensed under the MIT License.

