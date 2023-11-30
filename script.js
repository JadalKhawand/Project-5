const addThemebtn = document.querySelector(".addCard");
const cardThemes = document.querySelector(".cardThemes");
const cardTheme = document.querySelectorAll(".cardTheme");
const cardCont = document.querySelector(".cardContainer");
var editable = [];
var count = 0;

addThemebtn.addEventListener("click", () => {
  toggleCardThemes();
  count++;
});

function toggleCardThemes() {
  const translateYValue = count % 2 === 0 ? "0px" : "40px";
  cardTheme.forEach((elem, index) => {
    setTimeout(() => {
      elem.style.transform = `translateY(${translateYValue})`;
      elem.style.display = count % 2 === 0 ? "block" : "none";
    }, 50 * index);
  });
}

cardTheme.forEach((elem) => {
  elem.addEventListener("click", () => {
    handleCardClick(elem);
  });
});

function handleCardClick(selectedTheme) {
  removeCardTemplate();
  let color = selectedTheme.style.backgroundColor;
  const card = createCard(color);
  cardCont.prepend(card);

  const cards = document.querySelectorAll(".card");
  cards.forEach((card, cardIndex) => {
    setupCardEditing(card, cardIndex);
  });
}

function removeCardTemplate() {
  const cardTemplate = document.querySelector(".cardTemplate");
  if (cardTemplate) {
    cardTemplate.remove();
  }
}

function createCard(color) {
  const card = document.createElement("div");
  card.classList.add("card", "addCard");
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  card.innerHTML = `
    <div class="card addCard">
      <textarea class="cardTitle" placeholder="Type your note here..."></textarea>
      <span class="cardfooter flex justify-between">
        <small>${months[month]} ${day}, ${year}</small>
        <small class="cardEdit h-6 w-6 flex items-center justify-center bg-black text-white rounded-full cursor-pointer"><i class="fas fa-pen"></i></small>
      </span>
    </div>
  `;
  card.style.backgroundColor = color;

  return card;
}

function setupCardEditing(card, cardIndex) {
  editable[cardIndex] = false;

  const cardTitle = card.querySelector(".cardTitle");
  const cardEdit = card.querySelector(".cardEdit");

  cardTitle.addEventListener("input", () => {
    adjustTextareaHeight(cardTitle);
  });

  cardEdit.addEventListener("click", () => {
    if (!editable[cardIndex]) {
      cardTitle.contentEditable = "true";
      editable[cardIndex] = true;
      cardTitle.focus();
      adjustTextareaHeight(cardTitle);
      cardEdit.innerHTML = `<i class="fas fa-save"></i>`;
    }
  });
}

function adjustTextareaHeight(textarea) {
  textarea.style.height = "auto";
  textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`; // Set max height
}
