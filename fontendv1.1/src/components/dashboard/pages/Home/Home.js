import {Header,Container,Content} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import WelcomeComponent from './PanelEvents'


import './Home.css';
import ModalHome from './ModalHome';
import BodyHome from './BodyHome';

export default function Home() {
   
    
    return (
       <>
        <Container className="bg-white">
            <Content>
              {/* <ModalHome/> */}
             
              <BodyHome/>
                
            </Content>
        </Container>
    </>
    
    )

}