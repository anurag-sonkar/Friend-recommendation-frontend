import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext()

export const useUserState = ()=> {
    return useContext(UserContext)

}

const UserContextProvider = (props)=>{
    const [user , setUser] = useState(null)
    const [socket , setSocket] = useState()
    const [onlineUsers , setOnlineUsers] = useState()
    const [notifications , setNotifications] = useState([])
    const navigate = useNavigate()
    
useEffect(
    ()=>{
        const userInfo = JSON.parse(localStorage.getItem('user-info'))
        setUser(userInfo)
        if(userInfo) navigate('/')
    },[navigate]
)

    return <UserContext.Provider value={{ user, setUser, socket, setSocket, onlineUsers, setOnlineUsers, notifications, setNotifications }}>
        {props.children}
    </UserContext.Provider>
}

export default UserContextProvider