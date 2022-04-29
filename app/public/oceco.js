
/********************************************/
// OCECO
/********************************************/

function creerInputOceco() {

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

    }
  }
  
  resetOcecoPanel() 

}

/********************************/
// EVENTS
/********************************/

function selectPoleEvent() {
  events[eventPressedID].poleID = this.getValue();
}

function inputStartDateEvent() {
  events[eventPressedID].startDate = this.value();
}

function inputEndHourEvent() {
  events[eventPressedID].endHour = this.value();
}

function inputDescEvent() {
  events[eventPressedID].description = this.value();
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

  var date = new Date(event.startDate);
  select('#titreEvent').html( "Le " + date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear() + "<br>" + event.titreEvent);
  selectPole.setValue(event.poleID);
  console.log(event.poleID)
  select('#débuteà').value(event.startHour);
  select('#termineà').value(event.endHour);
  select('#desc').value(event.description);


}

function valider() {
  events[eventPressedID].generateJSON();
  console.log(events[eventPressedID].info);
  f();
}

async function f() {
  console.log('AAAAAAAAAAAAAAA');
  //let response = await fetch("https://cors-anywhere.herokuapp.com/https://oce.co.tools/api/batchjson/create", {
    let response = await fetch("http://127.0.0.1:8000/oceco", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( events[eventPressedID].info ) } )
  .catch(error => {
        console.error('There was an error!', error);
    });

    console.log(response);
  
    let result = await response.json();
    console.log(result);
}