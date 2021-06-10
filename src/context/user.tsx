import { createContext, FC, useContext } from 'react';
import { firebase, auth, googleProvider } from "../services/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';


interface IUserContext {
    user: firebase.User | null | undefined,
    loading: boolean,
    error: firebase.auth.Error | undefined,
    login: () => void,
    logout: () => void
}

// 1.Crear el context del usuario
const UserContext = createContext<IUserContext>({
    user: null,
    loading: true,
    error: undefined,
    login: () => {},
    logout: () => {} 
});


// 2.Crear el provider del usuario
export const UserProvider: FC = ({ children }) => {
    
    const [user, loading, error] = useAuthState(auth);

    const login = async () => {
        await auth.signInWithPopup(googleProvider);
    }

    const logout = async () => {
        await auth.signOut();
    }

    return (
        <UserContext.Provider 
            value = {{
                user, 
                loading, 
                error, 
                login, 
                logout,
            }}
        >
            { children }
        </UserContext.Provider>
    )
}


// 3.Crear una buena forma de usar useContext
export const useUser = () => useContext(UserContext);
