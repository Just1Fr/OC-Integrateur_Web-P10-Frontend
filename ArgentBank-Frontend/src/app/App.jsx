import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Home from '../pages/Home'
import SignIn from '../pages/SignIn'
import User from '../pages/User'

export default function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/user" element={<User />} />
            </Routes>
            <Footer />
        </Router>
    )
}