import {GET_PARKS, PARKS_ERROR, GET_AVA, AVA_ERROR, UPDATE_POS,UPDATE_DIS, UPDATE_AVA} from '../types'
import axios from 'axios'


const getParks = () => async dispatch => {
    
    try{
        const res = await axios.get(`https://ga686.github.io/parking-api/parks.json`)
        dispatch( {
            type: GET_PARKS,
            payload: res.data
        })
    }
    catch(e){
        dispatch( {
            type: PARKS_ERROR,
            payload: console.log(e),
        })
    }

}

const getAvailable = () => async dispatch => {
    
    try{
        const res = await axios.get(`https://ga686.github.io/parking-api/avaliable_park.json`)
        dispatch( {
            type: GET_AVA,
            payload: res.data
        })
    }
    catch(e){
        dispatch( {
            type: AVA_ERROR,
            payload: console.log(e),
        })
    }

}

const updatePosition = (position) => {
    let newPos = []
    newPos.push(position.split(','))
    console.log(newPos)
    return {
		type: UPDATE_POS,
		payload: newPos[0]
	};
}

const updateDistance = (distance) => {
    let newDis = Number(distance)
    return {
		type: UPDATE_DIS,
		payload: newDis
	};
}

const updateAva = (parkData,availableData) => {
    const newAvailable = []
    if(parkData && availableData){
    newAvailable.length = 0
    for(let i = 0; i < parkData.length; i++){
        availableData.map((park) => {
        if(parkData[i].id === park.id){
            parkData[i] = {
            ...parkData[i],
            availablecar: park.availablecar,
            availablemotor: park.availablemotor
          } 
        newAvailable.push(parkData[i])    
        }
      })
    }
    }
    return {
        type: UPDATE_AVA,
        payload: {...parkData,...newAvailable}
    }
    
}

export {getAvailable, getParks, updatePosition, updateDistance, updateAva}