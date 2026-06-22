import "./styles.css";
import { loadPage } from "./page.js";
import { aboutPage } from "./about.js";
import { menuPage } from "./menu.js";
import { contactPage } from "./contact.js";


const homeBtn = document.querySelector('#home');
const aboutBtn = document.querySelector('#about');
const contactBtn = document.querySelector('#contact');
const menuBtn = document.querySelector('#menu');
const content = document.getElementById('content');

// aboutPage();
// loadPage();

loadPage();

homeBtn.addEventListener('click', () => {
    content.innerHTML = "";
    homeBtn.style.border = "1px solid #2B2B2B";
    menuBtn.style.border = "0px";
    aboutBtn.style.border = "0px";
    contactBtn.style.border = "0px";
    loadPage();
})

menuBtn.addEventListener('click', () => {
    content.innerHTML = "";
    menuBtn.style.border = "1px solid #2B2B2B";
    homeBtn.style.border = "0px";
    aboutBtn.style.border = "0px";
    contactBtn.style.border = "0px";
    menuPage();
})

aboutBtn.addEventListener('click', () => {
    content.innerHTML = "";
    aboutBtn.style.border = "1px solid #2B2B2B";
    menuBtn.style.border = "0px";
    contactBtn.style.border = "0px";
    homeBtn.style.border = "0px";
    aboutPage();
})

contactBtn.addEventListener('click', () => {
    content.innerHTML = "";
    contactBtn.style.border = "1px solid #2B2B2B";
    menuBtn.style.border = "0px";
    aboutBtn.style.border = "0px";
    homeBtn.style.border = "0px";
    contactPage();
})

