let adminPassword = "Admin@123";

let users = [
    {id: "U001", name: "Rahim Ahmed", email: "rahim@gmail.com", studentid: "24-10001-1", role: "Student", status: "Active"},
    {id: "U002", name: "Karim Hasan", email: "karim@gmail.com", studentid: "24-10002-1", role: "Faculty", status: "Active"},
    {id: "U003", name: "Tanvir Hossain", email: "tanvir@gmail.com", studentid: "24-10003-1", role: "Admin", status: "Active"}
];

let categories = [
    {id: "C001", name: "Electronics", description: "Mobile, Laptop, Charger"},
    {id: "C002", name: "Documents", description: "ID Card, Certificates, Books"},
    {id: "C003", name: "Personal Items", description: "Wallet, Bag, Keys"}
];

let roles = [
    {id: "R001", name: "Student / Faculty", description: "Report and search items"},
    {id: "R002", name: "Lost & Found Officer", description: "Manage found items"},
    {id: "R003", name: "Claim Verification Officer", description: "Verify ownership claims"},
    {id: "R004", name: "Admin", description: "Manage complete system"}
];

let locations = [
    {id: "L001", name: "Library", building: "Building A", floor: "2nd Floor"},
    {id: "L002", name: "Cafeteria", building: "Building B", floor: "Ground Floor"},
    {id: "L003", name: "Computer Lab", building: "Building C", floor: "3rd Floor"}
];

let editingUser = -1;
let editingCategory = -1;
let editingRole = -1;
let editingLocation = -1;


function showMessage(id, message) {
    document.getElementById(id).innerHTML = message;
}

function searchTable(inputId, tableId) {
    let search = document.getElementById(inputId).value.toLowerCase();

    for (let i = 0; i < 100; i++) {
        let row = document.getElementById("row" + i);

        if (row !== null) {
            if (row.innerHTML.toLowerCase().indexOf(search) === -1) {
                row.style.display = "none";
            } else {
                row.style.display = "table-row";
            }
        }
    }
}

function checkTerms() {
    let terms = document.getElementById("terms");
    let register = document.getElementById("register");

    if (terms.checked) {
        register.disabled = false;
    } else {
        register.disabled = true;
    }
}

function renderUsers() {
    let output = "";

    for (let i = 0; i < users.length; i++) {
        output += "<tr id='row" + i + "'>";
        output += "<td>" + users[i].id + "</td>";
        output += "<td>" + users[i].name + "</td>";
        output += "<td>" + users[i].email + "</td>";
        output += "<td>" + users[i].studentid + "</td>";
        output += "<td>" + users[i].role + "</td>";
        output += "<td>" + users[i].status + "</td>";
        output += "<td><button type='button' onclick='editUser(" + i + ")'>Edit</button> ";
        output += "<button type='button' onclick='deleteUser(" + i + ")'>Delete</button></td>";
        output += "</tr>";
    }

    document.getElementById("userRows").innerHTML = output;
}

function addUser() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let studentid = document.getElementById("studentid").value;
    let role = document.getElementById("role").value;

    if (name === "" || email === "" || studentid === "") {
        showMessage("error", "Please fill in all required fields.");
        return false;
    }

    if (editingUser === -1) {
        users.push({
            id: "U00" + (users.length + 1),
            name: name,
            email: email,
            studentid: studentid,
            role: role,
            status: "Active"
        });

        showMessage("error", "User added successfully.");
    } else {
        users[editingUser].name = name;
        users[editingUser].email = email;
        users[editingUser].studentid = studentid;
        users[editingUser].role = role;

        editingUser = -1;
        showMessage("error", "User updated successfully.");
    }

    renderUsers();
    document.getElementById("userForm").reset();
    document.getElementById("register").disabled = true;
    document.getElementById("register").innerHTML = "Add User";

    return false;
}

function editUser(index) {
    editingUser = index;

    document.getElementById("name").value = users[index].name;
    document.getElementById("email").value = users[index].email;
    document.getElementById("studentid").value = users[index].studentid;
    document.getElementById("role").value = users[index].role;

    document.getElementById("terms").checked = true;
    document.getElementById("register").disabled = false;
    document.getElementById("register").innerHTML = "Update User";
    showMessage("error", "Edit the information and click Update User.");
}

function deleteUser(index) {
    users = users.slice(0, index).concat(users.slice(index + 1));
    renderUsers();
}

function renderCategories() {
    let output = "";

    for (let i = 0; i < categories.length; i++) {
        output += "<tr id='row" + i + "'>";
        output += "<td>" + categories[i].id + "</td>";
        output += "<td>" + categories[i].name + "</td>";
        output += "<td>" + categories[i].description + "</td>";
        output += "<td><button type='button' onclick='editCategory(" + i + ")'>Edit</button> ";
        output += "<button type='button' onclick='deleteCategory(" + i + ")'>Delete</button></td>";
        output += "</tr>";
    }

    document.getElementById("categoryRows").innerHTML = output;
}

function addCategory() {
    let name = document.getElementById("categoryname").value;
    let description = document.getElementById("description").value;

    if (name === "") {
        showMessage("error", "Enter category name.");
        return false;
    }

    if (editingCategory === -1) {
        categories.push({
            id: "C00" + (categories.length + 1),
            name: name,
            description: description
        });

        showMessage("error", "Category added successfully.");
    } else {
        categories[editingCategory].name = name;
        categories[editingCategory].description = description;

        editingCategory = -1;
        showMessage("error", "Category updated successfully.");
    }

    renderCategories();
    document.getElementById("categoryForm").reset();
    document.getElementById("categorySubmit").innerHTML = "Add Category";

    return false;
}

