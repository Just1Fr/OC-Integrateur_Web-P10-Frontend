import './index.css'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { login } from '../../features/auth/authSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'

export default function SignIn() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userName = useSelector((state) => state.auth.userName)

    useEffect(() => {
        if (userName) {
            navigate("/user")
        }
    }, [userName, navigate])

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => await dispatch(login({ email: data.email, password: data.password }))

    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <FontAwesomeIcon icon={faCircleUser} className="sign-in-icon"/>
                <h2>Sign In</h2>
                <form id="sign-in-form" onSubmit={ handleSubmit(onSubmit) }>
                    <div className="input-wrapper">
                        <label htmlFor="email">E-mail</label>
                        <input type="email" id="email" autoComplete="email"
                            {...register("email", {
                                required: true,
                                minLength: 3,
                                pattern: /\S+@\S+\.\S+/
                            })}
                        />
                        {errors.email && errors.email.type === "required" && (
                            <span className="alert">This field is required.</span>
                        )}
                        {errors.email && errors.email.type === "minLength" && (
                            <span className="alert">At least 3 characters required.</span>
                        )}
                        {errors.email && errors.email.type === "pattern" && (
                            <span className="alert">Invalid e-mail format.</span>
                        )}
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" autoComplete="current-password"
                            {...register("password", { required: true, minLength: 6 })}
                        />
                        {errors.password && errors.password.type === "required" && (
                            <span className="alert">This field is required.</span>
                        )}
                        {errors.password && errors.password.type === "minLength" && (
                            <span className="alert">At least 6 characters required.</span>
                        )}
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" autoComplete="off" />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <button className="sign-in-button" type="submit">Sign In</button>
                </form>
            </section>
        </main>
    )
}