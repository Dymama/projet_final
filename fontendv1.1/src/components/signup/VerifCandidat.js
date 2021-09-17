import React,{useState,useEffect} from 'react';



const VerifCandidat = (props)=>{
    const [formValue, setFormValue]=  useState(props.formValue)
    
    return(
        <>
           
            <div className="container">
              <div className="row mt-2">
                <div className="col-md-6">
                  <h6 className="titre-verif">
                     Secteur d'activité
                  </h6>
                  <h5 className="font-weight-bold">
                     {formValue.secteur}
                  </h5>
                </div>
                <div className="col-md-6">
                  <h6 className="titre-verif">
                     Poste actuel
                  </h6>
                  <h5 className="font-weight-bold">
                     {formValue.poste_actuel}
                  </h5>
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-md-6">
                  <h6 className="titre-verif">
                     Intervalle salarial
                  </h6>
                  <h5 className="font-weight-bold">
                     {formValue.salaire_actuel}
                  </h5>
                </div>
                <div className="col-md-6">
                  <h6 className="titre-verif">
                     Année d'experience
                  </h6>
                  <h5 className="font-weight-bold">
                     {formValue.annee_experience}
                  </h5>
                </div>
              </div>
              
              <div className="row mt-2">
                <div className="col-md-6">
                  <h6 className="titre-verif">
                     Points forts
                  </h6>
                  <h5 className="font-weight-bold">
                     {formValue.point_fort}
                  </h5>
                </div>
                <div className="col-md-6">
                  <h6 className="titre-verif">
                     Points faibles
                  </h6>
                  <h5 className="font-weight-bold">
                     {formValue.point_faible}
                  </h5>
                </div>
              </div>
              
              <div className="row mt-2">
                <div className="col-md-6">
                  <h6 className="titre-verif">
                     Niveau d'étude
                  </h6>
                  <h5 className="font-weight-bold">
                     {formValue.niveau_etude}
                  </h5>
                </div>
                <div className="col-md-6">
                  <h6 className="titre-verif">
                    Curriculum vitæ
                  </h6>
                  <h5 className="font-weight-bold">
                     {formValue.cv}
                  </h5>
                </div>
              </div>
              
            </div>
        

        </>
    )
};

export default VerifCandidat;