import React, { useState, useRef, useEffect } from "react"
import { useMapEvent } from 'react-leaflet/hooks'
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


let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [30,30]
});

L.Marker.prototype.options.icon = DefaultIcon

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
      }, [lat, lng]);
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
      console.log('not support')
    }

    return (
      <div className={className + ' col-md-8'} >
        <MapContainer center={[25.033671, 121.564427]} zoom={17} style={{height: '100vh'}} >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Control prepend position='topright'>
          <div className="map-btn link" data-active = {paramsId === 'car' ? true : false}><Link to="/car"><i className="fa-solid fa-car"></i></Link></div>
        </Control>
        <Control prepend position='topright'>
          <div className="map-btn link" data-active = {paramsId === 'moto' ? true : false}><Link to="/moto"><i className="fa-solid fa-motorcycle"></i></Link></div>
        </Control>
        <Control prepend position='topright'>
          <div className="map-btn" onClick={UpdateCurrentPos}><i className="fa-solid fa-location-crosshairs"></i></div>
        </Control>
        <Recenter lat={Number(getPos[0])} lng={Number(getPos[1])} />
        <Circle center={[Number(getPos[0]), Number(getPos[1])]} pathOptions={fillBlueOptions} radius={getDis*1000} />
        <Marker position={[Number(getPos[0]), Number(getPos[1])]} >
          <Popup>目前位置</Popup>
        </Marker>
        {getParksNow.map((park) => {
            return (<Marker position={[park.lat,park.lng]} key={park.id} >
               <Popup>
                   {park.name}
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

  .map-btn.link{
    background: var(--dark-60);
    &[data-active = "true"]{
      background: var(--alert-color);
    }
  }

`

const mapStateToProps  = (state) => ({parks:state.parks, position: state.position})

export default connect(mapStateToProps, {updatePosition , getParks})(MyMap)