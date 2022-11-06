import React, {useEffect,useState} from 'react'
import styled from 'styled-components'
import '../Basic.css'
import { Link } from 'react-router-dom'
import store from '../store'


const Element = ({ className, park}) => {

  const [todayFare, updateFare] = useState(0)

  const closeModal = (e) => {
    document.querySelector('.modal').classList.remove('show')
  }

  const isBetween = (testNumber, lowerLimit, upperLimit) => {
    return testNumber >= lowerLimit && testNumber <= upperLimit
  }

  const google_url = 'https://www.google.com/maps/search/?api=1&map_action=map&zoom=16&query='

  let today = []


    useEffect(() => {
      getCurrentTime()
      const getFee = () => {
        console.log(park.FareInfo)
        if(park.FareInfo.length > 0)
        return updateFare(park.FareInfo[today[0]][today[1]].Fare)
      }
      getFee()
    },[park])

  const getCurrentTime = () => {
    const d = new Date()
    let hour = d.getHours()
    let day = d.getDay()
    if (isBetween(day,1,5)&& isBetween(hour,0,9)){
      today = ['WorkingDay',0]
    }else if(isBetween(day,1,5)&& isBetween(hour,10,18)){
      today = ['WorkingDay',1]
    }else if(isBetween(day,1,5)&& isBetween(hour,19,24)){
      today = ['WorkingDay',2]
    }else if(isBetween(day,6,7)&& isBetween(hour,0,9)){
      today = ['Holiday',0]
    }else if(isBetween(day,6,7)&& isBetween(hour,10,18)){
      today = ['Holiday',1]
    }else if(isBetween(day,6,7)&& isBetween(hour,19,24)){
      today = ['Holiday',2]
    }
    return today
  }

	return (
    <div className={ className + " modal"} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{park.name}</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeModal}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className='info-group d-flex align-items-center mb-1'>
              <i className="fa-solid fa-location-dot"></i>
              <p className='info'>{park.address.length > 0 ? park.address : '台北市'}</p>
            </div>
            <div className='info-group d-flex align-items-center mb-1'>
              <i className="fa-solid fa-phone"></i>
              <p className='info'>{park.tel}</p>
            </div>
            <p className='my-2'>{park.summary}</p>
            <div className='info-group d-flex align-items-center mb-1'>
              <i className="fa-solid fa-comment-dollar"></i>
              <p className='info'>{todayFare}<span>元/小時</span></p>
            </div>
            <div className='info-group d-flex align-items-center mb-1'>
              <p>剩餘車位：</p>
              <p className='info'>{park.availablecar > 0 ? park.availablecar : 0}</p>
            </div>
            <div className='info-group d-flex align-items-center'>
              <p>剩餘機車位：</p>
              <p className='info'>{park.availablemotor > 0 ? park.availablemotor : 0}</p>
            </div>
          </div>
          <div className="modal-footer justify-content-center">
            <div className='btn'><a href={google_url+ store.getState().all.currentPos}><p>導航位置</p></a></div>
          </div>
        </div>
      </div>
    </div>
	)
}


const ParkingLotDetail = styled(Element)`
  pointer-events: none;
  --bs-modal-border-radius: 0;
  transform: none;
  left: 0;
  &.show{
    display: block;
  }

  .modal-dialog{
    left: 0;
    top: 0;
    position: absolute;
    width: 100%;
    margin: 0;
  }

  .modal-content{
    height: 100vh;
  }
  @media(min-width:796px){
    --bs-modal-border-radius: 0.5rem;
    .modal-dialog{
      margin-top: 20px;
      margin-left: 0;
      margin-right: 0;
      left: 50%;
      transform: translateX(calc(-50% + 20px)) !important;
    }

    .modal-content{
      height: auto;
    }
  }
`

export default ParkingLotDetail


