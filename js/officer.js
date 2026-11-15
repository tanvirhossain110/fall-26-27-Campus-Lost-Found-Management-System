

let foundItems = [
    {
        id: "F001",
        name: "Mobile Phone",
        category: "Electronics",
        location: "Library",
        date: "2026-10-20",
        status: "In Storage"
    },
    {
        id: "F002",
        name: "Student ID Card",
        category: "Documents",
        location: "Cafeteria",
        date: "2026-10-21",
        status: "Pending Collection"
    },
    {
        id: "F003",
        name: "Backpack",
        category: "Bags",
        location: "Classroom",
        date: "2026-10-22",
        status: "In Storage"
    }
];




let appointments = [
    {
        id: "A001",
        name: "Rahim Ahmed",
        studentId: "24-10001-1",
        item: "Mobile Phone",
        date: "2026-11-15",
        time: "10:00",
        status: "Scheduled"
    },
    {
        id: "A002",
        name: "Karim Hasan",
        studentId: "24-10002-1",
        item: "Student ID Card",
        date: "2026-11-16",
        time: "11:30",
        status: "Scheduled"
    }
];





let handovers = [
    {
        id: "H001",
        itemId: "F003",
        item: "Backpack",
        name: "Tanvir Hossain",
        studentId: "24-10003-1",
        date: "2026-10-25",
        time: "12:00",
        verification: "Verified"
    }
];





function showStatus(status) {

    switch (status) {

        case "In Storage":
            return "In Storage";

        case "Pending Collection":
            return "Pending Collection";

        case "Handed Over":
            return "Handed Over";

        case "Scheduled":
            return "Scheduled";

        case "Completed":
            return "Completed";

        case "Cancelled":
            return "Cancelled";

        default:
            return "Unknown";
    }
}





let editItemIndex = -1;


