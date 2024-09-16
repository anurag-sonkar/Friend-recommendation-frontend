import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext()

export const useUserState = ()=> {
    return useContext(UserContext)

}

const UserContextProvider = (props)=>{
    const [user , setUser] = useState()
    // const navigate = useNavigate()

//     useEffect(
//         ()=>{
//   const userInfo = JSON.parse(localStorage.getItem('user-info'))
// //   console.log(userInfo)
//             setUser(userInfo)

//             if(userInfo){
//                 navigate('/')
//             }
//         },[navigate]
//     )


useEffect(
    ()=>{
        const userInfo = JSON.parse(localStorage.getItem('user-info'))
        setUser(userInfo)
    },[]
)

    return <UserContext.Provider value={{user , setUser}}>
        {props.children}
    </UserContext.Provider>
}

export default UserContextProvider