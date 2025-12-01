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
        console.log('Response after create:', response);  // ✅ Log para ver la estructura
        console.log('Error:', error);  // ✅ Log para errores
        
        // Condición flexible: Busca el ID en posibles lugares de la respuesta
        const workspaceId = response?.data?.workspace?._id || response?.workspace?.id || response?.id;
        if (response && !error && workspaceId) {
            console.log('Redirecting to workspace:', workspaceId);  // ✅ Log antes de navegar
            navigate(`/workspace/${workspaceId}`);
        }
    }, [response, error, navigate]);
    /*useEffect(() => {
        if (response && !error && response.data?.workspace?._id) {
            // Navega al workspace recién creado
            navigate(`/workspace/${response.data.workspace._id}`);
        }
    }, [response, error, navigate]);*/


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
                <br />
                <div>
                    <label htmlFor={FORM_FIELDS.IMAGE}>Ruta de imagen: </label>
                    <br />
                    <input
                        type="text"
                        name={FORM_FIELDS.IMAGE}
                        id={FORM_FIELDS.IMAGE}
                        value={register_form_state[FORM_FIELDS.IMAGE]}
                        onChange={handleInputChange}
                    />
                </div>
                <br />  
                <div>
                    {
                        !response
                            ? <button type="submit" disabled={loading}>Crear</button>
                            :
                            <>
                                <button type="submit" disabled={true}>Crear</button>
                                response && response.message && <span style={{ color: 'green' }}>{response.message}</span>
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