function editCategory(index) {
    editingCategory = index;

    document.getElementById("categoryname").value = categories[index].name;
    document.getElementById("description").value = categories[index].description;
    document.getElementById("categorySubmit").innerHTML = "Update Category";

    showMessage("error", "Edit the information and click Update Category.");
}

function deleteCategory(index) {
    categories = categories.slice(0, index).concat(categories.slice(index + 1));
    renderCategories();
}

function renderRoles() {
    let output = "";

    for (let i = 0; i < roles.length; i++) {
        output += "<tr id='row" + i + "'>";
        output += "<td>" + roles[i].id + "</td>";
        output += "<td>" + roles[i].name + "</td>";
        output += "<td>" + roles[i].description + "</td>";
        output += "<td><button type='button' onclick='editRole(" + i + ")'>Edit</button> ";
        output += "<button type='button' onclick='deleteRole(" + i + ")'>Delete</button></td>";
        output += "</tr>";
    }

    document.getElementById("roleRows").innerHTML = output;
}

function addRole() {
    let name = document.getElementById("rolename").value;
    let description = document.getElementById("description").value;

    if (name === "") {
        showMessage("error", "Enter role name.");
        return false;
    }

    if (editingRole === -1) {
        roles.push({
            id: "R00" + (roles.length + 1),
            name: name,
            description: description
        });

        showMessage("error", "Role added successfully.");
    } else {
        roles[editingRole].name = name;
        roles[editingRole].description = description;

        editingRole = -1;
        showMessage("error", "Role updated successfully.");
    }

    renderRoles();
    document.getElementById("roleForm").reset();
    document.getElementById("roleSubmit").innerHTML = "Add Role";

    return false;
}

function editRole(index) {
    editingRole = index;

    document.getElementById("rolename").value = roles[index].name;
    document.getElementById("description").value = roles[index].description;
    document.getElementById("roleSubmit").innerHTML = "Update Role";

    showMessage("error", "Edit the information and click Update Role.");
}

function deleteRole(index) {
    roles = roles.slice(0, index).concat(roles.slice(index + 1));
    renderRoles();
}

function renderLocations() {
    let output = "";

    for (let i = 0; i < locations.length; i++) {
        output += "<tr id='row" + i + "'>";
        output += "<td>" + locations[i].id + "</td>";
        output += "<td>" + locations[i].name + "</td>";
        output += "<td>" + locations[i].building + "</td>";
        output += "<td>" + locations[i].floor + "</td>";
        output += "<td><button type='button' onclick='editLocation(" + i + ")'>Edit</button> ";
        output += "<button type='button' onclick='deleteLocation(" + i + ")'>Delete</button></td>";
        output += "</tr>";
    }

    document.getElementById("locationRows").innerHTML = output;
}

function addLocation() {
    let name = document.getElementById("locationname").value;
    let building = document.getElementById("building").value;
    let floor = document.getElementById("floor").value;

    if (name === "") {
        showMessage("error", "Enter location name.");
        return false;
    }

    if (editingLocation === -1) {
        locations.push({
            id: "L00" + (locations.length + 1),
            name: name,
            building: building,
            floor: floor
        });

        showMessage("error", "Location added successfully.");
    } else {
        locations[editingLocation].name = name;
        locations[editingLocation].building = building;
        locations[editingLocation].floor = floor;

        editingLocation = -1;
        showMessage("error", "Location updated successfully.");
    }

    renderLocations();
    document.getElementById("locationForm").reset();
    document.getElementById("locationSubmit").innerHTML = "Add Location";

    return false;
}

function editLocation(index) {
    editingLocation = index;

    document.getElementById("locationname").value = locations[index].name;
    document.getElementById("building").value = locations[index].building;
    document.getElementById("floor").value = locations[index].floor;
    document.getElementById("locationSubmit").innerHTML = "Update Location";

    showMessage("error", "Edit the information and click Update Location.");
}

function deleteLocation(index) {
    locations = locations.slice(0, index).concat(locations.slice(index + 1));
    renderLocations();
}


function changePassword() {
    let current = document.getElementById("currentpassword").value;
    let password = document.getElementById("newpassword").value;
    let confirm = document.getElementById("confirmpassword").value;

    if (current === "" || password === "" || confirm === "") {
        showMessage("passwordError", "Please fill in all password fields.");
        return false;
    } else if (current !== adminPassword) {
        showMessage("passwordError", "Current password is incorrect.");
        return false;
    } else if (password !== confirm) {
        showMessage("passwordError", "New passwords do not match.");
        return false;
    } else if (current === password) {
        showMessage("passwordError", "New password must be different from current password.");
        return false;
    } else {
        adminPassword = password;
        showMessage("passwordError", "Password updated successfully.");
        document.getElementById("passwordForm").reset();
        return false;
    }
}

function reportType() {
    let type = document.getElementById("reportType").value;

    switch (type) {
        case "Lost Items":
            showMessage("reportResult", "Lost Items Report Selected");
            break;

        case "Found Items":
            showMessage("reportResult", "Found Items Report Selected");
            break;

        case "Claims":
            showMessage("reportResult", "Claims Report Selected");
            break;

        default:
            showMessage("reportResult", "All Reports Selected");
    }
}

if (document.getElementById("userRows")) {
    renderUsers();
}

if (document.getElementById("roleRows")) {
    renderRoles();
}

if (document.getElementById("categoryRows")) {
    renderCategories();
}

if (document.getElementById("locationRows")) {
    renderLocations();
}
