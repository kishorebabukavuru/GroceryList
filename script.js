document.addEventListener("DOMContentLoaded", function() {
  let names = [];

  fetch('names.txt')
    .then(response => response.text())
    .then(data => {
      // Split the text into an array of names based on new lines
      names = data.trim().split('\n');
      populateNameList(names);
    })
    .catch(error => console.error('Error fetching file:', error));

  // Enable the send button when there are items in Panel 2
  const observer = new MutationObserver(() => {
    const selectedNames = document.getElementById("selected-names");
    document.getElementById("sendButton").disabled = selectedNames.childElementCount === 0;
  });

  observer.observe(document.getElementById("selected-names"), { childList: true });

  document.getElementById("sendButton").addEventListener("click", function() {
    const selectedNames = document.querySelectorAll("#selected-names li");
    const namesArray = Array.from(selectedNames).map(item => item.textContent);
    const timestamp = new Date().toLocaleString();
    const message = encodeURIComponent(`Selected Grocery List (${timestamp}):\n` + namesArray.join("\n"));
    const whatsappUrl = `https://wa.me/?text=${message}`;
    window.open(whatsappUrl, "_blank");
  });

  // add name to Panel 2 when checkbox is selected
  function addNameToPanel2(name) {
    const selectedNames = document.getElementById("selected-names");

    // Check if the name is already added to prevent duplicates
    const existingItem = selectedNames.querySelector(`li[data-name="${CSS.escape(name)}"]`);
    if (!existingItem) {
      const listItem = document.createElement("li");
      listItem.textContent = name;
      listItem.setAttribute("data-name", name); // Set attribute to find later for removal
      selectedNames.appendChild(listItem);
    }
  }

  // remove name from Panel 2 when checkbox is deselected
  function removeNameFromPanel2(name) {
    const selectedNames = document.getElementById("selected-names");
    const listItem = selectedNames.querySelector(`li[data-name="${CSS.escape(name)}"]`);
    if (listItem) {
      selectedNames.removeChild(listItem);
    }
  }

  // populate Panel 1 with checkboxes
  function populateNameList(names) {
    const nameList = document.getElementById("name-list");
    nameList.innerHTML = '';
    names.forEach((name) => {
      const listItem = document.createElement("li");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.addEventListener("change", (e) => {
        if (e.target.checked) {
          addNameToPanel2(name);
        } else {
          removeNameFromPanel2(name);
        }
      });

      const label = document.createElement("label");
      label.textContent = name;

      listItem.appendChild(checkbox);
      listItem.appendChild(label);

      nameList.appendChild(listItem);
    });
  }

  // Search box functionality
  document.getElementById("searchBox").addEventListener("input", function() {
    const query = this.value.toLowerCase();
    const filteredNames = names.filter(name => name.toLowerCase().includes(query));
    populateNameList(filteredNames);
  });
});
