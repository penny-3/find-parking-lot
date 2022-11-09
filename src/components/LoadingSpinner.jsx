import React  from 'react'
import styled from 'styled-components'


const Element = ({className, hidden}) => {

  return (
    <div className={className} hidden = {!hidden}> 
      <div className="bouncing-loader d-flex justify-content-center">
        <div />
        <div />
        <div />
      </div>
    </div>
  )
}

const LoadingSpinner = styled(Element)`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  
  .bouncing-loader > div {
    width: 1rem;
    height: 1rem;
    margin: 3rem 0.2rem;
    background: var(--main-color);
    border-radius: 50%;
    animation: bouncing-loader 0.6s infinite alternate;
  }
  .bouncing-loader > div:nth-child(2){
    animation-delay: 0.2s;
  }
  .bouncing-loader > div:nth-child(3){
    animation-delay: 0.4s;
  }

  @keyframes bouncing-loader{
    from{
      opacity: 1;
      transfrom: translateY(0)
    }
    to{
      opacity: 0.1;
      transform: translateY(-1rem);
    }
  }
`




export default LoadingSpinner