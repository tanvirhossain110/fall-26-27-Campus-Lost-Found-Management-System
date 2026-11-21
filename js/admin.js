
let adminPassword = "Admin@123";

let users = [
    {id:"U001", name:"Rahim Ahmed", email:"rahim@gmail.com", studentid:"24-10001-1", role:"Student", status:"Active"},
    {id:"U002", name:"Karim Hasan", email:"karim@gmail.com", studentid:"24-10002-1", role:"Faculty", status:"Active"}
];

let categories = [
    {id:"C001", name:"Electronics", description:"Electronic devices"},
    {id:"C002", name:"Documents", description:"Cards and documents"},
    {id:"C003", name:"Personal Items", description:"Personal belongings"}
];

let roles = [
    {id:"R001", name:"Student", description:"Can report and claim items"},
    {id:"R002", name:"Lost & Found Officer", description:"Manages found items"}
];

let locations = [
    {id:"L001", name:"Library", building:"Main Building", floor:"1"},
    {id:"L002", name:"Cafeteria", building:"Food Court", floor:"Ground"}
];

let editIndex = -1;


// Show Message

function showMessage(id, message) {
    let element = document.getElementById(id);

    if (element) {
        element.innerHTML = message;
    }
}


// Search Table

function searchTable(inputId, tableId) {
    let input = document.getElementById(inputId);
    let table = document.getElementById(tableId);

    if (!input || !table) {
        return;
    }

    let filter = input.value.toLowerCase();
    let rows = table.getElementsByTagName("tr");

    for (let i = 1; i < rows.length; i++) {
        rows[i].style.display =
            rows[i].innerHTML.toLowerCase().indexOf(filter) > -1 ? "" : "none";
    }
}


// Check Terms

function checkTerms() {
    let terms = document.getElementById("terms");
    let register = document.getElementById("register");

    if (terms && register) {
        register.disabled = !terms.checked;
    }
}


// Add and Update User

function addUser() {
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let studentid = document.getElementById("studentid").value.trim();
    let role = document.getElementById("role").value;
    let terms = document.getElementById("terms").checked;

    if (name === "" || email === "" || studentid === "") {
        showMessage("error", "Please fill all required fields.");
        return false;
    }

    if (!terms) {
        showMessage("error", "Please accept the terms and conditions.");
        return false;
    }

    if (editIndex === -1) {
        users.push({
            id: "U00" + (users.length + 1),
            name: name,
            email: email,
            studentid: studentid,
            role: role,
            status: "Active"
        });
    }
    else {
        users[editIndex].name = name;
        users[editIndex].email = email;
        users[editIndex].studentid = studentid;
        users[editIndex].role = role;

        editIndex = -1;
    }

    document.getElementById("userForm").reset();

    checkTerms();
    renderUsers();

    showMessage("error", "User saved successfully.");

    return false;
}


// Display Users

function renderUsers() {
    let body = document.getElementById("userRows");

    if (!body) {
        return;
    }

    body.innerHTML = "";

    for (let i = 0; i < users.length; i++) {
        body.innerHTML +=
            "<tr>" +
            "<td>" + users[i].id + "</td>" +
            "<td>" + users[i].name + "</td>" +
            "<td>" + users[i].email + "</td>" +
            "<td>" + users[i].studentid + "</td>" +
            "<td>" + users[i].role + "</td>" +
            "<td>" + users[i].status + "</td>" +
            "<td>" +
            "<button onclick='editUser(" + i + ")'>Edit</button>" +
            "<button onclick='deleteUser(" + i + ")'>Delete</button>" +
            "</td>" +
            "</tr>";
    }
}


// Edit User

function editUser(i) {
    document.getElementById("name").value = users[i].name;
    document.getElementById("email").value = users[i].email;
    document.getElementById("studentid").value = users[i].studentid;
    document.getElementById("role").value = users[i].role;

    editIndex = i;

    document.getElementById("terms").checked = true;
    checkTerms();

    showMessage("error", "You are editing User ID: " + users[i].id);
}


// Delete User

function deleteUser(i) {
    users.splice(i, 1);

    if (editIndex === i) {
        editIndex = -1;
        document.getElementById("userForm").reset();
        checkTerms();
    }
    else if (editIndex > i) {
        editIndex--;
    }

    renderUsers();

    showMessage("error", "User deleted successfully.");
}


// Add Category

function addCategory() {
    let name = document.getElementById("categoryname").value.trim();
    let description = document.getElementById("description").value;

    if (name === "") {
        showMessage("error", "Enter category name.");
        return false;
    }

    if (editIndex === -1) {
        categories.push({
            id: "C00" + (categories.length + 1),
            name: name,
            description: description
        });
    }
    else {
        categories[editIndex].name = name;
        categories[editIndex].description = description;
        editIndex = -1;
    }

    document.getElementById("categoryForm").reset();
    renderCategories();

    showMessage("error", "Category saved successfully.");

    return false;
}


// Display Categories

function renderCategories() {
    let body = document.getElementById("categoryRows");

    if (!body) {
        return;
    }

    body.innerHTML = "";

    for (let i = 0; i < categories.length; i++) {
        body.innerHTML +=
            "<tr>" +
            "<td>" + categories[i].id + "</td>" +
            "<td>" + categories[i].name + "</td>" +
            "<td>" + categories[i].description + "</td>" +
            "<td>" +
            "<button onclick='editCategory(" + i + ")'>Edit</button>" +
            "<button onclick='deleteCategory(" + i + ")'>Delete</button>" +
            "</td>" +
            "</tr>";
    }
}


// Edit Category

function editCategory(i) {
    document.getElementById("categoryname").value = categories[i].name;
    document.getElementById("description").value = categories[i].description;

    editIndex = i;
}


