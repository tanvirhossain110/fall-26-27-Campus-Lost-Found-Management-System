const sections = ["lostSection", "foundSection", "claimSection"];

// sample date for test 
const currentUserId = "U-003";
const currentUserName = "Rahim Uddin";
const currentUserEmail = "rahim@student.edu";
const currentUserPhone = "01711000003";

let editLostIndex = -1;
let editFoundIndex = -1;

const lostFields = ["lostItemName", "lostCategory", "lostLocation", "lostDate", "lostDescription"];
const foundFields = ["foundItemName", "foundCategory", "foundLocation", "foundDate", "foundDescription"];
const claimFields = ["claimItem", "claimProof", "claimContact", "collectWhere"];

const LOST_STATUSES = ["Open", "Matched", "Claimed"];
const FOUND_STATUSES = ["Available", "Claim Pending", "Claimed"];
const CLAIM_STATUSES = ["Pending", "Approved", "Rejected"];


// true if the id belongs to the currently logged-in user's record
function isMine(record) {
  return record.reporterId === currentUserId;
}

// Finds a found item by id (returns null if none)
function findFoundItem(id) {
  for (const item of foundItems) {
    if (item.id === id) {
      return item;
    }
  }
  return null;
}

// Number of pending claims for one found item
function pendingClaimsFor(foundId) {
  let count = 0;
  for (const claim of claimRequests) {
    if (claim.foundId === foundId && claim.status === "Pending") {
      count++;
    }
  }
  return count;
}

// A claim is only allowed when the item exists, is still available and
// this user has not already claimed it.
function whyNotClaimable(foundId) {
  let item = findFoundItem(foundId);
  if (item === null) {
    return "Item not found";
  }
  if (item.status === "Claimed") {
    return "Already claimed";
  }
  if (item.status === "Claim Pending") {
    return "Another claim is being checked";
  }
  for (const claim of claimRequests) {
    if (claim.foundId === foundId && claim.claimantId === currentUserId) {
      return "You already claimed this item";
    }
  }
  return "";
}


/* 
 * LOST ITEM REPORT : CREATE, READ, UPDATE, DELETE, SEARCH
 */

// READ + SEARCH
function renderLost() {
  let keyword = document.getElementById("lostSearch").value;
  let statusFilter = document.getElementById("lostStatusFilter").value;

  let rows = "";
  let shown = 0;
  let mine = 0;

  for (let i = 0; i < lostItems.length; i++) {
    let item = lostItems[i];
    if (isMine(item)) {
      mine++;
    }

    let matchesKeyword = containsText(item.itemName, keyword) || containsText(item.location, keyword) ||
                         containsText(item.id, keyword);
    let matchesStatus = (statusFilter === "All" || item.status === statusFilter);

    if (isMine(item) && matchesKeyword && matchesStatus) {
      // A colour for each status, chosen with switch
      let statusColor;
      switch (item.status) {
        case "Matched":
          statusColor = "blue";
          break;
        case "Claimed":
          statusColor = "green";
          break;
        default:
          statusColor = "orange";
      }

      // Only open reports can be edited or deleted
      let actions = "&mdash;";
      if (item.status === "Open") {
        actions = "<button type='button' class='btn btn-small' onclick='editLost(" + i + ")'>Edit</button>" +
                  "<button type='button' class='btn btn-small btn-danger' onclick='deleteLost(" + i + ")'>Delete</button>";
      }

      rows += "<tr>" +
                "<td>" + item.id + "</td>" +
                "<td><strong>" + item.itemName + "</strong><br><span class='hint'>" + item.description + "</span></td>" +
                "<td>" + item.category + "</td>" +
                "<td>" + item.location + "</td>" +
                "<td>" + item.dateLost + "</td>" +
                "<td><span class='badge " + statusColor + "'>" + item.status + "</span></td>" +
                "<td>" + actions + "</td>" +
              "</tr>";
      shown++;
    }
  }

  if (shown === 0) {
    rows = "<tr><td colspan='7' class='empty-row'>No lost reports match your search.</td></tr>";
  }

  document.getElementById("lostTableBody").innerHTML = rows;
  document.getElementById("lostCount").innerHTML = "Showing " + shown + " of your " + mine + " reports";
}


