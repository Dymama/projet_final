import React, { useState } from 'react';
import { Container, Row, Col,List,ListInlineItem } from 'reactstrap';


import Sponsors from '../../components/accueil/Sponsors';

import './SponsorPartenaire.css'

const SponsorPartenaire = (props) => {
 
  return (
    <>

        <Container className="sponsor-partenaire-contenair mx-auto mt-5">
          <Container className="sponsor-contenair mx-auto text-center mt-5">
           
            
            <List  type="inline" className="mx-auto text-center">
                <ListInlineItem><Sponsors/></ListInlineItem>
                <ListInlineItem><Sponsors/></ListInlineItem>
                <ListInlineItem><Sponsors/></ListInlineItem>
                <ListInlineItem><Sponsors/></ListInlineItem>
                <ListInlineItem><Sponsors/></ListInlineItem>
                <ListInlineItem><Sponsors/></ListInlineItem>
                <ListInlineItem><Sponsors/></ListInlineItem>
            </List>
          </Container>

          <Container className="partenaire-contenair">
          <h1 className="h1 text-white text-center text-capitalize mx-auto mt-5 p-3"> nos partenaires</h1>
          
            <List type="inline" className="mx-auto text-center">
                <ListInlineItem><Sponsors/></ListInlineItem>
                <ListInlineItem><Sponsors/></ListInlineItem>
                <ListInlineItem><Sponsors/></ListInlineItem>
                <ListInlineItem><Sponsors/></ListInlineItem>
                <ListInlineItem><Sponsors/></ListInlineItem>
                <ListInlineItem><Sponsors/></ListInlineItem>
                <ListInlineItem><Sponsors/></ListInlineItem>
            </List>
          </Container>

        </Container>

      {/* fin */}
    </>
  );
}

export default SponsorPartenaire;