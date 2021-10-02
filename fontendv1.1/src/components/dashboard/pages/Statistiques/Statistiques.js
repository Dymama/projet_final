import { useState, useEffect } from 'react';
import {useSelector, useDispatch,useStore} from 'react-redux'
import {ButtonToolbar,
        SelectPicker,
        Input,
        Icon,
        IconButton,
        ControlLabel,
        FormGroup,
        Button,
        Loader,
        Content,
        Container,
        Col,
        Row,
        Panel,

    } from 'rsuite';

import 'rsuite/dist/styles/rsuite-default.css';
import configureStore from '../../../../redux/store';
import Bande from './typeStatistique/Bande/Bande';
import LineChart from './typeStatistique/LineChart';

const Card = props => (
    <Panel className="p-1 text-center" shaded bordered bodyFill style={{ display: 'inline-block',background:'#fff' }}>
          <img
                    src={props.imgSrc}
                    height="250" style={{width:'100%'}}
                  />
        <Panel header={props.header}>
        <p>
            <small>
                {props.description}
            </small>
        </p>
        </Panel>
    </Panel>
  );


  
  // fonction declassement des entreprise
  function trierEvent(data){
    var dataItem;

    return data.map((item,index)=>{
     
        dataItem= {
          "label": item.titre,
          "value": item._id,
        }
        return dataItem;
      
    })
    .filter((item,index)=> item !== undefined)
    
  }

  
const {store} =configureStore()


export default function Statistiques(){
const [evenement, setEvenement] = useState('')

    const selectEventChange = (evenement)=>{
     
        setEvenement(evenement)
      }
    


    return(
        <>
        <Container className="bg-white container" >
          <Content className="px-3">
              
            <Row  data-aos="zoom-in-down" className="mt-5">
            
                <Col    md={24} sm={24}>
                    <h4 className="ml-2" >
                        Visualisation
                    </h4>
                </Col>
                *******
            </Row>

            <div className="styled-div-dashbord-home ml-4" ></div>
            
            <Row  >
                    
                <Col    md={24} sm={24}>
                    <h5 className="text-center" >
                        Evénements
                    </h5>
                </Col>

            </Row>

            
            <Row  >
                <Col md={8} sm={24}>
                            <FormGroup>
                                <ControlLabel>Selectionner un événement</ControlLabel>
                            <SelectPicker size="lg" placement="auto" placeholder="Selectionner" onChange={(value)=>selectEventChange(value)} maxHeight={200}  emplacement="auto" data={trierEvent(store.getState().listEvent.listEvent.data)} style={{width:300,zIndex:99}}  />
                            </FormGroup>  
                    
                </Col>
            </Row>

            <Row  data-aos="zoom-in-down" className="mt-1">
                {/* <Col data-aos-delay="500"  data-aos="slide-right"  md={8} sm={12}>
                    <Panel className="p-1 text-center" shaded bordered bodyFill>
                     <LineChart />

                    </Panel>
                </Col> */}
                <Col  data-aos-delay="600" data-aos="slide-up"  md={24} sm={24}>
                    <Bande eventList={store.getState().listEvent.listEvent.data}/>
                </Col>
                {/* <Col  data-aos-delay="700" data-aos="slide-left"  md={8} sm={12}>
              
                  
                </Col> */}
            </Row>

          </Content> 
        </Container>
        </>
    )
}