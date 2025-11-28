import React from "react";
import { useNavigate } from "react-router";
import slackLogo from "../../assets/images/slack-logo.png";
import "./CreateNewWorkspace.css";

const CreateNewWorkspace = () => {
    const navigate = useNavigate();

    const handleContinue = () => {
        navigate("/workspace/new");
    };

    return (
        <div className="createNewWorkspace-container">
        <div className="createNewWorkspace-logo">
            <img src={slackLogo} alt="Slack logo" />
        </div>
        <div className="createNewWorkspace-title-subtitle">
            <h2 className="createNewWorkspace-title">¡Hola de nuevo!</h2>
            <p className="createNewWorkspace-subtitle">
            Crear un nuevo espacio de trabajo
            </p>
        </div>
        <div className="createNewWorkspace--button">
            <button className="createNewWorkspace-button" onClick={handleContinue}>
            <span className="button-icon">+</span>
            <span className="button-text">Crea un nuevo espacio de trabajo</span>
            <span className="button-arrow">→</span>
            </button>
        </div>
        </div>
    );
    };

export default CreateNewWorkspace