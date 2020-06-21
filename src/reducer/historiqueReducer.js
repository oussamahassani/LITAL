import * as types from '../action/type'


const init = ["bonjour","bonsoir"]

const historiqueReducer = ( state = init , action) => {
    switch(action.type){
     case types.GETALLHISTORIQUE:
         console.log("historiqu", action.paylod)
         return action.paylod
     case types.ADDISTORIQUE:
         return [action.paylod, ...state]
    case types.FILTERHISTORIQUE:
        let x = state;
        console.log(action.paylod)
        console.log(x)
        if (action.paylod !== '')
        return state.filter( el => el.username == action.paylod ||el.id == action.paylod || el.somme ==  action.paylod )  
    default:
    return state
}

}

export default historiqueReducer