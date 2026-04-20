import './index.css'
import { NumericFormat } from 'react-number-format'

export default function AccountCard({ accountData, buttonText="", buttonIcon=null, onButtonClick }) {
    return (
        <section className="account-card">
            <div className="account-content-wrapper">
                <h3 className="account-title">Argent Bank {accountData.type} (x{accountData.id})</h3>
                <p className="account-balance">$
                    <NumericFormat value={accountData.balance} displayType="text" fixedDecimalScale decimalScale={2}/>
                </p>
                <p className="account-balance-description">Available Balance</p>
            </div>
            <div className="account-content-wrapper cta">
                <button className={"account-button" + (buttonText ? "" : " no-text")} onClick={() => onButtonClick(accountData.id)}>
                    {buttonIcon}
                    {buttonText}
                </button>
            </div>
        </section>
    )
}