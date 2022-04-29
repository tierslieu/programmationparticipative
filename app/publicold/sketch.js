async function f() {
    let json = {}; // new  JSON Object
  json.organizations = 0;
  json.species = 'Panthera leo';
  json.name = 'Lion';
  /*{
    "organizations": {
        "_id": "555eba56c655675cdd65bf19",
        "actions": [
            {
                "name": "test action orga",
                "description": "test",
                "startDate": "2022-02-02T08:30:00+04:00",
                "endDate": "2022-02-05T08:30:00+04:00"
            }
        ],
        "projects": [
            {
                "_id": "5eaf1e396908641b7a8b46c9",
                "actions": [
                    {
                        "name": "test action projets",
                        "description": "test",
                        "startDate": "2022-02-02T08:30:00+04:00",
                        "endDate": "2022-02-05T08:30:00+04:00"
                    }
                ],
                "events": [
                    {
                        "name": "test events",
                        "type": "meeting",
                        "description": "test",
                        "startDate": "2022-02-02T08:30:00+04:00",
                        "endDate": "2022-02-05T08:30:00+04:00",
                        "actions": [
                            {
                                "name": "test action event min max credits",
                                "description": "test",
                                "startDate": "2022-02-02T08:30:00+04:00",
                                "endDate": "2022-02-05T08:30:00+04:00",
                                "min":3,
                                "max":5,
                                "credits": 20
                            }
                        ]
                    }
                ]
            }
        ]
    }
}'
*/

  
  /*
  // Seulement une action
    curl --location --request POST 'https://oce.co.tools/api/batchjson/create' \
--header 'x-user-id: 5dfa41886908648d3b8b46f6' \
--header 'x-access-token: 0a81a0a5e5c89a6e2c25d8c275f0da5a' \
--header 'Content-Type: application/json' \
--data-raw '{ "organizations": {"_id": "5c793c4540bb4e2810fc7639", "actions": [ {"name": "test action orga", "description": "test", "startDate": "2022-03-20T08:30:00+04:00", "endDate": "2022-03-26T08:30:00+04:00"}]} }'
  
  // projet 
      curl --location --request POST 'https://oce.co.tools/api/batchjson/create' \
--header 'x-user-id: 5dfa41886908648d3b8b46f6' \
--header 'x-access-token: 0a81a0a5e5c89a6e2c25d8c275f0da5a' \
--header 'Content-Type: application/json' \
--data-raw '{ "organizations": {"_id": "5c793c4540bb4e2810fc7639", "actions": [ {"name": "test action orga", "description": "test", "startDate": "2022-03-20T08:30:00+04:00", "endDate": "2022-03-26T08:30:00+04:00"}],        "projects": [ { "_id": "5ffd74b269086496048b45c6" } ] }}'

  // projet action
      curl --location --request POST 'https://oce.co.tools/api/batchjson/create' \
--header 'x-user-id: 5dfa41886908648d3b8b46f6' \
--header 'x-access-token: 0a81a0a5e5c89a6e2c25d8c275f0da5a' \
--header 'Content-Type: application/json' \
--data-raw '{ "organizations": {"_id": "5c793c4540bb4e2810fc7639", "actions": [ {"name": "test action orga", "description": "test", "startDate": "2022-03-20T08:30:00+04:00", "endDate": "2022-03-26T08:30:00+04:00"}],        "projects": [ { "_id": "5ffd74b269086496048b45c6", "actions": [ { "name": "test action projets", "description": "test", "startDate": "2022-03-26T08:30:00+04:00", "endDate": "2022-03-27T08:30:00+04:00" } ] } ] }}'


  // projet action event
      curl --location --request POST 'https://oce.co.tools/api/batchjson/create' \
--header 'x-user-id: 5dfa41886908648d3b8b46f6' \
--header 'x-access-token: 0a81a0a5e5c89a6e2c25d8c275f0da5a' \
--header 'Content-Type: application/json' \
--data-raw '{ "organizations": {"_id": "5c793c4540bb4e2810fc7639", "actions": [ {"name": "test action orga", "description": "test", "startDate": "2022-03-20T08:30:00+04:00", "endDate": "2022-03-26T08:30:00+04:00"}],        "projects": [ { "_id": "5ffd74b269086496048b45c6", "actions": [ { "name": "test action projets", "description": "test", "startDate": "2022-03-26T08:30:00+04:00", "endDate": "2022-03-27T08:30:00+04:00" } ], "events": [ { "name": "test events", "type": "meeting", "description": "test", "startDate": "2022-03-28T08:30:00+04:00", "endDate": "2022-03-29T08:30:00+04:00" } ] } ] }}'



  curl --location --request POST 'https://oce.co.tools/api/batchjson/create' \
--header 'x-user-id: 5dfa41886908648d3b8b46f6' \
--header 'x-access-token: 0a81a0a5e5c89a6e2c25d8c275f0da5a' \
--header 'Content-Type: application/json' \
--data-raw '{
      "organizations": {\
        "_id": "5c793c4540bb4e2810fc7639",\
        "actions": [\
          {\
            "name": "test action orga",\
            "description": "test",\
            "startDate": "2022-03-20T08:30:00+04:00",\
            "endDate": "2022-03-26T08:30:00+04:00"\
          }\
        ],\
        "projects": [\
            {\
                "_id": "5ffd74b269086496048b45c6",\
                "actions": [\
                    {\
                        "name": "test action projets",\
                        "description": "test",\
                        "startDate": "2022-03-26T08:30:00+04:00",\
                        "endDate": "2022-03-27T08:30:00+04:00"\
                    }\
                ],\
                "events": [\
                    {\
                        "name": "test events",\
                        "type": "meeting",\
                        "description": "test",\
                        "startDate": "2022-02-02T08:30:00+04:00",\
                        "endDate": "2022-02-05T08:30:00+04:00",\
                        "actions": [\
                            {\
                                "name": "test action event min max credits",\
                                "description": "test",\
                                "startDate": "2022-02-02T08:30:00+04:00",\
                                "endDate": "2022-02-05T08:30:00+04:00",\
                                "min":3,\
                                "max":5,\
                                "credits": 20\
                            }\
                        ]\
                    }\
                ]\
            }\
        ]     \    
      }}'
*/
  
  
  /*    organizations: {
        _id: "5c793c4540bb4e2810fc7639",
        actions: [
          {
            name: "test action orga",
            description: "test",
            startDate: "2022-03-20T08:30:00+04:00",
            endDate: "2022-03-26T08:30:00+04:00"
          }
        ],
        projects: [
            {
                _id: "5ffd74b269086496048b45c6",
                actions: [
                    {
                        name: "test action projets",
                        description: "test",
                        startDate: "2022-03-21T08:30:00+04:00",
                        endDate: "2022-03-22T08:30:00+04:00"
                    }
                ],
                events: [
                    {
                        name: "test events",
                        type: "meeting",
                        description: "test",
                        startDate: "2022-03-24T08:30:00+04:00",
                        endDate: "2022-03-25T08:30:00+04:00",
                        actions: [
                            {
                                name: "test action event min max credits",
                                description: "test",
                                startDate: "2022-03-24T08:30:00+04:00",
                                endDate: "2022-03-25T08:30:00+04:00",
                                min:3,
                                max:5,
                                credits: 20
                                */
  /*
  // POST request using fetch()
 let response = await fetch("https://jsonplaceholder.typicode.com/posts", {
     
    // Adding method type
    method: "POST",
     
    // Adding body or contents to send
    body: JSON.stringify({
        title: "foo",
        body: "bar",
        userId: 1
    }),
     
    // Adding headers to the request
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
});
*/
 /*
  let response = await fetch("https://oce.co.tools/api/generatetokenrest", {
    method: "POST",
    redirect: "follow",

    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email: "", pwd: ""}    ) } )
  .catch(error => {
        console.error('There was an error!', error);
    });
  */
  // nous supposons que ce code s'exécute au niveau supérieur, dans un module
  

  let info = {};
  let data = {};
  data.organizations = { _id: "5c793c4540bb4e2810fc7639" };
  data.organizations.projects = [];
  data.organizations.projects[0] = { _id : "5ffd74b269086496048b45c6" };

  data.organizations.projects[0].events = [];
  data.organizations.projects[0].events[0] = {};
  data.organizations.projects[0].events[0].name = "test event";
  data.organizations.projects[0].events[0].type = "meeting";
  data.organizations.projects[0].events[0].description = "test";
  data.organizations.projects[0].events[0].startDate = "2022-04-28T08:30:00+04:00";
  data.organizations.projects[0].events[0].endDate = "2022-04-28T09:30:00+04:00";
  data.organizations.projects[0].events[0].actions = [];
  data.organizations.projects[0].events[0].actions[0] = {};
  data.organizations.projects[0].events[0].actions[0].name = "test p5";
  data.organizations.projects[0].events[0].actions[0].description = "test";
  data.organizations.projects[0].events[0].actions[0].startDate = "2022-03-28T08:30:00+04:00";
  data.organizations.projects[0].events[0].actions[0].endDate = "2022-03-29T09:30:00+04:00";
  data.organizations.projects[0].events[0].actions[0].min = 3;
  data.organizations.projects[0].events[0].actions[0].max = 5;
  data.organizations.projects[0].events[0].actions[0].credits = 4;

  info.user = inputEmail.value();
  info.passwd = inputPasswd.value();
  info.data = data;
  info = JSON.parse('{"user":"","passwd":"","data":{"organizations":{"_id":"5c793c4540bb4e2810fc7639","projects":[{"_id":"5ffd74b269086496048b45c6","events":[{"name":"Mise en action de C\'est Mon Patrimoine","type":"meeting","description":"Les réunions sont ouvertes à toutes et tous, quelque soit votre connaissance du sujet. Les comptes-rendus des réunions précédentes sont accessibles sur le site https://www.laraffinerie.re dans le pole correspondant","startDate":"2022-05-10T10:00:00+04:00","endDate":"2022-05-10T12:00:00+04:00","actions":[{"name":"Animer la réunion","description":"Permettre que la réunion se passe dans de bonnes conditions en facilitant la prise de parole de toustes","startDate":"2022-05-10T09:30:00+04:00","endDate":"2022-05-10T12:00:00+04:00","min":1,"max":2,"credits":3}]}]}]}}} ');
  console.log(info);
  //let response = await fetch("https://cors-anywhere.herokuapp.com/https://oce.co.tools/api/batchjson/create", {
    let response = await fetch("http://127.0.0.1:8000/oceco", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( info ) } )
  .catch(error => {
        console.error('There was an error!', error);
    });
    
    /*
      "organizations": {
        "_id": "5c793c4540bb4e2810fc7639",
        "actions": [
          {
            "name": "test action orga",
            "description": "test",
            "startDate": "2022-03-20T08:30:00+04:00",
            "endDate": "2022-03-26T08:30:00+04:00"
          }
        ],
        "projects": [
            {
                "_id": "5ffd74b269086496048b45c6",
                "actions": [
                    {
                        "name": "test action projets",
                        "description": "test",
                        "startDate": "2022-03-21T08:30:00+04:00",
                        "endDate": "2022-03-22T08:30:00+04:00"
                    }
                ],
                "events": [
                    {
                        "name": "test events",
                        "type": "meeting",
                        "description": "test",
                        "startDate": "2022-03-24T08:30:00+04:00",
                        "endDate": "2022-03-25T08:30:00+04:00",
                        "actions": [
                            {
                                "name": "test action event min max credits",
                                "description": "test",
                                "startDate": "2022-03-24T08:30:00+04:00",
                                "endDate": "2022-03-25T08:30:00+04:00",
                                "min":3,
                                "max":5,
                                "credits": 20
                            }
                        ]
                    }
                ]
            }
        ]         
      }
    })
  });
  */
  console.log(response);
  
  let result = await response.json();
  console.log(result);
  

}

