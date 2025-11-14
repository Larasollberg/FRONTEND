import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import useFetch from '../../hooks/useFetch.jsx'
import { getWorkspaceById } from '../../services/workspaceService.js'
import InviteUserForm from '../../Components/InviteUserForm/InviteUserForm.jsx'
import ChannelList from '../../Components/ChannelList/ChannelList.jsx'
import "./WorkspaceDetailScreen.css"

const WorkspaceDetailScreen = () => {
    const { workspace_id} = useParams()

    const { sendRequest, response, error, loading } = useFetch()
    useEffect(
        () => {
            sendRequest(
                async () => {
                    return await getWorkspaceById(workspace_id)
                }
            )
        },
        [workspace_id]
    )




    return (
        <div>
            {
                response && (
                    <h1>Workspace Seleccionado: {response.data.workspace.name}</h1>
                )
            }
            <InviteUserForm workspace_id={workspace_id} />
            {
                workspace_id &&
                <ChannelList/>
            }
        </div>
    )
}

export default WorkspaceDetailScreen