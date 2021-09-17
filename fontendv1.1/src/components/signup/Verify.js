import React,{useState,useEffect} from 'react';



const Verify = (props)=>{
    const [formValue, setFormValue]=  useState(props.formValue)
    
    return(
        <>
            <div className="">
            <h3 className="text-center font-weight-bold">
                Information Compte {formValue.type_compte}
            </h3>
            </div>


            <div className="container">
              <div className="row mt-4">
                <div className="col-md-6">
                  <h6 className="titre-verif">
                     Type de compte
                  </h6>
                  <h5 className="font-weight-bold">
                     {formValue.type_compte}
                  </h5>
                </div>
                <div className="col-md-6">
                  <h6 className="titre-verif">
                     Adresse Electronique
                  </h6>
                  <h5 className="font-weight-bold">
                     {formValue.email}
                  </h5>
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-md-6">
                  <h6 className="titre-verif">
                     Nom
                  </h6>
                  <h5 className="font-weight-bold">
                     {formValue.nom}
                  </h5>
                </div>
                <div className="col-md-6">
                  <h6 className="titre-verif">
                     Prénom
                  </h6>
                  <h5 className="font-weight-bold">
                     {formValue.prenom}
                  </h5>
                </div>
              </div>
              
              <div className="row mt-2">
                <div className="col-md-6">
                  <h6 className="titre-verif">
                     Téléphone
                  </h6>
                  <h5 className="font-weight-bold">
                     {formValue.telephone}
                  </h5>
                </div>
                <div className="col-md-6">
                  <h6 className="titre-verif">
                     Civilité
                  </h6>
                  <h5 className="font-weight-bold">
                     {formValue.civilite}
                  </h5>
                </div>
              </div>
              
              <div className="row mt-2">
                <div className="col-md-6">
                  <h6 className="titre-verif">
                     Pays
                  </h6>
                  <h5 className="font-weight-bold">
                     {formValue.pays}
                  </h5>
                </div>
                <div className="col-md-6">
                  <h6 className="titre-verif">
                     Ville
                  </h6>
                  <h5 className="font-weight-bold">
                     {formValue.ville}
                  </h5>
                </div>
              </div>
              
              <div className="row mt-2">
                <div className="col-md-6">
                  <h6 className="titre-verif">
                     LinkedIn
                  </h6>
                  <h5 className="font-weight-bold">
                     {formValue.linkedin}
                  </h5>
                </div>
                <div className="col-md-6">
                  <h6 className="titre-verif">
                     Photo
                  </h6>
                  <h5 className="font-weight-bold">
                     {formValue.photo}
                  </h5>
                </div>
                </div>
            </div>
        

        </>
    )
};

export default Verify;