import useFetch from "../hooks/useFetch"
import useForm from "../hooks/useForm"



const NewWorkspaceScreen = () => {

    const FORM_FIELS =
    {
        NAME: 'name',
        IMAGE: 'url_image',
    }
    const initial_form_state = {
        [FORM_FIELS.NAME]: '',
        [FORM_FIELS.IMAGE]: ''
    }

    const { sendRequest, loading, response, error } = useFetch()

    const onCreateWorkspace = (form_state) => {
        sendRequest(() => CreateWorkspace(form_state[FORM_FIELS.NAME], form_state[FORM_FIELS.IMAGE]))
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

    return (
        <div>
            <h1>Crea tu Workspace</h1>
            <br />
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor={FORM_FIELS.NAME}>Nombre del Workspace: </label>
                    <br />
                    <input
                        type="text"
                        name={FORM_FIELS.NAME}
                        id={FORM_FIELS.NAME}
                        onChange={handleInputChange}
                    />
                </div>
                <br />
                <div>
                    <label htmlFor={FORM_FIELS.IMAGE}>Ruta de imagen: </label>
                    <br />
                    <input
                        type="text"
                        name={FORM_FIELS.IMAGE}
                        id={FORM_FIELS.IMAGE}
                        onChange={handleInputChange}
                    />
                </div>
                <br />  
                <div>
                    {
                        !response
                            ? <button type="submit" disabled={false}>Crear</button>
                            :
                            <>
                                <button type="submit" disabled={true}>Crear</button>
                                <span style={{ color: 'green' }}>{response.message}</span>
                            </>
                    }
                    {
                        error && <span style={{ color: 'red' }}>{error.message}</span>

                    }
                </div>
            </form>
        </div>
    )
}
export default NewWorkspaceScreen