
let foundItems = [

    {id:"F001",name:"Mobile Phone",category:"Electronics",location:"Library",date:"2026-11-10",description:"Black mobile phone",status:"In Storage"},

    {id:"F002",name:"Student ID Card",category:"Documents",location:"Cafeteria",date:"2026-11-11",description:"Student identity card",status:"Pending Collection"},

    {id:"F003",name:"Backpack",category:"Bags",location:"Room 204",date:"2026-11-12",description:"Black backpack",status:"In Storage"}

];

let appointments = [

    {id:"A001",name:"Rahim Ahmed",studentId:"24-10001-1",item:"Mobile Phone",date:"2026-11-22",time:"10:00",status:"Scheduled"},

    {id:"A002",name:"Karim Hasan",studentId:"24-10002-1",item:"Student ID Card",date:"2026-11-23",time:"11:30",status:"Scheduled"}

];

let handovers = [

    {id:"H001",itemId:"F003",item:"Backpack",name:"Tanvir Hossain",studentId:"24-55993-1",date:"2026-11-13",time:"12:00",verification:"Verified"}

];

let demoPassword = "Officer@123";

let appointmentEditIndex = -1;

let editItemId = "";

let nextItemNumber = 4;


// Generate Item ID

function generateItemId() {

    let id = "F" + String(nextItemNumber).padStart(3, "0");

    nextItemNumber++;

    return id;

}


// Show Item Status

function showStatus(status) {

    let el = document.getElementById("itemStatus");

    if (el) {
        el.value = status;
    }

}


// Save and Update Found Item

function saveItem() {

    let name = document.getElementById("itemName").value.trim();
    let category = document.getElementById("category").value;
    let location = document.getElementById("location").value.trim();
    let date = document.getElementById("foundDate").value;
    let description = document.getElementById("description").value.trim();
    let status = document.getElementById("itemStatus").value;

    let error = document.getElementById("itemError");

    if (name === "" || location === "" || date === "") {

        error.innerHTML = "Please fill all required fields.";
        return false;

    }

    if (editItemId === "") {

        let newItem = {

            id: generateItemId(),
            name: name,
            category: category,
            location: location,
            date: date,
            description: description,
            status: status

        };

        foundItems.push(newItem);

        error.innerHTML = "Item added successfully.";

    }

    else {

        for (let i = 0; i < foundItems.length; i++) {

            if (foundItems[i].id === editItemId) {

                foundItems[i].name = name;
                foundItems[i].category = category;
                foundItems[i].location = location;
                foundItems[i].date = date;
                foundItems[i].description = description;
                foundItems[i].status = status;

                break;

            }

        }

        editItemId = "";

        error.innerHTML = "Item updated successfully.";

    }

    document.getElementById("itemForm").reset();

    document.getElementById("saveItemButton").innerHTML = "Save Item";

    renderItems();
    generateDashboard();

    return false;

}


// Display Found Items

function renderItems(list) {

    let body = document.getElementById("itemTable");

    if (!body) {
        return;
    }

    let data = list || foundItems;

    body.innerHTML = "";

    for (let i = 0; i < data.length; i++) {

        body.innerHTML += `

            <tr>
                <td>${data[i].id}</td>
                <td>${data[i].name}</td>
                <td>${data[i].category}</td>
                <td>${data[i].location}</td>
                <td>${data[i].date}</td>
                <td>${data[i].status}</td>

                <td>
                    <button type="button" class="edit-btn"
                    onclick="editItem('${data[i].id}')">Edit</button>

                    <button type="button" class="delete-btn"
                    onclick="deleteItemById('${data[i].id}')">Delete</button>
                </td>
            </tr>

        `;

    }

}


// Edit Found Item

function editItem(id) {

    let found = false;

    for (let i = 0; i < foundItems.length; i++) {

        if (foundItems[i].id === id) {

            editItemId = id;

            document.getElementById("itemName").value = foundItems[i].name;

            document.getElementById("category").value = foundItems[i].category;

            document.getElementById("location").value = foundItems[i].location;

            document.getElementById("foundDate").value = foundItems[i].date;

            document.getElementById("description").value = foundItems[i].description || "";

            document.getElementById("itemStatus").value = foundItems[i].status;

            document.getElementById("saveItemButton").innerHTML = "Update Item";

            document.getElementById("itemError").innerHTML = "You are editing Item ID: " + id;

            found = true;

            document.getElementById("itemForm").scrollIntoView();

            break;

        }

    }

    if (!found) {

        document.getElementById("itemError").innerHTML = "Item not found.";

    }

}


// Delete Found Item

function deleteItemById(id) {

    let confirmDelete = confirm("Are you sure you want to delete this item?");

    if (confirmDelete) {

        for (let i = 0; i < foundItems.length; i++) {

            if (foundItems[i].id === id) {

                foundItems.splice(i, 1);

                break;

            }

        }

        if (editItemId === id) {

            editItemId = "";

            document.getElementById("itemForm").reset();

            document.getElementById("saveItemButton").innerHTML = "Save Item";

        }

        renderItems();
        generateDashboard();

        let error = document.getElementById("itemError");

        if (error) {
            error.innerHTML = "Item deleted successfully.";
        }

    }

}


