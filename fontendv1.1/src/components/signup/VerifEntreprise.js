import React,{useState,useEffect} from 'react';



const VerifEntreprise = (props)=>{
    const [formValue, setFormValue]=  useState(props.formValue)
    
    return(
        <>
            <div className="">
            <h3 className="text-center font-weight-bold">
                Information {formValue.type_compte}
            </h3>
            </div>


            <div className="container">
              <div className="row mt-2">
                <div className="col-md-6">
                  <h6 className="titre-verif">
                     Nom
                  </h6>
                  <h5 className="font-weight-bold">
                     {formValue.nom_entreprise}
                  </h5>
                </div>
                <div className="col-md-6">
                  <h6 className="titre-verif">
                  Secteur d'activité
                  </h6>
                  <h5 className="font-weight-bold">
                     {formValue.secteur_entreprise}
                  </h5>
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-md-6">
                  <h6 className="titre-verif">
                     Pays
                  </h6>
                  <h5 className="font-weight-bold">
                     {formValue.pays_entreprise}
                  </h5>
                </div>
                <div className="col-md-6">
                  <h6 className="titre-verif">
                     Ville
                  </h6>
                  <h5 className="font-weight-bold">
                     {formValue.ville_entreprise}
                  </h5>
                </div>
              </div>
              
              <div className="row mt-2">
                <div className="col-md-6">
                  <h6 className="titre-verif">
                     Téléphone
                  </h6>
                  <h5 className="font-weight-bold">
                     {formValue.telephone_entreprise}
                  </h5>
                </div>
                <div className="col-md-6">
                  <h6 className="titre-verif">
                     Adresse electronique
                  </h6>
                  <h5 className="font-weight-bold">
                     {formValue.email_entreprise}
                  </h5>
                </div>
              </div>
              
              <div className="row mt-2">
                <div className="col-md-6">
                  <h6 className="titre-verif">
                     Facebook
                  </h6>
                  <h5 className="font-weight-bold">
                     {formValue.facebook_entreprise}
                  </h5>
                </div>
                <div className="col-md-6">
                  <h6 className="titre-verif">
                     Linkedin
                  </h6>
                  <h5 className="font-weight-bold">
                     {formValue.linkedin_entreprise}
                  </h5>
                </div>
              </div>
              
              <div className="row mt-2">
                <div className="col-md-6">
                  <h6 className="titre-verif">
                     Description
                  </h6>
                  <h5 className="font-weight-bold">
                     {formValue.description_entreprise}
                  </h5>
                </div>
                <div className="col-md-6">
                  <h6 className="titre-verif">
                     Site Internet
                  </h6>
                  <h5 className="font-weight-bold">
                     {formValue.site_internet}
                  </h5>
                </div>
              </div>
                
              <div className="row mt-2">
               
                <div className="col-md-6">
                  <h6 className="titre-verif">
                     Logo
                  </h6>
                  <h5 className="font-weight-bold">
                     {formValue.photo_entreprise}
                  </h5>
                </div>
                </div>
            </div>
        

        </>
    )
};

export default VerifEntreprise;