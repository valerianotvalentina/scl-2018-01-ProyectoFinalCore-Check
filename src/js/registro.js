function saveUser(){
    let newUser = getForm();
    console.log("saveUser");
}
function getForm(){
  let newUser = {
     userName = document.getElementById("userName").Value,
     eMail = document.getElementById("eMail").Value,
     enterpriseFrom = document.getElementById("enterpriseFrom").Value,
     collaboratorName = document.getElementById("collaboratorName").Value,
     meetingCheck = document.getElementById("meetingCheck").Value,
     interviewCheck = document.getElementById("interviewCheck").Value,
     personalCheck = document.getElementById("personalCheck").Value,
     otherCheck = document.getElementById("otherCheck").Value
  } 
  return newUser;
}
function validateform(user){


}