// Search Found Items

function searchItems() {

    let input = document.getElementById("itemSearch");

    if (!input) {
        return;
    }

    let q = input.value.toLowerCase();

    let result = [];

    for (let item of foundItems) {

        if (

            item.name.toLowerCase().indexOf(q) > -1 ||

            item.id.toLowerCase().indexOf(q) > -1 ||

            item.category.toLowerCase().indexOf(q) > -1 ||

            item.location.toLowerCase().indexOf(q) > -1

        ) {

            result.push(item);

        }

    }

    renderItems(result);

}


// Reset Edit Mode When Form Is Cleared

document.addEventListener("DOMContentLoaded", function() {

    let form = document.getElementById("itemForm");

    if (form) {

        form.addEventListener("reset", function() {

            editItemId = "";

            document.getElementById("saveItemButton").innerHTML = "Save Item";

        });

    }

});


// Save Appointment

function saveAppointment() {

    let name = document.getElementById("studentName").value.trim();

    let studentId = document.getElementById("studentId").value.trim();

    let item = document.getElementById("appointmentItem").value.trim();

    let date = document.getElementById("appointmentDate").value;

    let time = document.getElementById("appointmentTime").value;

    let status = document.getElementById("appointmentStatus").value;

    if (!name || !studentId || !item || !date || !time) {

        document.getElementById("appointmentError").innerHTML = "Please fill all required fields.";

        return false;

    }

    if (appointmentEditIndex === -1) {

        appointments.push({

            id: "A00" + (appointments.length + 1),
            name: name,
            studentId: studentId,
            item: item,
            date: date,
            time: time,
            status: status

        });

    }

    else {

        appointments[appointmentEditIndex].name = name;
        appointments[appointmentEditIndex].studentId = studentId;
        appointments[appointmentEditIndex].item = item;
        appointments[appointmentEditIndex].date = date;
        appointments[appointmentEditIndex].time = time;
        appointments[appointmentEditIndex].status = status;

        appointmentEditIndex = -1;

    }

    document.getElementById("appointmentForm").reset();

    renderAppointments();

    document.getElementById("appointmentError").innerHTML = "Appointment saved successfully.";

    return false;

}


// Display Appointments

function renderAppointments(list) {

    let body = document.getElementById("appointmentTable");

    if (!body) {
        return;
    }

    let data = list || appointments;

    body.innerHTML = "";

    for (let i = 0; i < data.length; i++) {

        body.innerHTML += "<tr><td>" + data[i].id + "</td><td>" + data[i].name + "</td><td>" + data[i].studentId + "</td><td>" + data[i].item + "</td><td>" + data[i].date + "</td><td>" + data[i].time + "</td><td>" + data[i].status + "</td><td><button onclick='editAppointment(\"" + data[i].id + "\")'>Edit</button><button onclick='deleteAppointment(\"" + data[i].id + "\")'>Delete</button></td></tr>";

    }

}


// Edit Appointment

function editAppointment(id) {

    for (let i = 0; i < appointments.length; i++) {

        if (appointments[i].id === id) {

            appointmentEditIndex = i;

            document.getElementById("studentName").value = appointments[i].name;

            document.getElementById("studentId").value = appointments[i].studentId;

            document.getElementById("appointmentItem").value = appointments[i].item;

            document.getElementById("appointmentDate").value = appointments[i].date;

            document.getElementById("appointmentTime").value = appointments[i].time;

            document.getElementById("appointmentStatus").value = appointments[i].status;

            break;

        }

    }

}


// Delete Appointment

function deleteAppointment(id) {

    for (let i = 0; i < appointments.length; i++) {

        if (appointments[i].id === id) {

            appointments.splice(i, 1);

            break;

        }

    }

    appointmentEditIndex = -1;

    renderAppointments();

}


// Search Appointments

function searchAppointments() {

    let input = document.getElementById("appointmentSearch");

    if (!input) {
        return;
    }

    let q = input.value.toLowerCase();

    let result = [];

    for (let a of appointments) {

        if (a.name.toLowerCase().indexOf(q) > -1 || a.studentId.toLowerCase().indexOf(q) > -1) {

            result.push(a);

        }

    }

    renderAppointments(result);

}


// Save Handover

