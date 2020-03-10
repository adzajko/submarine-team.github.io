// ===== [Imports] =========================== //
import User from "./Models/User.js";
import Company from "./Models/Company.js";
import firebaseConfig from "./config.js";

firebase.initializeApp(firebaseConfig);
firebase.analytics();

// [Database References]
let userRef = firebase.database().ref("users");
let companyRef = firebase.database().ref("companies");

// [Functions]
const saveUser = user => {
  let newUserRef = userRef.push();
  newUserRef.set(user);
};

const saveCompany = company => {
  let newCompanyRef = companyRef.push();
  newCompanyRef.set(company);
};
