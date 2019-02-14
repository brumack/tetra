import React from 'react'
import { SlideDown } from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'

const SlideMessage = (props) => {
  return (
    <SlideDown>
      {props.open ? props.children : null}
    </SlideDown>
  )
}

export default SlideMessage
