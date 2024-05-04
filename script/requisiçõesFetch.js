const BASE_URL = "https://tabplusbackend.onrender.com";

// POST SchoolClass
async function postSchoolClass(schoolClassGrade, schoolClassYear) {
  let data = {
    school_class_grade: schoolClassGrade,
    school_class_year: schoolClassYear,
  };

  const optionsSchoolClassPOST = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data), // - Convertido em uma JSON String
  };

  return fetch(`${BASE_URL}/SchoolClass`, optionsSchoolClassPOST)
    .then(async (response) => await response.json())
    .catch((err) => console.error(err));
}

// GET All SchoolClass
async function getAllSchoolClasses() {
  const optionsSchoolClassGET = { method: "GET" };

  return fetch(`${BASE_URL}/SchoolClass`, optionsSchoolClassGET)
    .then(async (response) => await response.json())
    .catch((err) => console.error(err));
}

// GET SchoolClass By Id
async function getSchoolClassById(id) {
  const optionsSchoolClassGETByID = { method: "GET" };

  return fetch(`${BASE_URL}/SchoolClass/${id}`, optionsSchoolClassGETByID)
    .then(async (response) => await response.json())
    .catch((err) => console.error(err));
}

//------------------------------------------------------------------------------------------

// POST Student
async function postStudent(studentName, schoolClassId) {
  let data = {
    student_name: studentName,
    school_class_id: schoolClassId,
  };

  const optionsStudentPOST = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data), // - Convertido em uma JSON String
  };

  return fetch(`${BASE_URL}/Student`, optionsStudentPOST)
    .then(async (response) => await response.json())
    .catch((err) => console.error(err));
}

// GET All Student
async function getAllStudents() {
  const optionsStudentGET = { method: "GET" };

  return fetch(`${BASE_URL}/Student`, optionsStudentGET)
    .then(async (response) => await response.json())
    .catch((err) => console.error(err));
}

// GET Student By Id
async function getStudentById(id) {
  const optionsStudentGETByID = { method: "GET" };

  return fetch(`${BASE_URL}/Student/${id}`, optionsStudentGETByID)
    .then(async (response) => await response.json())
    .catch((err) => console.error(err));
}

//------------------------------------------------------------------------------------------

// POST Turn
async function PostTurn(studentId) {
  let data = { student_id: studentId };

  const optionsTurnPOST = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data), // - Convertido em uma JSON String
  };

  return fetch(`${BASE_URL}/Turn`, optionsTurnPOST)
    .then(async (response) => await response.json())
    .catch((err) => console.error(err));
}

// GET All Turn
async function getAllTurns() {
  const optionsTurnGET = { method: "GET" };

  return fetch(`${BASE_URL}/Turn`, optionsTurnGET)
    .then(async (response) => await response.json())
    .catch((err) => console.error(err));
}

// GET Turn By Id
async function getTurnById(id) {
  const optionsTurnGETByID = { method: "GET" };

  return fetch(`${BASE_URL}/Turn/${id}`, optionsTurnGETByID)
    .then(async (response) => await response.json())
    .catch((err) => console.error(err));
}
//------------------------------------------------------------------------------------------

// POST Operation
async function postOperation(firstTerm, secondTerm, answer, turnId) {
  let data = {
    first_term: firstTerm,
    second_term: secondTerm,
    answer: answer,
    turn_id: turnId,
  };

  const optionsOperationPOST = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  return fetch(`${BASE_URL}/Operation`, optionsOperationPOST)
    .then(async (response) => await response.json())
    .catch((err) => console.error(err));
}

// GET All Operation
async function getAllOperation() {
  const optionsOperationGET = { method: "GET" };

  return fetch(`${BASE_URL}/Operation`, optionsOperationGET)
    .then(async (response) => await response.json())
    .catch((err) => console.error(err));
}

// GET Operation By Id
async function getOpertaionById(id) {
  const optionsOperationGETByID = { method: "GET" };

  return fetch(`${BASE_URL}/Operation/${id}`, optionsOperationGETByID)
    .then(async (response) => await response.json())
    .catch((err) => console.error(err));