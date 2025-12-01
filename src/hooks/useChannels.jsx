import { useEffect, useState, useCallback } from "react"
import { useParams, useNavigate } from "react-router"
import { createNewChannel, getChannelListByWorkspaceId } from "../services/channelService.js"
import useFetch from "/src/hooks/useFetch.jsx"


function useChannels() {
    const { workspace_id } = useParams(); 
    const navigate = useNavigate();
    const {
        loading,
        response,
        error,
        sendRequest
    } = useFetch();
    const [channels, setChannels] = useState([]);
    useEffect(() => {
        if (!workspace_id && !isCreating) {
            navigate('/home');  // O '/workspaces'
        }
    }, [workspace_id, isCreating, navigate]);

    const loadChannelList = useCallback(async () => {
        if(!workspace_id) return;
        sendRequest(async () => {
            return getChannelListByWorkspaceId(workspace_id);
        });
    }, [workspace_id, sendRequest]);
    
    const createChannel = useCallback(async (name) => {
        if(!workspace_id) return;
        sendRequest(async () => {
            const createResponse = await createNewChannel(workspace_id, name);
            if (createResponse.error) {
                throw new Error("Error al crear canal");
            }
            // Si no hay error, recargar la lista
            const listResponse = await getChannelListByWorkspaceId(workspace_id);
            return listResponse;
        });
    }, [workspace_id, sendRequest]);
    
    useEffect(() => {
        loadChannelList();
    }, [loadChannelList]);
    
    useEffect(() => {
        if (response && !error) {
            setChannels(response.data?.channels || []);
        }
    }, [response, error]);
    
    return {
        loading,
        response,
        error,
        channels,
        createChannel,
        loadChannelList
    };
}
export default useChannels
