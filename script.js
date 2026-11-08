// =========================
// SELECT HTML ELEMENTS
// =========================

const searchInput = document.getElementById("searchInput");

const cards = document.querySelectorAll(".card");

const noResults = document.getElementById("noResults");

const modal = document.getElementById("detailsModal");

const modalImage = document.getElementById("modalImage");

const modalTitle = document.getElementById("modalTitle");

const modalCategory = document.getElementById("modalCategory");

const modalDescription = document.getElementById("modalDescription");

const closeModalButton = document.getElementById("closeModal");

const modalDoneButton = document.getElementById("modalDone");

let lastFocusedElement = null;


// =========================
// SEARCH IMAGE CARDS
// =========================

searchInput.addEventListener("input", function () {

    const searchTerm = this.value.trim().toLowerCase();

    let visibleCards = 0;

    cards.forEach(function (card) {

        const title = card.dataset.title.toLowerCase();

        const category = card.dataset.category.toLowerCase();

        const description = card.dataset.description.toLowerCase();

        const matches =
            title.includes(searchTerm) ||
            category.includes(searchTerm) ||
            description.includes(searchTerm);

        card.hidden = !matches;

        if (matches) {
            visibleCards++;
        }

    });

    noResults.hidden = visibleCards !== 0;

});


// =========================
// OPEN DETAILS POPUP
// =========================

cards.forEach(function (card) {

    const detailsButton = card.querySelector(".details-btn");

    detailsButton.addEventListener("click", function () {

        lastFocusedElement = detailsButton;

        // Read information from the selected card.
        const title = card.dataset.title;

        const category = card.dataset.category;

        const description = card.dataset.description;

        const image = card.dataset.image;

        // Display information inside the popup.
        modalTitle.textContent = title;

        modalCategory.textContent = category;

        modalDescription.textContent = description;

        modalImage.src = image;

        modalImage.alt = title;

        // Show popup.
        modal.hidden = false;

        modal.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

        closeModalButton.focus();

    });

});


// =========================
// CLOSE POPUP FUNCTION
// =========================

function closeModal() {

    modal.hidden = true;

    modal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

    // Return keyboard focus to the button that opened the popup.
    if (lastFocusedElement) {
        lastFocusedElement.focus();
    }

}


// Close using the X button.

closeModalButton.addEventListener("click", closeModal);


// Close using the Back to Gallery button.

modalDoneButton.addEventListener("click", closeModal);


// Close by clicking the dark background.

modal.addEventListener("click", function (event) {

    if (event.target === modal) {
        closeModal();
    }

});


// Close using the Escape key.

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape" && !modal.hidden) {
        closeModal();
    }

});


// =========================
// AUTOMATIC FOOTER YEAR
// =========================

document.getElementById("currentYear").textContent =
    new Date().getFullYear();