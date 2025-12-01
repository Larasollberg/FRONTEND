import React, { useState, useCallback } from 'react'
import useForm from '../../hooks/useForm.jsx'
import { register } from '../../services/authService.js'
import  useFetch  from '../../hooks/useFetch.jsx'
import "./RegisterScreen.css"
import slackLogo from "../../assets/images/Slack-logo.png"
import { useNavigate, Link } from "react-router";

    const FORM_FIELDS = {
    NAME: "name",
    EMAIL: "email",
    PASSWORD: "password",
    };

    const initial_form_state = {
    [FORM_FIELDS.NAME]: "",
    [FORM_FIELDS.EMAIL]: "",
    [FORM_FIELDS.PASSWORD]: "",
    };

    const RegisterScreen = () => {
    const { sendRequest, loading, response, error } = useFetch();

    const onRegister = (form_state) => {
        sendRequest(() =>
        register(
            form_state[FORM_FIELDS.NAME],
            form_state[FORM_FIELDS.EMAIL],
            form_state[FORM_FIELDS.PASSWORD]
        )
        );
    };

    const {
        form_state: register_form_state,
        handleSubmit,
        handleInputChange,
    } = useForm({
        initial_form_state,
        onSubmit: onRegister,
    });

    return (
        <div className="container-register">
        <div className="register-container">
            <div className="register-card">
            <div className="register-logo">
                <img src={slackLogo} alt="Slack logo" />
            </div>

            <h1 className="register-title">
                Ingresa tu correo electrónico
            </h1>
            <p className="register-subtitle">
                Te sugerimos que uses la{" "}
                <strong>
                dirección de correo electrónico que usas en el trabajo.
                </strong>
            </p>

            <form onSubmit={handleSubmit} className="register-form">
                <div className="form-group">
                <input
                    name={FORM_FIELDS.NAME}
                    id={FORM_FIELDS.NAME}
                    type="text"
                    onChange={handleInputChange}
                    className="form-input-register"
                    placeholder="Tu nombre completo"
                />
                </div>
                <div className="form-group">
                <input
                    name={FORM_FIELDS.EMAIL}
                    id={FORM_FIELDS.EMAIL}
                    type="email"
                    onChange={handleInputChange}
                    className="form-input-register"
                    placeholder="nombre@empresa.com"
                />
                </div>
                <div className="form-group">
                <input
                    name={FORM_FIELDS.PASSWORD}
                    id={FORM_FIELDS.PASSWORD}
                    type="password"
                    onChange={handleInputChange}
                    className="form-input-register"
                    placeholder="Crea una contraseña de más de 8 caracteres"
                />
                </div>

                {!response ? (
                <button
                    type="submit"
                    disabled={loading}
                    className="submit-button-register"
                >
                    {loading ? "Registrando..." : "Continuar"}
                </button>
                ) : (
                <>
                    <button
                    type="submit"
                    disabled={true}
                    className="submit-button-register success"
                    >
                    ¡Registro exitoso!
                    </button>
                    <div className="message success">
                    <strong>¡Casi listo!</strong> Te enviamos un correo de
                    verificación.
                    <br />
                    Por favor, revisá tu bandeja de entrada para activar
                    tu cuenta.
                    </div>
                </>
                )}
                {error && <div className="message error">{error.message}</div>}
            </form>

            <div className="register-footer">
                ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
            </div>
            </div>
        </div>

        <div className="register-footers">
            <div className="register-footers-links">
            <p>Privacidad y términos</p> <p>Contactarnos</p> <p>Cambiar región</p>
            </div>
        </div>
        </div>
    );
    };

    export default RegisterScreen