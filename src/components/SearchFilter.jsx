import React, {useState} from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { updatePosition, getParks, updateDistance } from '../actions/mapActions'
import store from '../store'


const Element = ({ className}) => {

  const[default_distance,updateDefault_distance] = useState(true)
  const[default_scope,updateDefault_scope] = useState(true)

  const handleChangeScope = (e) => {
    updateDefault_scope(false)
    store.dispatch(updatePosition(e.target.value))
    store.dispatch(getParks())
  }

  const handleChangeDistance = (e) => {
    updateDefault_distance(false)
    store.dispatch(updateDistance(Number(e.target.value)))
    store.dispatch(getParks())
  }

  return (
      <div className={className + ' d-flex pb-3'}>
        <div className='filter flex-fill'>
          <select className='w-100' onChange={handleChangeScope} default = {default_scope}>
            <option default hidden>請選擇區域</option>
            <option value={[25.05999101,121.5575876]}>松山區</option>
            <option value={[25.03062083,121.5716697]}>信義區</option>
            <option value={[25.02677012,121.5434446]}>大安區</option>
            <option value={[25.0696991,121.5381597]}>中山區</option>
            <option value={[25.03240487,121.5198839]}>中正區</option>
            <option value={[25.06342433,121.5130417]}>大同區</option>
            <option value={[25.0285899,121.4979858]}>萬華區</option>
            <option value={[24.98857934,121.5736082]}>文山區</option>
            <option value={[25.03600934,121.6097573]}>南港區</option>
            <option value={[25.08370623,121.5923828]}>內湖區</option>
            <option value={[25.12546704,121.5508473]}>士林區</option>
            <option value={[25.1480682,121.5177992]}>北投區</option>
          </select>
          <i className="fa-sharp fa-solid fa-caret-down"></i>
        </div>
        <div className='filter flex-fill'>
          <select className='w-100' onChange={handleChangeDistance} default = {default_distance}>
            <option  hidden>請選擇距離</option>
            <option value={0.3}>0.3公里</option>
            <option value={0.5}>0.5公里</option>
            <option value={1}>1公里</option>
            <option value={1.5}>1.5公里</option>
            <option value={2}>2公里</option>
          </select>
          <i className="fa-sharp fa-solid fa-caret-down"></i>
        </div>
      </div>
  )
}

const SearchFilter = styled(Element)`
  .filter{
    position: relative;

    select{
      border-radius: 5px;
      height: 45px;
      padding: 10px;
    }

    i{
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-50%);
    }

    & + .filter{
      margin-left: 10px;
    }
  }
`


const mapStateToProps  = (state) => ({position: state.position})

export default connect(mapStateToProps, {updatePosition})(SearchFilter)