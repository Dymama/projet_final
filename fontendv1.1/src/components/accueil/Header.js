import React, { useState } from 'react';
import { Carousel } from 'rsuite';

import 'rsuite/dist/styles/rsuite-default.css';


import './header.css';
import svg from '../../assets/images/header/bg5.png';
import img1 from '../../assets/images/header/event-img1.png';
import img2 from '../../assets/images/header/event-img2.png';
import img3 from '../../assets/images/header/event-img3.jpg';
import img4 from '../../assets/images/header/event-img4.jpg';
import img5 from '../../assets/images/header/event-img5.jpg';

import headerBg from '../../assets/images/header/header-bg.png';


import { Media } from 'reactstrap';


const instance = (
    <Carousel autoplay className="custom-slider caroussel-slider">
      <img className="event-img"
        src={img1}
      />
      <img className="event-img"
        src={img2}
      />
      <img className="event-img"
        src={img3}
      />
      <img className="event-img"
        src={img4}
      />
      <img className="event-img"
        src={img5}
      />
    </Carousel>
  );


const Header = (props) => {
 
  return (
    
    <header>
        <div className="owl-carousel owl-theme">
            
            <div className="item">
{/*             
                <Media object src={headerBg}  alt="logoEmpower" /> */}
                <div className="cover">
                    <div className="">
                        <div className="header-content">
                            <div className="">
                                <div className="row">
                                    <div  data-aos="fade-left" className="col-md-6 text-container">
                                    <h2  className="font-weight-bold">
                                        Bienvenue sur la plateforme d'événement de EMPOWER
                                        </h2>
                                        <p className="p-header">
                                        inscrivez-vous afin de profiter de nos differentes activités
                                        </p>
                                        <h6>
                                          Conférences - Entretiens - Formations 
                                        </h6>

                                       
                                    </div>
                                    <div  data-aos="fade-right" className="col-md-6 carrousel-container">
                                        {instance}
                                    </div>

                                </div>



                            </div>
                        </div> 
                    </div>
                </div>
            </div>

        </div>
       <ul className="circles">
           <li></li>
           <li></li>
           <li></li>
           <li></li>
           <li></li>
           <li></li>
           <li></li>
           <li></li>
           <li></li>
           <li></li>
           <li></li>
           <li></li>
       </ul>
    </header>
  );
}

export default Header;