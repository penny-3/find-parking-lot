import React from 'react'
import styled from 'styled-components'

const Element = ({ red, className }) => {
  return (
      <div className={className + ' d-flex pb-3'}>
        <div className='filter flex-fill'>
          <select className='w-100'>
            <option >請選擇區域</option>
            <option value={[121.5575876,25.05999101]}>松山區</option>
            <option value={[121.5716697,25.03062083]}>信義區</option>
            <option value={[121.5434446,25.02677012]}>大安區</option>
            <option value={[121.5381597,25.06969917]}>中山區</option>
            <option value={[121.5198839,25.03240487]}>中正區</option>
            <option value={[121.5130417,25.06342433]}>大同區</option>
            <option value={[121.4979858,25.0285899]}>萬華區</option>
            <option value={[121.5736082,24.98857934]}>文山區</option>
            <option value={[121.6097573,25.03600934]}>南港區</option>
            <option value={[121.5923828,25.08370623]}>內湖區</option>
            <option value={[121.5508473,25.12546704]}>士林區</option>
            <option value={[121.5177992,25.1480682]}>北投區</option>
          </select>
          <i className="fa-sharp fa-solid fa-caret-down"></i>
        </div>
        <div className='filter flex-fill'>
          <select className='w-100'>
            <option>請選擇距離</option>
            <option value={300}>0.3公里</option>
            <option value={500}>0.5公里</option>
            <option value={1000}>1公里</option>
            <option value={1500}>1.5公里</option>
            <option value={2000}>2公里</option>
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

export default SearchFilter