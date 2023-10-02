"use strict";

/************** REUSABLE FUNCTIONS ***************/

function closeForm() {
  sectionForm.classList.add("hidden");

  nameInput.value = "";
  lastNameInput.value = "";
  ageInput.value = "";
  genreInput.value = "";
  emailInput.value = "";
  idInput.value = "";
  coursesInput.value = "";
  scoreInput.value = "";
}

/************** BTNS FUNCTIONALITY ***************/

const addBtn = document.querySelector("#add-icon");
const closeBtn = document.querySelector("#close-icon");
const sectionForm = document.querySelector("#section-form");
const sectionInfo = document.querySelector("#dashboard-info");

addBtn.addEventListener("click", () => {
  sectionForm.classList.remove("hidden");
});

closeBtn.addEventListener("click", () => {
  closeForm();
});

/************** STUDENT LIST FED FROM DATABASE ***************/
const studentsList = document.querySelector("#students-list");

for (let i = 0; i < students.length; i++) {
  const row = document.createElement("tr");

  const imgCell = document.createElement("td");
  const img = document.createElement("img");
  const nameCell = document.createElement("td");
  const lastNameCell = document.createElement("td");
  const ageCell = document.createElement("td");
  const genreCell = document.createElement("td");
  const idCell = document.createElement("td");
  const coursesCell = document.createElement("td");
  const scoreCell = document.createElement("td");
  const emailCell = document.createElement("td");
  const deleteCell = document.createElement("td");

  img.src = students[i].imgPath;
  img.alt = `${students[i].name}`;
  imgCell.appendChild(img);
  nameCell.textContent = students[i].name;
  lastNameCell.textContent = students[i].lastName;
  ageCell.textContent = students[i].age;
  idCell.textContent = students[i].id;
  coursesCell.textContent = students[i].courses;
  scoreCell.textContent = students[i].score;

  row.appendChild(imgCell);
  row.appendChild(nameCell);
  row.appendChild(lastNameCell);
  row.appendChild(ageCell);
  row.appendChild(idCell);
  row.appendChild(coursesCell);
  row.appendChild(scoreCell);

  studentsList.appendChild(row);
}

/************** NEW STUDENT FORM ***************/

// const studentForm = document.querySelector("#form-new");
// const nameInput = studentForm["name"];
// const lastNameInput = studentForm["last-name"];
// const ageInput = studentForm["age"];
// const genreInput = studentForm["genre"];
// const emailInput = studentForm["email"];
// const idInput = studentForm["id"];
// const coursesInput = studentForm["courses"];
// const scoreInput = studentForm["score"];

// studentForm.addEventListener("submit", function (e) {
//   e.preventDefault();

// //   const student = new Student(
// //     nameInput,
// //     lastNameInput,
// //     ageInput,
// //     genreInput,
// //     emailInput,
// //     idInput,
// //     coursesInput,
// //     scoreInput
// //   );

// //   function addStudent(student) {
// //     document.createElement("tr").innerHTML = `
// //     <td>${student.name}</td>
// //     <td>${student.lastName}</td>
// //     <td>${student.age}</td>
// //     <td>${student.courses}</td>
// //     <td>${student.score}</td>
// //     `;
// //     studentsList.appendChild(document.createElement("tr"));
// //   }
// // });

/************** STUDENTS TABLE ***************/

// class Student {
//   constructor(name, lastName, age, genre, email, id, courses, score) {
//     this.name = name;
//     this.lastName = lastName;
//     this.age = age;
//     this.genre = genre;
//     this.email = email;
//     this.id = id;
//     this.courses = courses;
//     this.score = score;
//   }
// }
