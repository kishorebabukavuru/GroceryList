<!-- JavaScript -->
const names = ["John", "Mary", "David", "Emily", "Kevin"]; // sample data

// populate Panel 1 with checkboxes
names.forEach((name) => {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  (link unavailable) = name;
  checkbox.addEventListener("change", (e) => {
    if (e.target.checked) {
      addNameToPanel2(name);
    } else {
      removeNameFromPanel2(name);
    }
  });
  const label = document.createElement("label");
  label.textContent = name;
  document.getElementById("name-list").appendChild(checkbox);
  document.getElementById("name-list").appendChild(label);
});

// add name to Panel 2 when checkbox is selected
function addNameToPanel2(name) {
  const selectedNames = document.getElementById("selected-names");
  const listItem = document.createElement("li");
  listItem.textContent = name;
  selectedNames.appendChild(listItem);
}

// remove name from Panel 2 when checkbox is deselected
function removeNameFromPanel2(name) {
  const selectedNames = document.getElementById("selected-names");
  const listItem = document.querySelector(`#selected-names li[text="${name}"]`);
  selectedNames.removeChild(listItem);
}