// CREATE or UPDATE
function saveLost() {
  let itemName = document.getElementById("lostItemName").value.trim();
  let category = document.getElementById("lostCategory").value;
  let location = document.getElementById("lostLocation").value.trim();
  let dateLost = document.getElementById("lostDate").value;
  let description = document.getElementById("lostDescription").value.trim();

  let isValid = true;
  clearErrors(lostFields);

  if (itemName.length < 2) {
    showError("lostItemName", "Item name must be at least 2 characters.");
    isValid = false;
  }

  if (category === "") {
    showError("lostCategory", "Please choose a category.");
    isValid = false;
  }

  if (location.length < 3) {
    showError("lostLocation", "Please write where you lost it.");
    isValid = false;
  }

  if (dateLost === "") {
    showError("lostDate", "Please choose the date.");
    isValid = false;
  } else if (daysBetween(todayString(), dateLost) > 0) {
    showError("lostDate", "The date cannot be in the future.");
    isValid = false;
  }

  if (description.length < 10) {
    showError("lostDescription", "Please write at least 10 characters.");
    isValid = false;
  } else if (description.length > 200) {
    showError("lostDescription", "Please keep it under 200 characters.");
    isValid = false;
  }

  if (isValid === false) {
    return false;
  }

  if (editLostIndex === -1) {
    // CREATE: build a new object and push() it to the end of the array
    let newReport = { id: nextId("L", lostItems), reporterId: currentUserId, reporterName: currentUserName,
                      itemName: itemName, category: category, location: location, dateLost: dateLost,
                      description: description, status: "Open" };
    lostItems.push(newReport);
    showMessage("lostMessage", "Lost report <strong>" + newReport.id + "</strong> for <strong>" +
                itemName + "</strong> was submitted.", "success");
  } else {
    // UPDATE: change the properties of the object being edited
    let item = lostItems[editLostIndex];
    item.itemName = itemName;
    item.category = category;
    item.location = location;
    item.dateLost = dateLost;
    item.description = description;
    showMessage("lostMessage", "Lost report <strong>" + item.id + "</strong> was updated.", "success");
  }

  resetLostForm();
  renderLost();
  return false;
}


// UPDATE step 1: copy the report's values into the form
function editLost(index) {
  let item = lostItems[index];
  editLostIndex = index;

  document.getElementById("lostItemName").value = item.itemName;
  document.getElementById("lostCategory").value = item.category;
  document.getElementById("lostLocation").value = item.location;
  document.getElementById("lostDate").value = item.dateLost;
  document.getElementById("lostDescription").value = item.description;

  document.getElementById("lostFormTitle").innerHTML = "Edit Lost Report " + item.id;
  document.getElementById("lostSaveButton").value = "Update Report";
  hideMessage("lostMessage");
}


// DELETE: remove the report from the array
function deleteLost(index) {
  let item = lostItems[index];
  lostItems = removeAt(lostItems, index);
  showMessage("lostMessage", "Lost report <strong>" + item.id + "</strong> was deleted.", "info");
  resetLostForm();
  renderLost();
}


function resetLostForm() {
  editLostIndex = -1;
  document.getElementById("lostForm").reset();
  clearErrors(lostFields);
  document.getElementById("lostFormTitle").innerHTML = "Report a Lost Item";
  document.getElementById("lostSaveButton").value = "Submit Report";
}


/* 
 * FOUND ITEM POST : CREATE, READ, DELETE, SEARCH
 */

