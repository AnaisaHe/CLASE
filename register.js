// Constructor para crear estudiantes
function Student(name, age, g1, g2) {
    this.name = name;
    this.age = age;
    this.g1 = g1;
    this.g2 = g2;
}

// Obtener los elementos del HTML
const inputName = document.getElementById("txtName");
const inputAge = document.getElementById("txtAge");
const inputG1 = document.getElementById("txtGrade1");
const inputG2 = document.getElementById("txtGrade2");
const list = document.getElementById("list");

// Obtener estudiantes guardados o inicializar arreglo vacío
let students = JSON.parse(localStorage.getItem("students")) || [];

// Función para registrar un estudiante
function register() {
    if (inputName.value === "") {
        alert("Ingresa el nombre");
        return;
    }

    // Crear nuevo estudiante
    let newStudent = new Student(inputName.value, inputAge.value, inputG1.value, inputG2.value);
    
    // Agregarlo al arreglo
    students.push(newStudent);

    // Guardar en localStorage
    localStorage.setItem("students", JSON.stringify(students));

    // Mostrar en pantalla
    displayStudents();

    // Limpiar formulario
    inputName.value = "";
    inputAge.value = "";
    inputG1.value = "";
    inputG2.value = "";
}

// Función para mostrar los estudiantes
function displayStudents() {
    list.innerHTML = ""; // Limpiar la lista antes de actualizar

    students.forEach((student, index) => {
        let studentElement = `
        <div>
            <p>${student.name} - ${student.age} años</p>
            <button class="btn btn-warning" onclick="deleteStudent(${index})">Eliminar</button>
        </div>
        `;
        list.innerHTML += studentElement;
    });
}

// Función para eliminar un estudiante
function deleteStudent(index) {
    students.splice(index, 1); // Eliminar el estudiante del arreglo
    localStorage.setItem("students", JSON.stringify(students)); // Actualizar localStorage
    displayStudents(); // Refrescar la pantalla
}

// Función para borrar todos los estudiantes
function clearStorage() {
    localStorage.removeItem("students"); // Eliminar del almacenamiento
    students = []; // Vaciar la lista en memoria
    displayStudents(); // Actualizar la vista
}

// Mostrar los estudiantes almacenados al cargar la página
document.addEventListener("DOMContentLoaded", displayStudents);
