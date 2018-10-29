// Your code here!
const apiEndpoint= 'https://galvanize-student-apis.herokuapp.com/gpersonnal';
const roleChoice = document.querySelector('#role');
const imageChoice = document.querySelector('.role-preview');
const saveButton = document.querySelector('.save');
let roles;

// * Dynamically generate the option list of roles by making a GET request to the following API endpoint:
 // ``` https://galvanize-student-apis.herokuapp.com/gpersonnel/roles
 // ```

document.addEventListener('DOMContentLoaded', function(event) {
  axios.get(`${apiEndpoint}/roles`)
    .then(result => {
      roles = result.data;

      generateRoles(roles);

    })
    .catch((err) => {
      console.log(`Error: ${err}.`);
    })
})

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
function updateImage(roles) {
  let selectedRole = roleChoice.options[roleChoice.selectedIndex].text;

  for (let i=0; i <roles.length; i++) {
    if (selectedRole == roles[i].title) {
      imageChoice.src = roles[i].img;
    }
  }
  return;
}

// * Whenever the save button is clicked, *the default behavior should be prevented*, and a POST request should be made to the following API endpoint:
//
//     ```
//     https://galvanize-student-apis.herokuapp.com/gpersonnel/users
//     ```

// * The format of the body for the POST request should be:
//
//   ```js
//   {
//     firstName: 'First',
//     lastName: 'Last',
//     role: 'Selected Role'
//   }
//   ```

// * No key or value in the POST body can be empty and the role must match one of the roles returned from the initial API call.
