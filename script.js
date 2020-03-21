// ===== [Imports] =========================== //
import User from './Models/User.js';
import Company from './Models/Company.js';
import firebaseConfig from './config.js';

firebase.initializeApp(firebaseConfig);
firebase.analytics();

// [Database References]
let userRef = firebase.database().ref('users');
let companyRef = firebase.database().ref('companies');

// [Functions]
const saveUser = user => {
  let newUserRef = userRef.push();
  newUserRef.set(user);
};

const saveCompany = company => {
  let newCompanyRef = companyRef.push();
  newCompanyRef.set(company);
};

//Hamburger toggler

const navbarBrand = document.querySelector('.navbar-brand');

navbarBrand.addEventListener('click', () => {
  document.getElementById('sub-to-home').classList.toggle('v-none');
  const hamburgerLineTop = document.querySelector('.hamburger-line.top');
  const hamburgerLineBottom = document.querySelector('.hamburger-line.bottom');
  const overlay = document.querySelector('.overlay');

  navbarBrand.classList.toggle('brand-fixed');
  hamburgerLineTop.classList.toggle('open');
  hamburgerLineBottom.classList.toggle('open');
  overlay.classList.toggle('h-100');
});
