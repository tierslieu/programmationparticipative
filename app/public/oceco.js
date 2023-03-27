/********************************************/
// OCECO
/********************************************/

function creerInputOceco() {

  select("#débuteà").changed(eventEvent);
  select("#termineà").changed(eventEvent);
  select("#desc").changed(eventEvent);

  for (const [key, value] of template) {
    for (var poste of value) {
      //console.log("#Switch__"+key+'__'+poste.slug)
      select("#Switch__"+key+'__'+poste.slug).changed(eventSwitch);
      select("#actionDiv"+key+poste.slug+"Nom").changed(eventAction);
      select("#actionDiv"+key+poste.slug+"Débuteà").changed(eventAction);
      select("#actionDiv"+key+poste.slug+"Termineà").changed(eventAction);
      select("#actionDiv"+key+poste.slug+"Mini").changed(eventAction);
      select("#actionDiv"+key+poste.slug+"Maxi").changed(eventAction);
      select("#actionDiv"+key+poste.slug+"Credits").changed(eventAction);
      select("#actionDiv"+key+poste.slug+"Desc").changed(eventAction);
      
      select("#actionDiv"+key+poste.slug+"Moitie").changed(eventMoitie);
      select("#actionDiv"+key+poste.slug+"Débuteà-2").changed(eventAction);
      select("#actionDiv"+key+poste.slug+"Termineà-2").changed(eventAction);
      select("#actionDiv"+key+poste.slug+"Mini-2").changed(eventAction);
      select("#actionDiv"+key+poste.slug+"Maxi-2").changed(eventAction);
      select("#actionDiv"+key+poste.slug+"Credits-2").changed(eventAction);
    }
  }
  
  resetOcecoPanel() 

}

/********************************/
// EVENTS
/********************************/

function eventEvent() {
  var varName = this.elt.dataset.var;
  eval("events[eventPressedID]."+varName + " = this.value()");
}


function selectPoleEvent() {
  events[eventPressedID].poleID = this.getValue();
}



function eventSwitch() {

  var poste = this.elt.dataset.poste;
  //console.log(poste);
  var indexOfAction = this.elt.dataset.index;
  //console.log(indexOfAction);
  
  if (this.checked()) {
    events[eventPressedID].actions[indexOfAction].active = true;
    select('#actionDiv'+ events[eventPressedID].slug + poste).removeClass('off');
    select('#actionDiv'+ events[eventPressedID].slug + poste + '-2').removeClass('off');
  }
  else {
    events[eventPressedID].actions[indexOfAction].active = false;
    select('#actionDiv'+ events[eventPressedID].slug + poste).addClass('off');
    select('#actionDiv'+ events[eventPressedID].slug + poste + '-2').addClass('off');
  }
}



function eventAction() {
  var indexOfAction = this.elt.parentElement.dataset.index;
  var varName = this.elt.dataset.var;
  if (this.elt.type == "number")
    eval("events[eventPressedID].actions[indexOfAction]."+varName + " = int(this.value())");
  else
    eval("events[eventPressedID].actions[indexOfAction]."+varName + " = this.value()");
}

function eventMoitie() {
  var poste = this.elt.dataset.poste;
  var indexOfAction = this.elt.parentElement.dataset.index;
  var action = events[eventPressedID].actions[indexOfAction];
  if (this.checked()) {
    action.moitie = true;
    select('#actionDiv'+ events[eventPressedID].slug + poste).addClass('moitie-1');
    select('#actionDiv'+ events[eventPressedID].slug + poste + '-2').show();
    action.endHour = calculHalfTime(action.startDate, action.startHour, action.endHour);
  }
  else {
    action.moitie = false;
    select('#actionDiv'+ events[eventPressedID].slug + poste).removeClass('moitie-1');
    select('#actionDiv'+ events[eventPressedID].slug + poste + '-2').hide();
    action.endHour = events[eventPressedID].actions[indexOfAction].endHour2;
  }
  action.credits = calculTimeDiff(action.startDate, action.startHour, action.endHour);
 
  // MAJ de l'UI
  select('#actionDiv'+ events[eventPressedID].slug + poste + 'Termineà').value(action.endHour);
  select('#actionDiv'+ events[eventPressedID].slug + poste + 'Credits').value(action.credits);

}
/********************************/




/*********************************************/

function showOcecoPanel(id) {
    if (events[id].selectType !== undefined) {
      events[id].showOcecoInputs();
    }
  
}

function resetOcecoPanel() {
  select('#event').hide();
 
}


