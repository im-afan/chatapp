function getUsername() {
  var username = document.getElementById("username").value;
  alert("Hello, " + username + "!");
}

document.getElementById("saveUN").addEventListener("click", getUsername);
