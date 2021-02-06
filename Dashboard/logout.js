/**************
 * Logout function
 */
let logoutbtn = document.querySelector(".logout");
logoutbtn.addEventListener("click", (e) => {
  session.removeItem("object_Login");
  alert("Logged out successfully");
  window.location = "/Auth/login.html";
  e.preventDefault();
});
