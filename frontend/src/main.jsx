import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter,  RouterProvider } from "react-router-dom";
import SignUp from './pages/SignUp.jsx'
import SignIn from './pages/SignIn.jsx'
import Dashboard from './pages/Dashboard.jsx'
import { RecoilRoot } from 'recoil';
import PaymentGateway from './pages/PaymentGateway.jsx';
import TransactionHistory from './pages/TransactionHistory.jsx';

const router = createBrowserRouter([
  {
    path: '/signUp',
    element: <SignUp />
  },
  {
    path: '/',
    element: <SignIn />
  },
  {
    path: '/transfer',
    element: <PaymentGateway />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '/TransactionHistory',
    element: <TransactionHistory />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </StrictMode>,
)
