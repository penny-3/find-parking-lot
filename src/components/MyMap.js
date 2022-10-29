import React, { useState, useRef } from "react"
import { useMapEvent } from 'react-leaflet/hooks'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import styled from 'styled-components'

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [30,30]
});

L.Marker.prototype.options.icon = DefaultIcon

const Element = ({ red, className }) => {
    return (
      <div className={className + ' col-md-8'} >
        <MapContainer center={[25.033671, 121.564427]} zoom={17} style={{height: '100vh'}} >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[25.033671, 121.564427]} >
          <Popup>目前位置</Popup>
        </Marker>
      </MapContainer>
      </div>
    )
}

const MyMap = styled(Element)`
  padding: 0;
`

export default MyMap