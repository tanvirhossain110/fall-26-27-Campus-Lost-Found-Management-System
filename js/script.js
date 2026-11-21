
// CLAIM VERIFICATION OFFICER PORTAL
// JavaScript File


// ================================================
// 1. COMMON MESSAGE FUNCTION
// ================================================

function showMessage(messageId, message, color) {

    let messageBox = document.getElementById(messageId);

    if (messageBox === null) {
        messageBox = document.createElement("div");
        messageBox.id = messageId;
        document.body.appendChild(messageBox);
    }

    messageBox.innerHTML = message;
    messageBox.style.color = color;
}


// ================================================
// 2. CLAIM EVIDENCE REVIEW
// ================================================

const evidenceButtons = document.querySelectorAll("table button");

for (let i = 0; i < evidenceButtons.length; i++) {

    if (evidenceButtons[i].innerHTML.trim() === "View Evidence File") {

        evidenceButtons[i].addEventListener("click", function () {

            const row = this.parentElement.parentElement;

            let claimId = row.cells[0].innerHTML.trim();
            let itemName = row.cells[1].innerHTML.trim();
            let claimantName = row.cells[2].innerHTML.trim();
            let evidence = row.cells[3].innerHTML.trim();

            let details = document.getElementById("evidenceDetails");

            if (details === null) {
                details = document.createElement("div");
                details.id = "evidenceDetails";
                document.body.appendChild(details);
            }

            details.innerHTML =
                "<h3>Evidence Details</h3>" +
                "<p>Claim ID: " + claimId + "</p>" +
                "<p>Item Name: " + itemName + "</p>" +
                "<p>Claimant Name: " + claimantName + "</p>" +
                "<p>Submitted Evidence: " + evidence + "</p>";

        });
    }
}


// ================================================
// 3. OWNERSHIP VERIFICATION DECISION
// ================================================

const decisionForm = document.querySelector("form");

if (decisionForm !== null) {

    decisionForm.addEventListener("submit", function (event) {

        event.preventDefault();

        let claimId = document.getElementById("claim-id").value.trim();

        let decision = document.getElementById("decision").value.trim();

        let remarks = document.getElementById("remarks").value.trim();

        let isValid = true;

        let errorMessage = "";

        // Clear previous message

        showMessage("decisionMessage", "", "red");


        // Claim ID Validation

        if (claimId === "") {

            errorMessage += "<p>Please select a Claim ID.</p>";

            isValid = false;
        }


        // Decision Validation

        if (decision === "") {

            errorMessage += "<p>Please select a decision.</p>";

            isValid = false;
        }


        // Remarks Validation

        if (remarks.length < 5) {

            errorMessage +=
                "<p>Remarks must contain at least 5 characters.</p>";

            isValid = false;
        }


        // Display Validation Errors

        if (isValid === false) {

            showMessage(
                "decisionMessage",
                errorMessage,
                "red"
            );

            return;
        }


        // Get Selected Text

        const claimSelect = document.getElementById("claim-id");

        const decisionSelect = document.getElementById("decision");

        let claimText =
            claimSelect.options[claimSelect.selectedIndex].text;

        let decisionText =
            decisionSelect.options[decisionSelect.selectedIndex].text;


        // Display Successful Message

        showMessage(
            "decisionMessage",

            "<h3>Decision Submitted Successfully</h3>" +
            "<p>Claim: " + claimText + "</p>" +
            "<p>Decision: " + decisionText + "</p>" +
            "<p>Officer Remarks: " + remarks + "</p>",

            "green"
        );

        this.reset();

    });
}


// ================================================
// 4. DISPUTED CLAIM INVESTIGATION
// ================================================

const investigationButtons = document.querySelectorAll("table button");

for (let i = 0; i < investigationButtons.length; i++) {

    if (
        investigationButtons[i].innerHTML.trim()
        === "Open Investigation Case"
    ) {

        investigationButtons[i].addEventListener("click", function () {

            const row = this.parentElement.parentElement;

            let itemId = row.cells[0].innerHTML.trim();

            let itemDescription = row.cells[1].innerHTML.trim();

            let claimants = row.cells[2].innerHTML.trim();

            let conflictDetails = row.cells[3].innerHTML.trim();


            let investigationDetails =
                document.getElementById("investigationDetails");


            if (investigationDetails === null) {

                investigationDetails = document.createElement("div");

                investigationDetails.id = "investigationDetails";

                document.body.appendChild(investigationDetails);
            }


            investigationDetails.innerHTML =

                "<h3>Investigation Case Opened</h3>" +

                "<p>Item ID: " + itemId + "</p>" +

                "<p>Item Description: " +
                itemDescription + "</p>" +

                "<p>Claimants: " + claimants + "</p>" +

                "<p>Conflict Details: " +
                conflictDetails + "</p>" +

                "<p>Status: Under Investigation</p>";


            // Change Button Text

            this.innerHTML = "Investigation Opened";

        });
    }
}


// ================================================
// 5. FORM RESET MESSAGE
// ================================================

if (decisionForm !== null) {

    const remarksField = document.getElementById("remarks");

    if (remarksField !== null) {

        remarksField.addEventListener("input", function () {

            if (this.value.trim().length >= 5) {

                this.style.borderColor = "green";

            } else {

                this.style.borderColor = "red";

            }

        });
    }
}
