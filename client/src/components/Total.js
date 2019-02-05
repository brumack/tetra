import React from 'react'

const Total = (props) => {
  return (
    <div className='item'>
      <div className='card'>
        <div className='content'>
          <div className='ui segment'>
            <div className='ui two column grid'>
              <div className='row'>

                <div className='column'>
                  <div className='ui large header'>Total</div>
                </div>

                <div className='right aligned column'>
                  <div className='ui large header'>${props.value}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Total