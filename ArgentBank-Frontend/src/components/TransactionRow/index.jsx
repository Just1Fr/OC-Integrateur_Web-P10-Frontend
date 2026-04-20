import './index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faChevronDown, faChevronLeft, faCheckSquare, faXmarkSquare } from '@fortawesome/free-solid-svg-icons'
import { NumericFormat } from 'react-number-format'
import { useState } from 'react'

export default function TransactionRow({ transactionData, categories }) {

    const date = new Date(transactionData.date).toISOString().split('T')[0];

    const [showDetails, setShowDetails] = useState(false)
    function toggleDetails() {
        setShowDetails(!showDetails)
    }

    const [editCategory, setEditCategory] = useState(false)
    function toggleEditCategory() {
        setEditCategory(!editCategory)
    }

    const [category, setCategory] = useState(transactionData.category)

    function onSubmitCategory() {
        const categoryInput = document.getElementById(`category-${transactionData.id}`)
        categoryInput && categoryInput.value !== category && setCategory(categoryInput.value)
        setEditCategory(false)
    }

    const categoryOptions = categories.map((item) =>
        <option
            key={`option-${transactionData.id}-${item}`}
            value={item}
        >
            {item}
        </option>
    )

    const [editNote, setEditNote] = useState(false)
    function toggleEditNote() {
        setEditNote(!editNote)
    }
    
    const [note, setNote] = useState(transactionData.note)

    function onSubmitNote() {
        const noteInput = document.getElementById(`note-${transactionData.id}`)
        noteInput && noteInput.value.trim() !== note && setNote(noteInput.value.trim())
        setEditNote(false)
    }

    return (
        <div className="table-row">
            <div className="row-content">
                <span>{date}</span>
                <span>{transactionData.description}</span>
                <span>$
                    <NumericFormat value={transactionData.amount} displayType="text" fixedDecimalScale decimalScale={2}/>
                </span>
                <span>$
                    <NumericFormat value={transactionData.balance} displayType="text" fixedDecimalScale decimalScale={2}/>
                </span>
                <FontAwesomeIcon
                    icon={showDetails ? faChevronDown : faChevronLeft}
                    className="button"
                    onClick={toggleDetails}
                />
            </div>
            {showDetails && (
                <div className="row-details">
                    <div className="cell">
                        <span>Transaction type</span>
                        <span>Category</span>
                        <span>Note</span>
                    </div>
                    <div className="cell">
                        <span>{transactionData.type}</span>
                        <span>
                            {editCategory ?
                                <>
                                    <select name="category" id={`category-${transactionData.id}`} defaultValue={category}>
                                        {categoryOptions}
                                    </select>
                                    <FontAwesomeIcon
                                        icon={faCheckSquare}
                                        className="button"
                                        onClick={onSubmitCategory}
                                    />
                                    <FontAwesomeIcon
                                        icon={faXmarkSquare}
                                        className="button"
                                        onClick={toggleEditCategory}
                                    />
                                </>
                                :
                                <>
                                    {category}
                                    <FontAwesomeIcon
                                        icon={faPenToSquare}
                                        className="button"
                                        onClick={toggleEditCategory}
                                    />
                                </>
                            }
                        </span>
                        <span>
                            {editNote ?
                                <>
                                    <input type="text" name="note" id={`note-${transactionData.id}`}
                                        placeholder={note}
                                        defaultValue={note}
                                    />
                                    <FontAwesomeIcon
                                        icon={faCheckSquare}
                                        className="button"
                                        onClick={onSubmitNote}
                                    />
                                    <FontAwesomeIcon
                                        icon={faXmarkSquare}
                                        className="button"
                                        onClick={toggleEditNote}
                                    />
                                </>
                                :
                                <>
                                    {note}
                                    <FontAwesomeIcon
                                        icon={faPenToSquare}
                                        className="button"
                                        onClick={toggleEditNote}
                                    />
                                </>
                            }
                        </span>
                    </div>
                </div>
            )}
        </div>
    )
}