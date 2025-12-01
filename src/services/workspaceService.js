import ENVIRONMENT from "../config/environment";
import { getAuthorizationToken, HTTP_METHODS, HEADERS, CONTENT_TYPE_VALUES } from "../constants/http.js";


async function getWorkspaceList() {
    const response_http = await fetch(
        `${ENVIRONMENT.URL_API}/api/workspace`,
        {
            method: HTTP_METHODS.GET,
            headers: {
                'Authorization': "Bearer " + getAuthorizationToken() 
            }
        }
    )

    const response_data = await response_http.json()
    return response_data
}

async function createWorkspace(name, url_img = "") {
    const token = getAuthorizationToken();
    console.log('Token enviado:', token);
    const response_http = await fetch(`${ENVIRONMENT.URL_API}/api/workspace`, {
        method: HTTP_METHODS.POST,
        headers: {
        [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON,
        Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({name, url_img}),
    });
    console.log('Headers enviados:', {
    'Content-Type': CONTENT_TYPE_VALUES.JSON,
    'Authorization': `Bearer ${token}`  
});
    const response_data = await response_http.json();
    if (response_data.success && !response_data.data?.workspace?._id) {
        console.log('Workspace created, fetching list to get ID...');  
        const listResponse = await getWorkspaceList();
        if (listResponse.success) {
            const createdWorkspace = listResponse.data.workspaces.find(ws => ws.name === name);
            if (createdWorkspace) {
                response_data.data = { workspace: createdWorkspace };  
            } else {
                console.error('Workspace not found in list after creation');
            }
        }
    }
    return response_data;
}

async function getWorkspaceById(workspace_id) {
    const response_http = await fetch(
        `${ENVIRONMENT.URL_API}/api/workspace/${workspace_id}`,
        {
            method: HTTP_METHODS.GET,
            headers: {
                Authorization: "Bearer " + getAuthorizationToken(),
            },
        }
    );
    const response_data = await response_http.json();
    return response_data
}

async function inviteUser (invited_email, workspace_id){
    const response_http = await fetch(
        `${ENVIRONMENT.URL_API}/api/workspace/${workspace_id}/invite`,
        {
            method: HTTP_METHODS.POST,
            headers: {
                [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON,
                'Authorization': "Bearer " + getAuthorizationToken()
            },
            body: JSON.stringify({invited_email})
        }
    )
    const response_data = await response_http.json()
    return response_data
}

async function deleteWorkspace(workspace_id) {
    const response_http = await fetch(
        `${ENVIRONMENT.URL_API}/api/workspace/${workspace_id}`,
        {
        method: HTTP_METHODS.DELETE,
        headers: {
            Authorization: "Bearer " + getAuthorizationToken(),
        },
        }
    );
    const response_data = await response_http.json();
    return response_data;
    }

export { getWorkspaceList, createWorkspace, getWorkspaceById, inviteUser, deleteWorkspace}