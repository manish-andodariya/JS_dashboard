const form = document.getElementsByTagName("form");
const add_btn = document.querySelector(".adduser");
console.log(add_btn);
let storage = window.localStorage;
let session = window.sessionStorage;

/*********
 * Adding users
 */
const validate = (e) => {
  const usersList = {};
  let name = document.getElementById("name");
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  let dob = document.getElementById("date");
  if (
    name.value != "" &&
    email.value != "" &&
    password.value != "" &&
    dob.value != ""
  ) {
    usersList.name = name.value;
    usersList.email = email.value;
    usersList.password = password.value;
    usersList.birthdate = dob.value;
    console.log(usersList);
    var arrobj = [];
    if (storage.getItem("userlist")) {
      console.log(storage.getItem("userlist"));
      arrobj = JSON.parse(storage.getItem("userlist"));
      console.log(arrobj);
      arrobj.push(usersList);
      console.log(arrobj);
      localStorage.setItem("userlist", JSON.stringify(arrobj));
      alert("user Added successfully");
    } else {
      arrobj.push(usersList);
      console.log(arrobj);
      localStorage.setItem("userlist", JSON.stringify(arrobj));
      alert("user Added successfully");
    }
    window.location.reload();
    e.preventDefault();
  } else {
    alert("please fill the fields!!!");
  }
  e.preventDefault();
};

add_btn.addEventListener("click", validate);

/**************
 * validating user session and updating table if data available in localstorage
 */
window.addEventListener("load", (e) => {
  if (session.getItem("object_Login")) {
    activeAdmin = JSON.parse(session.getItem("object_Login"));
    let user_display = document.querySelector(".user-display");
    user_display.innerHTML = "Hello " + activeAdmin.name;
    console.log(user_display);
    if (storage.getItem("userlist")) {
      let userlistemem = document.querySelector("table");
      console.log(userlistemem);
      let listobj = JSON.parse(storage.getItem("userlist"));
      console.log(listobj);

      //creating table from arrey of fetched userlist
      listobj.map((element, key) => {
        userlistemem.innerHTML += `<tr>
          <td>${element["name"].toString()}</td>
          <td>${element["email"]}</td>
          <td>${element["password"]}</td>
          <td>${
            new Date().getFullYear() -
            new Date(element["birthdate"]).getFullYear()
          }</td>
          <td>${new Date(element["birthdate"]).toLocaleDateString()}</td>
          <td><a href="#" onclick="edituser(${key});">Edit</a>/<a href="#" onclick="deleteuser(${key});">Delete</a></td>
          </tr>`;
      });
    } else {
      let userlistemem = document.querySelector("table");
      userlistemem.innerHTML = `<tr>
      <td>No user Detected</td>
      </tr>`;
    }
    e.preventDefault();
  } else {
    alert("LogIn first please!!!");
    window.location = "/Auth/login.html";
  }
});

/*************
 * deleting user from table and sessionstorage
 */
const deleteuser = (userKey) => {
  if (storage.getItem("userlist")) {
    let listobj = JSON.parse(storage.getItem("userlist"));
    listobj = listobj.filter((elem, key) => key != userKey);
    console.log(listobj);
    storage.setItem("userlist", JSON.stringify(listobj));
    alert("deleted");
    window.location.reload();
  }
};

/***************
 * edit users
 */
const update = (elem) => {
  const usersList = {};
  let name = document.getElementById("name");
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  let dob = document.getElementById("date");
  alert("problem with this function || Doing work on this");
  window.location.reload();
  e.preventDefault();
};

const edituser = (userKey) => {
  if (storage.getItem("userlist")) {
    let listobj = JSON.parse(storage.getItem("userlist"));
    let elemToEdit;
    listobj = listobj.map((elem, key) => {
      if (key == userKey) {
        elemToEdit = elem;
        return;
      }
    });
    console.log(elemToEdit);
    document.getElementById("name").value = elemToEdit.name;
    document.getElementById("email").value = elemToEdit.email;
    document.getElementById("password").value = elemToEdit.password;
    document.getElementById("date").value = elemToEdit.birthdate;
    add_btn.value = "Update";
    add_btn.className = "update";
    add_btn.onclick = update(elemToEdit);
  }
};
