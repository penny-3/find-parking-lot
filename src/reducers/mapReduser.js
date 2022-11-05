import {GET_PARKS,UPDATE_DIS,UPDATE_POS,UPDATE_AVA} from '../types'

const initialState = {
    parks:[],
    currentPos: [25.033671, 121.564427],
    distance: 1,
    loading:true,
    avaliable: []
}


function twd97_to_latlng($x, $y) {
  var pow = Math.pow, M_PI = Math.PI
  var sin = Math.sin, cos = Math.cos, tan = Math.tan
  var $a = 6378137.0, $b = 6356752.314245
  var $lng0 = 121 * M_PI / 180, $k0 = 0.9999, $dx = 250000, $dy = 0
  var $e = pow((1 - pow($b, 2) / pow($a, 2)), 0.5)

  $x -= $dx
  $y -= $dy

  var $M = $y / $k0

  var $mu = $M / ($a * (1.0 - pow($e, 2) / 4.0 - 3 * pow($e, 4) / 64.0 - 5 * pow($e, 6) / 256.0))
  var $e1 = (1.0 - pow((1.0 - pow($e, 2)), 0.5)) / (1.0 + pow((1.0 - pow($e, 2)), 0.5))

  var $J1 = (3 * $e1 / 2 - 27 * pow($e1, 3) / 32.0)
  var $J2 = (21 * pow($e1, 2) / 16 - 55 * pow($e1, 4) / 32.0)
  var $J3 = (151 * pow($e1, 3) / 96.0)
  var $J4 = (1097 * pow($e1, 4) / 512.0)

  var $fp = $mu + $J1 * sin(2 * $mu) + $J2 * sin(4 * $mu) + $J3 * sin(6 * $mu) + $J4 * sin(8 * $mu)

  var $e2 = pow(($e * $a / $b), 2)
  var $C1 = pow($e2 * cos($fp), 2)
  var $T1 = pow(tan($fp), 2);
  var $R1 = $a * (1 - pow($e, 2)) / pow((1 - pow($e, 2) * pow(sin($fp), 2)), (3.0 / 2.0))
  var $N1 = $a / pow((1 - pow($e, 2) * pow(sin($fp), 2)), 0.5)

  var $D = $x / ($N1 * $k0)

  var $Q1 = $N1 * tan($fp) / $R1
  var $Q2 = (pow($D, 2) / 2.0)
  var $Q3 = (5 + 3 * $T1 + 10 * $C1 - 4 * pow($C1, 2) - 9 * $e2) * pow($D, 4) / 24.0
  var $Q4 = (61 + 90 * $T1 + 298 * $C1 + 45 * pow($T1, 2) - 3 * pow($C1, 2) - 252 * $e2) * pow($D, 6) / 720.0
  var $lat = $fp - $Q1 * ($Q2 - $Q3 + $Q4)

  var $Q5 = $D;
  var $Q6 = (1 + 2 * $T1 + $C1) * pow($D, 3) / 6
  var $Q7 = (5 - 2 * $C1 + 28 * $T1 - 3 * pow($C1, 2) + 8 * $e2 + 24 * pow($T1, 2)) * pow($D, 5) / 120.0
  var $lng = $lng0 + ($Q5 - $Q6 + $Q7) / cos($fp)

  $lat = ($lat * 180) / M_PI
  $lng = ($lng * 180) / M_PI

  return {
    lat: $lat,
    lng: $lng
  }
}

function distance(lat1, lon1, lat2, lon2, unit) {
    	var radlat1 = Math.PI * lat1/180
    	var radlat2 = Math.PI * lat2/180
    	var theta = lon1-lon2
    	var radtheta = Math.PI * theta/180
    	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
    	if (dist > 1) {
    		dist = 1
    	}
    	dist = Math.acos(dist)
    	dist = dist * 180/Math.PI
    	dist = dist * 60 * 1.1515
    	if (unit==="K") { dist = dist * 1.609344 }
    	if (unit==="N") { dist = dist * 0.8684 }
    	return dist
}

function getCurrentPos(position) {
    if(!position){
        return [25.033671, 121.564427]
    }
    return position
}

function getCurrentDis(distance) {
    console.log(distance)
    if(!distance){
        return 1
    }
    return distance
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_PARKS:
    const nearest = []

    const all = action.payload.data.park.map((park) => {
        return park = {
            ...park,
            lat: twd97_to_latlng(park.tw97x,park.tw97y).lat,
            lng: twd97_to_latlng(park.tw97x,park.tw97y).lng
        }
   })

    const newcurrentPos = getCurrentPos(state.currentPos)
    const newcurrentDis = getCurrentDis(state.distance)
    //Sort your locations array by distance (nearest to furthest)
    for (var i = 0; i < all.length; i++) {
        //if this location is within 0.3KM of the user, add it to the list
      if (distance( Number(newcurrentPos[0]), Number(newcurrentPos[1]), all[i].lat, all[i].lng, "K") <= newcurrentDis) { 
        all[i] = {
          ...all[i],
          distance: Math.round(distance( Number(newcurrentPos[0]), Number(newcurrentPos[1]), all[i].lat, all[i].lng, "K")* 100)/100
        }            
        nearest.push(all[i])
      }
    }
        return {
            ...state,
            parks: nearest,
            loading:false
        }
            case UPDATE_POS:
            return {
            ...state,
            currentPos: action.payload,
        }
            case UPDATE_DIS:
            return {
            ...state,
            distance: action.payload,
        }
        case UPDATE_AVA:
            return {
            ...state,
            ...action.payload
        }



        default: return state
    }

}