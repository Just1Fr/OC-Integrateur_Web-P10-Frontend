import './index.css'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { setUserName } from '../../features/auth/authSlice'

export default function UserEditForm({ onCancel }) {

    const dispatch = useDispatch()

    const {userName, firstName, lastName, token} = useSelector((state) => state.auth)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        const newUserName = data.newUserName.trim()
        if (newUserName !== userName) {
            await dispatch(setUserName({ token, newUserName }))
        }
        onCancel()
    }

    return (
        <section className="user-edit-content">
            <h2>Edit user info</h2>
            <form id="user-edit-form" onSubmit={ handleSubmit(onSubmit) }>
                <div className="input-wrapper">
                    <label htmlFor="username">User name:</label>
                    <input type="text" id="username" autoComplete="nickname"
                        defaultValue={userName}
                        placeholder={userName}
                        {...register("newUserName", { 
                            required: true,
                            validate: {
                                minLength: value => value.trim().length >= 3 || 
                                'Username must be at least 3 characters (without spaces)'
                            }
                        })}
                    />
                    {errors.newUserName && errors.newUserName.type === "required" && (
                        <span className="alert">This field is required.</span>
                    )}
                    {errors.newUserName && errors.newUserName.type === "minLength" && (
                        <span className="alert">At least 3 characters required.</span>
                    )}
                </div>
                <div className="input-wrapper">
                    <label htmlFor="first-name">First name:</label>
                    <input type="text" id="first-name" autoComplete="given-name"
                        defaultValue={firstName}
                        placeholder={firstName}
                        disabled
                    />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="last-name">Last name:</label>
                    <input type="text" id="last-name" autoComplete="family-name"
                        defaultValue={lastName}
                        placeholder={lastName}
                        disabled
                    />
                </div>
                <button className="save-button" type="submit">Save</button>
                <button className="cancel-button" type="reset" onClick={onCancel}>Cancel</button>
            </form>
        </section>
    )
}