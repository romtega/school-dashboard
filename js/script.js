"use strict";

/************** GLOBAL VARIABLES ***************/
const studentsList = document.querySelector("#students-list");
const studentForm = document.querySelector("#form-new");

const nameInput = document.querySelector("#name");
const lastNameInput = document.querySelector("#last-name");
const ageInput = document.querySelector("#age");
const genreInput = document.querySelector("#genre");
const idInput = document.querySelector("#id");
const coursesInput = document.querySelector("#courses");
const scoreInput = document.querySelector("#score");
const emailInput = document.querySelector("#email");
const imgPathInput = document.querySelector("#imgPath");

const addBtn = document.querySelector("#add-icon");
const closeBtn = document.querySelector("#close-icon");
const sectionForm = document.querySelector("#section-form");
const sectionInfo = document.querySelector("#dashboard-info");

const deleteIcon = `<ion-icon class="delete-icon" name="trash"></ion-icon>`;

const searchBar = document.querySelector("#search-bar");

/************** REUSABLE FUNCTIONS AND CLASSES ***************/

function openForm() {
  sectionForm.classList.remove("hidden");
}

function closeForm() {
  sectionForm.classList.add("hidden");

  nameInput.value = "";
  lastNameInput.value = "";
  ageInput.value = "";
  genreInput.value = "";
  emailInput.value = "";
  idInput.value = "";
  scoreInput.value = "";
  document
    .querySelectorAll('input[name="courses"]:checked')
    .forEach((checkbox) => {
      checkbox.checked = false;
    });
  // imgPathInput.value = "";
}

function createStudentRow(student) {
  const row = document.createElement("tr");
  const rowColor =
    studentsList.children.length % 2 === 0 ? "row-gray" : "row-white";
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

  img.src = student.imgPath || "/img/students/blank.png";
  img.alt = `${student.name} ${student.lastName}`;
  imgCell.appendChild(img);
  nameCell.textContent = student.name;
  lastNameCell.textContent = student.lastName;
  ageCell.textContent = student.age;
  idCell.textContent = student.id;
  coursesCell.textContent = student.courses.length;
  scoreCell.textContent = student.score;
  deleteCell.innerHTML = deleteIcon;

  row.appendChild(imgCell);
  row.appendChild(nameCell);
  row.appendChild(lastNameCell);
  row.appendChild(ageCell);
  row.appendChild(idCell);
  row.appendChild(coursesCell);
  row.appendChild(scoreCell);
  row.appendChild(deleteCell);

  return row;
}

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
    this.imgPath = imgPath;
  }
}

class Teachers {
  constructor(fullName, course, imgPath) {
    this.fullName = fullName;
    this.course = course;
    this.imgPath = imgPath;
  }
}

/************** BTNS FUNCTIONALITY ***************/

addBtn.addEventListener("click", () => {
  openForm();
});

closeBtn.addEventListener("click", () => {
  closeForm();
});

/************** STUDENT LIST FED FROM DATABASE ***************/

students.forEach((student) => {
  studentsList.appendChild(createStudentRow(student));
});

// /************** NEW STUDENT FORM ***************/

studentForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const nameValue = studentForm["name"].value;
  const lastNameValue = studentForm["last-name"].value;
  const ageValue = studentForm["age"].value;
  const genreValue = studentForm["genre"].value;
  const idValue = studentForm["id"].value;
  const scoreValue = studentForm["score"].value;
  const emailValue = studentForm["email"].value;
  const coursesValue = [];
  const courseCheckboxes = document.querySelectorAll(
    'input[name="courses"]:checked'
  );
  courseCheckboxes.forEach((checkbox) => {
    coursesValue.push(checkbox.value);
  });
  // const imgPathValue = studentForm["imgPath"].value;

  const newStudent = new Student(
    nameValue,
    lastNameValue,
    ageValue,
    genreValue,
    emailValue,
    idValue,
    coursesValue,
    scoreValue,
    ""
  );

  students.push(newStudent);

  studentsList.appendChild(createStudentRow(newStudent));
  closeForm();
});

// /************** DELETE STUDENT ***************/

studentsList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-icon")) {
    const row = e.target.closest("tr");
    if (row) {
      row.remove();
    }
  }
});

// /************** SORT FUNCTIONALITY ***************/
let sortDirection = "asc";

function sortStudents(sortProperty) {
  students.sort((a, b) => {
    const valueA = a[sortProperty];
    const valueB = b[sortProperty];

    if (sortDirection === "asc") {
      return valueA.localeCompare(valueB);
    } else {
      return valueB.localeCompare(valueA);
    }
  });

  updateStudentTable();
}

function updateStudentTable() {
  while (studentsList.firstChild) {
    studentsList.removeChild(studentsList.firstChild);
  }

  students.forEach((student) => {
    studentsList.appendChild(createStudentRow(student));
  });
}

const tableHeaders = document.querySelectorAll("thead th.sortable");
tableHeaders.forEach((header) => {
  header.addEventListener("click", (e) => {
    const sortProperty = header.getAttribute("data-sort");
    if (sortProperty) {
      sortDirection = sortDirection === "asc" ? "desc" : "asc";
      console.log("Sorting by:", sortProperty, "Direction:", sortDirection);
      sortStudents(sortProperty);
    }
  });
});

// /************** DASHBOARD INFO ***************/

studentsList.addEventListener("click", (e) => {
  sectionInfo.classList.remove("hidden");
  const clickedRow = e.target.closest("tr");
  if (clickedRow) {
    const studentId = clickedRow.querySelector("td:nth-child(5)").textContent;
    const student = students.find((s) => s.id === studentId);
    if (student) {
      updateDashboardInfo(student);
    }
  }
});

function updateDashboardInfo(student) {
  const infoFullName = document.querySelector("#info-full-name");
  const infoAge = document.querySelector("#info-age");
  const infoGenre = document.querySelector("#info-genre");
  const infoEmail = document.querySelector("#info-email");
  const infoCourses = document.querySelector("#info-courses");
  const studentImg = document.querySelector(".student-img img");

  infoFullName.textContent = `${student.name} ${student.lastName}`;
  infoAge.textContent = student.age;
  infoGenre.textContent = student.genre;
  infoEmail.innerHTML = `<a href="mailto:${student.email}">${student.email}</a>`;

  infoCourses.innerHTML = "";

  student.courses.forEach((courseName) => {
    const course = teachers.find((teacher) => teacher.course === courseName);
    if (course) {
      const courseElement = document.createElement("div");
      courseElement.classList.add("course");
      courseElement.innerHTML = `
        <span class="${course.course.toLowerCase()}">${course.course}</span>
        <p>${course.fullName}</p>
        <img src="${course.imgPath}" alt="" class="teacher-img" />
      `;
      infoCourses.appendChild(courseElement);
    }
  });

  studentImg.src = student.imgPath || "/img/students/blank.png";
  studentImg.alt = `${student.name} ${student.lastName}`;
}

// /************** SEARCHBAR ***************/

searchBar.addEventListener("input", function () {
  const searchText = this.value.trim().toLowerCase();
  const studentRows = document.querySelectorAll("#students-list tr");

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
