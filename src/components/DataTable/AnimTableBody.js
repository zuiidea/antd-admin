import React from 'react'
import { TweenOneGroup } from 'rc-tween-one'

const enterAnim = [
  {
    opacity: 0,
    x: 30,
    backgroundColor: '#fffeee',
    duration: 0,
  }, {
    height: 0,
    duration: 200,
    type: 'from',
    delay: 250,
    ease: 'easeOutQuad',
    onComplete: (e) => {
      e.target.style.height = 'auto'
    },
  }, {
    opacity: 1,
    x: 0,
    duration: 250,
    ease: 'easeOutQuad',
  }, {
    delay: 1000,
    backgroundColor: '#fff',
  },
]

const leaveAnim = [
  {
    duration: 250,
    x: -30,
    opacity: 0,
  }, {
    height: 0,
    duration: 200,
    ease: 'easeOutQuad',
  },
]

const AnimTableBody = props => (<TweenOneGroup
  component="tbody"
  {...props}
  enter={enterAnim}
  leave={leaveAnim}
  appear={false}
/>)

export default AnimTableBody
