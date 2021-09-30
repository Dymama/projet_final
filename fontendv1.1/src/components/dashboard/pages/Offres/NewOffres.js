import {ButtonToolbar,
    IconButton,
    Icon,
    Loader,
    Placeholder,
    Button,
    Form,
    FormGroup,
    FormControl,
    ControlLabel,
    HelpBlock,
    Container,
    Content,

} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

import NewOffreForm from './NewOffreForm';

import './NewOffres.css';
export default function NewOffres(){

    


    return (
        <>
        
        <Container  className="offre-container-tst">
            <Content className="bg-white p-3 m-md-5">
                    <div className="header-new-offre">
                        <h4 className="text-center mx-auto">
                            Enregistrement de nouvelle offre
                        </h4>
                        {/* <p className="text-center">Veuillez bien renseigner les informations</p> */}
                    </div>
                    <div className="body-new-offre mt-5">

                        <NewOffreForm/> 
                    </div>

            </Content>
        </Container>
        </>
        )
}