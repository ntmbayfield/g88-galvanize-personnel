// Your code here!
const apiEndpoint= 'https://galvanize-student-apis.herokuapp.com/gpersonnel';
const roleChoice = document.querySelector('#role');
const imageChoice = document.querySelector('.role-preview');
const saveButton = document.querySelector('.save');
let roles;

// * Dynamically generate the option list of roles by making a GET request to the following API endpoint:
// ``` https://galvanize-student-apis.herokuapp.com/gpersonnel/roles```
document.addEventListener('DOMContentLoaded', function(event) {
  axios.get(`${apiEndpoint}/roles`)
    .then(result => {
      roles = result.data;

      generateRoles(roles);
      convertFormDataToObj(roles);
    })
    .catch((err) => {
      console.log(`Error: ${err}.`);
    })
})

roleChoice.addEventListener('change', function(event) => {
  changeImageDisplayed(roles);
})

// * Whenever the save button is clicked, *the default behavior should be prevented*, and a POST request should be made to the following API endpoint:
//     ```
//     https://galvanize-student-apis.herokuapp.com/gpersonnel/users
//     ```
saveButton.addEventListener('click', function(event) => {
  event.preventDefault();
  let user = convertFormDataToObj();

  if (!user) {
    let message = document.querySelector('.save-status');
    message.innerHTML = 'Unable to locate user.';
    message.style.display = "block";
  }

  // * When the result of the `POST` from the save button returns, you should display the resulting `message` in a paragraph with the `.save-status` class
  // * You will need to `show` the `.save-status` paragraph after setting the message.
  axios.post(`${api}/users`, user)
    .then(result => {
      let message = document.querySelector('.save-status')
      if (result.data.message === 'Success!') {
        message.innerHTML = result.data.message;
        message.style.display = block;
      }
    })
    .catch((err) => {
      console.log(`Error: ${err}.`)
    })
})

//uses result of GET request made to https://galvanize-student-apis.herokuapp.com/gpersonnel/roles to dynamically create the items listed in the drop down menu of the form
function generateRoles(roles) {
  for (let i=0; i < roles.length; i++) {
    let role = roles[i].title;
    let image = roles[i].img;
    let option = document.createElement('option');

    option.value = `${role}`;
    option.text = `${role}`;
    roleChoice.appendChild(option);
  }
}

// * Whenever the role is changed, the image should be updated with the `img` of that role.
function changeImageDisplayed(roles) {
  let roleChosen = roleChoice.options[roleChoice.selectedIndex].text;

  for (let i=0; i <roles.length; i++) {
    if (roleChosen == roles[i].title) {
      imageChoice.src = roles[i].img;
    }
  }
  return;
}


// * The format of the body for the POST request should be:
//   ```js
//   {
//     firstName: 'First',
//     lastName: 'Last',
//     role: 'Selected Role'
//   }
//   ```
function convertFormDataToObj() {
  let firstName = document.querySelector('#first_name').value;
  let lastName = document.querySelector('#last_name').value;
  let role = document.querySelector('#role').value;

  if (firstName.length === 0  || lastName.length === 0) {
    return;
  }

  return {
    firstName: firstName,
    lastName: lastName,
    role: role
  };
}



// * No key or value in the POST body can be empty and the role must match one of the roles returned from the initial API call.
