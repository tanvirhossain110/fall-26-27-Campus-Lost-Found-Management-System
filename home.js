function loginUser() {
    let role = document.getElementById("role").value;
    let email = document.getElementById("email").value.trim().toLowerCase();
    let password = document.getElementById("password").value;
    let error = document.getElementById("loginError");

    if (role === "Admin") {
        if (email === "admin@campus.edu" && password === "Admin@123") {
            window.location.href = "admin-dashboard.html";
            return false;
        } else {
            error.innerHTML = "Invalid Admin email or password.";
            return false;
        }
    } else if (role === "Lost & Found Officer") {
        if (email === "officer@campus.edu" && password === "Officer@123") {
            window.location.href = "officer-dashboard.html";
            return false;
        } else {
            error.innerHTML = "Invalid Officer email or password.";
            return false;
        }
    } else {
        error.innerHTML = "Login is not available for this role yet.";
        return false;
    }
}
