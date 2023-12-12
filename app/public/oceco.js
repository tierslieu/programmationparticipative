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
    selectPole.addOptionGroup("Café", {label: 'Café'});
    selectPole.addOptionGroup("Yourte", {label: 'Yourte'});
    
    selectPole.addOption({groupe:'Café', value:'643456f10df7ba104730282f', text:'Achat groupé'});
    selectPole.addOption({groupe:'Café', value:'643456b10df7ba1047302826', text:'La cocote'});
    selectPole.addOption({groupe:'Café', value:'64345f02599b4a32be283122', text:'Le café'});

    selectPole.addOption({groupe:'Yourte', value:'64345c3d599b4a32be2830f3', text:'La yourte'});
    
  }
  else {
    selectPole.clear();; // enleve selection courante pour le clearOptions
    selectPole.clearOptions(); // Vide la liste
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
