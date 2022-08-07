import {
    combineReducers,
    createStore
} from "redux";
import {
    authReducer
} from "./auth/Reducer";

const rootReducer = combineReducers( {
    auth: authReducer,
} )

export const configureStore = () => {
    const store = createStore( rootReducer )
    return store
}