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
  const rowColor = i % 2 === 0 ? "row-gray" : "row-white";
  row.classList.add(rowColor);

  const imgCell = document.createElement("td");
  const img = document.createElement("img");
  const nameCell = document.createElement("td");
  const lastNameCell = document.createElement("td");
  const ageCell = document.createElement("td");
  const idCell = document.createElement("td");
  const coursesCell = document.createElement("td");
  const scoreCell = document.createElement("td");
  const deleteCell = document.createElement("td");

  img.src = students[i].imgPath || "";
  img.alt = `${students[i].name} ${students[i].lastName}`;
  imgCell.appendChild(img);
  nameCell.textContent = students[i].name;
  lastNameCell.textContent = students[i].lastName;
  ageCell.textContent = students[i].age;
  idCell.textContent = students[i].id;
  coursesCell.textContent = students[i].courses;
  scoreCell.textContent = students[i].score;
  deleteCell.innerHTML = `<ion-icon class="delete-icon" name="trash"></ion-icon
  >`;

  row.appendChild(imgCell);
  row.appendChild(nameCell);
  row.appendChild(lastNameCell);
  row.appendChild(ageCell);
  row.appendChild(idCell);
  row.appendChild(coursesCell);
  row.appendChild(scoreCell);
  row.appendChild(deleteCell);

  studentsList.appendChild(row);
}

/************** SEARCHBAR ***************/

const searchBar = document.querySelector("#searchBar");
const studentRows = document.querySelectorAll("#students-list tr");

searchBar.addEventListener("input", function () {
  const searchText = this.value.trim().toLowerCase();

  studentRows.forEach((row) => {
    const nameCell = row.querySelector("td:nth-child(2)");
    const lastNameCell = row.querySelector("td:nth-child(3)");
    if (nameCell || lastNameCell) {
      const studentName = nameCell.textContent.toLowerCase();
      const studentLastName = lastNameCell.textContent.toLocaleLowerCase();
      if (
        studentName.includes(searchText) ||
        studentLastName.includes(searchText)
      ) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    }
  });
});

/************** NEW STUDENT FORM ***************/

class Student {
  constructor(name, lastName, age, genre, email, id, courses, score, imgPath) {
    this.name = name;
    this.lastName = lastName;
    this.age = age;
    this.genre = genre;
    this.id = id;
    this.courses = courses;
    this.score = score;
    this.email = email;
    this.imgPath = imgPath || "";
  }
}

const studentForm = document.querySelector("#form-new");

studentForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const nameInput = studentForm["name"].value;
  const lastNameInput = studentForm["last-name"].value;
  const ageInput = studentForm["age"].value;
  const genreInput = studentForm["genre"].value;
  const idInput = studentForm["id"].value;
  const coursesInput = studentForm["courses"].value;
  const scoreInput = studentForm["score"].value;
  const emailInput = studentForm["email"].value;
  const imgPathInput = studentForm["imgPath"].value;

  const newStudent = new Student(
    nameInput,
    lastNameInput,
    ageInput,
    genreInput,
    emailInput,
    idInput,
    coursesInput,
    scoreInput,
    imgPathInput
  );

  students.push(newStudent);

  const row = document.createElement("tr");
  const rowColor = students.length % 2 === 0 ? "row-gray" : "row-white";
  row.classList.add(rowColor);

  const imgCell = document.createElement("td");
  const img = document.createElement("img");
  const nameCell = document.createElement("td");
  const lastNameCell = document.createElement("td");
  const ageCell = document.createElement("td");
  const idCell = document.createElement("td");
  const coursesCell = document.createElement("td");
  const scoreCell = document.createElement("td");
  const deleteCell = document.createElement("td");

  img.src = newStudent.imgPath || "";
  img.alt = `${newStudent.name} ${newStudent.lastName}`;
  imgCell.appendChild(img);
  nameCell.textContent = newStudent.name;
  lastNameCell.textContent = newStudent.lastName;
  ageCell.textContent = newStudent.age;
  idCell.textContent = newStudent.id;
  coursesCell.textContent = newStudent.courses;
  scoreCell.textContent = newStudent.score;
  deleteCell.innerHTML = `<ion-icon class="delete-icon" name="trash"></ion-icon
  >`;

  row.appendChild(imgCell);
  row.appendChild(nameCell);
  row.appendChild(lastNameCell);
  row.appendChild(ageCell);
  row.appendChild(idCell);
  row.appendChild(coursesCell);
  row.appendChild(scoreCell);
  row.appendChild(deleteCell);

  studentsList.appendChild(row);

  closeForm();
});