function renderItems(items = foundItems) {

    let table = document.getElementById("itemTable");

    if (!table) {
        return;
    }

    table.innerHTML = "";

    for (let item of items) {

        let i = foundItems.indexOf(item);

        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>${item.location}</td>
            <td>${item.date}</td>
            <td>${showStatus(item.status)}</td>
            <td>
                <button type="button" onclick="editItem(${i})">Edit</button>
                <button type="button" onclick="deleteItem(${i})">Delete</button>
            </td>
        `;

        table.appendChild(row);
    }
}


function saveItem() {

    let name = document.getElementById("itemName").value;
    let category = document.getElementById("category").value;
    let location = document.getElementById("location").value;
    let date = document.getElementById("foundDate").value;
    let status = document.getElementById("itemStatus").value;

    if (name === "" || location === "" || date === "") {

        document.getElementById("itemError").innerHTML =
            "Please fill all required fields.";

        return false;
    }

    if (editItemIndex === -1) {

        let newItem = {
            id: "F00" + (foundItems.length + 1),
            name: name,
            category: category,
            location: location,
            date: date,
            status: status
        };

        foundItems.push(newItem);

    } else {

        foundItems[editItemIndex].name = name;
        foundItems[editItemIndex].category = category;
        foundItems[editItemIndex].location = location;
        foundItems[editItemIndex].date = date;
        foundItems[editItemIndex].status = status;

        editItemIndex = -1;
    }

    renderItems();

    generateDashboard();

    document.getElementById("itemForm").reset();

    document.getElementById("itemError").innerHTML = "";

    return false;
}


function editItem(index) {

    let item = foundItems[index];

    if (!item) {
        return;
    }

    document.getElementById("itemName").value = item.name;
    document.getElementById("category").value = item.category;
    document.getElementById("location").value = item.location;
    document.getElementById("foundDate").value = item.date;
    document.getElementById("itemStatus").value = item.status;

    editItemIndex = index;
}


function deleteItem(index) {

    foundItems = foundItems.slice(0, index)
        .concat(foundItems.slice(index + 1));

    if (editItemIndex === index) {
        editItemIndex = -1;
        document.getElementById("itemForm").reset();
    }

    renderItems();

    generateDashboard();
}


function searchItems() {

    let searchText = document.getElementById("itemSearch").value.toLowerCase();

    let result = [];

    for (let item of foundItems) {

        if (
            item.name.toLowerCase().indexOf(searchText) !== -1 ||
            item.id.toLowerCase().indexOf(searchText) !== -1 ||
            item.category.toLowerCase().indexOf(searchText) !== -1 ||
            item.location.toLowerCase().indexOf(searchText) !== -1
        ) {

            result.push(item);
        }
    }

    renderItems(result);
}





function renderAppointments(searchText = "") {

    let table = document.getElementById("appointmentTable");

    if (!table) {
        return;
    }

    table.innerHTML = "";

    for (let i = 0; i < appointments.length; i++) {

        let appointment = appointments[i];

        let searchData = (
            appointment.name + " " +
            appointment.studentId + " " +
            appointment.item
        ).toLowerCase();

        if (searchData.indexOf(searchText.toLowerCase()) !== -1) {

            let row = document.createElement("tr");

            row.innerHTML = `
                <td>${appointment.id}</td>
                <td>${appointment.name}</td>
                <td>${appointment.studentId}</td>
                <td>${appointment.item}</td>
                <td>${appointment.date}</td>
                <td>${appointment.time}</td>
                <td>${showStatus(appointment.status)}</td>
                <td>
                    <button type="button" onclick="updateAppointment(${i})">Complete</button>
                    <button type="button" onclick="cancelAppointment(${i})">Cancel</button>
                </td>
            `;

            table.appendChild(row);
        }
    }
}


function saveAppointment() {

    let name = document.getElementById("studentName").value;
    let studentId = document.getElementById("studentId").value;
    let item = document.getElementById("appointmentItem").value;
    let date = document.getElementById("appointmentDate").value;
    let time = document.getElementById("appointmentTime").value;
    let status = document.getElementById("appointmentStatus").value;

    if (name === "" || studentId === "" || item === "" ||
        date === "" || time === "") {

        document.getElementById("appointmentError").innerHTML =
            "Please fill all required fields.";

        return false;
    }

    let newAppointment = {
        id: "A00" + (appointments.length + 1),
        name: name,
        studentId: studentId,
        item: item,
        date: date,
        time: time,
        status: status
    };

    appointments.push(newAppointment);

    renderAppointments();

    document.getElementById("appointmentForm").reset();

    document.getElementById("appointmentError").innerHTML = "";

    return false;
}


function updateAppointment(index) {

    appointments[index].status = "Completed";

    renderAppointments();
}


function cancelAppointment(index) {

    appointments[index].status = "Cancelled";

    renderAppointments();
}


function searchAppointments() {

    let searchText = document.getElementById("appointmentSearch").value.toLowerCase();

    renderAppointments(searchText);
}





function saveHandover() {

    let itemId = document.getElementById("handoverItemId").value;
    let item = document.getElementById("handoverItemName").value;
    let name = document.getElementById("receiverName").value;
    let studentId = document.getElementById("receiverId").value;
    let date = document.getElementById("handoverDate").value;
    let time = document.getElementById("handoverTime").value;

    let verification = document.getElementsByName("verification");

    let verified = "";

    for (let i = 0; i < verification.length; i++) {

        if (verification[i].checked) {
            verified = verification[i].value;
        }
    }

    let error = document.getElementById("handoverError");

    if (itemId === "" || item === "" || name === "" ||
        studentId === "" || date === "" || time === "") {

        error.innerHTML = "Please fill all required fields.";

        return false;
    }

    if (verified !== "Verified") {

        error.innerHTML =
            "Ownership must be verified before handover.";

        return false;
    }

    let itemFound = false;

    for (let i = 0; i < foundItems.length; i++) {

        if (foundItems[i].id === itemId &&
            foundItems[i].name.toLowerCase() === item.toLowerCase()) {

            itemFound = true;

            if (foundItems[i].status === "Handed Over") {

                error.innerHTML = "This item has already been handed over.";

                return false;
            }

            foundItems[i].status = "Handed Over";
        }
    }

    if (itemFound === false) {

        error.innerHTML = "Item ID or Item Name does not match.";

        return false;
    }

    let newHandover = {

        id: "H00" + (handovers.length + 1),
        itemId: itemId,
        item: item,
        name: name,
        studentId: studentId,
        date: date,
        time: time,
        verification: verified
    };

    handovers.push(newHandover);

    renderHistory();

    renderItems();

    generateDashboard();

    document.getElementById("handoverForm").reset();

    error.innerHTML = "Handover completed successfully.";

    return false;
}





function renderHistory(searchText = "") {

    let table = document.getElementById("historyTable");

    if (!table) {
        return;
    }

    table.innerHTML = "";

    for (let record of handovers) {

        let searchData = (
            record.id + " " +
            record.itemId + " " +
            record.name + " " +
            record.studentId + " " +
            record.item
        ).toLowerCase();

        if (searchData.indexOf(searchText.toLowerCase()) !== -1) {

            let row = document.createElement("tr");

            row.innerHTML = `
                <td>${record.id}</td>
                <td>${record.itemId}</td>
                <td>${record.item}</td>
                <td>${record.name}</td>
                <td>${record.studentId}</td>
                <td>${record.date}</td>
                <td>${record.time}</td>
                <td>${record.verification}</td>
            `;

            table.appendChild(row);
        }
    }

    let count = document.getElementById("historyCount");

    if (count) {
        count.innerHTML = handovers.length;
    }
}


function searchHistory() {

    let searchText = document.getElementById("historySearch").value.toLowerCase();

    renderHistory(searchText);
}





function generateDashboard() {

    let total = foundItems.length;

    let storage = 0;
    let pending = 0;
    let handed = 0;

    for (let i = 0; i < foundItems.length; i++) {

        if (foundItems[i].status === "In Storage") {

            storage++;

        } else if (foundItems[i].status === "Pending Collection") {

            pending++;

        } else if (foundItems[i].status === "Handed Over") {

            handed++;
        }
    }

    let totalElement = document.getElementById("totalItems");

    if (totalElement) {

        totalElement.innerHTML = total;

        document.getElementById("storageItems").innerHTML = storage;

        document.getElementById("pendingItems").innerHTML = pending;

        document.getElementById("handedItems").innerHTML = handed;
    }

    let recentTable = document.getElementById("recentItems");

    if (recentTable) {

        recentTable.innerHTML = "";

        let recent = foundItems.slice(-3);

        for (let item of recent) {

            let row = document.createElement("tr");

            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.category}</td>
                <td>${item.location}</td>
                <td>${item.date}</td>
                <td>${showStatus(item.status)}</td>
            `;

            recentTable.appendChild(row);
        }
    }
}






function updateProfile() {

    let name = document.getElementById("officerName").value;
    let email = document.getElementById("officerEmail").value;
    let phone = document.getElementById("officerPhone").value;

    if (name === "" || email === "" || phone === "") {

        document.getElementById("profileMessage").innerHTML =
            "Please fill all fields.";

        return false;
    }

    document.getElementById("profileMessage").innerHTML =
        "Profile updated successfully.";

    return false;
}





let demoPassword = "officer123";


function changePassword() {

    let current = document.getElementById("currentPassword").value;

    let newPass = document.getElementById("newPassword").value;

    let confirm = document.getElementById("confirmPassword").value;

    let error = document.getElementById("passwordError");

    if (current !== demoPassword) {

        error.innerHTML = "Current password is incorrect.";

        return false;

    } else if (newPass !== confirm) {

        error.innerHTML =
            "New password and confirm password do not match.";

        return false;

    } else {

        demoPassword = newPass;

        error.innerHTML = "Password changed successfully.";

        document.getElementById("passwordForm").reset();

        return false;
    }
}





document.addEventListener("DOMContentLoaded", function() {

    renderItems();

    renderAppointments();

    renderHistory();

    generateDashboard();

});
