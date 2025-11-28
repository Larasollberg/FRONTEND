import { useEffect, useState, useCallback } from "react"
import { useParams } from "react-router"
import { createNewChannel, getChannelListByWorkspaceId } from "../services/channelService.js"
import useFetch from "/src/hooks/useFetch.jsx"
import { useNavigate } from "react-router"



/*function useChannels (){
    const {
        loading,
        response,
        error,
        sendRequest
    } = useFetch()

    const [channels, setChannels] = useState([])
    async function loadChannelList (){
        if (!workspace_id) {
            console.error('Workspace ID is undefined');  // O lanza un error
            return;
        }
        sendRequest(
            async () => {
                return getChannelListByWorkspaceId(workspace_id)
            }
        )
    }

    async function createChannel (name){
        if (!workspace_id) {
            console.error('Workspace ID is undefined');
            return;
        }
        sendRequest(
            async () => {
                const createResponse= await createNewChannel(workspace_id, name)
            if (!createResponse.error) {
        throw new Error("Error al crear canal");
        }
        const listResponse = await getChannelListByWorkspaceId(workspace_id);

        return listResponse
            }
        )
    }

    useEffect(
        () => {
            loadChannelList()
        },
        [workspace_id]
    )

    useEffect(
        () => {
            if(response && !error){
                
                setChannels(response.data?.channels || [])
            }
        },
        [response, error]
    )
    return {
        loading,
        response,
        error,
        channels,
        createChannel
    }
}*/
function useChannels() {
    const { workspace_id } = useParams();  // Declarar primero
    const navigate = useNavigate();
    // Si no hay workspace_id, redirigir y salir
    if (!workspace_id) {
        navigate('/home');  // O '/workspaces'
        return;  // Salir del hook
    }
    const {
        loading,
        response,
        error,
        sendRequest
    } = useFetch();


    const [channels, setChannels] = useState([]);
    const loadChannelList = useCallback(async () => {
        sendRequest(async () => {
            return getChannelListByWorkspaceId(workspace_id);
        });
    }, [workspace_id, sendRequest]);
    const createChannel = useCallback(async (name) => {
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
        createChannel
    };
}
export default useChannels
