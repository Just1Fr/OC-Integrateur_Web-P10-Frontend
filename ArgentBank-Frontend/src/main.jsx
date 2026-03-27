import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import './index.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import User from './pages/User'
// import NotFound from './pages/NotFound'

const router = createBrowserRouter([{
    path: '/',
    element: (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    ),
    children: [
        { path: '', element: <Home /> },
        { path: 'sign-in', element: <SignIn /> },
        { path: 'user', element: <User /> },
        // { path: '*', element: <NotFound /> },
    ]
}])

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
)