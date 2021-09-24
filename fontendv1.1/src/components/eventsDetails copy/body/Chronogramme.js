import React,{useState,useEffect} from 'react';
import { 
    Timeline,
    Icon,
    Row,
    Col,
    Grid,


} from 'rsuite';


import 'rsuite/dist/styles/rsuite-default.css';

import './Chronogramme.css';

const AlignTimeline = () => (
  <Timeline>
    <Timeline.Item>
      <p>2018-03-01</p>
      <p>Your order starts processing</p>
    </Timeline.Item>
    <Timeline.Item>
      <p>2018-03-02</p>
      <p>Order out of stock</p>
    </Timeline.Item>
    <Timeline.Item>
      <p>2018-03-10</p>
      <p>Arrival</p>
    </Timeline.Item>
    <Timeline.Item>
      <p>2018-03-12</p>
      <p>Order out of the library</p>
    </Timeline.Item>
    
  </Timeline>
);
const instance = (
  
    <div className="row mx-auto text-center">
      <div className="col-md-4 mx-auto mt-5 mt-md-0" >
        <AlignTimeline/>
      </div>
      <div className="col-md-4 mx-auto mt-5 mt-md-0">
        <AlignTimeline  />
      </div>
      <div className="col-md-4 mx-auto mt-5 mt-md-0">
        <AlignTimeline  />
      </div>
    </div>
    
);


// const instance = (
//     <Timeline className="custom-timeline">
//       <Timeline.Item dot={<Icon icon="credit-card" size="2x" />}>
//         <p>March 1, 10:20</p>
//         <p>Forum de stage</p>
//       </Timeline.Item>

//       <Timeline.Item>
//         <p>March 1, 11:34</p>
//         <p>event activity</p>
//       </Timeline.Item>

//       <Timeline.Item>
//         <p>March 1, 16:20</p>
//         <p>[Vickytho]</p>
//         <p>second event activity</p>
//       </Timeline.Item>

//       <Timeline.Item dot={<Icon icon="play" size="2x" />}>
//         <p>March 2, 06:12</p>
//         <p>[In transit]</p>
//         <p>third event</p>
//       </Timeline.Item>
//       <Timeline.Item dot={<Icon icon="people-group" size="2x" />}>
//         <p>March 2, 09:20</p>
//         <p>[In transit]</p>
//         <p>
//           Sended from the Shanghai Container Center to the distribution center
//         </p>
//       </Timeline.Item>
//       <Timeline.Item dot={<Icon icon="user" size="2x" />}>
//         <p>March 3, 14:20</p>
//         <p>[Delivery]</p>
//         <p>
//           Shanghai Hongkou District Company Deliverer: Mr. Li, currently sending
//           you a shipment
//         </p>
//       </Timeline.Item>
//       <Timeline.Item
//         dot={
//           <Icon
//             icon="check"
//             size="2x"
//             style={{ background: '#15b215', color: '#fff' }}
//           />
//         }
//       >
//         <p>March 3, 17:50</p>
//         <p>[Received]]</p>
//         <p>Your courier has arrived and the signer is the front desk</p>
//       </Timeline.Item>
//     </Timeline>
//   );
  
  /**
  .custom-timeline {
    margin-left: 20px;
  }
  
  .custom-timeline .rs-timeline-item-custom-dot .rs-icon {
    position: absolute;
    background: #fff;
    top: 0;
    left: -2px;
    border: 2px solid #ddd;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    font-size: 18px;
    padding-top: 9px;
    color: #999;
    margin-left: -13px;
  }
  
  .custom-timeline .rs-timeline-item-content {
    margin-left: 24px;
  }
  **/

  export default function Chronogramme(props){

    useEffect(() => {
      console.log(props.dataEvent.chronogramme,'DataEvent')
     
    }, [])

    return(
      <>
        <div className="mx-auto text-center chronogramme">
          <div className="chronogramme-container">
          <Timeline>

          {  props.dataEvent.chronogramme.map((item,index)=>{
          
            return (
            <>
              <Timeline.Item key={item._id} index={index}>
                <p> {item.date_event} </p>
                <i style={{color:'purple'}}> {item.heure_event} </i>
                <p> {item.titre} </p>
               
              </Timeline.Item>
              </>)
            })}
         

         </Timeline>
          
          </div>

        </div>
      </>
    )
  }