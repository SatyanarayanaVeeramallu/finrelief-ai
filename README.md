# FinRelief AI — Frontend

AI-Powered Debt Relief & Financial Recovery Platform — React (Vite) frontend.

## Tech Stack
- React.js (Vite)
- React Router DOM
- Axios
- Modern, responsive CSS (no framework — hand-built design system)

## Backend
This app expects the backend to be running at `http://127.0.0.1:8000` with these endpoints:

- `GET /loan`
- `POST /loan`
- `PUT /loan/{loan_id}`
- `DELETE /loan/{loan_id}`
- `GET /analyze/{loan_id}`
- `GET /settlement`
- `GET /dashboard`
- `GET /generate-letter/{loan_id}`
- `GET /negotiation-strategy/{loan_id}`

If your backend URL differs, update `src/services/api.js` (`baseURL`).

## Getting Started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173` by default. Make sure the FastAPI/backend server allows CORS from this origin.

## Build for production

```bash
npm run build
npm run preview
```

## Folder Structure

```
src/
├── components/     Reusable UI building blocks (Navbar, StatCard, LoanTable, modals, etc.)
├── pages/          One component per route (Dashboard, AddLoan, LoanManagement, ...)
├── services/       Axios service layer — one file per API resource
├── styles/         Modern, responsive CSS split by concern
├── App.jsx         Route definitions
└── main.jsx        App entry point
```

## Pages / Routes

| Route                     | Page                  | Purpose                                   |
|---------------------------|-----------------------|--------------------------------------------|
| `/`                       | Dashboard             | Loan stats, outstanding totals, health summary |
| `/add-loan`               | Add Loan              | Create a new loan                          |
| `/loans`                  | Loan Management        | Table of loans w/ edit, delete, and quick actions |
| `/analysis` , `/analysis/:loanId`     | Financial Analysis | EMI ratio, surplus, stress level, settlement rec |
| `/letter` , `/letter/:loanId`         | AI Letter          | AI-generated negotiation letter + copy    |
| `/negotiation` , `/negotiation/:loanId` | Negotiation Strategy | Priority, settlement, action, strategy |

Visiting a page without a specific loan id (e.g. `/analysis`) shows a loan picker.

## Notes
- The service layer defensively reads multiple possible key names (e.g. `loan_name` vs `name`) since exact backend response shapes can vary — adjust `services/*.js` and the corresponding page components once you confirm the real payload shapes.
- All network errors are surfaced via a shared `ErrorBanner` component with retry support where applicable.