// Delete Category

function deleteCategory(i) {
    categories.splice(i, 1);
    renderCategories();
}


// Add Role

function addRole() {
    let name = document.getElementById("rolename").value.trim();
    let description = document.getElementById("description").value;

    if (name === "") {
        showMessage("error", "Enter role name.");
        return false;
    }

    if (editIndex === -1) {
        roles.push({
            id: "R00" + (roles.length + 1),
            name: name,
            description: description
        });
    }
    else {
        roles[editIndex].name = name;
        roles[editIndex].description = description;
        editIndex = -1;
    }

    document.getElementById("roleForm").reset();
    renderRoles();

    showMessage("error", "Role saved successfully.");

    return false;
}


// Display Roles

function renderRoles() {
    let body = document.getElementById("roleRows");

    if (!body) {
        return;
    }

    body.innerHTML = "";

    for (let i = 0; i < roles.length; i++) {
        body.innerHTML +=
            "<tr>" +
            "<td>" + roles[i].id + "</td>" +
            "<td>" + roles[i].name + "</td>" +
            "<td>" + roles[i].description + "</td>" +
            "<td>" +
            "<button onclick='editRole(" + i + ")'>Edit</button>" +
            "<button onclick='deleteRole(" + i + ")'>Delete</button>" +
            "</td>" +
            "</tr>";
    }
}


// Edit Role

function editRole(i) {
    document.getElementById("rolename").value = roles[i].name;
    document.getElementById("description").value = roles[i].description;

    editIndex = i;
}


// Delete Role

function deleteRole(i) {
    roles.splice(i, 1);
    renderRoles();
}


// Add Location

function addLocation() {
    let name = document.getElementById("locationname").value.trim();
    let building = document.getElementById("building").value;
    let floor = document.getElementById("floor").value;

    if (name === "") {
        showMessage("error", "Enter location name.");
        return false;
    }

    if (editIndex === -1) {
        locations.push({
            id: "L00" + (locations.length + 1),
            name: name,
            building: building,
            floor: floor
        });
    }
    else {
        locations[editIndex].name = name;
        locations[editIndex].building = building;
        locations[editIndex].floor = floor;

        editIndex = -1;
    }

    document.getElementById("locationForm").reset();
    renderLocations();

    showMessage("error", "Location saved successfully.");

    return false;
}


// Display Locations

function renderLocations() {
    let body = document.getElementById("locationRows");

    if (!body) {
        return;
    }

    body.innerHTML = "";

    for (let i = 0; i < locations.length; i++) {
        body.innerHTML +=
            "<tr>" +
            "<td>" + locations[i].id + "</td>" +
            "<td>" + locations[i].name + "</td>" +
            "<td>" + locations[i].building + "</td>" +
            "<td>" + locations[i].floor + "</td>" +
            "<td>" +
            "<button onclick='editLocation(" + i + ")'>Edit</button>" +
            "<button onclick='deleteLocation(" + i + ")'>Delete</button>" +
            "</td>" +
            "</tr>";
    }
}


// Edit Location

function editLocation(i) {
    document.getElementById("locationname").value = locations[i].name;
    document.getElementById("building").value = locations[i].building;
    document.getElementById("floor").value = locations[i].floor;

    editIndex = i;
}


// Delete Location

function deleteLocation(i) {
    locations.splice(i, 1);
    renderLocations();
}


// Change Admin Password

function changePassword() {
    let current = document.getElementById("currentpassword").value;
    let next = document.getElementById("newpassword").value;
    let confirm = document.getElementById("confirmpassword").value;

    if (current !== adminPassword) {
        showMessage("passwordError", "Current password is incorrect.");
        return false;
    }

    if (next.length < 6) {
        showMessage("passwordError", "New password must contain at least 6 characters.");
        return false;
    }

    if (next !== confirm) {
        showMessage("passwordError", "New password and confirm password do not match.");
        return false;
    }

    if (next === current) {
        showMessage("passwordError", "New password must be different from current password.");
        return false;
    }

    adminPassword = next;

    document.getElementById("passwordForm").reset();

    showMessage("passwordError", "Password updated successfully.");

    return false;
}


// Generate Report

function reportType() {
    let type = document.getElementById("reportType").value;
    let from = document.getElementById("fromDate").value;
    let to = document.getElementById("toDate").value;

    showMessage(
        "reportResult",
        "Report generated: " + type +
        (from ? " from " + from : "") +
        (to ? " to " + to : "")
    );
}


// Confirm Logout

function confirmLogout() {
    if (document.getElementById("logoutOverlay")) {
        return false;
    }

    let overlay = document.createElement("div");

    overlay.id = "logoutOverlay";
    overlay.style.position = "fixed";
    overlay.style.left = "0";
    overlay.style.top = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.background = "rgba(0,0,0,0.55)";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.zIndex = "9999";

    let box = document.createElement("div");

    box.style.background = "white";
    box.style.padding = "25px";
    box.style.borderRadius = "8px";
    box.style.textAlign = "center";
    box.style.minWidth = "260px";

    box.innerHTML =
        "<h3>Confirm Logout</h3>" +
        "<p>Are you sure you want to logout?</p>" +
        "<button id='logoutYes'>Yes</button>" +
        "<button id='logoutNo'>No</button>";

    overlay.appendChild(box);
    document.body.appendChild(overlay);

    document.getElementById("logoutYes").onclick = function() {
        window.location.href = "index.html";
    };

    document.getElementById("logoutNo").onclick = function() {
        document.body.removeChild(overlay);
    };

    return false;
}


// Load Functions

document.addEventListener("DOMContentLoaded", function() {
    renderUsers();
    renderCategories();
    renderRoles();
    renderLocations();
    checkTerms();
});
