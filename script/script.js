import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import { openPopup, hidePopup } from "./utils.js";

//Wrappers
const editProfileModal = document.querySelector(".popup_type_edit-profile");
const editFormElement = editProfileModal.querySelector(".form");

const addCardModal = document.querySelector(".popup_type_add-card");
const addCardFormElement = addCardModal.querySelector(".form");

const cardViewModal = document.querySelector(".popup_type_card");
const cardViewImgage = cardViewModal.querySelector(".popup__image");
const cardViewDescription = cardViewModal.querySelector(".popup__description");

const gallery = document.querySelector(".gallery");

//Buttons
const editProfileModalButton = document.querySelector(".profile__button-edit");
const editProfileModalCloseButton =
  editProfileModal.querySelector(".popup__close");

const cardViewModalCloseButton = cardViewModal.querySelector(".popup__close");

const addCardModalButton = document.querySelector(".profile__button-add");
const addCardModalCloseButton = addCardModal.querySelector(".popup__close");

//Inputs
const nameEditProfileInput = document.querySelector(
  ".form__input_content_name"
);

const jobEditProfileInput = document.querySelector(".form__input_content_job");

const titleAddCardInput = document.querySelector(".form__input_content_title");
const linkAddCardInput = document.querySelector(".form__input_content_link");

//Form data
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");

const cardTemplate = document.querySelector("#card").content;

const configClasses = {
  inputSelector: ".form__input",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
};

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

/**
 * Generate new card
 * @param {Object} cardObject 
 * @returns Object 
 */
const createCard = (cardObject) => {
  const card = new Card(cardObject.name, cardObject.link, cardTemplate, openPreviewPopup);
  return card.generateCard();
};

/**
 * Fill data in CardViewPopup
 * @param {string} card
 */
const openPreviewPopup = (card) => {
  const image = card.querySelector(".card__image");

  cardViewImgage.src = image.src;
  cardViewImgage.alt = image.alt;
  cardViewDescription.textContent = image.alt;
  openPopup(document.querySelector(".popup_type_card"));
};

/**
 * Fill data in editProfileMockup
 * @param {string} name
 * @param {string} job
 */
const fillEditProfileForm = (name, job) => {
  nameEditProfileInput.value = name;
  jobEditProfileInput.value = job;
};

/**
 * Submit information profile title and subtitle
 * @param {event} evt
 */
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameEditProfileInput.value;
  profileJob.textContent = jobEditProfileInput.value;

  hidePopup(editProfileModal);
};

/**
 * Submit information about new card
 * @param {event} evt
 */
const handleAddCardFormSubmit = (evt) => {
  evt.preventDefault();
  const cardInput = {
    name: titleAddCardInput.value,
    link: linkAddCardInput.value,
  };
  const cardElement = createCard(cardInput);
  gallery.prepend(cardElement);

  hidePopup(addCardModal);
  addCardFormElement.reset();
  addCardFormValidation.toggleButtonState();
};

editProfileModalButton.addEventListener("click", () => {
  fillEditProfileForm(profileName.textContent, profileJob.textContent);
  openPopup(editProfileModal);
});
editProfileModalCloseButton.addEventListener("click", () => {
  hidePopup(editProfileModal);
});

addCardModalButton.addEventListener("click", () => {
  openPopup(addCardModal);
});
addCardModalCloseButton.addEventListener("click", () => {
  hidePopup(addCardModal);
});

cardViewModalCloseButton.addEventListener("click", () => {
  hidePopup(cardViewModal);
});



//Add all cards from array by templates
initialCards.forEach((card) => {
  const cardElement = createCard(card);
  gallery.append(cardElement);
});

editFormElement.addEventListener("submit", handleProfileFormSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);


const editProfileFormValidator = new FormValidator(configClasses, editFormElement);
editProfileFormValidator.enableValidation();
const addCardFormValidation = new FormValidator(
  configClasses,
  addCardFormElement
);
addCardFormValidation.enableValidation();