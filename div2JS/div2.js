var isOpen = false;

function togglePanel() {
  isOpen = !isOpen;
  var divElement = document.querySelector('.div2');

  if (isOpen) {
    divElement.classList.add("collapsed");
    divElement.classList.remove("expanded");
  }
  else {
    divElement.classList.add("expanded");
    divElement.classList.remove("collapsed");
  }
}
