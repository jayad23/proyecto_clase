import React, { createContext, useReducer } from "react";
import { removeFromStorage, addInStorage } from "./helpers";

export const NewContext = createContext({});

const handleDispatch = (state, { type, payload }) => {
    switch (type) {
        case "LOGGIN":
            sessionStorage.setItem("token", JSON.stringify(payload.token));
            sessionStorage.setItem("user", JSON.stringify(payload.email))
            return {
                ...state,
                isLogged: true,
                user: payload.email
            }
        case "LOGOUT":
            localStorage.clear();
            sessionStorage.clear();
            return {
                ...state,
                isLogged: false,
                user: null
            }
        case "FAVS":
            //AQUÍ VA LA LÓGICA PARA VERIFICAR SI EL ELEMENTO YA SE ENCUENTRA
            const doesExist = state.data.some(person => person.id === payload.id);
            doesExist ? removeFromStorage(state, payload) : addInStorage(state, payload);
            return doesExist ? {
                ...state,
                data: removeFromStorage(state, payload)
            } : {
                ...state,
                data: addInStorage(state, payload)
            }
        default:
            return state;
    }
};

const NewContextProvider = ({ children }) => {
    const initialState = {
        isLogged: !!sessionStorage.getItem("token"),
        user: JSON.parse(sessionStorage.getItem("user")),
        data: JSON.parse(localStorage.getItem("favoritos")) ?? []
    };
    const [state, dispatch] = useReducer(handleDispatch, initialState);

    const propiedades = { state, dispatch }

    return (
        <NewContext.Provider value={propiedades}>
            {children}
        </NewContext.Provider>
    )
}

export default NewContextProvider;