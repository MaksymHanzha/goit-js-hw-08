import throttle from 'lodash.throttle';

const formElements = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

formElements.addEventListener('submit', onFormSubmit);
formElements.addEventListener('input', throttle(onInputChange, 500));

const savedData = localStorage.getItem(STORAGE_KEY);

if (savedData) fillFormCurrentData();

function onFormSubmit(e) {
  e.preventDefault();
  e.currentTarget.reset();
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  localStorage.removeItem(STORAGE_KEY);
}

function onInputChange(e) {
  const formData = new FormData(formElements);
  const formDataJSON = JSON.stringify(Object.fromEntries(formData));
  localStorage.setItem(STORAGE_KEY, formDataJSON);
}

function fillFormCurrentData() {
  try {
    const savedDataObj = JSON.parse(savedData);

    Object.keys(savedDataObj).forEach(
      key => (formElements[key].value = savedDataObj[key])
    );
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  }
}