function showInputsEvenement(event) {
  select('#event').show();
  if (!event.interne) {
    selectPole.clear();; // enleve selection courante pour le clearOptions
    selectPole.clearOptions(); // Vide la liste
    //selectPole.addOptionGroup("Fréquents", {label: 'Fréquents'});
    //selectPole.addOptionGroup("Jardin", {label: 'Jardin'});

    selectPole.addOption({groupe:'Fréquents', value:'5e4d842d690864aa088b4b01', text:'Café culturel'});
    selectPole.addOption({groupe:'Fréquents', value:'5bdc957640bb4e9e79eefccb', text:'Chantier participatif'});
    selectPole.addOption({groupe:'Jardin', value:'5fae4a346908644d478b45b1', text:'Champignonière'});
    //selectPole.addOption({groupe:'Fréquents', value:'5bdc957640bb4e9e79eefccb', text:''});
    //selectPole.addOption({groupe:'Fréquents', value:'5bdc957640bb4e9e79eefccb', text:''});
    //selectPole.addOption({groupe:'Fréquents', value:'5bdc957640bb4e9e79eefccb', text:''});
    selectPole.addOption({groupe:'Jardin', value:'6172b0c519ba2c0a750c5c4a', text:'Pépinière'});
    selectPole.addOption({groupe:'Jardin', value:'5e4232ec69086452078b46d0', text:'Potager'});
    selectPole.addOption({groupe:'Jardin', value:'5fae47bc6908644d478b4598', text:'Rucher'});
    selectPole.addOption({groupe:'Jardin', value:'5e650e3469086440318b45b3', text:'Serre aquaponique'});
    selectPole.addOption({groupe:'Jardin', value:'5e4ff86a69086495528b4592', text:'Micro-Forêt'});

    selectPole.addOption({groupe:'Culture', value:'6208fa07506b8728f321fd55', text:'Groupe Culture'});
    selectPole.addOption({groupe:'Culture', value:'5e4d842d690864aa088b4b01', text:'Café culturel'});
    selectPole.addOption({groupe:'Culture', value:'6208f7f761387739e675f98a', text:'Culture Lab'});
    selectPole.addOption({groupe:'Culture', value:'5bd2bcfb40bb4e4509f7eabe', text:'AMAC'});
    selectPole.addOption({groupe:'Culture', value:'5c03d0a140bb4eba4549a633', text:'Cinéma plein air'});
    selectPole.addOption({groupe:'Culture', value:'615d60cef1ddbd5bb32ce698', text:'MédiaLab'});

    selectPole.addOption({groupe:'Alimentation', value:'5bd2bfa640bb4ecb09f7eabe', text:'AMAP'});
    selectPole.addOption({groupe:'Alimentation', value:'5f9fda7d6908646a498b457c', text:'Laboratoire de transformation alimentaire'});
    selectPole.addOption({groupe:'Alimentation', value:'5e4d8a8b690864aa088b4d6e', text:'Micro-brasserie'});
    selectPole.addOption({groupe:'Alimentation', value:'5bdd92bc40bb4e16195d83fe', text:'Café resto'});


       selectPole.addOption({groupe:'Communs', value:'5fae52a769086444478b45cc', text:'Interpoles'});
       selectPole.addOption({groupe:'Communs', value:'5df793ee690864ad568b45e1', text:'La Poule Comm'});
       selectPole.addOption({groupe:'Communs', value:'5c5862dd40bb4e591f69a820', text:'Les outils numériques'});
       selectPole.addOption({groupe:'Communs', value:'5c461b1140bb4ed64e123ae8', text:'Travaux'});
       selectPole.addOption({groupe:'Communs', value:'6253cf64686f1870cd4aefe5', text:'Formation'});
       selectPole.addOption({groupe:'Communs', value:'6253caa8226b3b67fc25fcba', text:'Location'});


       selectPole.addOption({groupe:'Micro-Recyclerie', value:'63342067f9e2dc0dcb349792', text:'Textile'});
       selectPole.addOption({groupe:'Micro-Recyclerie', value:'615d7ac26beb295c7d13f65f', text:'Vélo'});
       selectPole.addOption({groupe:'Micro-Recyclerie', value:'615d8cba2ed88434fa27e349', text:'Fablab'});
       selectPole.addOption({groupe:'Micro-Recyclerie', value:'5bdc957640bb4e9e79eefccb', text:'Chantier participatif'});

       selectPole.addOption({groupe:'CA', value:'5be5d3f340bb4e3848ef67f3', text:'Conseil d\'administration'});
    
  }
  else {
    selectPole.clear();; // enleve selection courante pour le clearOptions
    selectPole.clearOptions(); // Vide la liste
    selectPole.addOption({groupe:'Raffineurs', value:'5f606584690864b1418b469d', text:'Jardin'});
    selectPole.addOption({groupe:'Raffineurs', value:'5f606679690864bd418b4708', text:'Alimentation'});
    selectPole.addOption({groupe:'Raffineurs', value:'6328cb8d4c1d4e704e7ea4da', text:'Sport'});
    selectPole.addOption({groupe:'Raffineurs', value:'6328cb4e4c1d4e704e7ea495', text:'Culture'});
    selectPole.addOption({groupe:'Raffineurs', value:'6421b5e6f0acb433df2240a5', text:'Micro-recyclerie'});
    selectPole.addOption({groupe:'Raffineurs', value:'6328cbc14c1d4e704e7ea4e6', text:'Communs'});

  }
  var date = new Date(event.startDate);
  select('#titreEvent').html( "Le " + date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear() + "<br>" + event.titreEvent);
  selectPole.setValue(event.poleID);
  console.log(event.poleID)
  select('#débuteà').value(event.startHour);
  select('#termineà').value(event.endHour);
  select('#desc').value(event.description);


}

