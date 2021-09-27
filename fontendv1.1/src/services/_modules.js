// conversion adequat de la date
export function dataDebut(date){
    var m = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
    var d =  new Date(date)
    
    return `${d.getDate()} ${m[d.getMonth()]} ${d.getFullYear()}`
  }
  

  // conversion adequat de l'heure
export function dataMinute(date){
    
    var d =  new Date(date)
    var min =`${d.getMinutes()}`
    
    return `${d.getHours()} h ${min.length === 1 ? '0'+min :min}`
  }
  

  // concatenation date et heure
export function dateStartEvent(date,heure){
    
    var dD =  new Date(date)
    var dH =  new Date(heure)
    
    return new Date(dD.getFullYear(),dD.getMonth(),dD.getDate(),dH.getHours(),dH.getMinutes())
  }

  
  // compare deux dates(date ,minutes)
export function dayEqualToNow(date,heure){
    var date1 = dateStartEvent(date,heure)
    var dateNow = new Date()

    return date1.getTime() === dateNow.getTime()
  }

  // compare deux dates(date ,minutes)
export function daySupToNow(date,heure){
    var date1 = dateStartEvent(date,heure)
    var dateNow = new Date()

    return date1.getTime() > dateNow.getTime()
  }

  // compare deux dates(date ,minutes)
export function dayMinToNow(date,heure){
    var date1 = dateStartEvent(date,heure)
    var dateNow = new Date()

    return date1.getTime() < dateNow.getTime()
  }


  // temps restant(date ,minutes)
export function restTime(date,heure){
    var date1 = dateStartEvent(date,heure)
    var dateNow = new Date()
    var diff = date1.getTime() - dateNow.getTime()

    return Math.floor(diff / (1000*60))

  }



  // trie participants entreprise
  export function trieParticipantsEntreprise(data){
   
    return data.map((item,index)=> {
      if(item.type_compte === "entreprise") return item
    }
    
     ).filter((value,index )=> value !== undefined )

  }


  // trie offre en fonction de poste du candidat
  export const trieOffreOwn = (data,userId)=>{
    if(data){
    return data.map((item,index)=> { 
         if(item.postulants.length != 0 ){
             var postu =  item.postulants.map((val,index)=>{
                 return val.postulant
             })

             if(postu.includes(userId)){
                 return item                
                 }
         }
         
        }).filter(function(item,index){
            return item != undefined
        })
    }
}
