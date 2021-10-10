import { useState, useEffect } from 'react';
import {useHistory,Link,Route,BrowserRouter as Router,useLocation} from 'react-router-dom';
import {useSelector, useDispatch,useStore} from 'react-redux'
import {ButtonToolbar,
        InputGroup,
        Input,
        Icon,
        IconButton,
        Badge,
        InputPicker,
        Button,
        Loader,
        Col,
        Row,
        Container,
        Content,
        Panel,
        Tag,

    } from 'rsuite';



import 'rsuite/dist/styles/rsuite-default.css';
import './CardActivities.css'

export default function CardActivities(props){


    return (
    <>

                                    <Panel onClick={()=>props.openModalDetail(props.titre)}  bordered shaded className="px-2 mb-2 panel-activity-details-collaborateur" style={{height:"12em"}}>
                                        <Row className="">
                                            <Col className="" md={4} sm={4} xs={24}>
                                                 <IconButton className="mr-3" icon={<Icon icon={props.icon} />}  circle size="sm" />
                                            </Col>
                                            <Col className="text-center" md={20} sm={20} xs={24}>
                                            
                                                <h4 className="font-weight-bold" >
                                                    {props.titre} 

                                                </h4>
                                            </Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Row className="">
                                                <Col className="" md={20} sm={20} xs={20}>
                                                    
                                                    <p className="font-weight-bold m-auto pt-1" >
                                                    {props.titre}  crées

                                                    </p>
                                                </Col>
                                                <Col className="" md={4} sm={4} xs={4}>
                                                   <Button style={{borderRadius:"10em"}} className="px-3 py-2 font-weight-bold">
                                                        0
                                                   </Button>
                                                </Col>
                                                
                                            </Row>
                                            {props.titre === "Entretiens"&&(
                                                
                                            <Row className="pt-1">
                                                <Col className="" md={20} sm={20} xs={24}>
                                                    
                                                    <p className="font-weight-bold m-auto pt-1" >
                                                    {props.titre }  programmés

                                                    </p>
                                                </Col>
                                                <Col className="" md={4} sm={4} xs={24}>
                                                   <Button style={{borderRadius:"10em"}} className="px-3 py-2 font-weight-bold">
                                                        0
                                                   </Button>
                                                </Col>
                                                
                                            </Row>
                                            
                                            )} 
                                        </Row>
                                    </Panel>
                                </>)
    }