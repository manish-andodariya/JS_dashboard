let session = window.sessionStorage;

/****************
 * user name and bitthday function on user
 */
window.addEventListener("load", (e) => {
  if (session.getItem("object_Login")) {
    activeUser = JSON.parse(session.getItem("object_Login"));
    let user_display = document.querySelector(".user-display");
    let birthdaydiv = document.querySelector(".birthday");
    let currentdate = new Date().toLocaleDateString();
    if (currentdate == new Date(activeUser["birthdate"]).toLocaleDateString()) {
      birthdaydiv.innerHTML = "Happy birthday!!!";
    } else {
      birthdaydiv.innerHTML = "Birthday comming soon";
    }
    user_display.innerHTML = "Hello " + activeUser.name;
    console.log(user_display);
    e.preventDefault();
  } else {
    alert("LogIn first please!!!");
    window.location = "/Auth/login.html";
  }
});
