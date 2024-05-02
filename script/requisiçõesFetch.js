//POST SchoolClass

const optionsSchoolClassPOST = {
  method: 'POST',
  headers: {'Content-Type': 'application/json', 'User-Agent': 'insomnia/9.0.0'},
  body: '{"school_class_grade":"6º A","school_class_year":2024}'
};

fetch('https://tabplusbackend.onrender.com/SchoolClass', optionsSchoolClassPOST)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));

//GET All SchoolClass
async function getAllSchoolClasses(){ 
  let output;
  const optionsSchoolClassGET = { method: 'GET', mode: 'no-cors', headers: { 'Access-Control-Allow-Origin': '*' } };
  fetch('https://tabplusbackend.onrender.com/SchoolClass', optionsSchoolClassGET)
    .then(response => response.json())
    .then(response => output = response)
  .catch(err => console.error(err));

  return output
}
//GET SchoolClass By Id

async function getSchoolClassById(id) {
  let output;
  const optionsSchoolClassGETByID = { method: 'GET', mode: 'no-cors', headers: { 'Access-Control-Allow-Origin': '*' } };
  fetch('https://tabplusbackend.onrender.com/SchoolClass/'+id, optionsSchoolClassGETByID)
    .then(response => response.json())
    .then(response => output = response)
    .catch(err => console.error(err));

    return output
  }

//------------------------------------------------------------------------------------------

//POST Student

const optionsStudentPOST = {
  method: 'POST',
  headers: {'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.6.1'},
  body: '{"student_name":"Aluno C","school_class_id":2}'
};

fetch('https://tabplusbackend.onrender.com/Student?=', optionsStudentPOST)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));

// GET All Student
async function getAllStudents(){
  const optionsStudentGET = { method: 'GET', mode: 'no-cors', headers: { 'Access-Control-Allow-Origin': '*' } };
  let output;
  fetch('https://tabplusbackend.onrender.com/Student', optionsStudentGET)
    .then(response => response.json())
    .then(response => output = response)
    .catch(err => console.error(err));

  return output
}
// GET Student By Id
async function getStudentById(id){
  const optionsStudentGETByID = { method: 'GET', mode: 'no-cors', headers: { 'Access-Control-Allow-Origin': '*' } };
  let output;
  fetch('https://tabplusbackend.onrender.com/Student/'+id, optionsStudentGETByID)
    .then(response => response.json())
    .then(response => output = response)
    .catch(err => console.error(err));

  return output
}
//------------------------------------------------------------------------------------------

//POST Turn

const optionsTurnPOST = {
  method: 'POST',
  headers: {'Content-Type': 'application/json', 'User-Agent': 'insomnia/9.0.0'},
  body: '{"student_id":3}'
};

fetch('https://tabplusbackend.onrender.com/Turn', optionsTurnPOST)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));

//GET All Turn
async function getAllTurns() {
  let output;
  const optionsTurnGET = { method: 'GET', mode: 'no-cors', headers: { 'Access-Control-Allow-Origin': '*' } };
  fetch('https://tabplusbackend.onrender.com/Turn', optionsTurnGET)
    .then(response => response.json())
    .then(response => output = response)
    .catch(err => console.error(err));

  return output
}
//GET Turn By Id
async function getTurnById(id) {
  let output;
  const optionsTurnGETByID = { method: 'GET', mode: 'no-cors', headers: { 'Access-Control-Allow-Origin': '*' } };
  fetch('https://tabplusbackend.onrender.com/Turn/'+id, optionsTurnGETByID)
    .then(response => response.json())
    .then(response => output = response)
    .catch(err => console.error(err));

  return output
}
//------------------------------------------------------------------------------------------

//POST Operation

const optionsOperationPOST = {
  method: 'POST',
  headers: {'Content-Type': 'application/json', 'User-Agent': 'insomnia/9.0.0'},
  body: '{"first_term":6,"second_term":6,"answer":36,"turn_id":3}'
};

fetch('https://tabplusbackend.onrender.com/Operation', optionsOperationPOST)
  .then(response => response.json())
  .then(response => console.log(response))  
  .catch(err => console.error(err));

//GET All Operation 
async function getAllOperation() {
  let output;
  const optionsOperationGET = { method: 'GET', mode: 'no-cors', headers: { 'Access-Control-Allow-Origin': '*' } };
  fetch('https://tabplusbackend.onrender.com/Operation', optionsOperationGET)
    .then(response => response.json())
    .then(response => output = response)
    .catch(err => console.error(err));

  return output
}
//GET Operation By Id
async function getOpertaionById(id) {
  let output;
  const optionsOperationGETByID = { method: 'GET', mode: 'no-cors', headers: { 'Access-Control-Allow-Origin': '*' } };
  fetch('https://tabplusbackend.onrender.com/Operation/'+id, optionsOperationGETByID)
    .then(response => response.json())
    .then(response => output = response)
    .catch(err => console.error(err));

  return output
}