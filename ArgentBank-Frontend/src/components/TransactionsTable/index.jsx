import './index.css'
import TransactionRow from '../TransactionRow'

export default function TransactionsTable({ transactionsData, categories }) {
    
    const rows = transactionsData
        .sort((a, b) => b.id - a.id)
        .map((item) =>
            <TransactionRow
                key={`row-${item.id}`}
                transactionData={item}
                categories={categories}
            />
    )
    
    return (
        <div className="table">
            <div className="table-header">
                <span>Date</span>
                <span>Description</span>
                <span>Amount</span>
                <span>Balance</span>
            </div>
            {rows}
        </div>
    )
}