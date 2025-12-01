import { useNavigate } from "react-router"
import useFetch from "../../hooks/useFetch"
import useForm from "../../hooks/useForm" 
import { useEffect } from "react"  
import { createWorkspace } from "../../services/workspaceService.js"



const NewWorkspaceScreen = () => {

    const FORM_FIELDS =
    {
        NAME: 'name',
        IMAGE: 'url_image',
    }
    const initial_form_state = {
        [FORM_FIELDS.NAME]: '',
        [FORM_FIELDS.IMAGE]: ''
    }

    const { sendRequest, loading, response, error } = useFetch()
    const navigate = useNavigate();
    
    const onCreateWorkspace = (form_state) => {
        sendRequest(() => createWorkspace(form_state[FORM_FIELDS.NAME], form_state[FORM_FIELDS.IMAGE]))
    }
    
    const {
        form_state: register_form_state,
        handleSubmit,
        handleInputChange
    } = useForm(
        {
            initial_form_state,
            onSubmit: onCreateWorkspace
        }
    )
    useEffect(() => {
        console.log('Response after create:', response);  
        console.log('Error:', error);  
        
        const workspaceId = response?.data?.workspace?._id || response?.workspace?.id || response?.id;
        if (response && !error && workspaceId) {
            console.log('Redirecting to workspace:', workspaceId); 
            navigate(`/workspace/${workspaceId}`);
        }
    }, [response, error, navigate]);


    return (
        <div>
            <h1>Crea tu Workspace</h1>
            <br />
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor={FORM_FIELDS.NAME}>Nombre del Workspace: </label>
                    <br />
                    <input
                        type="text"
                        name={FORM_FIELDS.NAME}
                        id={FORM_FIELDS.NAME}
                        value={register_form_state[FORM_FIELDS.NAME]}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    {
                        !response
                            ? <button type="submit" disabled={loading}>Crear</button>
                            :
                            <>
                                <button type="submit" disabled={true}>Crear</button>
                                <span style={{ color: 'green' }}>{response.message}</span>
                            </>
                    }
                    {
                        error && error.message && <span style={{ color: 'red' }}>{error.message}</span>

                    }
                </div>
            </form>
        </div>
    )
}
export default NewWorkspaceScreen