 // define handy variables

 const generatePass = function() {

  const upperABC = 'ABCDEFGHIGKLMNOPQRSTUVWXYZ';
  const lowerAbc = 'abcdefghigklmnopqrstuvwxyz';
  const specialChar = '!@£$%^&*()_+?/#';
  const numbers = "123456789";

  const charset = upperABC + lowerAbc + specialChar + numbers;
  const passLength = 12;

  let password = '';
  for(let i = 0 ; i < 12; i++ ) {
    const randomIndex = Math.floor(Math.random() * charset.length )
       password += charset[randomIndex];

      }
console.log(password);
return password;
};
// get the field in the html file to update
const updateField = function(){
const passwordField = document.getElementById('generatedPassword');
const generatefn = generatePass();
passwordField.value = generatefn;
};
// listen to button click
const button = document.getElementById('generateBtn');
button.addEventListener("click",updateField);

// clear inputs after refresh
function clearInp () {
document.getElementById('generatedPassword').value = "";
}
