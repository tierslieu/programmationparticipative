let myFont;
let imgBackgroundJaune;
let imgBackgroundBleu;
let imgQuestion;
let linkQuestion;
let lines;
let couleur1 = [240, 142, 108];
let rose = [226, 92, 146];
let violet = [167, 139, 188];
let ypos = 210;
let divArray = [];
let soustitresArray = [];
let titresArray = [];
let nbLinesArray = [];
let programmeArray = [];
let divID = 0;
let titre;
let script;

let jour;
let mois;
let annee;
let heureDebut;
let minuteDebut;
let heureFin;
let minuteFin;
let titreEvent;
let scriptDiv;

let selectMonth;
let monthText = [
  "",
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Aout",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

let events = [];

let scalar = 0.8; // Different for each font

//let nbLinesParColonnes;

let pg;
let taillePolice = 25;

let eventOverID = -1;
let eventPressedID = -1;

let OcecoPanelX = 100 + 1500 / 2 + 100;

let selectPole;

// Event class
class Evenement {
  constructor(rawLine) {
    this.rawLine = rawLine;
    this.moisOK = true;


    // sépare en 2 parties
    let regDate = /\** *(<*.*>>) *\** *(.*)/;
    let resDate = regDate.exec(rawLine);
    if (resDate != null && resDate[1] != undefined)
      [, this.rawDate, this.titreEvent] = resDate;
    else {
      this.error = true;
      this.rawDate = "erreur";
      this.titreEvent = "sur cette ligne dans le fichier texte"
    }

    // Suprimme les ** 
    this.rawDate = this.rawDate.replace(/\*\*/g, '');

    // Cherche et supprime le #interne
    this.interne = false;
/*     if (this.titreEvent.search(/#interne/) != -1)
      this.interne = true;
    else
      this.interne = false;
    this.titreEvent = this.titreEvent.replace(/#interne/, ''); */

    // Cherche et supprime le #force
    if (this.titreEvent.search(/#force/) != -1)
      this.force = true;
    else
      this.force = false;
    this.titreEvent = this.titreEvent.replace(/#force/, '');

    // Cherche et supprime le #important
    if (this.titreEvent.search(/#important/) != -1)
      this.important = true;
    else
      this.important = false;
    this.titreEvent = this.titreEvent.replace(/#important/, '');
    // Pour savoir si un nom de bienveillant est cité comme référent de cet event (sinon affichage en rouge)
    this.bienveillant = false;

    // Supprime les @ noms qui ont le formattage user de Nextcloud (un lien markdown avec une url en mention://xxx )
    let regHash = /@\[([\w\s\d]+)\]\(((?:\/|(mention)?:\/\/)[\w\d.\/?=#]+)\)/g;
    if (this.titreEvent.search(regHash) != -1) {
      this.bienveillant = true;
      this.titreEvent = this.titreEvent.replaceAll(regHash, '');
    }

    // supprime les @ noms
    regHash = /(@[A-zÀ-ú\d-.]+)/g;
    if (this.titreEvent.search(regHash) != -1)
      this.bienveillant = true;
    this.titreEvent = this.titreEvent.replaceAll(regHash, '');

    // reformatte les * (sont écrites /*)
    this.titreEvent = this.titreEvent.replaceAll(/\\\*/g, '*');

/*     let regHash = /(.*)(^|\s)(@[A-zÀ-ú\d-]+)/;
    let resHash = regHash.exec(this.titreEvent);
    if (resHash != null && resHash[1] != undefined)
      [, this.titreEvent, this.bienveillant] = resHash;
    else
      this.bienveillant = ""; */

    // Supprime le nom du mois dans la ligne (sauf si #force)
    if (!this.force)
      this.date = this.rawDate.replace(/(\**< *\w+\.* *\d{1,2}) ([A-zÀ-ú]{3,9})(.*)/, '$1$3');
    else
      this.date = this.rawDate;

    let reggie = /\**(< *\w+\.* *(\d{1,2})[er]* ([A-zÀ-ú]{3,9})([^0-9]*) (\d{1,2})h(\d{0,2})[\/ ]*(\d{0,2})[h]*(\d{0,2})[\W]*>>)\**(.+)/;
    let res = reggie.exec(rawLine);
    this.eventOK = false;
    if (res != null && res[1] != undefined) {
      this.eventOK = true;
      [
        ,
        ,
        this.jour,
        this.mois,
        ,
        this.heureDebut,
        this.minuteDebut,
        this.heureFin,
        this.minuteFin,
        ,
      ] = res;

      this.moisDecimal = monthText.findIndex(element => element.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").match(this.mois.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")));
      if (mois == this.moisDecimal)
        this.moisOK = true;
      else this.moisOK = false;

      if (this.minuteDebut == "") this.minuteDebut = "00";
      if (this.heureFin == "") {
        this.heureFin = (parseInt(this.heureDebut, 10) + 2).toString();
        this.minuteFin = this.minuteDebut;
      }
      if (this.minuteFin == "") this.minuteFin = "00";
      if (this.jour.length == 1) this.jour = "0" + this.jour;
      if (this.heureDebut.length == 1) this.heureDebut = "0" + this.heureDebut;
      if (this.heureFin.length == 1) this.heureFin = "0" + this.heureFin;
      if (this.minuteDebut.length == 1) this.minuteDebut = "0" + this.minuteDebut;
      if (this.minuteFin.length == 1) this.minuteFin = "0" + this.minuteFin;
    }

    if (this.eventOK == false && !this.force) {
      this.titreEvent = "erreur de format de date sur cette ligne dans le fichier texte"
    }

    textFont(fontLove);
    textSize(taillePolice);
    this.dateWidth = textWidth(this.date);
    textFont(fontTypewriter);
    textSize(taillePolice);
    this.titreWidth = textWidth(this.titreEvent);
    this.textWidth = this.dateWidth + this.titreWidth;
    this.textHeight = textAscent() * scalar + textDescent() * scalar;

    /*   if (this.rawDate != undefined)
         console.log(         this.rawDate,
           this.jour,
           this.mois,
           this.heureDebut,
           this.minuteDebut,
           this.heureFin,
           this.minuteFin,
           this.titreEvent, this.textWidth
                    );
       else
         console.log( "???");
   */

    this.startDate = annee + '-' + ((this.moisDecimal < 10) ? '0' : '') + this.moisDecimal + '-' + this.jour + 'T' + this.heureDebut + ':' + this.minuteDebut;
    this.endHour = this.heureFin + ':' + this.minuteFin;
    this.startHour = this.heureDebut + ':' + this.minuteDebut;

    var myStartDate = new Date(Date.parse(this.startDate));
    if (!dateIsValid(myStartDate))
      this.eventOK = false;

    if (!this.eventOK) {
      let today = new Date();
      this.startDate = today.toISOString(); // Default
      this.endHour = "00:00"; // Default
      this.startHour = "00:00"; // default
    }



    this.actions = [];


  }

  showOcecoInputs() {
    for (const [key, value] of template) {
      select('#actions' + key).hide();
    }
    select('#actions' + this.slug).show();
    // modal
    showInputsEvenement(this);
    for (const [index, poste] of template.get(this.slug).entries()) {
      select("#Switch__" + this.slug + '__' + poste.slug).checked(this.actions[index].active);
      if (this.actions[index].active == false)
        select('#actionDiv' + this.slug + poste.slug).addClass('off');
      //select('#actionDiv'+ this.slug + poste.slug).class('action moitie-1' + (this.actions[index].active?'':' off'));
      select('#actionDiv' + this.slug + poste.slug + 'Nom').value(this.actions[index].name);
      select('#actionDiv' + this.slug + poste.slug + 'Débuteà').value(this.actions[index].startHour);
      select('#actionDiv' + this.slug + poste.slug + 'Termineà').value(this.actions[index].endHour);
      select('#actionDiv' + this.slug + poste.slug + 'Mini').value(this.actions[index].min);
      select('#actionDiv' + this.slug + poste.slug + 'Maxi').value(this.actions[index].max);
      select('#actionDiv' + this.slug + poste.slug + 'Credits').value(this.actions[index].credits);
      select('#actionDiv' + this.slug + poste.slug + 'Desc').value(this.actions[index].description);

      // Show or Hide "2 équipes" checkbox
      if (!this.actions[index].hasOwnProperty("moitie")) {
        select('#actionDivLabel' + this.slug + poste.slug + 'Moitie').hide();
        select('#actionDiv' + this.slug + poste.slug + 'Moitie').hide();
        select('#actionDiv' + this.slug + poste.slug + '-2').hide();

      }
      else {
        select('#actionDiv' + this.slug + poste.slug + 'Moitie').checked(this.actions[index].moitie);
        if (this.actions[index].moitie == true) {
          select('#actionDiv' + this.slug + poste.slug).addClass('moitie-1');
          select('#actionDiv' + this.slug + poste.slug + '-2').show();
        }
        else
          select('#actionDiv' + this.slug + poste.slug + '-2').hide();

        // deuxieme moitie data
        select('#actionDiv' + this.slug + poste.slug + 'Débuteà-2').value(this.actions[index].startHour2);
        select('#actionDiv' + this.slug + poste.slug + 'Termineà-2').value(this.actions[index].endHour2);
        select('#actionDiv' + this.slug + poste.slug + 'Mini-2').value(this.actions[index].min2);
        select('#actionDiv' + this.slug + poste.slug + 'Maxi-2').value(this.actions[index].max2);
        select('#actionDiv' + this.slug + poste.slug + 'Credits-2').value(this.actions[index].credits2);
      }


    }
  }

  generateJSON() {
    let info = {};

    let data = {};
    data.organizations = { _id: "61b1ec9654a5b834e522aaaa" }; // ID Oceco de la plume à loup
    //if (this.interne)
    //  data.organizations = { _id: "5f604389690864ba028b483c" };
    data.organizations.projects = [];
    data.organizations.projects[0] = {};
    data.organizations.projects[0]._id = this.poleID;

    data.organizations.projects[0].events = [];
    data.organizations.projects[0].events[0] = {};

    data.organizations.projects[0].events[0].name = this.titreEvent;
    data.organizations.projects[0].events[0].type = "meeting";
    data.organizations.projects[0].events[0].description = this.description;
    data.organizations.projects[0].events[0].imageUrl = "https://programme.laraffinerie.re/public/logoRaffinerie2.jpg";

    data.organizations.projects[0].events[0].startDate = toDateOceco(this.startDate, this.startHour);
    data.organizations.projects[0].events[0].endDate = toDateOceco(this.startDate, this.endHour);
    data.organizations.projects[0].events[0].actions = [];

    for (const action of this.actions) {
      let a = {};
      a.name = action.name;
      a.description = action.description;
      a.startDate = toDateOceco(action.startDate, action.startHour);
      a.endDate = toDateOceco(action.startDate, action.endHour);
      a.min = action.min;
      a.max = action.max;
      a.credits = action.credits;
      if (action.hasOwnProperty("image"))
        a.imageUrl = action.image;

      let b = JSON.parse(JSON.stringify(a));
      if (action.moitie && action.active) {
        a.name += " -début de soirée-"
        b.name += " -fin de soirée-"
        b.startDate = toDateOceco(action.startDate, action.startHour2);
        b.endDate = toDateOceco(action.startDate, action.endHour2);
        b.min = action.min2;
        b.max = action.max2;
        b.credits = action.credits2;
      }

      if (action.active) {
        data.organizations.projects[0].events[0].actions.push(a);
        if (action.moitie)
          data.organizations.projects[0].events[0].actions.push(b);
      }
    }

    if (data.organizations.projects[0].events[0].actions.length == 0)
      delete data.organizations.projects[0].events[0].actions;

    info.user = select('#email').value();
    info.passwd = select('#psw').value();
    info.data = data;

    this.info = info;
  }

  calcul2colonnes() {
    ///this.nbLines = 1 + Math.floor(this.titreWidth / this.maxWidth);
    this.nbLines = 1;
    textFont(fontTypewriter);
    textSize(taillePolice);
    const words = this.titreEvent.split(' ');

    let largeur = 0;
    //console.log("maxW: "+ this.maxWidth);
    for (const mot of words) {
      //console.log(mot + ", largeur=" + textWidth(mot));
      largeur += textWidth(mot);
      if (largeur > (this.maxWidth)) {
        //console.log("largeur: " + largeur + ", maxW: " + this.maxWidth);
        this.nbLines += 1;
        // On repart de la largeur du mot qui a dépassé
        largeur = textWidth(mot);
      }
      else
        largeur += textWidth(" ");
    }


    //console.log("nblines: " + this.nbLines);
  }

}

class Chantier extends Evenement {
  constructor(rawLine, paragraphName) {
    super(rawLine);
    this.type = paragraphName;
    this.slug = "Chantier";
    this.maxWidth = ((1500 - 80) / 2) - this.dateWidth;
    this.calcul2colonnes();

    this.poleID = "";
    this.description = ""

    // make copy
    this.actions = JSON.parse(JSON.stringify(template.get(this.slug)));

    for (const action of this.actions) {
      action.startDate = this.startDate; // uniquement pour avoir le jour
      action.startHour = addToHour(this.startDate, this.startHour, -action.minuteEnAvance);
      action.endHour = addToHour(this.startDate, this.endHour, -action.minuteFinEnAvance);
      action.credits = calculTimeDiff(this.startDate, action.startHour, action.endHour);
      if (action.creditsNegatif)
        action.credits = action.credits * -1;
      if (action.creditFixe !== undefined)
        action.credits = action.creditFixe;

    }
  }


}

class Reunion extends Evenement {
  constructor(rawLine, paragraphName) {
    super(rawLine);
    this.type = paragraphName;
    this.slug = "Réunion";
    this.maxWidth = ((1500 - 80) / 2) - this.dateWidth;
    //this.calcul2colonnes();

    // OCECO
    this.poleID = "";
    this.description = "réunion"

    this.actions = JSON.parse(JSON.stringify(template.get(this.slug)));

    for (const action of this.actions) {
      action.startDate = this.startDate; // uniquement pour avoir le jour
      action.startHour = addToHour(this.startDate, this.startHour, -action.minuteEnAvance);
      action.endHour = addToHour(this.startDate, this.endHour, -action.minuteFinEnAvance);
      action.credits = calculTimeDiff(this.startDate, action.startHour, action.endHour);
      if (action.creditsNegatif)
        action.credits = action.credits * -1;
      if (action.creditFixe !== undefined)
        action.credits = action.creditFixe;
    }

  }





}

class Soiree extends Evenement {
  constructor(rawLine, paragraphName) {
    super(rawLine);
    this.type = paragraphName;
    this.slug = "Soirée";
    this.poleID = ""
    this.description = "soirée"

    this.actions = JSON.parse(JSON.stringify(template.get(this.slug)));

    for (const action of this.actions) {
      action.startDate = this.startDate; // uniquement pour avoir le jour
      action.startHour = addToHour(this.startDate, this.startHour, -action.minuteEnAvance);
      action.endHour = addToHour(this.startDate, this.endHour, -action.minuteFinEnAvance);

      action.credits = calculTimeDiff(this.startDate, action.startHour, action.endHour);
      action.startHour2 = calculHalfTime(this.startDate, action.startHour, action.endHour);
      action.endHour2 = action.endHour;

      action.credits2 = calculTimeDiff(this.startDate, action.startHour2, action.endHour2);
      action.min2 = action.min;
      action.max2 = action.max;
      if (action.moitie) {
        action.endHour = action.startHour2;
        action.credits = calculTimeDiff(this.startDate, action.startHour, action.endHour);
      }
      if (action.creditsNegatif) {
        action.credits = action.credits * -1;
        action.credits2 = action.credits2 * -1;
      }
      if (action.creditFixe !== undefined) {
        action.credits = action.creditFixe;
        action.credits2 = action.creditFixe;
      }
    }



  }




}

class Atelier extends Evenement {
  constructor(rawLine, paragraphName) {
    super(rawLine);
    this.type = paragraphName;
    this.slug = "Atelier";
    this.poleID = "";
    this.description = ""
    //this.maxWidth = ((1500 - 80) / 2) - this.dateWidth;
    //this.calcul2colonnes();

    this.actions = JSON.parse(JSON.stringify(template.get(this.slug)));

    for (const action of this.actions) {
      action.startDate = this.startDate; // uniquement pour avoir le jour
      action.startHour = addToHour(this.startDate, this.startHour, -action.minuteEnAvance);
      action.endHour = addToHour(this.startDate, this.endHour, -action.minuteFinEnAvance);
      action.credits = calculTimeDiff(this.startDate, action.startHour, action.endHour);
      if (action.creditsNegatif)
        action.credits = action.credits * -1;
      if (action.creditFixe !== undefined)
        action.credits = action.creditFixe;
    }
  }


}

class Formation extends Evenement {
  constructor(rawLine, paragraphName) {
    super(rawLine);
    this.type = paragraphName;
    this.slug = "Formation";

    this.poleID = "";
    this.description = ""


    this.actions = JSON.parse(JSON.stringify(template.get(this.slug)));

    for (const action of this.actions) {
      action.startDate = this.startDate; // uniquement pour avoir le jour
      action.startHour = addToHour(this.startDate, this.startHour, -action.minuteEnAvance);
      action.endHour = addToHour(this.startDate, this.endHour, -action.minuteFinEnAvance);
      action.credits = calculTimeDiff(this.startDate, action.startHour, action.endHour);
      if (action.creditsNegatif)
        action.credits = action.credits * -1;
      if (action.creditFixe !== undefined)
        action.credits = action.creditFixe;
    }
  }


}

// Fabrique design pattern
class EventFactory {
  constructor() {
    this.creerEvenement = function (rawLine, paragraphName) {
      if (rawLine == "")
        return null;
      if (paragraphName == "Chantiers Participatifs") {
        return new Chantier(rawLine, paragraphName);
      }
      else if (paragraphName == "Réunions") {
        return new Reunion(rawLine, paragraphName);
      }
      else if (paragraphName == "Événements") {
        return new Soiree(rawLine, paragraphName);
      }
      else if (paragraphName == "Ateliers publics") {
        return new Atelier(rawLine, paragraphName);
      }
      else if (paragraphName == "Formations") {
        return new Formation(rawLine, paragraphName);
      }
      return null;
    }
  }
}

const factory = new EventFactory();

/**************************************************/
// UTILS
/**************************************************/

function calculTimeDiff(day, startHour, endHour) {
  //console.log('day'+day+ ' start'+startHour + ' end' + endHour)
  var endDate = day.substring(0, 11) + endHour;
  var startDate = day.substring(0, 11) + startHour;
  return ceil((Date.parse(endDate) - Date.parse(startDate)) / 1000 / 60 / 60)
}

function dateIsValid(date) {
  return date instanceof Date && !isNaN(date);
}

function addToDate(date, minutes) {
  var MS_PER_MINUTE = 60000;
  //console.log("date: " + Date.parse(date) + ", minutes: " + minutes);
  //   console.log(date);

  var myStartDate = new Date(Date.parse(date) + minutes * MS_PER_MINUTE);
  return myStartDate.toISOString().substring(0, 11) + myStartDate.toTimeString().substring(0, 5);
}

function addToHour(day, hour, minutes) {
  var date = day.substring(0, 11) + hour;
  return addToDate(date, minutes).substring(11, 16);
}

function calculHalfTime(day, startHour, endHour) {
  var endDate = Date.parse(day.substring(0, 11) + endHour);
  var startDate = Date.parse(day.substring(0, 11) + startHour);
  var midDate = new Date(startDate + (endDate - startDate) / 2);
  return midDate.toTimeString().substring(0, 5);
}

function toDateOceco(day, hour) {
  return day.substring(0, 11) + hour + ":00+01:00";
}

/**************************************************/
// P5JS
/**************************************************/

function preload() {
  var json = []
  fetch('./conf.json').then(response => json = response.json())
  //console.log(json)

/*   let response = fetch("/telecharger-fichier", {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    }})
  if (response.ok == true){
    let result = await response.json();
     console.log(result);
    if (result.status == true) {

    }
  } */

  // Obtenir la chaîne de requête
  const queryString = window.location.search;
  // Créer une instance de URLSearchParams
  const urlParams = new URLSearchParams(queryString);
  // Récupérer des valeurs spécifiques
  const mois = urlParams.get('mois');
  const annee = urlParams.get('annee');

  fontTypewriter = loadFont("JMH Typewriter dry.otf");
  fontLove = loadFont("A Love of Thunder.ttf");
  //lines = loadStrings("https://nuage.tierslieux.re/s/TJerjSiDnfEjac5/download");
  lines = loadStrings("/telecharger-fichier");
console.log(lines)
  selectMonth = createSelect();
  selectMonth.position(10, 2323);
  for (i = 1; i <= 12; i++) selectMonth.option(monthText[i], i);
  selectMonth.changed(mySelectEvent);
  // select le mois prochain, janvier si on est en décembre
  if (day() > 18)
    selectMonth.selected((month() + 1) % 13);
  else
    selectMonth.selected(month());

  imgBackgroundJaune = loadImage("fond-programme-plumealoup.jpg");
  imgBackgroundBleu = loadImage("fond-programme-plumealoup.jpg");
  imgBackgroundInterneBleu = loadImage("fond-programme-plumealoup.jpg")
  selectMonth.hide();

  //linkQuestion = createA("https://documentation.laraffinerie.re/index.php/Le_programme_mensuel", '<img src=question-mark.png></img>');
  //linkQuestion.position(20,100);
  //imgQuestion = loadImage("question-mark.png").parent(linkQuestion);

}

//---------------------------------------------------------------//
//---------------------------------------------------------------//
function setup() {


  textFont(fontTypewriter);

  if (mois == undefined) mySelectEvent();

  createCanvas(1850, 100 + 2121 / 2);
  script = "";
  divID = -1;



  for (i = 0; i < lines.length; i++) {
    if (lines[i].startsWith("## ")) {
      // pour les sections à couper en 2
      if (divID >= 0)
        nbLinesArray[divID] = ceil(nbLinesArray[divID] / 2);
      divID++;
      nbLinesArray[divID] = 0;
      titresArray[divID] = lines[i].slice(3);
      divArray.push(titresArray[divID]);
      nbLinesArray[divID] = 0;
    }

    if (lines[i].startsWith("###### ")) {
      soustitresArray[divID] = lines[i].slice(7).replaceAll(/\\\*/g, '*');  // remplace les \* par *
    }

    if (divID >= 0 && !lines[i].startsWith("#") && lines[i].length > 0) {
      // e est la longueur du tableau
      e = events.push(factory.creerEvenement(lines[i], titresArray[divID]));
      //console.log( events[e-1] );
      if (events[e - 1].nbLines !== undefined && (events[e - 1].moisOK || events[e - 1].force) && !events[e - 1].interne)
        nbLinesArray[divID] += events[e - 1].nbLines;
    }
  }

  //nbLinesParColonnes = 0;

  // for (i = 0; i < events.length; i++)
  //   {
  //     if (events[i].type == "Réunions" && (events[i].moisOK || events[i].force) && !events[i].interne )
  //       nbLinesParColonnes += events[i].nbLines;
  //   }
  // nbLinesParColonnes = ceil(nbLinesParColonnes / 2);

  let jaune = color(241,227,0);
  let vert = color(164,186,0);
  let bleu = color(57,182,184);
  let col = (mois % 2 == 0)?jaune:vert;
  let espace = 100;
  let buttonSize = 300;

  //select('#buttonSave1').size(buttonSize, 80);
  select('#buttonSave1').style('background-color', col);
  //select('#buttonSave1').position(100 + 1500 / 4 - buttonSize / 2, 0, 'relative');
  select('#buttonEdit').style('background', 'linear-gradient(to right,'+col+' 30%, rgb(57,182,184) 70%)');
  select('#buttonSave2').style('background-color', bleu);

  let moisSuivant = (int(mois) + 1) % 13;
  let moisPrecedent = (int(mois) - 1);
  if (moisPrecedent == 0)
    moisPrecedent = 12
  let anneeSuivante = int(annee) + (moisSuivant==1?1:0);
  let anneePrecedente = int(annee) - (moisPrecedent==12?1:0);
  select('#buttonNext').attribute('href', '?mois=' + moisSuivant + '&annee=' + anneeSuivante);
  select('#buttonPrev').attribute('href', '?mois=' + moisPrecedent + '&annee=' + anneePrecedente);


  // button = createButton('<i class="fa fa-download fa-lg"></i>  &nbsp; Programme public');
  // button.addClass('actionButton');
  // //button.position(100, 0);
  // button.position(100 + 1500 / 4 - buttonSize / 2, 80);
  // button.size(buttonSize, 80);
  // button.style('background-color', col);
  // button.mousePressed(sauvegarder);

  // buttonModifier = createButton('<i class="fa fa-pencil-square-o fa-lg"></i> &nbsp;  Modifier le contenu');
  // buttonModifier.addClass('actionButton');
  // buttonModifier.position(100 + 1500 /2  - buttonSize/2, 80);
  // buttonModifier.size(buttonSize +50, 80);
  // buttonModifier.style('background', 'linear-gradient(to right,'+col+' 30%, rgb(57,182,184) 70%)');
  // buttonModifier.mousePressed(modifier);

  // buttonIntern = createButton('<i class="fa fa-download fa-lg"></i> &nbsp; Programme interne');
  // buttonIntern.addClass('actionButton');
  // //buttonIntern.position(100 + 2 * (1500 / 3) + espace + 50 , 0);
  // buttonIntern.position(100 + 1500 /2 + 50 + 1500 / 4 - buttonSize / 2, 80);
  // buttonIntern.size(buttonSize, 80);
  // buttonIntern.style('background-color', bleu);
  // buttonIntern.mousePressed(sauvegarderIntern);

  pg = createGraphics(1500, 2121);
  pgIntern = createGraphics(1500, 2121);


  //setFrameRate(1);
  //   pg.background(255);
  divID = 0;
  if (mois % 2 == 0) pg.image(imgBackgroundJaune, 0, 0);
  else pg.image(imgBackgroundBleu, 0, 0);

  pgIntern.image(imgBackgroundInterneBleu, 0, 0, 1500,2121);

  // dessine tout
  dessineTout(pg, false);
  dessineTout(pgIntern, true);

  creerInputOceco();

   selectPole = new TomSelect("#selectPole", {
    onChange: function (value) {
      events[eventPressedID].poleID = value;

    },
    optgroupField: 'groupe',

    create: false,

    render: {
      option: function (data, escape) {
        return '<div class="d-flex"><span>' + escape(data.text) + '</span></div>';
      },
      item: function (data, escape) {
        return '<div>' + escape(data.text) + '</div>';
      },
      optgroup_header: function (data, escape) {
        return '<div style="color:rgb(226, 92, 146);">' + escape(data.label) + ' </div>';
      },
      no_results: function (data, escape) {
        return '<div class="no-results">Je ne connais pas de pole ' + (data.input) + '</div>';
      },
    }
  }); 

}


function dessineTout(graf, isIntern) {
  let ypos = 340;

  // TITRE
  graf.textFont(fontLove);
  if (mois % 2 == 0) graf.fill(rose);
  else graf.fill(couleur1);
  if (isIntern) graf.fill(violet);
  graf.textSize(64);
  graf.textLeading(64);
  graf.textAlign(CENTER);
  graf.text("< " + (isIntern?"Raffineurs ":"Programme de ") + monthText[mois] + " " + annee + " >",
    442,
    220,
    625);

  graf.textAlign(LEFT);

  for (divID = 0; divID < divArray.length; divID++) {
    found = false;
    for (i = 0; i < events.length; i++) {
      if (events[i].type == titresArray[divID] && (events[i].moisOK || events[i].force) && events[i].interne == isIntern)
        found = true;
      if (found)
        break;
    }
    if (found) { 
      graf.textFont(fontLove);
      graf.fill(0, 0, 0);
      graf.textSize(50);
      ypos += graf.textAscent();
      graf.text(". " + titresArray[divID] + " .", 20, ypos);
      graf.line(20, ypos + 10, graf.width - 40, ypos + 10);
      ypos += 20;

      graf.textFont(fontTypewriter);
      graf.fill(0, 0, 0);
      graf.textSize(24);
      graf.textLeading(24);
      ypos += graf.textAscent();
      graf.text(soustitresArray[divID], 20, ypos, graf.width - 20);
      ypos += graf.textAscent();
      // si ca fait plus d'une ligne (todo : marche que pour 2 lignes)
      if (graf.textWidth(soustitresArray[divID]) > graf.width - 20)
        ypos += graf.textAscent() * 2;
      ypos += 20;

      let nbL = 0;
      let yStart = 0;
      let yEnd = 0;
      graf.textLeading(25);

      for (i = 0; i < events.length; i++) {
        if (events[i].type == titresArray[divID] && (events[i].moisOK || events[i].force) && events[i].interne == isIntern) {
          graf.fill(0, 0, 0);
          // memorise le depart en y
          if (yStart == 0)
            yStart = ypos;

          if (nbL < nbLinesArray[divID] || events[i].nbLines === undefined || isIntern)
            x = 20;
          else {
            x = 1500 / 2 + 10;
            // memorise la fin en y de la premiere colonne, et redémarre la seconde colonne à ystart
            if (yEnd == 0) {
              yEnd = ypos;
              ypos = yStart;
            }
          }
          graf.textSize(taillePolice);
          graf.textFont(fontLove);
          graf.text(events[i].date, x, ypos);
          let w = graf.textWidth(events[i].rawDate);
          graf.textFont(fontTypewriter);
          save_ypos = ypos; // Pour le mouseOver 
          // change la couleur si important
          if (events[i].important == true)
            graf.fill(164, 186, 0);
          // change la couleur si pas de bienveillant            
          if ((events[i].bienveillant == false || events[i].eventOK == false) && events[i].force == false)
            graf.fill(255, 0, 0);          
          if (events[i].nbLines !== undefined && !isIntern) {
            graf.textWrap(WORD);
            graf.textLeading(taillePolice);
            graf.text(events[i].titreEvent, x + events[i].dateWidth + 8, ypos, events[i].maxWidth);
            ypos += events[i].nbLines * taillePolice + 5;
            nbL += events[i].nbLines;
            events[i].rect = { x: x, y: save_ypos - taillePolice, w: 1500 / 2 - 20, h: events[i].nbLines * taillePolice + 5 };
          }
          else {
            graf.text(events[i].titreEvent, x + events[i].dateWidth + 8, ypos);
            ypos += taillePolice + 5;
            nbL++;
            events[i].rect = { x: x, y: save_ypos - taillePolice, w: 1460, h: taillePolice + 5 };
          }
          if (isIntern)
            events[i].rect.x += 1600;
        }
      }
      ypos = max(yEnd, ypos);
      ypos += 20;
      //divArray[divID].position(20, ypos);
      //ypos += divArray[divID].height + 20;

      //console.log(divArray[divID].height);
    }
  }
}

  function draw() {
    background(255);

    //image(imgQuestion, 10,10);

    let entourage = 2;
    noStroke();
    fill(164,186,0); // vert
    rect(100-entourage, 10-entourage, 1500 / 2 +2*entourage, 2121 / 2 +2*entourage);

    fill(57,182,184); // bleu
    rect(900-entourage, 10-entourage, 1500 / 2 +2*entourage, 2121 / 2 +2*entourage);

    image(pg, 100, 10, 1500 / 2, 2121 / 2);
    image(pgIntern, 900, 10, 1500 / 2, 2121 / 2);



    // regarde si la souris passe au dessus d'un texte
    overDetected = false;
    cursor('default');
    for (i = 0; i < events.length; i++) {
      if (events[i].rect !== undefined && overText(events[i].rect.x / 2 + 100, events[i].rect.y / 2 + 10, events[i].rect.w / 2, events[i].rect.h / 2)) {
        noStroke();
        fill(23, 41, 131, 60);
        rect(events[i].rect.x / 2 + 100, events[i].rect.y / 2 + 10, events[i].rect.w / 2, events[i].rect.h / 2);
        eventOverID = i;
        overDetected = true;
        cursor('pointer');
      }
    }
    if (overDetected == false)
      eventOverID = -1;

    if (eventPressedID > 0) {
      stroke(23, 41, 131);
      strokeWeight(2);
      noFill();
      rect(events[eventPressedID].rect.x / 2 + 100, events[eventPressedID].rect.y / 2 + 10, events[eventPressedID].rect.w / 2, events[eventPressedID].rect.h / 2);

      //  PanneauOceco();
    }
  }


  function keyPressed() {
    //if the key is a s
    if (key == "s") {
      //save out to a file
      //saveCanvas(titre + ".jpg");
    }
  }

  function mouseClicked(event) {
    if (select('#event').elt.style.display === 'block') {
      // En caas de Clic sur la zone du modal autour de #container, fermer le modal
      var modal = select('#event').elt;
      if (event.target == modal) {
        modal.style.display = "none";
      }
      return;
    }

    if (eventOverID >= 0) {

      selectEvent(eventOverID);
    }
    else {
      // Si clic sur l'affiche (en dehors d'un event)
      if (overText(100, 100, 1500 / 2, 2121 / 2))
        unselectEvent();
    }

  }

  function selectEvent(id) {
    resetOcecoPanel();
    eventPressedID = id;

    //showOcecoPanel(eventPressedID);
    if (id >= 0 && events[id].eventOK)
      events[id].showOcecoInputs();
  }

  function unselectEvent() {
    resetOcecoPanel();
    eventPressedID = -1;
  }



  function mySelectEvent() {
    mois = selectMonth.value();
    annee = year();
    // Passe à l'année suivante si on choisit janvier alors qu'on est en décembre
    if (month() == 12 && mois == 1) annee += 1;
  }

  function sauvegarder() {
    pg.save(monthText[mois] + " " + annee + ".jpg");
  }

  function sauvegarderIntern() {
    pgIntern.save("Interne - " + monthText[mois] + " " + annee + ".jpg");
  }

  function modifier() {
    window.open("https://collab.tiers-lieux.org/s/PXFYPiRsXB2CAmk");
  }

  function overText(x, y, w, h) {
    if (mouseX >= x && mouseX <= x + w &&
      mouseY >= y && mouseY <= y + h) {
      return true;
    } else {
      return false;
    }
  }

