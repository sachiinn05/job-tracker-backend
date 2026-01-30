const validator=require("validator");

const validateSignUpData=(req)=>{
    const  {firstName ,lastName, emailId, password}=req.body;
    if(! firstName || !lastName)
    {
        throw new Error("Name is invalid");
    }
    else if(!validator.isEmail(emailId))
    {
        throw new Error("Email is invalid ");
    }
    else if(! validator.isStrongPassword(password))
    {
        throw new Error ("Please enter string passord");
    }
}

const validateEditProfileData=(req)=>{
     const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "age",
    "gender",
    "photo",
    "about",
    "skills",
  ];
  const isEditiAllowed=Object.keys(req.body).every((fields)=>allowedEditFields.includes(fields));
  return isEditiAllowed;
}
module.exports={validateSignUpData,validateEditProfileData};