// READ + SEARCH
function renderFound() {
  let keyword = document.getElementById("foundSearch").value;
  let category = document.getElementById("foundCategoryFilter").value;

  let rows = "";
  let shown = 0;

  for (let i = 0; i < foundItems.length; i++) {
    let item = foundItems[i];

    let matchesKeyword = containsText(item.itemName, keyword) || containsText(item.location, keyword) ||
                         containsText(item.id, keyword);
    let matchesCategory = (category === "All" || item.category === category);

    if (matchesKeyword && matchesCategory) {
      let statusColor;
      switch (item.status) {
        case "Claim Pending":
          statusColor = "orange";
          break;
        case "Claimed":
          statusColor = "grey";
          break;
        default:
          statusColor = "green";
      }

      // A found post can only be deleted by the person who posted it
      let action = "&mdash;";
      if (isMine(item)) {
        action = "<button type='button' class='btn btn-small btn-danger' onclick='deleteFound(" + i + ")'>Delete</button>";
      }

      rows += "<tr>" +
                "<td>" + item.id + "</td>" +
                "<td><strong>" + item.itemName + "</strong><br><span class='hint'>" + item.description + "</span></td>" +
                "<td>" + item.category + "</td>" +
                "<td>" + item.location + "</td>" +
                "<td>" + item.dateFound + "</td>" +
                "<td><span class='badge " + statusColor + "'>" + item.status + "</span></td>" +
                "<td>" + action + "</td>" +
              "</tr>";
      shown++;
    }
  }

  if (shown === 0) {
    rows = "<tr><td colspan='7' class='empty-row'>No found items match your search.</td></tr>";
  }

  document.getElementById("foundTableBody").innerHTML = rows;
  document.getElementById("foundCount").innerHTML = "Showing " + shown + " of " + foundItems.length + " found items";
}


// CREATE: build a new object and push() it to the end of the array
function saveFound() {
  let itemName = document.getElementById("foundItemName").value.trim();
  let category = document.getElementById("foundCategory").value;
  let location = document.getElementById("foundLocation").value.trim();
  let dateFound = document.getElementById("foundDate").value;
  let description = document.getElementById("foundDescription").value.trim();
  let handed = getRadioValue("handedToOfficer");

  let isValid = true;
  clearErrors(foundFields);

  if (itemName.length < 2) {
    showError("foundItemName", "Item name must be at least 2 characters.");
    isValid = false;
  }

  if (category === "") {
    showError("foundCategory", "Please choose a category.");
    isValid = false;
  }

  if (location.length < 3) {
    showError("foundLocation", "Please write where you found it.");
    isValid = false;
  }

  if (dateFound === "") {
    showError("foundDate", "Please choose the date.");
    isValid = false;
  } else if (daysBetween(todayString(), dateFound) > 0) {
    showError("foundDate", "The date cannot be in the future.");
    isValid = false;
  }

  if (description.length < 10) {
    showError("foundDescription", "Please write at least 10 characters.");
    isValid = false;
  } else if (description.length > 200) {
    showError("foundDescription", "Please keep it under 200 characters.");
    isValid = false;
  }

  if (isValid === false) {
    return false;
  }

  let newItem = { id: nextId("F", foundItems), finderId: currentUserId, finderName: currentUserName,
                  itemName: itemName, category: category, location: location, dateFound: dateFound,
                  description: description, handedToOfficer: (handed === "Yes"), status: "Available" };
  foundItems.push(newItem);

  showMessage("foundMessage", "Found item <strong>" + newItem.id + "</strong> for <strong>" +
              itemName + "</strong> was posted.", "success");

  resetFoundForm();
  renderFound();
  renderClaimItems();
  return false;
}


// DELETE: only the finder can remove their own post, and only before a claim
function deleteFound(index) {
  let item = foundItems[index];

  if (item.status !== "Available") {
    showMessage("foundMessage", "<strong>" + item.itemName + "</strong> cannot be deleted: a claim is in progress.", "error");
    return;
  }

  foundItems = removeAt(foundItems, index);
  showMessage("foundMessage", "Found item <strong>" + item.id + "</strong> was deleted.", "info");
  renderFound();
  renderClaimItems();
}