function saveHandover() {

    let itemId = document.getElementById("handoverItemId").value.trim();

    let itemName = document.getElementById("handoverItemName").value.trim();

    let name = document.getElementById("receiverName").value.trim();

    let studentId = document.getElementById("receiverId").value.trim();

    let date = document.getElementById("handoverDate").value;

    let time = document.getElementById("handoverTime").value;

    let radios = document.getElementsByName("verification");

    let verification = "";

    for (let radio of radios) {

        if (radio.checked) {
            verification = radio.value;
        }

    }

    if (verification !== "Verified") {

        document.getElementById("handoverError").innerHTML = "Ownership must be verified before handover.";

        return false;

    }

    let found = false;

    for (let i = 0; i < foundItems.length; i++) {

        if (foundItems[i].id === itemId && foundItems[i].name.toLowerCase() === itemName.toLowerCase()) {

            found = true;

            foundItems[i].status = "Handed Over";

            break;

        }

    }

    if (!found) {

        document.getElementById("handoverError").innerHTML = "Item ID and Item Name do not match a found item.";

        return false;

    }

    handovers.push({

        id: "H00" + (handovers.length + 1),
        itemId: itemId,
        item: itemName,
        name: name,
        studentId: studentId,
        date: date,
        time: time,
        verification: verification

    });

    document.getElementById("handoverForm").reset();

    renderHistory();

    generateDashboard();

    document.getElementById("handoverError").innerHTML = "Handover completed successfully.";

    return false;

}


// Display Handover History

function renderHistory(list) {

    let body = document.getElementById("historyTable");

    if (!body) {
        return;
    }

    let data = list || handovers;

    body.innerHTML = "";

    for (let i = 0; i < data.length; i++) {

        body.innerHTML += "<tr><td>" + data[i].id + "</td><td>" + data[i].itemId + "</td><td>" + data[i].item + "</td><td>" + data[i].name + "</td><td>" + data[i].studentId + "</td><td>" + data[i].date + "</td><td>" + data[i].time + "</td><td>" + data[i].verification + "</td></tr>";

    }

    let count = document.getElementById("historyCount");

    if (count) {
        count.innerHTML = data.length;
    }

}


// Search Handover History

function searchHistory() {

    let input = document.getElementById("historySearch");

    if (!input) {
        return;
    }

    let q = input.value.toLowerCase();

    let result = [];

    for (let h of handovers) {

        if (h.name.toLowerCase().indexOf(q) > -1 || h.studentId.toLowerCase().indexOf(q) > -1) {

            result.push(h);

        }

    }

    renderHistory(result);

}


// Generate Dashboard

function generateDashboard() {

    let total = document.getElementById("totalItems");

    if (!total) {
        return;
    }

    let storage = 0;
    let pending = 0;
    let handed = 0;

    for (let item of foundItems) {

        if (item.status === "In Storage") {
            storage++;
        }

        else if (item.status === "Pending Collection") {
            pending++;
        }

        else if (item.status === "Handed Over") {
            handed++;
        }

    }

    total.innerHTML = foundItems.length;

    document.getElementById("storageItems").innerHTML = storage;

    document.getElementById("pendingItems").innerHTML = pending;

    document.getElementById("handedItems").innerHTML = handed;

    let recent = document.getElementById("recentItems");

    recent.innerHTML = "";

    for (let i = foundItems.length - 1; i >= 0 && i >= foundItems.length - 5; i--) {

        recent.innerHTML += "<tr><td>" + foundItems[i].id + "</td><td>" + foundItems[i].name + "</td><td>" + foundItems[i].category + "</td><td>" + foundItems[i].location + "</td><td>" + foundItems[i].date + "</td><td>" + foundItems[i].status + "</td></tr>";

    }

}


// Update Profile

function updateProfile() {

    let name = document.getElementById("officerName").value.trim();

    let email = document.getElementById("officerEmail").value.trim();

    if (!name || !email) {

        document.getElementById("profileMessage").innerHTML = "Please fill required fields.";

        return false;

    }

    document.getElementById("profileMessage").innerHTML = "Profile updated successfully.";

    return false;

}


// Change Password

function changePassword() {

    let current = document.getElementById("currentPassword").value;

    let next = document.getElementById("newPassword").value;

    let confirm = document.getElementById("confirmPassword").value;

    if (current !== demoPassword) {

        document.getElementById("passwordError").innerHTML = "Current password is incorrect.";

        return false;

    }

    if (next.length < 6) {

        document.getElementById("passwordError").innerHTML = "New password must contain at least 6 characters.";

        return false;

    }

    if (next !== confirm) {

        document.getElementById("passwordError").innerHTML = "New password and confirm password do not match.";

        return false;

    }

    if (next === current) {

        document.getElementById("passwordError").innerHTML = "New password must be different from current password.";

        return false;

    }

    demoPassword = next;

    document.getElementById("passwordForm").reset();

    document.getElementById("passwordError").innerHTML = "Password updated successfully.";

    return false;

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

    box.innerHTML = "<h3>Confirm Logout</h3><p>Are you sure you want to logout?</p><button id='logoutYes'>Yes</button><button id='logoutNo'>No</button>";

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


// Load All Functions

document.addEventListener("DOMContentLoaded", function() {

    renderItems();

    renderAppointments();

    renderHistory();

    generateDashboard();

});
