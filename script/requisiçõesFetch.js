//POST SchoolClass

async function postSchoolClass(schoolClassGrade, schoolClassYear){
  let data = '{"school_class_grade":"'+schoolClassGrade+'","school_class_year":'+schoolClassYear+'}'
  const optionsSchoolClassPOST = {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    body: data
  };
  fetch('https://tabplusbackend.onrender.com/SchoolClass', optionsSchoolClassPOST)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
}
//GET All SchoolClass
async function getAllSchoolClasses(){ 
  const optionsSchoolClassGET = { method: 'GET', mode: 'cors', headers: { 'Access-Control-Allow-Origin': '*' } };
  fetch('https://tabplusbackend.onrender.com/SchoolClass', optionsSchoolClassGET)
    .then(response => response.json())
    .then(response => console.log(response))
  .catch(err => console.error(err));
}
//GET SchoolClass By Id

async function getSchoolClassById(id){  
  const optionsSchoolClassGETByID = { method: 'GET', mode: 'cors', headers: { 'Access-Control-Allow-Origin': '*' } };

  fetch('https://tabplusbackend.onrender.com/SchoolClass/'+id, optionsSchoolClassGETByID)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
  }

//------------------------------------------------------------------------------------------

//POST Student
async function postStudent(studentName, schoolClassId){
  let data = '{"student_name":"'+studentName+'","school_class_id":'+schoolClassId+'}'
  const optionsStudentPOST = {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    body: data
  };
  fetch('https://tabplusbackend.onrender.com/Student?=', optionsStudentPOST)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
}
// GET All Student
async function getAllStudents(){
  const optionsStudentGET = { method: 'GET', mode: 'cors', headers: { 'Access-Control-Allow-Origin': '*' } };
  fetch('https://tabplusbackend.onrender.com/Student', optionsStudentGET)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
}
// GET Student By Id
async function getStudentById(id){
  const optionsStudentGETByID = { method: 'GET', mode: 'cors', headers: { 'Access-Control-Allow-Origin': '*' } };
  fetch('https://tabplusbackend.onrender.com/Student/'+id, optionsStudentGETByID)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
}
//------------------------------------------------------------------------------------------

//POST Turn
async function PostTurn(studentId){
  let data = '{"student_id":'+studentId+'}'
  const optionsTurnPOST = {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    body: data
  };
  fetch('https://tabplusbackend.onrender.com/Turn', optionsTurnPOST)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
}
//GET All Turn
async function getAllTurns(){
  const optionsTurnGET = { method: 'GET', mode: 'cors', headers: { 'Access-Control-Allow-Origin': '*' } };

  fetch('https://tabplusbackend.onrender.com/Turn', optionsTurnGET)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
}
//GET Turn By Id
async function getTurnById(id){
  const optionsTurnGETByID = { method: 'GET', mode: 'cors', headers: { 'Access-Control-Allow-Origin': '*' } };

  fetch('https://tabplusbackend.onrender.com/Turn/'+id, optionsTurnGETByID)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
}
//------------------------------------------------------------------------------------------

//POST Operation
async function postOperation(firstTerm, secondTerm, answer, turnId){
  let data = '{"first_term":'+firstTerm+',"second_term":'+secondTerm+',"answer":'+answer+',"turn_id":'+turnId+'}'
  const optionsOperationPOST = {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    body: data
  };
  fetch('https://tabplusbackend.onrender.com/Operation', optionsOperationPOST)
    .then(response => response.json())
    .then(response => console.log(response))  
    .catch(err => console.error(err));
}
//GET All Operation 
async function getAllOperation(){
  const optionsOperationGET = { method: 'GET', mode: 'cors', headers: { 'Access-Control-Allow-Origin': '*' } };

  fetch('https://tabplusbackend.onrender.com/Operation', optionsOperationGET)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
}
//GET Operation By Id
async function getOpertaionById(id){
  const optionsOperationGETByID = { method: 'GET', mode: 'cors', headers: { 'Access-Control-Allow-Origin': '*' } };

  fetch('https://tabplusbackend.onrender.com/Operation/'+id, optionsOperationGETByID)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
}