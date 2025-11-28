import React, { useEffect, useState, useRef } from "react";

import useChannelMessage from "../../hooks/useChannelMessage";
import "./ChannelChat.css";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { deleteChannel } from "../../services/channelService";
import { MoreVertical } from "lucide-react";

const ChannelChat = ({ channelName, isAdmin, loadChannelList }) => {
    const { workspace_id, channel_id } = useParams();
    const [menuAbierto, setMenuAbierto] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    const { messages, createChannelMessage, loadMessagesList } =
        useChannelMessage();
    const [newMessage, setNewMessage] = useState("");

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
        await createChannelMessage(workspace_id, channel_id, newMessage);
        setNewMessage("");
        }
    };

    /*useEffect(() => {
        const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setMenuAbierto(false);
        }
        };

        /* Solo agregá el listener si el menú está abierto
        if (menuAbierto) {
        document.addEventListener("mousedown", handleClickOutside);
        }

        // Cleanup: Removelo cuando el componente se desmonte o menuAbierto cambie
        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuAbierto]); // Se ejecuta cada vez que menuAbierto cambia

    const toggleMenu = () => {
        setMenuAbierto(!menuAbierto);
    };*/

    const handleEliminarCanal = async () => {
        if (window.confirm("¿Quieres eliminar este canal?")) {
        const result = await deleteChannel(workspace_id, channel_id);
        await loadChannelList();
        setMenuAbierto(false);
        if (result.ok) {
            navigate(`/workspace/${workspace_id}`);
        } else {
            alert("Error: " + result.message);
        }
        }
    };

    return (
        <div className="channel-chat-container">
        <div className="channel-chat-header">
            <h3 className="channel-chat-title"># {channelName}</h3>
            {isAdmin && channel_id && (
            <div ref={menuRef}>
                <div className="channel-chat-title-button-ctn" onClick={toggleMenu}>
                <MoreVertical size={20} color="white" />
                </div>

                {menuAbierto && (
                <div className="channel-menu-dropdown">
                    <div
                    className="channel-menu-item"
                    onClick={handleEliminarCanal}
                    >
                    Eliminar canal
                    </div>
                </div>
                )}
            </div>
            )}
        </div>
        <div className="channel-chat-messages">
            
        </div>

        <form onSubmit={handleSendMessage} className="channel-chat-form">
            <input
            type="text"
            placeholder="Escribe tu mensaje..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="channel-chat-input"
            />
            <button type="submit" className="channel-chat-button">
            Enviar
            </button>
        </form>
        </div>
    );
    };

export default ChannelChat