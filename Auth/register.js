let storage = window.localStorage;
const form = document.getElementsByTagName("form");
const register_btn = document.getElementById("r_btn");
const userAdmin = {};

if (storage.getItem("userAdmin")) {
  register_btn.disabled = true;
  alert("Admin already registerd");
  window.location = "/index.html";
} else {
  register_btn.disabled = false;
}
/************
 * first time admin registration
 */
const validate = (e) => {
  e.preventDefault();
  let r_name = document.getElementById("r_name");
  let r_email = document.getElementById("r_email");
  let r_password = document.getElementById("r_password");
  let r_confirm_password = document.getElementById("r_confirm_password");
  let r_city = document.getElementById("r_city");
  let r_state = document.getElementById("r_state");
  if (
    r_password.value === r_confirm_password.value &&
    r_password.value != "" &&
    r_name.value != "" &&
    r_email.value != "" &&
    r_city.value != "" &&
    r_state.value != ""
  ) {
    userAdmin.name = r_name.value;
    userAdmin.password = r_password.value;
    userAdmin.email = r_email.value;
    userAdmin.city = r_city.value;
    userAdmin.state = r_state.value;
    storage.setItem("userAdmin", JSON.stringify(userAdmin));
    window.location = "login.html";
  } else {
    alert("Fill the Required Fillds correctlly!!!");
    e.preventDefault();
  }
};
register_btn.addEventListener("click", validate);