function resetFoundForm() {
  document.getElementById("foundForm").reset();
  clearErrors(foundFields);
}


/* 
 * SEARCH & CLAIM REQUEST : CREATE, READ, SEARCH
 */

// Fills the "Found item" drop-down with items that can still be claimed
function renderClaimItems() {
  let keyword = document.getElementById("claimSearch").value;
  let category = document.getElementById("claimCategoryFilter").value;

  // Left-hand drop-down: only claimable items 
  let select = document.getElementById("claimItem");
  select.innerHTML = "<option value=''>-- Select Found Item --</option>";

  for (const item of foundItems) {
    if (whyNotClaimable(item.id) === "") {
      let option = document.createElement("option");
      option.value = item.id;
      option.innerHTML = item.id + " - " + item.itemName + " (" + item.location + ")";
      select.appendChild(option);
    }
  }

  // Right-hand table: every found item, with a Claim button 
  let rows = "";
  let shown = 0;

  for (const item of foundItems) {
    let matchesKeyword = containsText(item.itemName, keyword) || containsText(item.category, keyword) ||
                         containsText(item.location, keyword);
    let matchesCategory = (category === "All" || item.category === category);

    if (matchesKeyword && matchesCategory) {
      let reason = whyNotClaimable(item.id);
      let action;

      if (reason === "") {
        action = "<button type='button' class='btn btn-small btn-success' onclick=\"selectClaimItem('" +
                 item.id + "')\">Claim</button>";
      } else {
        action = "<span class='badge red'>" + reason + "</span>";
      }

      rows += "<tr>" +
                "<td>" + item.id + "</td>" +
                "<td><strong>" + item.itemName + "</strong></td>" +
                "<td>" + item.category + "</td>" +
                "<td>" + item.location + "</td>" +
                "<td>" + item.dateFound + "</td>" +
                "<td>" + action + "</td>" +
              "</tr>";
      shown++;
    }
  }

  if (shown === 0) {
    rows = "<tr><td colspan='6' class='empty-row'>No found items match your search.</td></tr>";
  }

  document.getElementById("claimTableBody").innerHTML = rows;
  document.getElementById("claimCount").innerHTML = "Showing " + shown + " of " + foundItems.length + " found items";
}


// Clicking "Claim" in the table copies the id into the drop-down
function selectClaimItem(foundId) {
  document.getElementById("claimItem").value = foundId;
  showSection("claimSection");
  document.getElementById("claimItem").focus();
}


// CREATE: one claim request per user per found item
function saveClaim() {
  let foundId = document.getElementById("claimItem").value;
  let proof = document.getElementById("claimProof").value.trim();
  let contact = document.getElementById("claimContact").value.trim();
  let collectWhere = getRadioValue("collectWhere");

  let isValid = true;
  clearErrors(claimFields);

  if (foundId === "") {
    showError("claimItem", "Please choose a found item.");
    isValid = false;
  } else {
    let reason = whyNotClaimable(foundId);
    if (reason !== "") {
      showError("claimItem", reason);
      isValid = false;
    }
  }

  if (proof.length < 15) {
    showError("claimProof", "Please describe proof of ownership (at least 15 characters).");
    isValid = false;
  } else if (proof.length > 300) {
    showError("claimProof", "Please keep it under 300 characters.");
    isValid = false;
  }

  if (isDigitsOnly(contact) === false || contact.length !== 11 || contact.slice(0, 2) !== "01") {
    showError("claimContact", "Contact must be 11 digits and start with 01.");
    isValid = false;
  }

  if (collectWhere === "") {
    showError("collectWhere", "Please choose how you will collect it.");
    isValid = false;
  }

  if (isValid === false) {
    return false;
  }

  let item = findFoundItem(foundId);
  let newClaim = { id: nextId("C", claimRequests), claimantId: currentUserId, claimantName: currentUserName,
                   foundId: item.id, foundName: item.itemName, proof: proof, contact: contact,
                   collectWhere: collectWhere, status: "Pending", date: todayString() };
  claimRequests.push(newClaim);

  // The item is now being checked by the Claim Verification Officer
  item.status = "Claim Pending";

  showMessage("claimMessage", "Claim <strong>" + newClaim.id + "</strong> for <strong>" +
              item.itemName + "</strong> was sent for verification.", "success");

  resetClaimForm();
  renderClaimItems();
  renderMyClaims();
  return false;
}


