document.addEventListener("DOMContentLoaded", function() {
  fetch('names.txt')
    .then(response => response.text())
    .then(data => {
      // Split the text into an array of names based on new lines
      const names = data.trim().split('\n');
      
      // populate Panel 1 with checkboxes
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

        document.getElementById("name-list").appendChild(listItem);
      });
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
    const message = encodeURIComponent("Selected Names: " + namesArray.join(", "));
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
});
