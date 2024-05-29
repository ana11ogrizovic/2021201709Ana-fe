import {createContext} from "react";
import testAction from "@/core/testAction";

 const initialState = {
     firstName: "Petar",
     email: "petar@singidunum.ac.rs"
 }

 const testContext = createContext(); //kreiranje konteksta

 //kreiranje reducera - menja stanje u kontekstu
const testReducer = (state, action) =>{
   switch(action.type){
       case testAction.CHANGE_EMAIL:
           return {...state, email:action.payload};
       case testAction.CHANGE_FIRST_NAME:
           return {...state, firstName: action.payload};
       default:
           return state;
   }

    return {};
 }

 //kreiranje providera
 const TestProvider = ({chlidren}) =>{
     const [state, dispatch] = useReducer(testReducer, initialState);

     const value = {state, dispatch};

     return(
         <testContext.Provider value={value}>
             {children}
         </testContext.Provider>
     );
 }

 //hook koji upravlja svim funkcijama koje su navedene
 const useTestActions = () => {
     const context = useContext(testContext);

     if(context === undefined){
         throw new Error('testActions must be used within a TestProvider');

     }
     return context;
 }
export { TestProvider, useTestActions };