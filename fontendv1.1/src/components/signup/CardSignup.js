import React,{useState,useEffect} from 'react';
import {Card,Row ,Col,Media,Label,Input,FormGroup,Button,List,ListInlineItem,Form} from 'reactstrap';
import {Link} from 'react-router-dom';

import svg from '../../assets/images/others/event2.png';
import google from '../../assets/images/login/google.png';
import facebook from '../../assets/images/login/facebook.png';
import twitter from '../../assets/images/login/twitter.png';
import apple from '../../assets/images/signup/apple.png';

import './cardSignup.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// card permettant d'effectuer l'inscription de nouveau membre


const CardSignup = (props) => {

  const [actuel , updateActuel] = useState(1);

  
  const inputDate = document.querySelector('.input-date');


    
  useEffect(() => {

    const firstFormContent = document.querySelector('.first-form-container');
    const secondFormContent = document.querySelector('.second-form-container');
    const thirdFormContent = document.querySelector('.third-form-container');
    
    // cndition d'affichage des differentes parties du  formulaire
    if(actuel === 1){
      firstFormContent.style.display = "block";
      secondFormContent.style.display = "none";
      thirdFormContent.style.display = "none";

    }
    else if(actuel === 2){
      firstFormContent.style.display = "none";
      secondFormContent.style.display = "block";
      thirdFormContent.style.display = "none";


    }
    else if(actuel === 3){
      firstFormContent.style.display = "none";
      secondFormContent.style.display = "none";
      thirdFormContent.style.display = "block";

    }






    // return () => {
    //   cleanup
    // }
  }, [actuel]);

  // fonction de controle du bouton suivant du formulaire
  function controlNext(){
    
    if(1 <= actuel && actuel < 3){
      updateActuel(actuel+1);
    } 
    else{
      updateActuel(3);
    }
  };

    // fonction de controle du bouton precedant du formulaire
    function controlPrevious(){
  
      if(1 < actuel && actuel <=3){
        updateActuel(actuel-1);
      } 
      else{
        updateActuel(1);
      }

  };

  return (
    <div className="general-signup-container container">
      <Card  className="card-signup">
        <Form className="signup-form ">
          {/* <div className="info-signup-before-header">
            <Row>
              <Col md="6">
                <h4 className="h4 font-w-bold">Insciption</h4>
              </Col>
              <Col className="" md="6">
                <Button className="btn-already-log">
                  Déjà un compte ?
                </Button>
              </Col>
            </Row>
          </div> */}

          {/* <div className="header-form-signup">
            <List type="inline">
              <ListInlineItem>1</ListInlineItem>
              <ListInlineItem>2</ListInlineItem>
              <ListInlineItem>3</ListInlineItem>
              <ListInlineItem>4</ListInlineItem>
            </List>
          </div> */}

          <div className="body-form-signup">

            <Row>
              <Col md="5">
                <Media object className="img-signup-first" src={svg}  alt="logoEmpower" />
              </Col>
              <Col md="7">
                <div className="first-form-container">
                  <h2 className="h2">Nous serions ravis de vous compter parmi nos membres.</h2>
                  <p className="text-muted">Veuillez à bien renseigner le formulaire.</p>
                  <div className="other-options-signup-container">
                    <h6 className="h6 text-center">
                      S'inscrire avec
                    </h6>
                    <div className="other-options-icons-container mx-auto text-center">
                      <List type="inline">
                        <ListInlineItem>
                          <Media object className="icon-autre-option" src={google}  alt="logoEmpower" />
                        </ListInlineItem>

                        <ListInlineItem>
                          <Media object className="icon-autre-option" src={facebook}  alt="logoEmpower" />
                        </ListInlineItem>

                        <ListInlineItem>
                          <Media object className="icon-autre-option" src={twitter}  alt="logoEmpower" />
                        </ListInlineItem>

                        <ListInlineItem>
                          <Media object className="icon-autre-option" src={apple}  alt="logoEmpower" />
                        </ListInlineItem>
                      </List>

                      <p className="text-muted text-center">
                      Ou
                    </p>

                    </div>
                  </div>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Input type="select" name="select" id="exampleSelect">
                          <option>Choisissez un type de compte</option>
                          <option value='candidat'>Candidat</option>
                          <option value="entreprise">Entreprise</option>
                        </Input>
                      </FormGroup>
                      
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Input type="email" name="email" id="exampleEmail" placeholder="Entrer un  Email" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Input type="email" name="password" id="" placeholder="Entrer un mot de passe" />
                      </FormGroup>
                      
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Input type="password" name="password" id="" placeholder="Confirmer le mot de passe" />
                      </FormGroup>

                    </Col>
                  </Row>



                </div>

                {/* second partie du formulaire */}
                <div className="second-form-container">
                    <h2 className="h2 text-center">
                      Informations Personnelle
                    </h2>
                    <div className="second-form-div mx-auto">
                      <Row>
                        <Col md="6">
                        <FormGroup>
                          <Input type="text" name="nom" id="nom" placeholder="Nom" />
                        </FormGroup>
                        </Col>
                        <Col md="6">
                        <FormGroup>
                          <Input type="text" name="prenom" id="prenom" placeholder="Prénom" />
                        </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="6">
                          <FormGroup>
                            <select className="form-select" aria-label="Civilité">
                              <option selected>Civilité</option>
                              <option value="2">Homme</option>
                              <option value="2">Femme</option>
                              <option value="3">Autre</option>
                              
                            </select>
                          </FormGroup>
                        </Col>
                        <Col md="6">
                        <FormGroup>
                          <Input type="text" name="ville" id="ville" placeholder="Ville" />
                        </FormGroup>

                        </Col>
                      </Row>
                      <Row>
                        <Col md="6">
                        <FormGroup>
                        <Input type="text" name="telephone" id="telephone" placeholder="Telephone" />
                        </FormGroup>

                        </Col>
                        <Col md="6">
                        <FormGroup>
                          <Input type="text" name="pays" id="pays" placeholder="Pays" />
                        </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="6"> 
                        <FormGroup>
                            <input className="form-control input-date" type="date" value=" " id="date" placeholder="Date de Naissance" />
                        </FormGroup>
                        </Col>
                        <Col md="6">
                        <FormGroup>
                          
                          <Input type="text" name="linkedin" id="exampleEmail" placeholder="LinkedIn" />
                        </FormGroup>
                          
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <div className="mb-3  ">
                            <label for="formFile" className="form-label">Photo de profil</label>
                            <input className="form-control" type="file" id="formFile"/>
                          </div>
                        </Col>
                      </Row>

                    </div>

                </div>
                {/* fin */}

                {/* troisieme partie du formulaire */}
                <div className="third-form-container">
                  <h2 className="h2 text-center">
                      Informations Professionnelles
                    </h2>
                    <div className="second-form-div mx-auto">
                      <Row>
                        <Col md="6">
                        <FormGroup>
                          <Input type="text" name="secteruActivite" id="secteurActivite" placeholder="Secteur D'activité" />
                        </FormGroup>
                        </Col>
                        <Col md="6">
                        <FormGroup>
                          <Input type="text" name="posteActuel" id="posteActuel" placeholder="Poste Actuel" />
                        </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="6">
                          <FormGroup>
                            <Label for="exampleSelect">Interval Salaire Actuel</Label>
                            <select className="form-select" aria-label="Default select example">
                              <option value="1">0 - 50 000</option>
                              <option value="2">50 005 - 100 000</option>
                              <option value="3">100 005 - 150 000</option>
                              
                            </select>
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <div className="">
                            <label for="formFile" className="form-label">Cv</label>
                            <input className="form-control" type="file" id="formFile"/>
                          </div>

                        </Col>
                      </Row>
                      <Row>
                        <Col md="6">
                          <FormGroup>
                            <Label for="exampleText">Vos Atouts</Label>
                            <Input type="textarea" name="text" id="exampleText" />
                          </FormGroup>
                        
                        </Col>
                        <Col md="6">
                          <FormGroup>
                            <Label for="exampleText">Vos péchés mignons</Label>
                            <Input type="textarea" name="text" id="exampleText" />
                          </FormGroup>
                        
                        </Col>
                      </Row>
                     
                    </div>
                </div>
                  {/* fin */}

                  {/* boutons control formulaire */}
                <div className="btn-control-formSignup">
                  <Row>
                    <Col md="6">
                      <Button onClick={controlPrevious} className="signup-form-previous">
                        
                        Precedent
                      </Button>
                    </Col>
                    <Col md="6">
                      <Button onClick={controlNext}  className="signup-form-next">
                        Suivant
                        
                        
                      </Button>
                    </Col>
                  </Row>
                </div>

              </Col>
            </Row>

          </div>

        </Form>
      </Card>
    </div>
  );
};

export default CardSignup;
