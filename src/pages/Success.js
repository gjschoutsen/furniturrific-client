import React from 'react'
import {NavLink} from 'react-router-dom'
import './css/Succes.css'
import pic from '../images/succes pic.jpg'

export default function Succes() {
  return (
    <div className='succes'>
        <div className='succes-box'>
          <h2>Thanks for shopping at Furniturrific</h2>
          <p>Hopefully we see you again soon.</p>
          <NavLink to="/thankyou">
            <img src={pic} alt="chair" />
          </NavLink>
        </div>
        <div className='spacer2'>

        </div>
    </div>
  )
}
