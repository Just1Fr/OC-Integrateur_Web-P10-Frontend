import './index.css'
import AccountCard from '../../components/AccountCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import TransactionsTable from '../TransactionsTable'

export default function Account({ onClose, accountData }) {

    const categories = [
        "Transportation",
        "Food",
        "Generic Store",
        "Miscellaneous",
    ]

    const transactions = [
        {
            id: 0,
            date: "2020-02-27T17:32:28Z",
            description: "RailBus",
            amount: 8.00,
            balance: 298.00,
            type: "Electronic",
            category: "Transportation",
            note: "lorem ipsum",
        },
        {
            id: 1,
            date: "2020-02-29T13:51:01Z",
            description: "MarketStore",
            amount: 9.85,
            balance: 288.15,
            type: "Electronic",
            category: "",
            note: "something",
        },
        {
            id: 2,
            date: "2020-03-01T12:36:12Z",
            description: "Golden Sun Bakery",
            amount: 6.50,
            balance: 281.65,
            type: "Electronic",
            category: "Food",
            note: "",
        },
    ]

    return (
        <main className="main bg-dark account-view">
            <AccountCard
                accountData={accountData}
                buttonIcon={<FontAwesomeIcon icon={faXmark} />}
                onButtonClick={onClose}
            />
            <TransactionsTable transactionsData={transactions} categories={categories}/>
        </main>
    )
}