// The claims made by the logged-in user
function renderMyClaims() {
  let rows = "";
  let shown = 0;

  for (const claim of claimRequests) {
    if (claim.claimantId === currentUserId) {
      let statusColor;
      switch (claim.status) {
        case "Approved":
          statusColor = "green";
          break;
        case "Rejected":
          statusColor = "red";
          break;
        default:
          statusColor = "orange";
      }

      rows += "<tr>" +
                "<td>" + claim.id + "</td>" +
                "<td>" + claim.foundName + "</td>" +
                "<td>" + claim.date + "</td>" +
                "<td><span class='badge " + statusColor + "'>" + claim.status + "</span></td>" +
              "</tr>";
      shown++;
    }
  }

  if (shown === 0) {
    rows = "<tr><td colspan='4' class='empty-row'>You have no claim requests.</td></tr>";
  }

  document.getElementById("myClaimTableBody").innerHTML = rows;
  document.getElementById("myClaimCount").innerHTML = shown + " claim request(s)";
}


function resetClaimForm() {
  document.getElementById("claimForm").reset();
  clearErrors(claimFields);
  document.getElementById("claimContact").value = currentUserPhone;
}


/* 
 * UNIQUE FEATURE: MATCH A LOST REPORT WITH A FOUND ITEM
 */
function findMatchesFor(lostItem) {
  let matches = [];

  for (const found of foundItems) {
    if (found.status !== "Available") {
      continue;
    }

    let sameCategory = (found.category === lostItem.category);
    let sameWord = false;

    // Compare the words of the two descriptions
    let lostWords = lostItem.itemName.toLowerCase().split(" ");
    let foundText = (found.itemName + " " + found.description).toLowerCase();

    for (const word of lostWords) {
      if (word.length >= 3 && foundText.indexOf(word) !== -1) {
        sameWord = true;
      }
    }

    if (sameCategory && sameWord) {
      matches.push(found);
    }
  }

  return matches;
}

// Adds a short "Possible match" line under each open lost report
function renderMatches() {
  let box = document.getElementById("lostMatches");
  if (box === null) {
    return;
  }

  let html = "";
  let total = 0;

  for (const item of lostItems) {
    if (!isMine(item) || item.status !== "Open") {
      continue;
    }

    let matches = findMatchesFor(item);
    if (matches.length > 0) {
      total += matches.length;
      html += "<p><strong>" + item.itemName + "</strong> (report " + item.id + ") may match:</p>";
      for (const match of matches) {
        html += "<p>&mdash; <span class='badge blue'>" + match.id + "</span> " +
                match.itemName + " found at " + match.location + " on " + match.dateFound + "</p>";
      }
    }
  }

  if (total === 0) {
    box.innerHTML = "No possible matches found yet. We will keep looking.";
  } else {
    box.innerHTML = html;
  }
}


/*
 * START: runs once when the page has loaded
 */
renderLost();
renderFound();
renderClaimItems();
renderMyClaims();
renderMatches();
document.getElementById("claimContact").value = currentUserPhone;
showSection("lostSection");

// Every time the user switches back to a section, refresh its data
document.getElementById("nav-lostSection").addEventListener("click", renderLost);
document.getElementById("nav-foundSection").addEventListener("click", renderFound);
document.getElementById("nav-claimSection").addEventListener("click", function () {
  renderClaimItems();
  renderMyClaims();
});
