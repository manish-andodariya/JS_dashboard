let session = window.sessionStorage;
let storage = window.localStorage;
/**************
 * displaing user name on top-left
 */
window.addEventListener("load", (e) => {
  if (session.getItem("object_Login")) {
    activeAdmin = JSON.parse(session.getItem("object_Login"));
    let user_display = document.querySelector(".user-display");
    user_display.innerHTML = "Hello " + activeAdmin.name;
    console.log(user_display);

    /***********
     * age card and birthday functions
     */

    if (storage.getItem("userlist")) {
      let current_date = new Date().toLocaleDateString();
      let current_year = new Date().getFullYear();
      console.log(current_date);
      console.log(current_year);
      let age1 = 0;
      let age2 = 0;
      let age3 = 0;
      let birthday;
      let listobj = JSON.parse(storage.getItem("userlist"));
      console.log(listobj);

      let birthdaycard = document.querySelector(".isbirthday");

      listobj.map((element) => {
        let userdob = new Date(element["birthdate"]);
        if (current_date == userdob.toLocaleDateString()) {
          birthdaycard.innerText = `it's ${element["name"]}'s birthday today!! :)`;
        }
        let age = current_date - userdob.getFullYear();
        if (age <= 18) {
          age1++;
        } else if (age > 18 && age < 50) {
          age2++;
        } else {
          age3++;
        }
      });
      let age1card = document.querySelector(".age1");
      let age2card = document.querySelector(".age2");
      let age3card = document.querySelector(".age3");
      age1card.innerText = age1 + " Users";
      age2card.innerText = age2 + " Users";
      age3card.innerText = age3 + " Users";
    }

    e.preventDefault();
  } else {
    alert("LogIn first please!!!");
    window.location = "/Auth/login.html";
  }
});
