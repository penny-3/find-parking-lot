import React,{useState, useEffect} from 'react'
import styled from 'styled-components'
import SearchFilter from './SearchFilter'
import ParkingLotDetail from './ParkingLotDetail'
import {updateAva, updatePosition} from '../actions/mapActions'
import store from '../store'
import '../Basic.css'



const Element = ({ className, parks, available, paramsId}) => {
  //預設空的park data
  let empty = {
      "id" : "0",
      "area" : "",
      "name" : "",
      "type" : "",
      "type2" : "",
      "summary" : "",
      "address" : "",
      "tel" : "",
      "payex" : "",
      "serviceTime" : "",
      "tw97x" : "",
      "tw97y" : "",
      "totalcar" : 0,
      "totalmotor" : 0,
      "totalbike" : 0,
      "totalbus" : 0,
      "Pregnancy_First" : "0",
      "Handicap_First" : "0",
      "Taxi_OneHR_Free" : "0",
      "AED_Equipment" : "0",
      "CellSignal_Enhancement" : "0",
      "Accessibility_Elevator" : "0",
      "Phone_Charge" : "0",
      "Child_Pickup_Area" : "0",
      "FareInfo" : {
        "WorkingDay" : [ {
          "Period" : "00~09",
          "Fare" : "0"
        }, {
          "Period" : "09~18",
          "Fare" : "0"
        }, {
          "Period" : "18~24",
          "Fare" : "0"
        } ],
        "Holiday" : [ {
          "Period" : "00~09",
          "Fare" : "0"
        }, {
          "Period" : "09~18",
          "Fare" : "0"
        }, {
          "Period" : "18~24",
          "Fare" : "0"
        } ]
      },
      "EntranceCoord" : {
        "EntrancecoordInfo" : [ {
          "Xcod" : "",
          "Ycod" : "",
          "Address" : ""
        }, {
          "Xcod" : "",
          "Ycod" : "",
          "Address" : ""
        }, {
          "Xcod" : "",
          "Ycod" : "",
          "Address" : ""
        } ]
      }
  }
  const [isLoading, updateLoadingState ] = useState(false)
  const [newParks,updateParks] = useState([])
  const [target, updateTarget] = useState(empty)
  //取得parks資料，同時比較park與available車位資料，並返還剩餘車位
  useEffect(()=>{
    updateLoadingState(true)
    if(parks)
    updateParks(parks)
    store.dispatch(updateAva(parks,available))
    updateLoadingState(store.getState().all.loading)
  },[parks,available])
  //手機檢視卡片列按鈕
  const toggleUp = (e) => {
    document.querySelector('.nav-wrap').classList.toggle('toggle')
  }
  //開啟車位詳細資料彈跳視窗
  const openModal = (e) => {
    document.querySelector('.modal').classList.add('show')
    updateTarget(newParks.filter((park) => park.id === e.currentTarget.id)[0])
  }
  //點擊卡片時更新地圖位置
  const updateCurrentPosbyCard = (e) => {
    const target = newParks.filter(park => park.id === e.currentTarget.id)
    const latlng = target[0].lat + ',' + target[0].lng
    store.dispatch(updatePosition(latlng))
    openModal(e)
  } 

	return (
		<div className={className + ' col-md-4 h-100 pb-4 px-4 nav-wrap'}>
      <h2 className='unfound' hidden={isLoading === true ? false : true}>搜尋中請稍候...</h2>
      <div className='nav-container' hidden={isLoading}>
        <div className='d-md-none text-center pb-1 pt-2 toggle-up'>
          <i className="fa-solid fa-angle-up" onClick={toggleUp}></i>
        </div>
        <SearchFilter/>
        <ParkingLotDetail park={target}/>
        <div className='card-list pb-4'>
          {newParks.map((park) => {
              return(
                <div className='card' key={park.id} id={park.id} onClick={updateCurrentPosbyCard}  >
                  <div className='p-3'>
                    <h3 className='main-title'>{park.name}</h3>
                    <div className='info-group d-flex align-items-center mb-1'>
                      <i className="fa-solid fa-location-dot"></i>
                      <p className='info'>{park.address.length > 0 ? park.address : '台北市'}</p>
                    </div>
                    <div className='info-group d-flex align-items-center mb-1'>
                      <i className="fa-solid fa-map-pin"></i>
                      <div className='info'><span>{park.distance}</span>公里</div>
                    </div>
                    <div className='card-body p-0'>
                      <p>{park.summary}</p>
                    </div>
                  </div>
                  <div className='card-footer d-flex'>
                    <div className='info-group d-flex align-items-center'>
                      <div>{paramsId === 'car'?'全部車位：': '全部機車位：'}</div>
                      <p className='info'>{paramsId === 'car' ? park.totalcar : park.totalmotor }</p>
                    </div>
                    <div className='info-group d-flex align-items-center'>
                      <div>{paramsId === 'car'?'剩餘車位：':'剩餘機車位：'}</div>
                      <p className='info'>{(paramsId === 'car' ? park.availablecar : park.availablemotor) > 0 ? (paramsId === 'car' ? park.availablecar : park.availablemotor) : 0 }</p>
                    </div>
                  </div>
                </div>
              )
            }
          )}
          <div hidden={isLoading}>
            <h2 className='unfound' hidden = {newParks.length > 0 ? true : false}>Oops! 查詢不到停車場<br/>╮(╯_╰)╭</h2>
          </div>
        </div>
      </div>
    </div>
	)
}


const Navbar = styled(Element)`
  position: fixed;
  bottom: 0;
  left: 0;
  height: 120px !important;
  z-index: 999;
  background: var(--dark-0);
  transition: height 0.5s;
  
  .nav-container{
    height: 100vh;
    padding-bottom: 80px;
  }

  .card-list{
    height: 100%;
    overflow-y:scroll;
    .card{
      cursor: pointer;
    }
  }

  &.toggle{
    height: 100vh !important;
    .toggle-up{
      i{
        transform: rotate3d(1,0,0,180deg);
      }
    }
  }
  
  .toggle-up{
    i{
      font-size:20px;
      cursor:pointer;
      transition: transform 0.5s;
    }
  }

  i{color: var(--main-color)}

  .card{
    margin-bottom: 20px;
  }

  .card{
    .main-title{
      display:-webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow:hidden;
    }

    .card-body{
      p{
        font-size:14px;
        display:-webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow:hidden;
        color: var(--dark-70)
      }
    }
  }

  .card-footer{
    .info-group + .info-group{
      margin-left:10px;
    }
  }

  .info-group{
    .icon-wrap{
      width:40px;
      height: 40px;
      border-radius: 50%;
      border: 1px solid var(--main-color);
      color: var(--main-color);
      text-align: center;
      i{line-height:40px}
    }
    i{margin-right: 10px;}
    .info{
      display:-webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
       overflow:hidden;
    }
  }
  
  .unfound{
    color: var(--secondary-color);
    text-align: center;
    line-height: 2;
  }

  @media(min-width:769px){
    padding-top: 1.5rem;
    position: relative;
    box-shadow: rgb(0 0 0 / 25%) -4px 0px 12px 0px;
    overflow: hidden;
    height: 100vh !important;
    .nav-container{
      padding-bottom: 3rem;
    }
  }  
`
export default Navbar


