// Your code here!
const apiEndpoint= 'https://galvanize-student-apis.herokuapp.com/gpersonnel';

// * Dynamically generate the option list of roles by making a GET request to the following API endpoint:
// ``` https://galvanize-student-apis.herokuapp.com/gpersonnel/roles```
document.addEventListener('DOMContentLoaded', function(event) {

  axios.get(`${apiEndpoint}/roles`)
    .then(result => {

      //call addRolesToOptions function to dynamicaly create options listed in the drop down part of the Form
      let rolesArr = result.data;
      addRolesToOptions(rolesArr);


      let role = document.querySelector('#role');
      let options = document.querySelectorAll('option')
      let preview = document.querySelector('.role-preview');

      role.addEventListener('change', function(event) {
        rolesArr.forEach(role => {
          if (event.target.value === role.title) {
            preview.src = role.img
          }
        })
      })
    })

    const saveBtn = document.querySelector('.save')

    saveBtn.addEventListener('click', function(event) {
      event.preventDefault;

      let userObj = convertFormDataToObj();

      axios.post(`${apiEndpoint}/users`, userObj)
        .then(result => {
          if (result.status === 201) {
            message.innerHTML = result.data.message;

            const fadeImage = () => {
              $('.save-status').fadeOut(500);
              setTimeout(fadeImage, 2000);
            }
          }
        })
        .catch((err) => {
          console.log(`Error: ${err}.`)
        })
    })
}), false);

// * Whenever the save button is clicked, *the default behavior should be prevented*, and a POST request should be made to the following API endpoint:
//     ```
//     https://galvanize-student-apis.herokuapp.com/gpersonnel/users
//     ```
// * When the result of the `POST` from the save button returns, you should display the resulting `message` in a paragraph with the `.save-status` class
// * You will need to `show` the `.save-status` paragraph after setting the message.

//uses result of GET request made to https://galvanize-student-apis.herokuapp.com/gpersonnel/roles to dynamically create the items listed in the drop down menu of the form
function addRolesToOptions(roles) {
  for (let i=0; i < roles.length; i++) {
    let options = document.querySelectorAll('option')
    let optionElem = document.createElement('option');
    optionElem.value = `${roles[i].title}`;
    optionElem.innerHTML = `${roles[i].title}`;

    options.appendChild(optionElem);
  }
}

// * Whenever the role is changed, the image should be updated with the `img` of that role.
// function updateImageDisplayed(roleChoice) {
//   let previewImageURL = document.querySelector('.role-preview')
//
//   for (let i=0; i <roles.length; i++) {
//     if (roleChosen == roles[i].title) {
//       imageChoice.src = roles[i].img;
//     }
//   }
//   return;
// }


// * The format of the body for the POST request should be:
//   ```js
//   {
//     firstName: 'First',
//     lastName: 'Last',
//     role: 'Selected Role'
//   }
//   ```
function convertFormDataToObj() {
  const fName = document.querySelector('#first_name').value;
  const lName = document.querySelector('#last_name').value;
  const role = document.querySelector('#role').value;
  const message = document.querySelector('.save-status');

  if (fName.length === 0  || lName.length === 0) {
    return;
  }

  return {
    firstName: `${fName}`,
    lastName: `${lName}`,
    role: `${role}`
  };
}
