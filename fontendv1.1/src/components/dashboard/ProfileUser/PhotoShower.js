import { useState, useEffect } from 'react';
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
        Container,
        Content,
        Row,
        Col,
        Panel,


    } from 'rsuite';

import 'rsuite/dist/styles/rsuite-default.css';

// import './ProfileUser.css';


export default function PhotoShower(props){

    const store = useStore();
    const offres = useSelector(state => state.getOffres).offre.data

    const dispatch = useDispatch()
    const [userData, setUserData] = useState(props.userData)

    return(
        <>
        <Container  data-aos="zoom-in-down" className="bg-white px-1 py-1">
            <Content>
                <Row  className="">
                    <Col className="" md={24} sm={24}>
                        <img src={userData.photo} className="img-fluid" />
                    </Col>
                </Row>
                <Row  className="">
                    <Col className="" md={24} sm={24}>
                        <h4 className="">
                            {userData.nom}{userData.prenom}
                        </h4>
                        <h6 className="">
                            {userData.email}
                        </h6>
                        <p className="">
                            {userData.poste_actuel}
                        </p>
                    </Col>
                </Row>
                <Panel className="">
                    <Row  className="">
                        <Col className="" md={20} sm={24}>
                            <h6 className="">
                               Evénement
                            </h6>
                        </Col>
                        <Col className="" md={20} sm={24}>

                        </Col>
                    </Row>
                    <Row  className="">
                        <Col className="" md={20} sm={24}>
                            <h6 className="">
                               Conférences
                            </h6>
                        </Col>
                        <Col className="" md={20} sm={24}>

                        </Col>
                    </Row>
                    <Row  className="">
                        <Col className="" md={20} sm={24}>
                            <h6 className="">
                               Formations
                            </h6>
                        </Col>
                        <Col className="" md={20} sm={24}>

                        </Col>
                    </Row>
                    <Row  className="">
                        <Col className="" md={20} sm={24}>
                            <h6 className="">
                               Entretiens
                            </h6>
                        </Col>
                        <Col className="" md={20} sm={24}>

                        </Col>
                    </Row>
                    <Row  className="">
                        <Col className="" md={20} sm={24}>
                            <h6 className="">
                               Offres
                            </h6>
                        </Col>
                        <Col className="" md={20} sm={24}>

                        </Col>
                    </Row>
                </Panel>
                
                <Row  className="">
                    <Col className="" md={24} sm={24}>
                            
                    </Col>
                </Row>
            </Content>
        </Container>

        </>
    )
}