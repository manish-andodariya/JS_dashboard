let storage = window.localStorage;
let session = window.sessionStorage;

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
      let listobj = JSON.parse(storage.getItem("sessions"));
      console.log(listobj);

      //creating table from arrey of fetched userlist
      listobj.map((element, key) => {
        userlistemem.innerHTML += `<tr>
            <td>${element["name"].toString()}</td>
            <td>${element["loginTime"]}</td>
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
