# 💰 MoneyG Frontend

**MoneyG** is a single-page web application (SPA) for personal finance management. It allows users to track incomes and expenses, analyze statistics, and manage their balance. The project is built using React and Vite for high performance and a smooth development experience.

## 🚀 Demo

Try the app here: [moneyg-01-front.onrender.com](https://moneyg-01-front.onrender.com)

## 🛠️ Technologies Used

- **React** — UI library for building component-based interfaces  
- **Vite** — Lightning-fast build tool and development server  
- **Redux Toolkit** — State management  
- **Redux Thunk** — Middleware for handling async actions  
- **Formik + Yup** — Form state management and validation  
- **REST API** — Server communication  
- **JWT** — Authentication and user management  

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
│   ├── pages/              # Application views/pages
│   ├── redux/              # State and slices
│   ├── services/           # API logic
│   ├── utils/              # Helper functions
│   └── App.jsx             # Main app component
├── package.json
└── vite.config.js          # Vite configuration
```

## 🤝 Contributing

Contributions are welcome! Feel free to open issues, create pull requests, or suggest improvements.
