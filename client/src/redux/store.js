import {
    combineReducers,
    createStore
} from "redux";
import {
    authReducer
} from "./auth/Reducer";
import {
    dataReducer
} from './data/Reducer'

const rootReducer = combineReducers( {
    auth: authReducer,
    data: dataReducer
} )

export const configureStore = () => {
    const store = createStore( rootReducer )
    return store
}