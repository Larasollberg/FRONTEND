import React from 'react'
import { Route, Routes } from 'react-router'
import RegisterScreen from './Screens/RegisterScreen/RegisterScreen.jsx'
import { LoginScreen } from './Screens/LoginScreen/LoginScreen.jsx'
import AuthMiddleware from './Middlewares/AuthMiddleware.jsx'
import HomeScreen  from './Screens/HomeScreen/HomeScreen.jsx'
import CreateWorkspaceScreen from './Screens/CreateWorkspaceScreen/CreateWorkspaceScreen.jsx'
import WorkspaceDetailScreen from './Screens/WorkspaceDetailScreen/WorkspaceDetailScreen.jsx'

function App() {

return (

    <Routes>
        <Route path='/' element={<LoginScreen/>} />
        <Route path='/login' element={<LoginScreen/>} />
        <Route path='/register' element={<RegisterScreen/>} />
        <Route element={<AuthMiddleware/>}>
        <Route path='/home' element={<HomeScreen/>}/>
        <Route 
            path='/workspace/new' 
            element={<CreateWorkspaceScreen/>} 
        />
        <Route path='/workspace/:workspace_id' element={<WorkspaceDetailScreen/>}  />
        </Route>
    </Routes>

)
}

export default App