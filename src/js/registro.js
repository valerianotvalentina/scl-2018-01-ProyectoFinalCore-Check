function saveUser(){
    console.log("saveUser");
    let newUser = getForm();
    console.log(newUser);
    let newRegistroKey = firebase.database().ref().child('registros').push().key;
    console.log(newRegistroKey);
    firebase.database().ref(`registros/${newRegistroKey}`).set({
        userName : newUser.userName,
        eMail : newUser.eMail,
        enterpriseFrom : newUser.enterpriseFrom,
        collaboratorName : newUser.collaboratorName,
        reasonVisit : newUser.reasonVisit
    }, function(error){
        console.log('Listo!!!!');
       //window.location = 'otro.html';
   });  
}
function getForm(){
  let reasonVisit;
  if(document.getElementById("meetingCheck").checked === true) {
    reasonVisit = 'meeting';
  }
  if(document.getElementById("interviewCheck").checked === true) {
    reasonVisit = 'interview';
  }
  if(document.getElementById("personalCheck").checked === true) {
    reasonVisit = 'personal';
  }
  if(document.getElementById("otherCheck").checked === true) {
    reasonVisit = 'other';
  }

  let newUser = {
     userName : document.getElementById("userName").value,
     eMail : document.getElementById("eMail").value,
     enterpriseFrom : document.getElementById("enterpriseFrom").value,
     collaboratorName : document.getElementById("collaboratorName").value,
     reasonVisit : reasonVisit
  } 
  return newUser;
}
function validateform(user){

}