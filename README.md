# Money Guard Frontend

**MoneyG** is a single-page application (SPA) for managing personal finances. It allows users to track income and expensess, view analytics, manage their balance, and apply filters and sorting to transactions. The project is built with **React**, **Vite**, and **Redux Toolkit** for high performance and a smooth development experience.

## 🚀 Demo

Try the app here: [moneyg-01-front.onrender.com](https://moneyg-01-front.onrender.com)

## 🛠️ Technologies Used

- **React** — Component-based UI library
- **Vite** — Lightning-fast build tool and dev server
- **TypeScript** — Static typing for reliable code
- **Redux Toolkit** — State management
- **Redux Thunk** — Middleware for handling async actions
- **JWT** — Authentication and user management
- **Cloudinary** — Image storage for contact avatars
- **React-Select** — Custom multi-select dropdowns
- **React-Datepicker** — Date selection and range filtering
- **Monobank API** — Live exchange rates
- **REST API** — Server communication

## 📦 Installation & Setup

Make sure you have Node.js (v16 or higher) installed.

1. Clone the repository:

   ```bash
   git clone https://github.com/IvanGodPro24/moneyg-01-front.git
   ```

2. Navigate to the project directory:

   ```bash
   cd moneyg-01-front
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open in your browser: [http://localhost:5173](http://localhost:5173)

## 📈 Features

- 📊 Real-time balance display
- ➕➖ Add and remove income or expense transactions
- 📅 Filter transactions by date and category
- 📈 Visual statistics with charts
- 💱 Currency exchange rates from Monobank API
- 🔐 Secure JWT-based authentication

## 📁 Project Structure

```
moneyg-01-front/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   ├── constants/          # Constants
│   ├── hooks/              # Reusable hooks
│   ├── pages/              # Application views/pages
│   ├── redux/              # State and slices
│   ├── utils/              # Helper functions
│   └── App.tsx             # Main app component
├── package.json
└── vite.config.ts          # Vite configuration
```

## 🤝 Contributing

Contributions are welcome! Feel free to open issues, create pull requests, or suggest improvements.
