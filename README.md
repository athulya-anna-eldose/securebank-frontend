# SecureBank – Intelligent Cyber Threat Detection & API Security Platform

## Project Overview

SecureBank is a simulated online banking application developed using React and TypeScript, integrated with a Spring Boot backend.

The application combines essential banking operations with cybersecurity monitoring features to demonstrate secure API communication, authentication, and threat detection.

## Technologies Used

- React
- TypeScript
- Vite
- React Router DOM
- Axios
- Recharts
- Lucide React
- CSS

## Features

### Banking Features
- User registration and login
- JWT-based authentication
- Account dashboard
- View transaction history
- Simulated money transfers
- Demo deposits
- View and update profile information

### Cybersecurity Features
- JWT authentication for protected API requests
- Automatic JWT attachment using Axios interceptors
- Logout and local token removal
- Security Centre dashboard
- Security event monitoring
- SQL injection detection monitoring
- XSS detection monitoring
- API rate-limit testing
- Unauthorized access testing

## Application Pages

| Page | Description |
|---|---|
| Home | SecureBank introduction |
| Login | User authentication |
| Register | New user registration |
| Dashboard | Account overview |
| Transactions | Transaction history |
| Transfer | Simulated money transfers |
| Deposit | Add demo money |
| Profile | Manage user details |
| Security Centre | Monitor security events and test security controls |

## Backend Integration

The frontend communicates with the Spring Boot backend using Axios REST API requests.

Backend URL: `http://localhost:8080`

Configure the backend URL in the frontend `.env` file:

```env
VITE_API_BASE_URL=http://localhost:8080
```

## Run Locally

### Prerequisites
- Node.js
- npm
- Running SecureBank backend

### Installation

Clone the repository:

```bash
git clone https://github.com/athulya-anna-eldose/securebank-frontend.git
```

Navigate to the project:

```bash
cd securebank-frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

## Project Structure

```text
src/
├── components/
│   └── layout/
├── pages/
├── services/
├── assets/
├── App.tsx
└── main.tsx
```

## Security Considerations

- JWT tokens are stored in browser Local Storage in this educational implementation.
- Axios attaches the token to authenticated API requests.
- Logout removes the locally stored token.
- The backend independently validates JWTs before allowing access to protected APIs.
- React JSX is used to render user-provided values rather than unsafe HTML injection.

Local Storage is accessible to JavaScript. HttpOnly cookies are generally preferred for production authentication systems.

## Disclaimer

SecureBank is an educational cybersecurity project using simulated banking operations. It does not connect to real banking services or process actual financial transactions.