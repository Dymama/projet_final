import { useState, useEffect } from 'react';

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

const CardEventChart = props => {
    const [eventData, setEventData] = useState(props.eventDataRow)

    useEffect(() => {
        setEventData(props.eventDataRow)
      console.log(props.eventDataRow,'evendat ded')
    }, [props.eventDataRow])

    return(
    <Panel className="mt-3" {...props} bordered>
     
        <Row>
            <Col  md={20} sm={12}>
                <Button color="green" style={{width:"13em"}} >
                <Icon icon="magic"  /> Conférences
                </Button>
            </Col> 
            <Col md={4} sm={12}>
                <Tag appearance="ghost" className="p-2 mx-auto text-center" style={{width:"4em"}} color="green" circle>
                    {eventData.conferences? eventData.conferences.length : "0"}
                </Tag>
            </Col>
        </Row>
        <Row  className="mt-3">
            <Col  md={20} sm={12}>
                <Button  color="blue" style={{width:"13em"}} >
                <Icon icon="magic"  /> Formations
                </Button>
            </Col> 
            <Col md={4} sm={12}>
                <Tag appearance="ghost" className="p-2 mx-auto text-center" style={{width:"4em"}} color="blue" circle>
                {eventData.formations? eventData.formations.length : "0"}
                </Tag>
            </Col>
        </Row>
        <Row className="mt-3">
            <Col  md={20} sm={12}>
                <Button color="orange" style={{width:"13em"}}>
                <Icon icon="magic"  /> Offres
                </Button>
            </Col> 
            <Col md={4} sm={12}>
                
                <Tag appearance="ghost" className="p-2 mx-auto text-center" style={{width:"4em"}} color="orange" circle>
                {eventData.postes? eventData.postes.length : "0"}
                </Tag>
            </Col>
        </Row>
        <Row className="mt-3">
            <Col  md={20} sm={12}>
                <Button style={{width:"13em"}}>
                <Icon icon="magic"  /> Stands
                </Button>
            </Col> 
            <Col md={4} sm={12}>
                
                 <Tag className="p-2 mx-auto text-center" style={{width:"4em"}} circle>
                     
                {eventData.stands? eventData.stands.length : "0"}
                 </Tag>
            </Col>
        </Row>
    </Panel>
  );
}
  export default CardEventChart;