import {GET_AVA} from '../types'

const initialState = {
    available:[],
    loading:true
}

export default function getAvailablePark(state = initialState, action){

    switch(action.type){

        case GET_AVA:
        return {
            ...state,
            available:action.payload.data.park,
            loading:false
        }
        default: return state
    }

}