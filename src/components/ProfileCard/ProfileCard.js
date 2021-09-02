import React from 'react'
import './ProfileCard.css'
const ProfileCard = () => {
    return (
      <div className="profile">
        <div class="our-team">
          <div class="picture">
            <img
              class="img-fluid"
              src="https://picsum.photos/130/130?image=1027"
            />
          </div>
          <div class="team-content" style={{margin:10}}>
            <h3 class="name">Michele Miller</h3>
            <h4 class="title">Web Developer</h4>
            <p>shrikrushana9960@gmail.com</p>
            <p>+91 7218412760</p>
          </div>
          
        </div>
      </div>
    );
}

export default ProfileCard