function valider() {

for (const el of document.getElementById('form').querySelectorAll("[required]")) {
  if (!el.reportValidity()) {
    return;
  }
}

for (const el of document.getElementById('container').querySelectorAll("[required]")) {
  if (!el.reportValidity()) {
    return;
  }
}

Swal.fire({
  title: 'Voulez vous créer un événement et des actions ?',
  showDenyButton: true,
  showCancelButton: false,
  confirmButtonText: 'Oui, Créer l\'événement et les actions',
  denyButtonText: `Non, Annuler`,
}).then((result) => {
  /* Read more about isConfirmed, isDenied below */
  if (result.isConfirmed) {
    events[eventPressedID].generateJSON();
    console.log(events[eventPressedID].info);
    
    Swal.fire({
      title: 'Patience, ca crée',
      html: 'Prend toi une grande inspiration pendant ce temps',// add html attribute if you want or remove
      allowOutsideClick: false,
      showCancelButton: false,
      showConfirmButton: false,
      willOpen: () => {
          Swal.showLoading()
      },
    });
    f();
  } else if (result.isDenied) {
    Swal.fire('Rien n\'a été créé', '', 'info')
  }
})

return false;
}

async function f() {
  //console.log('AAAAAAAAAAAAAAA');

  //let response = await fetch("https://cors-anywhere.herokuapp.com/https://oce.co.tools/api/batchjson/create", {
    let response = await fetch("/oceco/", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( events[eventPressedID].info ) } )
  .catch(error => {
        console.error('There was an error!', error);
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'La demande n\'a pas pu aboutir',
          text: 'Vous n\'avez pas les droits pour créer un événement dans ce pole oceco.',
          footer: 'erreur' + error
        })
        
    });

    console.log('response : ');
    console.log(response);

    console.log('result : ');

 
    if (response.ok == true){
      let result = await response.json();
      console.log(result);

      if (result.status == true) {
        Swal.close();
        let name = result.json.organizations.projects[0].events[0].name;
        let numActions = 0;
        if (result.json.organizations.projects[0].events[0].hasOwnProperty("actions"))
          numActions = result.json.organizations.projects[0].events[0].actions.length;
        Swal.fire({
          icon: 'success',
          title: 'Créé',
          text: 'L\'action "' + name + '" et ' + numActions + ' action(s) ont été créés',
          confirmButtonText: 'OK',
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            unselectEvent();
          }
          })
        }
      // Error dans le resultat de la réponse
      else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Il y a eu un problème avec le résultat : ' + result.error,
          footer: 'envoie un mail à <a href=' + encodeURI('mailto:guillaume@laraffinerie.re?subject=erreur avec le programme&body=' + JSON.stringify(result.error)) + '> Guillaume le développeur de cet outil</a>'
        })
      }
    }
    // Erreur avec le fetch
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Il y a eu un problème avec la requête: ' + response.status,
        footer: 'envoie un mail à <a href=' + encodeURI('mailto:guillaume@laraffinerie.re?subject=erreur avec le programme&body=' + JSON.stringify(response)) + '> Guillaume le développeur de cet outil</a>'
      })
    }
}

/*



    Swal.fire('Créé!', '', 'success')
*/
