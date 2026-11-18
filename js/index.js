function renderCatalog() {
  let keyword = document.getElementById("catalogSearch").value;
  let category = document.getElementById("catalogCategory").value;

  let rows = "";
  let shown = 0;

  for (const item of foundItems) {
    // Only items still available are shown on the public page
    if (item.status !== "Available") {
      continue;
    }

    let matchesKeyword = containsText(item.itemName, keyword) ||
                         containsText(item.category, keyword) ||
                         containsText(item.location, keyword);
    let matchesCategory = (category === "All" || item.category === category);

    if (matchesKeyword && matchesCategory) {
      rows += "<tr>" +
                "<td><strong>" + item.itemName + "</strong><br><span class='hint'>" + item.description + "</span></td>" +
                "<td>" + item.category + "</td>" +
                "<td>" + item.location + "</td>" +
                "<td>" + item.dateFound + "</td>" +
                "<td><span class='badge green'>Available</span></td>" +
              "</tr>";
      shown++;
    }
  }

  if (shown === 0) {
    rows = "<tr><td colspan='5' class='empty-row'>No found items match your search.</td></tr>";
  }

  document.getElementById("catalogBody").innerHTML = rows;
  document.getElementById("catalogCount").innerHTML = shown + " found item(s)";
}


// Show every available found item when the page first opens
renderCatalog();

