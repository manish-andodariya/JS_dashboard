let storage = window.localStorage;
let session = window.sessionStorage;
const form = document.getElementsByTagName("form");
const login_btn = document.getElementById("l_btn");
const userAdmin = {};
const userSimple = {};

/************
 * Admin login
 */

const validate = (e) => {
  let l_email = document.getElementById("l_email");
  let l_password = document.getElementById("l_password");
  let isUser = false;
  if (l_password.value != "" && l_email.value != "") {
    if (storage.getItem("userAdmin")) {
      let dataAdmin = JSON.parse(storage.getItem("userAdmin"));
      if (
        dataAdmin.email == l_email.value &&
        dataAdmin.password == l_password.value
      ) {
        session.setItem("object_Login", JSON.stringify(dataAdmin));
        isUser = true;
        window.location = "/Dashboard/dashboard.html";
      } else if (storage.getItem("userlist")) {
        let datauser = JSON.parse(storage.getItem("userlist"));
        datauser.forEach((element, key) => {
          if (
            element.email == l_email.value &&
            element.password == l_password.value
          ) {
            session.setItem("object_Login", JSON.stringify(element));

            /*********
             * setting sessions of user
             */
            var username = element.name;
            var loginTime = new Date().toGMTString();
            var arrobj = [];
            if (storage.getItem("sessions")) {
              console.log(storage.getItem("sessions"));
              arrobj = JSON.parse(storage.getItem("sessions"));
              console.log(arrobj);
              arrobj.push({ name: username, loginTime: loginTime });
              console.log(arrobj);
              storage.setItem("sessions", JSON.stringify(arrobj));
            } else {
              arrobj.push({ name: username, loginTime: loginTime });
              console.log(arrobj);
              storage.setItem("sessions", JSON.stringify(arrobj));
            }
            isUser = true;
            window.location = "/Dashboard/sub-user.html";
          }
        });
      } else {
        isUser = false;
      }
    } else {
      isUser = false;
    }
  } else {
    alert("please fill the fields!!!");
  }
  if (!isUser) alert("User not found or invalid credentiels!!");
  e.preventDefault();
};

login_btn.addEventListener("click", validate);
