const ROLES_URL = 'https://galvanize-student-apis.herokuapp.com/gpersonnel/roles';
const USERS_URL = 'https://galvanize-student-apis.herokuapp.com/gpersonnel/users';

const $form = $('form');
const $firstNameInput = $('#firstName');
const $lastNameInput = $('#lastName');
const $roleSelect = $('#role');
const $roleImage = $('#roleImage');
const $saveStatus = $('.save-status');

$(appReady);

function appReady() {
  $firstNameInput.focus();
  getRoles();
  $form.submit(submitForm);
}

function getRoles() {
  $.get(ROLES_URL)
    .then(setupRoles);
}

function setupRoles(roles) {
  roles.forEach(addRole);
  $roleSelect.change(updateRoleImage);
}

function addRole(role) {
  $roleSelect.append(`<option data-img="${role.img}" value="${role.title}">${role.title}</option>`)
}

function updateRoleImage() {
  const $selectedOption = $('option:selected');
  const roleImageURL = $selectedOption.get(0).dataset.img;
  $roleImage.attr('src', roleImageURL);
}

function submitForm(event) {
  event.preventDefault();
  const user = getUserFromForm();

  $.post(USERS_URL, user)
    .then(showMessage)
    .catch(showError);
}

function getUserFromForm() {
  return {
    firstName: $firstNameInput.val(),
    lastName: $lastNameInput.val(),
    role: $roleSelect.val()
  }
}

function showMessage(response) {
  updateMessage(response.message)
}

function showError(error) {
  updateMessage(error.responseJSON.message);
}

function updateMessage(message) {
  $saveStatus.text(message).fadeIn(500).delay(2000).fadeOut(500);
}