function preload() {
   // f();

}

let inputEmail, inputPasswd, selectType, selectPole, button, inputDate;
function setup() {
  createCanvas(400, 400);
  
  inputEmail = createInput('', "email");
  inputEmail.position(0, 0);
  inputEmail.size(100);

  inputPasswd = createInput('', "password");
  inputPasswd.position(0, 30);
  inputPasswd.size(100);

  selectType = createSelect();
  selectType.position(10, 80);
  selectType.option('Chantier');
  selectType.option('Réunion');
  selectType.option('Soirée');
  selectType.option('Festival');
  selectType.option('Atelier');
  selectType.option('Formation');
  selectType.selected('Soirée');
  selectType.changed(selectTypeEvent);

  inputDate = createInput('', "datetime-local");
  inputDate.position(0, 110);
  inputDate.size(300);

  button = createButton('Creer event');
  button.position(0, 200);
  button.mousePressed(f);

  let data = {};
  data.organizations = { _id: "5c793c4540bb4e2810fc7639" };
  data.organizations.projects = [];
  data.organizations.projects[0] = { _id : "5ffd74b269086496048b45c6" };
  data.organizations.projects[0].actions = [];
  data.organizations.projects[0].actions[0] = {};
  data.organizations.projects[0].actions[0].name = "test p5";
  data.organizations.projects[0].actions[0].description = "test";
  data.organizations.projects[0].actions[0].startDate = "2022-03-21T08:30:00+04:00";
  data.organizations.projects[0].actions[0].endDate = "2022-03-22T08:30:00+04:00";
}

function selectTypeEvent() {
  background(220);

  let item = selectType.value();
console.log(inputDate.value());
  inputDate.value("2022-03-22T08:30")
}

function draw() {
// background(220);
}