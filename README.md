# BankHub Web Application 🏦

BankHub is a web application designed to help users manage their finances securely and efficiently. It provides features such as user authentication, balance management, and transfer history.

## Features ✨

-   **🔒 User Authentication**: Secure login and registration functionality.
-   **💰 Balance Management**: View current balance, deposit, and withdraw funds with smooth transition effects.
-   **📜 Transfer History**: Track transfer and balance update history with advanced filtering and search capabilities.
-   **📱 Responsive Design**: Optimized for various screen sizes.
-   **🔍 Advanced Search**: Search through transaction history with real-time filtering.
-   **⚡ Quick Actions**: Quick access to common banking features.
-   **📊 Transaction Analytics**: Filter transactions by type, date range, and amount.
-   **📤 Export Functionality**: Export transaction history for record-keeping.
-   **🎨 Modern UI**: Beautiful and intuitive user interface with smooth animations.

## Technologies Used 🛠️

-   **Frontend**: React, TypeScript
-   **Build Tool**: Vite ⚡
-   **Routing**: React Router
-   **State Management**: React Hooks
-   **Icons**: React Icons
-   **API Communication**: Axios
-   **Styling**: CSS with modern design system

## Project Structure 📂

```bash
src/
├── App.tsx                # Main application entry point
├── pages/                 # Contains page components (Login, Register, Dashboard, AdminDashboard)
├── components/            # Reusable UI components
│   ├── auth/             # Authentication components
│   ├── dashboard/        # Dashboard components
│   └── shared/           # Shared components
├── services/             # API service files
├── models/               # TypeScript models and interfaces
├── styles/               # CSS styles
│   ├── common.css        # Global styles and variables
│   ├── pages/           # Page-specific styles
│   └── components/      # Component-specific styles
└── main.tsx              # Vite entry point
```

## Getting Started 🚀

### Prerequisites

-   Node.js (v14 or higher)
-   Yarn (v1.22 or higher)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/bengabay11/bankhub-webapp.git
    cd bankhub-webapp
    ```

2. Install dependencies:

    ```bash
    yarn install
    ```

3. Start the development server:

    ```bash
    yarn dev
    ```

4. Open the application in your browser:

    ```bash
    http://localhost:5173
    ```

## Key Features 🏦

### Authentication

-   **Register**: Users can create an account with a display name, email, and password.
-   **Login**: Users can log in with their credentials to access the dashboard.
-   **Redirects**: Unauthenticated users are redirected to the login page (`/`), while authenticated users are redirected to the dashboard (`/dashboard`).

### Dashboard

-   **Balance Overview**: Displays the user's current balance with smooth transition effects.
-   **Quick Actions**: Quick access to common banking features like loans and payment requests.
-   **Transaction History**: View and filter transfer and balance update history.
-   **Advanced Filtering**: Filter transactions by:
    -   Type (transfers or balance updates)
    -   Date range
    -   Amount range
    -   Transfer type (sent/received)
    -   Balance action (deposit/withdrawal)
-   **Search Functionality**: Real-time search through transaction history.
-   **Export Capability**: Export transaction history for record-keeping.

### Error Handling

-   **Validation Errors**: Displays user-friendly error messages for invalid inputs.
-   **Server Errors**: Parses and displays server-side validation errors in a readable format.
-   **Toast Notifications**: Informative toast messages for user actions and system updates.

## Scripts 📜

-   `yarn dev`: Start the development server.
-   `yarn build`: Build the application for production.
-   `yarn preview`: Preview the production build.
-   `yarn lint`: Run ESLint for code quality checks.

## License 📄

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
