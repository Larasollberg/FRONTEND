import { useEffect, useCallback } from "react";
import useFetch  from "../../hooks/useFetch.jsx";
import useForm from "../../hooks/useForm.jsx";
import { login } from "../../services/authService.js";
import { useNavigate } from "react-router";
import LOCALSTORAGE_KEYS from "../../constants/localstorage.js";
import "./LoginScreen.css";
import slackLogo from "../../assets/images/Slack-logo.png"

const FORM_FIELDS = {
    EMAIL: "email",
    PASSWORD: "password",
    };

    const initial_form_state = {
    [FORM_FIELDS.EMAIL]: "",
    [FORM_FIELDS.PASSWORD]: "",
    };

    export const LoginScreen = () => {
    const navigate = useNavigate();

    const { sendRequest, loading, response, error } = useFetch();

    const onLogin = (form_state) => {
        sendRequest(() =>
        login(form_state[FORM_FIELDS.EMAIL], form_state[FORM_FIELDS.PASSWORD])
        );
    };

    useEffect(() => {
        if (response && response.ok) {
        localStorage.setItem(
            LOCALSTORAGE_KEYS.AUTH_TOKEN,
            response.data.authorization_token
        );
        navigate("/home");
        }
    }, [response]);

    const {
        form_state: login_form_state,
        handleSubmit,
        handleInputChange,
    } = useForm({
        initial_form_state,
        onSubmit: onLogin,
    });

    return (
        <div className="container-login">
        <div className="login-container">
            <div className="login-card">
            <div className="login-logo">
                <img src={slackLogo} alt="Slack logo" />
            </div>

            <h1 className="login-title">Escribe tu correo electrónico para iniciar sesión</h1>
            <p className="login-subtitle">
                O elige otra manera de iniciar sesión.
            </p>

            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                <input
                    name={FORM_FIELDS.EMAIL}
                    id={FORM_FIELDS.EMAIL}
                    type="email"
                    onChange={handleInputChange}
                    className="form-input-login"
                    placeholder="Email"
                />
                </div>
                <div className="form-group">
                <input
                    name={FORM_FIELDS.PASSWORD}
                    id={FORM_FIELDS.PASSWORD}
                    type="password"
                    onChange={handleInputChange}
                    className="form-input-login"
                    placeholder="Ingresa tu contraseña"
                />
                </div>

                {!response ? (
                <button
                    type="submit"
                    disabled={loading}
                    className="submit-button-login"
                >
                    {loading
                    ? "Iniciando sesión..."
                    : "Iniciar sesión con correo electrónico"}
                </button>
                ) : (
                <>
                    <button
                    type="submit"
                    disabled={true}
                    className="submit-button-login success"
                    >
                    Sesión Iniciada
                    </button>
                    <div className="message success">{response.message}</div>
                </>
                )}
                {error && <div className="message error">{error.message}</div>}
            </form>

            <div className="login-footer">
                ¿Es tu primera vez en Slack? <a href="/register">Crea una cuenta</a>
            </div>
            </div>
        </div>

        <div className="login-footers">
            <div className="login-footers-links">
            <p>Privacidad y términos</p> <p>Contactarnos</p> <p>Cambiar región</p>
            </div>
        </div>
        </div>
    );
    };