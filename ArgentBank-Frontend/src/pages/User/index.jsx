import './index.css'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Account from '../../components/Account'
import AccountCard from '../../components/AccountCard'
import UserEditForm from '../../components/UserEditForm'

export default function User() {

    const navigate = useNavigate()

    const {firstName, lastName, token} = useSelector((state) => state.auth)

    useEffect(() => {
        if (!token) {
            navigate("/sign-in")
        }
    }, [token, navigate])

    const [showEdit, setShowEdit] = useState(false)
    function toggleEdit() {
        showAccount && setShowAccount(false)
        setAccountId(-1)
        setShowEdit(!showEdit)
    }

    const [showAccount, setShowAccount] = useState(false)
    const [accountId, setAccountId] = useState(-1)
    function toggleAccount(id=-1) {
        showEdit && setShowEdit(false)
        setAccountId(id)
        setShowAccount(!showAccount)
    }

    const accounts = [
        {
            id: 8349,
            balance: 2082.79,
            type: "Checking",
        },
        {
            id: 6712,
            balance: 10928.42,
            type: "Savings",
        },
        {
            id: 7186,
            balance: 184.30,
            type: "Credit Card",
        },
    ]

    const cards = accounts.map((item) => 
        <AccountCard
            key={`card-${item.id}`}
            accountData={item}
            buttonText="View transactions"
            onButtonClick={toggleAccount}
        />
    )

    return (
        <main className="main bg-dark">
            {showAccount && <Account accountData={accounts.find(acc => acc.id === accountId)} onClose={() => setShowAccount(false)} />}
            
            {showEdit && <UserEditForm onCancel={() => setShowEdit(false)} />}
            
            {!showAccount && 
                <>
                    {!showEdit && (
                        <div className="header">
                            <h2>Welcome back<br />{firstName ? firstName : "firstName"} {lastName ? lastName : "lastName"}!</h2>
                            <button className="edit-button" onClick={toggleEdit}>Edit Name</button>
                        </div>
                    )}
                
                    <h3 className="sr-only">Accounts</h3>
                    {cards}
                </>
            }
        </main>
    )
}