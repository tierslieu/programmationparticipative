let myFont;
let imgBackgroundJaune;
let imgBackgroundBleu;
let lines;
let couleur1 = [240, 142, 108];
let rose = [226, 92, 146];
let violet = [174, 100, 165];
let ypos = 210;
let divArray = [];
let soustitresArray = [];
let titresArray = [];
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

let nbLinesParColonnes;

let pg;
let taillePolice = 27;

let eventOverID = -1;
let eventPressedID = -1;

let OcecoPanelX = 100 + 1500/2 + 100; 

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
      [ , this.rawDate, this.titreEvent ] = resDate;
    
    // Suprimme les ** 
    this.rawDate = this.rawDate.replace(/\*\*/g, '');
    
    // Cherche et supprime le #interne
    if (this.titreEvent.search(/#interne/) != -1)
      this.interne = true;
    else 
      this.interne = false;
    this.titreEvent = this.titreEvent.replace(/#interne/, '');

    // Cherche et supprime le #interne
    if (this.titreEvent.search(/#force/) != -1)
      this.force = true;
    else 
      this.force = false;
    this.titreEvent = this.titreEvent.replace(/#force/, '');

    // supprime les @ noms
    let regHash = /(.*)(^|\s)(@[A-zÀ-ú\d-]+)/;
    let resHash = regHash.exec(this.titreEvent);
    if (resHash != null && resHash[1] != undefined)
      [ , this.titreEvent, this.bienveillant ] = resHash;
    else
      this.bienveillant = "";

    // Supprime le nom du mois dans la ligne (sauf si #force)
    if (!this.force)
      this.date = this.rawDate.replace(/(\**< *\w+\.* *\d{1,2}) ([A-zÀ-ú]{3,9})(.*)/, '$1$3');     
    else 
      this.date = this.rawDate;
    
    let reggie = /\**(< *\w+\.* *(\d{1,2}) ([A-zÀ-ú]{3,9})(.*) (\d{1,2})h(\d{0,2})[\/ ]*(\d{0,2})[h]*(\d{0,2})[\W]*>>)\**(.+)/;
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

      
       if (  
           monthText[mois]
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .match(
              this.mois
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
            )
           )
           this.moisOK = true;
           else this.moisOK = false;
      
      if (this.jour.length == 1) this.jour = "0" + this.jour;
      if (this.heureDebut.length == 1) this.heureDebut = "0" + this.heureDebut;
      if (this.heureFin.length == 1) this.heureFin = "0" + this.heureFin;
      if (this.minuteDebut.length == 1) this.minuteDebut = "0" + this.minuteDebut;
      if (this.minuteFin.length == 1) this.minuteFin = "0" + this.minuteFin;
      if (this.minuteDebut == "") this.minuteDebut = "00";
      if (this.heureFin == "") {
        this.heureFin = (parseInt(this.heureDebut, 10) + 2).toString();
        this.minuteFin = this.minuteDebut;
      }
      if (this.minuteFin == "") this.minuteFin = "00";
      


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
    
  this.startDate = annee+'-'+((mois<10)?'0':'')+mois+'-'+this.jour+'T'+this.heureDebut+':'+this.minuteDebut;
  this.endHour = this.heureFin + ':' + this.minuteFin;  
  this.startHour = this.heureDebut + ':' + this.minuteDebut; 
    
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
      select('#actions'+key).hide();
    }
    select('#actions'+this.slug).show();
    // modal
    showInputsEvenement(this);
    for (const [index, poste] of template.get(this.slug).entries()) {
      select("#Switch__"+this.slug+'__'+poste.slug).checked(this.actions[index].active);
      if (this.actions[index].active == false)
        select('#actionDiv'+ this.slug + poste.slug).addClass('off');
      //select('#actionDiv'+ this.slug + poste.slug).class('action moitie-1' + (this.actions[index].active?'':' off'));
      select('#actionDiv'+ this.slug + poste.slug + 'Nom').value(this.actions[index].name);
      select('#actionDiv'+ this.slug + poste.slug + 'Débuteà').value(this.actions[index].startHour);
      select('#actionDiv'+ this.slug + poste.slug + 'Termineà').value(this.actions[index].endHour);
      select('#actionDiv'+ this.slug + poste.slug + 'Mini').value(this.actions[index].min);
      select('#actionDiv'+ this.slug + poste.slug + 'Maxi').value(this.actions[index].max);      
      select('#actionDiv'+ this.slug + poste.slug + 'Credits').value(this.actions[index].credits);
      select('#actionDiv'+ this.slug + poste.slug + 'Desc').value(this.actions[index].description);

      // Show or Hide "2 équipes" checkbox
      if (! this.actions[index].hasOwnProperty("moitie")) {
          select('#actionDivLabel'+ this.slug + poste.slug + 'Moitie').hide();
          select('#actionDiv'+ this.slug + poste.slug + 'Moitie').hide();   
          select('#actionDiv'+ this.slug + poste.slug + '-2').hide();

      }
      else {
        select('#actionDiv'+ this.slug + poste.slug + 'Moitie').checked(this.actions[index].moitie);
        if (this.actions[index].moitie == true) {
          select('#actionDiv'+ this.slug + poste.slug).addClass('moitie-1');
          select('#actionDiv'+ this.slug + poste.slug + '-2').show();
        }
        else
          select('#actionDiv'+ this.slug + poste.slug + '-2').hide();

        // deuxieme moitie data
        select('#actionDiv'+ this.slug + poste.slug + 'Débuteà-2').value(this.actions[index].startHour2);
        select('#actionDiv'+ this.slug + poste.slug + 'Termineà-2').value(this.actions[index].endHour2);
        select('#actionDiv'+ this.slug + poste.slug + 'Mini-2').value(this.actions[index].min2);
        select('#actionDiv'+ this.slug + poste.slug + 'Maxi-2').value(this.actions[index].max2);   
        select('#actionDiv'+ this.slug + poste.slug + 'Credits-2').value(this.actions[index].credits2);
      }


    }
  }
  
  generateJSON() {
    let info = {};

    let data = {};
    data.organizations = { _id: "5e40fec1690864bc598b4874" };
    data.organizations.projects = [];
    data.organizations.projects[0] = {  };
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

}

class Chantier extends Evenement {
  constructor(rawLine, paragraphName) {
    super(rawLine);
    this.type = paragraphName;
    this.slug = "Chantier";
    
    this.poleID = "5bdc957640bb4e9e79eefccb";  
    
    this.description = "Les chantiers participatifs sont des moments conviviaux où chacun.e peut participer quel que soit son niveau de compétence. C'est un des meilleurs moyens de découvrir le projet de La Raffinerie et de rencontrer des personnes. Les actions du chantiers sont très diverses : bois, métal, jardin, cadre de vie, décoration, cuisine ... Les équipes et les missions sont expliquées et distribuées en début de journée après un petit déjeuner participatif. Chacun.e ramène un petit quelque chose. Le chantier participatif finit à midi avec un repas offert par La Raffinerie"
    
    // make copy
    this.actions = JSON.parse(JSON.stringify(template.get(this.slug)));
        
    for (const action of this.actions) {
      action.startDate = this.startDate; // uniquement pour avoir le jour
      action.startHour = addToHour(this.startDate, this.startHour, -action.minuteEnAvance);
      action.endHour = addToHour(this.startDate, this.endHour, +0);  
      action.credits = calculTimeDiff(this.startDate, action.startHour, action.endHour);
    }
  }
  

}

class Reunion extends Evenement {
  constructor(rawLine, paragraphName) {
    super(rawLine);
    this.type = paragraphName;
    this.slug = "Réunion";
    this.maxWidth = ((1500 - 80) / 2) - this.dateWidth;
    this.calcul2colonnes();

    // OCECO
    this.poleID = "";
    this.description = "Les réunions sont ouvertes à toutes et tous, quelque soit votre connaissance du sujet. Les comptes-rendus des réunions précédentes sont accessibles sur le site https://www.laraffinerie.re dans le pole correspondant"
    
    this.actions = JSON.parse(JSON.stringify(template.get(this.slug)));
        
    for (const action of this.actions) {
      action.startDate = this.startDate; // uniquement pour avoir le jour
      action.startHour = addToHour(this.startDate, this.startHour, -action.minuteEnAvance);
      action.endHour = addToHour(this.startDate, this.endHour, +0);  
      action.credits = calculTimeDiff(this.startDate, action.startHour, action.endHour);
    }
  
}

  
  calcul2colonnes()
  {
    this.nbLines = 1 + Math.floor(this.titreWidth / this.maxWidth);
    //console.log(this.nblines);
  }
  

}

class Soiree extends Evenement {
  constructor(rawLine, paragraphName) {
    super(rawLine);
    this.type = paragraphName;
    this.slug = "Soirée";
    this.poleID = "5e4d842d690864aa088b4b01"
    this.description = "Evénement culturel à La Raffinerie. Pour en savoir plus sur le programme de la soirée : https://www.raffinerie.re"
    
    this.actions = JSON.parse(JSON.stringify(template.get(this.slug)));
    
    for (const action of this.actions) {
      action.startDate = this.startDate; // uniquement pour avoir le jour
      action.startHour = addToHour(this.startDate, this.startHour, -action.minuteEnAvance);
      action.endHour = addToHour(this.startDate, this.endHour, +0);  

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

    }
    


  }


  

}

class Atelier extends Evenement {
  constructor(rawLine, paragraphName) {
    super(rawLine);
    this.type = paragraphName;
    this.slug = "Atelier";
    this.poleID = "";
    this.description = "Evénement culturel à La Raffinerie. Pour en savoir plus sur le programme de la soirée : https://www.raffinerie.re"

    
    this.actions = JSON.parse(JSON.stringify(template.get(this.slug)));
        
    for (const action of this.actions) {
      action.startDate = this.startDate; // uniquement pour avoir le jour
      action.startHour = addToHour(this.startDate, this.startHour, -action.minuteEnAvance);
      action.endHour = addToHour(this.startDate, this.endHour, +0);  
      action.credits = calculTimeDiff(this.startDate, action.startHour, action.endHour);
    }
  }
  

}

class Formation extends Evenement {
  constructor(rawLine, paragraphName) {
    super(rawLine);
    this.type = paragraphName;
    this.slug = "Formation";
    
    this.poleID = "";
    this.description = "Les formations sont ouvertes à toutes et tous, et elles peuvent être aussi données celles et ceux qui souhaitent partager un savoir-faire, savoir-être, une connaissance etc."

    
    this.actions = JSON.parse(JSON.stringify(template.get(this.slug)));
        
    for (const action of this.actions) {
      action.startDate = this.startDate; // uniquement pour avoir le jour
      action.startHour = addToHour(this.startDate, this.startHour, -action.minuteEnAvance);
      action.endHour = addToHour(this.startDate, this.endHour, +0);  
      action.credits = calculTimeDiff(this.startDate, action.startHour, action.endHour);
    }
  }
  

}

// Fabrique design pattern
class EventFactory {
  constructor() {
    this.creerEvenement = function(rawLine, paragraphName) 
    {	
      if (rawLine == "")
        return null;
      if(paragraphName == "Chantiers Participatifs"){
         return new Chantier(rawLine, paragraphName);
      }    
      else if(paragraphName == "Réunions"){
         return new Reunion(rawLine, paragraphName);
      } 
      else if(paragraphName == "Événements"){
         return new Soiree(rawLine, paragraphName);
      }
       else if(paragraphName == "Ateliers publics"){
         return new Atelier(rawLine, paragraphName);
      }
      else if(paragraphName == "Formations"){
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
  var endDate = day.substring(0,11) + endHour;
  var startDate = day.substring(0,11) + startHour;
  return ceil((Date.parse(endDate) - Date.parse(startDate)) / 1000 / 60 / 60)
}

function addToDate(date, minutes) {
  var MS_PER_MINUTE = 60000;
//console.log(Date.parse(date));
 //   console.log(date);

  var myStartDate = new Date(Date.parse(date) + minutes * MS_PER_MINUTE);
  return myStartDate.toISOString().substring(0, 11) + myStartDate.toTimeString().substring(0, 5);
}  

function addToHour(day, hour, minutes) {
  var date = day.substring(0,11) + hour;
  return addToDate(date, minutes).substring(11,16);
}

function calculHalfTime(day, startHour, endHour) {
  var endDate = Date.parse(day.substring(0,11) + endHour);
  var startDate = Date.parse(day.substring(0,11) + startHour);
  var midDate = new Date(startDate + (endDate - startDate) / 2);
  return midDate.toTimeString().substring(0, 5);
}

function toDateOceco(day, hour) {
  return day.substring(0,11) + hour + ":00+04:00";
}

/**************************************************/
// P5JS
/**************************************************/

function preload() {
  fontTypewriter = loadFont("JMH Typewriter dry.otf");
  fontLove = loadFont("A Love of Thunder.ttf");
  lines = loadStrings("https://nuage.tierslieux.re/s/p8MPmkbT4xtK5X5/download");

  selectMonth = createSelect();
  selectMonth.position(10, 2323);
  for (i = 1; i <= 12; i++) selectMonth.option(monthText[i], i);
  selectMonth.changed(mySelectEvent);
  // select le mois prochain, janvier si on est en décembre
  if (day() > 18)
    selectMonth.selected((month() + 1) % 12);
  else
    selectMonth.selected(month());
  
    imgBackgroundJaune = loadImage("fond-programme-2.jpg");
  imgBackgroundBleu = loadImage("programme-fond-1.jpg");
  selectMonth.hide();
}

function setup() {

  
  textFont(fontTypewriter);

  if (mois == undefined) mySelectEvent();

  createCanvas(850, 100 + 2121/2);
  script = "";
  divID = -1;

  
  
  for (i = 0; i < lines.length; i++) {
    if (lines[i].startsWith("## ")) {
      divID++;

      titresArray[divID] = lines[i].slice(3);
            divArray.push(titresArray[divID]);

    }

    if (lines[i].startsWith("###### ")) {
      soustitresArray[divID] = lines[i].slice(7);
    }

    if (divID >= 0 && !lines[i].startsWith("#") && lines[i].length > 0) {
      events.push(factory.creerEvenement(lines[i], titresArray[divID]));   
      
    }
  }
  
  nbLinesParColonnes = 0;
  for (i = 0; i < events.length; i++)
    {
      if (events[i].type == "Réunions" && (events[i].moisOK || events[i].force) && !events[i].interne )
        nbLinesParColonnes += events[i].nbLines;
    }
  nbLinesParColonnes = ceil(nbLinesParColonnes / 2);

  button = createButton('Télécharger l\'image du programme');
  button.position(100, 0);
  button.size(1500/4 - 20,80);
  button.mousePressed(sauvegarder);
  
  buttonModifier = createButton('Modifier le texte du programme');
  buttonModifier.position(100 + 1500/4 + 20, 0);
  buttonModifier.size(1500/4 - 20,80);
  buttonModifier.mousePressed(modifier);

  pg = createGraphics(1500, 2121);

  
  //setFrameRate(1);
//   pg.background(255);
  divID = 0;
  let ypos = 340;
  if (mois % 2 == 0) pg.image(imgBackgroundJaune, 0, 0);
  else pg.image(imgBackgroundBleu, 0, 0);



  // TITRE
  pg.textFont(fontLove);
  if (mois % 2 == 0) pg.fill(rose);
  else pg.fill(couleur1);
  pg.textSize(64);
  pg.textLeading(64);
  pg.textAlign(CENTER);
  pg.text("< Programme de " + monthText[mois] + " " + annee + " >",     
    442,
    220,
    625);

  pg.textAlign(LEFT);

  for (divID = 0; divID < divArray.length; divID++) {
    pg.textFont(fontLove);
    pg.fill(0, 0, 0);
    pg.textSize(50);
    ypos += pg.textAscent();
    pg.text(". " + titresArray[divID] + " .", 20, ypos);
    pg.line(20, ypos + 10, pg.width - 40, ypos + 10);
    ypos += 20;

    pg.textFont(fontTypewriter);
    pg.fill(0, 0, 0);
    pg.textSize(24);
    pg.textLeading(24);
    ypos += pg.textAscent();
    pg.text(soustitresArray[divID], 20, ypos, pg.width - 20);
    ypos += pg.textAscent();
    // si ca fait plus d'une ligne (todo : marche que pour 2 lignes)
    if (pg.textWidth(soustitresArray[divID]) > pg.width - 20)
      ypos += pg.textAscent() * 2;
    ypos += 20;

  let nbL = 0;
  let yStart = 0;
  let yEnd = 0;
        pg.textLeading(25);

    for (i = 0; i < events.length; i++) 
    {
      if (events[i].type == titresArray[divID] && (events[i].moisOK || events[i].force) && !events[i].interne)
        {
          pg.fill(0, 0, 0);
          // memorise le depart en y
          if (yStart == 0)
            yStart = ypos;
          
          if (nbL < nbLinesParColonnes || events[i].nbLines === undefined)
              x = 20;
          else
            {
            x = 1500 / 2 + 10;
            // memorise la fin en y de la premiere colonne, et redémarre la seconde colonne à ystart
              if (yEnd == 0)
                {
                  yEnd = ypos;
                  ypos = yStart;
                }
            }
          pg.textSize(taillePolice);
          pg.textFont(fontLove);
          pg.text(events[i].date, x, ypos);
          let w = pg.textWidth(events[i].rawDate);
          pg.textFont(fontTypewriter);
          save_ypos = ypos; // Pour le mouseOver 
          // change la couleur si pas de bienveillant
          if (events[i].bienveillant == "")
            pg.fill(255, 0, 0);
          if (events[i].nbLines !== undefined)
          {
            pg.textWrap(WORD);
            pg.textLeading(taillePolice);
              pg.text(events[i].titreEvent, x + events[i].dateWidth + 8, ypos, events[i].maxWidth);
            ypos += events[i].nbLines * taillePolice + 5;
            nbL += events[i].nbLines;
            events[i].rect = {x: x, y: save_ypos - taillePolice, w: 1500/2-20, h: events[i].nbLines * taillePolice + 5};
          }
          else
          {
            pg.text(events[i].titreEvent, x + events[i].dateWidth + 8, ypos );
           ypos += taillePolice + 5;
            nbL++;
            events[i].rect = {x: x, y: save_ypos - taillePolice, w: 1460, h:taillePolice + 5};
          }
        }
    }
    ypos = max(yEnd, ypos);
    ypos += 20;
    //divArray[divID].position(20, ypos);
    //ypos += divArray[divID].height + 20;

    //console.log(divArray[divID].height);
  }

  creerInputOceco();

  selectPole = new TomSelect("#selectPole",{
  onChange: function(value) {
      events[eventPressedID].poleID = value;

  },
  create: false,
	sortField: {
		field: "text",
		direction: "asc"
	},
    render:{
			option:function(data,escape){
				return '<div class="d-flex"><span>' + escape(data.text) + '</span></div>';
			},
			item:function(data,escape){
				return '<div>' + escape(data.text) + '</div>';
			},
            optgroup_header: function(data, escape) {
			  return '<div style="color:rgb(226, 92, 146);">' + escape(data.label) + ' </div>';
		    },
            no_results:function(data,escape){
			  return '<div class="no-results">Je ne connais pas de pole ' + (data.input)+'</div>';
		    },
		}
});
}


function draw() {

   background(255);

      image(pg,100,100, 1500/2, 2121/2);
  
    
  
  // regarde si la souris passe au dessus d'un texte
  overDetected = false;
  cursor('default');
  for (i = 0; i < events.length; i++) 
  {
    if ( events[i].rect !== undefined && overText(events[i].rect.x/2 +100, events[i].rect.y/2 +100, events[i].rect.w/2, events[i].rect.h/2) ) {
      noStroke();
      fill(23,41,131, 60);
      rect(events[i].rect.x/2+100, events[i].rect.y/2+100 , events[i].rect.w/2, events[i].rect.h/2);
      eventOverID = i;
      overDetected = true;
      cursor('pointer');
    }
  }
  if (overDetected == false)
    eventOverID = -1;
  
  if (eventPressedID > 0) {
    stroke(23,41,131);
    strokeWeight(2);
    noFill();
    rect(events[eventPressedID].rect.x/2+100, events[eventPressedID].rect.y/2+100 , events[eventPressedID].rect.w/2, events[eventPressedID].rect.h/2);
    
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
  if (select('#event').elt.style.display === 'block')
  {
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
    if (overText(100, 100, 1500/2, 2121/2))
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
  pg.save(monthText[mois] + " " + annee +".jpg");
}

function modifier() {
  window.open("https://nuage.tierslieux.re/s/p8MPmkbT4xtK5X5");
}

function overText(x, y, w, h) {
  if (mouseX >= x && mouseX <= x+w && 
      mouseY >= y && mouseY <= y+h) {
    return true;
  } else {
    return false;
  }
}

