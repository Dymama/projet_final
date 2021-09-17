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

const CardEventChart1 = props => (
    <Panel className="mt-3" {...props} bordered>
     
        <Row>
            <Col  md={20} sm={12}>
                <Button style={{width:"13em"}} >
                <Icon icon="group"  /> Candidats
                </Button>
            </Col> 
            <Col md={4} sm={12}>
                <Tag appearance="ghost" className="p-2 mx-auto text-center" style={{width:"4em"}}  circle>6778</Tag>
            </Col>
        </Row>
        <Row  className="mt-3">
            <Col  md={20} sm={12}>
                <Button  color="blue" style={{width:"13em"}} >
                <Icon icon="home"  /> Entreprise
                </Button>
            </Col> 
            <Col md={4} sm={12}>
                <Tag  className="p-2 mx-auto text-center" style={{width:"4em"}} color="blue" circle>6778</Tag>
            </Col>
        </Row>
       
    </Panel>
  );

  export default CardEventChart1;