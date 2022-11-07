import React, {useEffect,useState} from 'react'
import styled from 'styled-components'
import '../Basic.css'
import store from '../store'


const Element = ({ className, park}) => {

  const [workingday, updateWorkingday] = useState([])
  const [holiday, updateHoliday] = useState([])

  const closeModal = (e) => {
    document.querySelector('.modal').classList.remove('show')
  }

  const google_url = 'https://www.google.com/maps/search/?api=1&map_action=map&zoom=16&query='

    useEffect(() => {
      const getFee = () => {

        updateWorkingday([])
        updateHoliday([])

        if(park.FareInfo.length === 0 | park.FareInfo === undefined)
        return

        if(park.FareInfo.WorkingDay){
          updateWorkingday(park.FareInfo.WorkingDay)
        }
        if(park.FareInfo.Holiday){
          updateHoliday(park.FareInfo.Holiday)
        }
      }
      getFee()
    },[])

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
            <div className='info-group align-items-center mb-1'>
              <i className="fa-solid fa-location-dot"></i>
              <p className='info detail'>{park.address.length > 0 ? park.address : '台北市'}</p>
            </div>
            <div className='info-group align-items-center mb-1'>
              <i className="fa-solid fa-phone"></i>
              <p className='info detail'>{park.tel | '未提供'}</p>
            </div>
            <hr></hr>
            <p className='my-2'>{park.summary}</p>   
            <div className='info-group align-items-baseline my-3 fare-wrap' hidden = {workingday.length <= 0 && holiday.length <= 0 ? true : false}>
              <i className="fa-solid fa-comment-dollar px-3"></i>
              <div className='fare py-2'>
                {workingday.map((day, index )=> (<p key={index} className='info d-block'> {'平日 ' + day.Period }<span className='d-inline-block'>{ day.Fare + ' /小時'}</span></p>))}
                <hr className='my-2'></hr>
                {holiday.map((day, index) => (<p key={index} className='info d-block'> {'假日 ' + day.Period }<span className='d-inline-block'>{ day.Fare + ' /小時'}</span></p>))}
              </div>
            </div>
            <div className='info-group align-items-center mb-1'>
              <p><i className="fa-solid fa-car"></i> 剩餘車位：</p>
              <p className='info detail'>{park.availablecar > 0 ? park.availablecar : 0}</p>
            </div>
            <div className='info-group align-items-center'>
              <p><i className="fa-solid fa-motorcycle"></i> 剩餘機車位：</p>
              <p className='info detail'>{park.availablemotor > 0 ? park.availablemotor : 0}</p>
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

  .modal-title{
    font-weight: bold;
  }

  .modal-content{
    height: 100vh;
  }

  .info-group{
    display:flex;
    .fare{
      span{margin-left: 10px;}
    }
    &.fare-wrap{
      background: var(--light-green);
      border-radius: 10px;
    }
    .info.detail{
      display: block;
      overflow: unset;
      -webkit-line-clamp: unset;
    }
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


