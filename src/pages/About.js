import React from 'react'
import headerImg from '../images/about-img.jpg'
import './css/About.css'

export default function About() {
  return (
    <div className='about'>

      <div className='about-image'>

        <img src={headerImg} alt="" />

      </div>
      <div className='about-title'>
        <h1>Our Story</h1>
      </div>

      <div className='about-text-container'>
        <div className='about-text'>
        <div><h3>Lorem ipsum</h3></div>
          <div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut efficitur enim eget lacus dictum, a rutrum velit tempor. Ut at cursus ipsum, eu lobortis dolor. Quisque feugiat eget ligula in pulvinar. Donec dictum ornare aliquam. Phasellus id tempus justo. Duis non orci eu orci interdum rutrum. Phasellus sagittis magna at arcu varius dignissim. Maecenas pharetra, velit ut vulputate elementum, risus ipsum blandit nisl, vel ullamcorper enim lacus et nibh. Phasellus pharetra metus ac malesuada interdum. Duis ultrices mollis tempus. Aenean risus augue, aliquet a porttitor tristique, efficitur vitae leo. Duis finibus lorem in nunc sollicitudin finibus. Phasellus quis libero at justo vestibulum varius.

</p>
          </div>
        </div>
        <div className='about-text'>
          <div><h3>Lorem ipsum</h3></div>
          <div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut efficitur enim eget lacus dictum, a rutrum velit tempor. Ut at cursus ipsum, eu lobortis dolor. Quisque feugiat eget ligula in pulvinar. Donec dictum ornare aliquam. Phasellus id tempus justo. Duis non orci eu orci interdum rutrum. Phasellus sagittis magna at arcu varius dignissim. Maecenas pharetra, velit ut vulputate elementum, risus ipsum blandit nisl, vel ullamcorper enim lacus et nibh. Phasellus pharetra metus ac malesuada interdum. Duis ultrices mollis tempus. Aenean risus augue, aliquet a porttitor tristique, efficitur vitae leo. Duis finibus lorem in nunc sollicitudin finibus. Phasellus quis libero at justo vestibulum varius.

</p>
          </div>
        </div>
      </div>
      

    </div>
  )
}
