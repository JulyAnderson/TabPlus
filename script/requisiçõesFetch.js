
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

const optionsSchoolClassGET = {method: 'GET', headers: {'User-Agent': 'insomnia/9.0.0'}};

fetch('https://tabplusbackend.onrender.com/SchoolClass', optionsSchoolClassGET)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));

//GET SchoolClass By Id

const optionsSchoolClassGETByID = {method: 'GET', headers: {'User-Agent': 'insomnia/9.0.0'}};

fetch('https://tabplusbackend.onrender.com/SchoolClass/1', optionsSchoolClassGETByID)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));

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

const optionsStudentGET = {method: 'GET', headers: {'User-Agent': 'insomnia/8.6.1'}};

fetch('https://tabplusbackend.onrender.com/Student', optionsStudentGET)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));

// GET Student By Id

const optionsStudentGETByID = {method: 'GET', headers: {'User-Agent': 'insomnia/9.0.0'}};

fetch('https://tabplusbackend.onrender.com/Student/1', optionsStudentGETByID)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));

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

const optionsTurnGET = {method: 'GET', headers: {'User-Agent': 'insomnia/9.0.0'}};

fetch('https://tabplusbackend.onrender.com/Turn', optionsTurnGET)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));

//GET Turn By Id

const optionsTurnGETByID = {method: 'GET', headers: {'User-Agent': 'insomnia/9.0.0'}};

fetch('https://tabplusbackend.onrender.com/Turn/1', optionsTurnGETByID)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));

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

const optionsOperationGET = {method: 'GET', headers: {'User-Agent': 'insomnia/9.0.0'}};

fetch('https://tabplusbackend.onrender.com/Operation', optionsOperationGET)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));

//GET Operation By Id

const optionsOperationGETByID = {method: 'GET', headers: {'User-Agent': 'insomnia/9.0.0'}};

fetch('https://tabplusbackend.onrender.com/Operation/1', optionsOperationGETByID)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));