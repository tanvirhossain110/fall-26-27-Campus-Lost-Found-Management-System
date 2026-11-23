
let registeredUsers = [];


// Show Registration Form

function showRegister() {

    document.getElementById("loginSection").style.display = "none";

    document.getElementById("registerSection").style.display = "block";

    document.getElementById("registerError").innerHTML = "";

}


// Show Login Form

function showLogin() {

    document.getElementById("registerSection").style.display = "none";

    document.getElementById("loginSection").style.display = "block";

}


// Register New User

function registerUser() {

    let role = document.getElementById("registerRole").value;

    let name = document.getElementById("registerName").value.trim();

    let id = document.getElementById("registerId").value.trim();

    let email = document.getElementById("registerEmail").value.trim();

    let password = document.getElementById("registerPassword").value;

    let confirmPassword = document.getElementById("confirmPassword").value;

    let terms = document.getElementById("agreeTerms").checked;


    // Check Required Information

    if (role === "" || name === "" || id === "" || email === "" || password === "" || confirmPassword === "") {

        document.getElementById("registerError").innerHTML = "Please fill all required fields.";

        return false;

    }


    // Name Validation

    if (name.length < 3) {

        document.getElementById("registerError").innerHTML = "Name must contain at least 3 characters.";

        return false;

    }


    // ID Validation

    if (id.length < 3) {

        document.getElementById("registerError").innerHTML = "Please enter a valid ID.";

        return false;

    }


    // Password Validation

    if (password.length < 6) {

        document.getElementById("registerError").innerHTML = "Password must contain at least 6 characters.";

        return false;

    }


    // Confirm Password Validation

    if (password !== confirmPassword) {

        document.getElementById("registerError").innerHTML = "Password and Confirm Password do not match.";

        return false;

    }


    // Terms Validation

    if (!terms) {

        document.getElementById("registerError").innerHTML = "Please accept the Terms and Conditions.";

        return false;

    }


    // Check Duplicate ID and Email

    for (let i = 0; i < registeredUsers.length; i++) {

        if (registeredUsers[i].id.toLowerCase() === id.toLowerCase()) {

            document.getElementById("registerError").innerHTML = "This ID is already registered.";

            return false;

        }

        if (registeredUsers[i].email.toLowerCase() === email.toLowerCase()) {

            document.getElementById("registerError").innerHTML = "This email is already registered.";

            return false;

        }

    }


    // Save New User

    registeredUsers.push({

        role: role,
        name: name,
        id: id,
        email: email,
        password: password

    });


    // Registration Complete

    document.getElementById("registerForm").reset();

    showLogin();

    document.getElementById("loginError").innerHTML = "Registration completed successfully. You can now login.";

    return false;

}


// Login User

function loginUser() {

    let role = document.getElementById("role").value;

    let email = document.getElementById("email").value.trim();

    let password = document.getElementById("password").value;


    // Check Admin Login

    if (role === "Admin" &&
        email.toLowerCase() === "admin@campus.edu" &&
        password === "Admin@123") {

        window.location.href = "admin-dashboard.html";

        return false;

    }

    if (role === "Claim Verification Officer" &&
        email.toLowerCase() === "clame-officer@campus.edu" &&
        password === "clame-officer@123") {

        window.location.href = "Dashbord.html";

        return false;

    }



    // Check Officer Login

    if (role === "Lost & Found Officer" &&
        email.toLowerCase() === "officer@campus.edu" &&
        password === "Officer@123") {

        window.location.href = "officer-dashboard.html";

        return false;

    }


    // Check Registered Users

    for (let i = 0; i < registeredUsers.length; i++) {

        if (
            registeredUsers[i].email.toLowerCase() === email.toLowerCase() &&
            registeredUsers[i].password === password &&
            registeredUsers[i].role === role
        ) {

            if (role === "Admin") {

                window.location.href = "admin-dashboard.html";

            }

            else if (role === "Lost & Found Officer") {

                window.location.href = "officer-dashboard.html";

            }

            else {

                document.getElementById("loginError").innerHTML =
                    "Your role's dashboard is not available yet.";

            }

            return false;

        }

    }


    // Invalid Login

    document.getElementById("loginError").innerHTML =
        "Invalid role, email or password.";

    return false;

}
