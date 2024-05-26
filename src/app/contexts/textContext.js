import {createContext, useContext, useReducer} from "react";
import testAction from "@/core/testAction";

const initialState = {
    firstName: "Petar",
    email: "pbisevac@singidunum.ac.rs",
}

//kreiranje konteksta
const testContext = createContext();

// kreiranje reducera - menja stanje konteksta
const testReducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case testAction.CHANGE_EMAIL:
            return {...state, email: action.payload};
        case testAction.CHANGE_FIRST_NAME:
            return {...state, firstName: action.payload};
        default:
            return state;
    }
};

// kreiranje provajdera
const TestProvider = ({ children }) => {
    const [state, dispatch] = useReducer(testReducer, initialState);

    const value = { state, dispatch };

    return (
        <testContext.Provider value={value}>
            {children}
        </testContext.Provider>
    );
};

// kreiranje hook funkcije
const useTestActions = () => {
    const context = useContext(testContext);

    if (context === undefined) {
        throw new Error('testActions must be used within a TestProvider');
    }

    return context;
};

export { TestProvider, useTestActions };