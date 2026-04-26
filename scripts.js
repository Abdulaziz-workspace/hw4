/* =========================================================
   CSC457 - HW4
   Adding Interactivity with JavaScript and the DOM
   Author: Abdulaziz Al-Aqeel
   File:   scripts.js  (linked to all HTML pages)
   ========================================================= */


/* ---------------------------------------------------------
   1) FORM VALIDATION  (contact.html)
   Validates the contact form on submit.
   Uses getElementById() to access the Name and Email fields.
   Uses if/else to check for empty values.
   Uses alert() to inform the user, and prevents submission
   if validation fails.
   --------------------------------------------------------- */
function validateContactForm(event) {
  // Locally-scoped variables (best practice).
  var nameField  = document.getElementById("name");
  var emailField = document.getElementById("email");

  var nameValue  = nameField.value.trim();
  var emailValue = emailField.value.trim();

  if (nameValue === "" || emailValue === "") {
    alert("Please fill out all required fields.");
    // Stop the form from submitting.
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    return false;
  } else {
    // Form is valid — allow submission.
    return true;
  }
}


/* ---------------------------------------------------------
   2) DOM MANIPULATION  (projects.html)
   Toggles the visibility of a project description <p> by
   changing its .style.display between "block" and "none".
   The button passes the description's id as an argument.
   --------------------------------------------------------- */
function toggleProjectDescription(descriptionId, btn) {
  var description = document.getElementById(descriptionId);

  if (description.style.display === "none") {
    description.style.display = "block";
    if (btn) { btn.textContent = "Hide Description"; }
  } else {
    description.style.display = "none";
    if (btn) { btn.textContent = "Show Description"; }
  }
}


/* ---------------------------------------------------------
   3) EVENT HANDLING  (cv.html)
   Uses addEventListener() to attach handlers to the
   <blockquote>'s onmouseover and onmouseout events.
   Changes background color and font-style on hover, and
   reverts to the original styling on mouse-out.
   --------------------------------------------------------- */
function setupBlockquoteHover() {
  var quote = document.querySelector("blockquote");
  if (!quote) { return; } // Only run on cv.html.

  // Save original styles so we can revert correctly.
  var originalBg        = quote.style.backgroundColor;
  var originalFontStyle = quote.style.fontStyle;

  quote.addEventListener("mouseover", function () {
    quote.style.backgroundColor = "#fff3cd"; // soft yellow highlight
    quote.style.fontStyle        = "italic";
  });

  quote.addEventListener("mouseout", function () {
    quote.style.backgroundColor = originalBg;
    quote.style.fontStyle        = originalFontStyle;
  });
}


/* ---------------------------------------------------------
   4) ADDING NEW ELEMENTS  (index.html)
   When the page finishes loading, dynamically create a
   new <p> showing the current date/time and append it to
   the <footer>.
   --------------------------------------------------------- */
function addLoadTimestampToFooter() {
  var footer = document.querySelector("footer");
  if (!footer) { return; }

  // Only run on the homepage (index.html).
  // We detect the homepage by the presence of #intro.
  var isHomepage = document.getElementById("intro") !== null;
  if (!isHomepage) { return; }

  var now      = new Date();
  var newPara  = document.createElement("p");
  var textNode = document.createTextNode(
    "Page loaded on: " + now.toLocaleString()
  );

  newPara.appendChild(textNode);
  footer.appendChild(newPara);
}


/* ---------------------------------------------------------
   PAGE LOAD HOOK
   Runs when the page finishes loading (onload event).
   Wires up handlers that depend on the DOM being ready.
   --------------------------------------------------------- */
window.onload = function () {
  // Homepage: add timestamp paragraph to footer.
  addLoadTimestampToFooter();

  // CV page: attach mouseover / mouseout listeners to the
  // blockquote element.
  setupBlockquoteHover();

  // Contact page: attach the validation handler to the
  // form's onsubmit event (in addition to the inline
  // onsubmit attribute, this is a defensive backup).
  var contactForm = document.querySelector("form");
  if (contactForm && document.getElementById("name") &&
      document.getElementById("email")) {
    contactForm.onsubmit = validateContactForm;
  }
};
