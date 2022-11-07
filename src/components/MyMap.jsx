import React, { useState, useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet'
import L from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import styled from 'styled-components'
import store from '../store'
import Control from 'react-leaflet-custom-control'
import { updatePosition , getParks} from '../actions/mapActions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'


let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon

const greenIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
})

const orangeIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
})

const greyIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
})

const Element = ({ className , paramsId}) => {
    const newState = store.getState()
    const [getParksNow , updateParks] = useState([])
    const [getPos, updatePos] = useState([25.033671, 121.564427])
    const [getDis, updateDis ] = useState(0.3)
    
    useEffect(() => {
      if(newState.parks.parks){
        updateParks(newState.parks.parks)
      }
      if(newState.all.currentPos){
        updatePos(newState.all.currentPos)
      }
      if(newState.all.distance){
        updateDis(newState.all.distance)
      }
    },[newState])

    const Recenter = ({lat,lng}) => {
      const map = useMap()
      useEffect(() => {
        if(lat && lng){
          map.setView([lat, lng])
        }
      }, [map,lat,lng]);
      return null
    }

    const fillBlueOptions = { fillColor: 'blue' }

    const UpdateCurrentPos = (e) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error)
      }
    }

    function success(position){
      const lat = position.coords.latitude;
      const lng = position.coords.longitude
      const latlng = lat.toString() + ',' + lng.toString()
      store.dispatch(updatePosition(latlng))
      store.dispatch(getParks())
    }

    function error() {
      Swal.fire({
        icon: 'warning',
        title: '無法定位'
      })
    }

    function sortMarker(paramsId,availablecar,availablemotor){
       let icon = greyIcon
      if(paramsId === 'car' && availablecar){
        if(availablecar > 10){
          icon = greenIcon
          return icon
        }else if( 10 > availablecar && availablecar > 0){
          icon = orangeIcon
          return icon
        }
      }
      if(paramsId === 'moto' && availablemotor){
        if(availablemotor > 10){
          icon = greenIcon
          return icon
        }else if( 10 > availablemotor && availablemotor > 0){
          icon = orangeIcon
          return icon
        }
      }
      return icon
    }

    const changeMarkerOnClick = (e) => {
      document.querySelectorAll('.leaflet-marker-icon').forEach((item,idx) => {
        item.classList.remove('active')
      })
      e.target._icon.classList.add("active")
    }

    const google_url = 'https://www.google.com/maps/search/?api=1&map_action=map&zoom=16&query='

    return (
      <div className={className + ' col-md-8'} >
        <MapContainer center={[25.033671, 121.564427]} zoom={17} style={{height: '100vh'}} >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Control prepend position='topright'>
          <div className="map-btn link" hidden = {paramsId === 'car' ? true : false}><Link to="/car"><i className="fa-solid fa-car"></i></Link></div>
        </Control>
        <Control prepend position='topright'>
          <div className="map-btn link" hidden = {paramsId === 'moto' ? true : false}><Link to="/moto"><i className="fa-solid fa-motorcycle"></i></Link></div>
        </Control>
        <Control prepend position='topright'>
          <div className="map-btn" onClick={UpdateCurrentPos}><i className="fa-solid fa-location-crosshairs"></i></div>
        </Control>
        <Recenter lat={Number(getPos[0])} lng={Number(getPos[1])} />
        <Circle center={[Number(getPos[0]), Number(getPos[1])]} pathOptions={fillBlueOptions} radius={getDis*1000} />
        <Marker position={[Number(getPos[0]), Number(getPos[1])]}>
          <Popup>目前位置</Popup>
        </Marker>
        {getParksNow.map((park) => {
            return (<Marker position={[park.lat,park.lng]} key={park.id} icon = {sortMarker(paramsId,park.availablecar,park.availablemotor)} eventHandlers={{click: changeMarkerOnClick,}}>
               <Popup>
                   <h5 className="text-center">{park.name}</h5>
                    <p className="text-center mt-0 mb-3">剩餘車位：{ paramsId === 'car' ? park.availablecar | 0 : park.availablemotor | 0}</p>
                    <div className="text-center">
                      <a href={google_url+park.lat+','+park.lng}>在 google map 上查看</a>
                    </div>
                 </Popup>
               </Marker>)     
          })}
      </MapContainer>
      </div>
    )
}

const MyMap = styled(Element)`
  padding: 0;
  .leaflet-top, .leaflet-bottom{z-index:998;}
  .map-btn{
    width: 48px;
    height: 48px;
    background: var(--main-color);
    border-radius: 5px;
    text-align:center;
    border: 2px solid rgba(0,0,0,0.2);
    cursor: pointer;
    i{
      color:#fff;
      font-size: 26px;
      line-height: 48px;
    }
  }

  .leaflet-marker-icon.active{
    width: 35px !important; 
    height: 51px !important;
  }

`

const mapStateToProps  = (state) => ({parks:state.parks, position: state.position})

export default connect(mapStateToProps, {updatePosition , getParks})(MyMap)