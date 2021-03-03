import './sass/main.scss';
import canvasDots from './heroCanvas.js';
import canvasDotsBg from './bgCanvas.js';
import { doc } from 'prettier';

window.onload = function () {
  canvasDotsBg();
  canvasDots();
};

// loads in about section on scroll
function aboutFadeIn(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting && document.body.scrollWidth > 1300) {
      // console.log('yo');
      // fade in bio
      document.querySelector('.profile').classList.add('profile__fade-in');

      // fade in skills 1 at a time after bio has loaded
      const sleep = (milliseconds) => {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
      };

      //html
      sleep(1000).then(() => {
        document
          .querySelector('.skills__item--html')
          .classList.add('skills__item-fade-in');
      });

      //webpack
      sleep(1100).then(() => {
        document
          .querySelector('.skills__item--webpack')
          .classList.add('skills__item-fade-in');
      });

      //js
      sleep(1200).then(() => {
        document
          .querySelector('.skills__item--js')
          .classList.add('skills__item-fade-in');
      });

      //git
      sleep(1300).then(() => {
        document
          .querySelector('.skills__item--git')
          .classList.add('skills__item-fade-in');
      });

      //sass
      sleep(1400).then(() => {
        document
          .querySelector('.skills__item--sass')
          .classList.add('skills__item-fade-in');
      });

      //node
      sleep(1500).then(() => {
        document
          .querySelector('.skills__item--npm')
          .classList.add('skills__item-fade-in');
      });

      //py
      sleep(1600).then(() => {
        document
          .querySelector('.skills__item--python')
          .classList.add('skills__item-fade-in');
      });

      //react
      sleep(1700).then(() => {
        document
          .querySelector('.skills__item--react')
          .classList.add('skills__item-fade-in');
      });

      //r
      sleep(1800).then(() => {
        document
          .querySelector('.skills__item--r')
          .classList.add('skills__item-fade-in');
      });

      //css
      sleep(1900).then(() => {
        document
          .querySelector('.skills__item--css')
          .classList.add('skills__item-fade-in');
      });
    }
  });
}

let options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
};

let options2 = {
  root: null,
  rootMargin: '0px',
  threshold: 0.2,
};

let observer = new IntersectionObserver(aboutFadeIn, options);

observer.observe(document.querySelector('.about__content'));

// navigation items in nav bar
const navLinks = document.querySelectorAll('.navigation__item');

// change highlighted nav link depending on page position
function navFadeIn(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // console.log(entry.target.id);

      navLinks.forEach((link) => {
        link.classList.remove('navigation__item--active');
      });

      document
        .querySelector(`#nav-${entry.target.id}`)
        .classList.add('navigation__item--active');
    }
  });
}

// projects section is a lot longer and needs custom settings
function navFadeInProjects(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // console.log(entry.target.id);

      navLinks.forEach((link) => {
        link.classList.remove('navigation__item--active');
      });

      document
        .querySelector(`#nav-${entry.target.id}`)
        .classList.add('navigation__item--active');
    }
  });
}

let observerNav = new IntersectionObserver(navFadeIn, options);

observerNav.observe(document.querySelector('#hero'));
observerNav.observe(document.querySelector('#about'));
observerNav.observe(document.querySelector('#contact'));

let observerNavProjects = new IntersectionObserver(navFadeInProjects, options2);

observerNavProjects.observe(document.querySelector('#projects'));

// parralax scrolling effect on hero canvas

// window.onscroll = function (e) {
//   console.log(document.scrollTop);
// };

// document.addEventListener('scroll', () => {
//   // console.log(window.scrollY);

//   document.querySelector('.connecting-dots').style.top = `${window.scrollY}px`;
// });

// form validation

const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
document.querySelector('#form-submit').addEventListener('click', () => {
  const unameInput = document.querySelector('.contact__form-name');
  const emailInput = document.querySelector('.contact__form-email');
  const msgInput = document.querySelector('.contact__form-message');

  const uname = unameInput.value;
  const email = emailInput.value;
  const msg = msgInput.value;

  const unameError = document.querySelector('.form-error__name');
  const emailError = document.querySelector('.form-error__email');
  const msgError = document.querySelector('.form-error__msg');

  let validUname = false;
  let validEmail = false;
  let validMsg = false;

  // console.log(uname, email, msg);
  if (!uname) {
    validUname = false;
    unameInput.classList.add('input-error');
    unameError.style.display = 'block';
  } else {
    validUname = true;
    unameInput.classList.remove('input-error');
    unameError.style.display = 'none';
  }

  if (!email.match(re)) {
    validEmail = false;
    emailInput.classList.add('input-error');
    emailError.style.display = 'block';
  } else {
    validEmail = true;
    emailInput.classList.remove('input-error');
    emailError.style.display = 'none';
  }

  if (!msg) {
    validMsg = false;
    msgInput.classList.add('input-error');
    msgError.style.display = 'block';
  } else {
    validMsg = true;
    msgInput.classList.remove('input-error');
    msgError.style.display = 'none';
  }

  if (validUname && validEmail && validMsg) {
    document.querySelector('.contact__form').submit();

    // clear form after a delay
    const sleep = (milliseconds) => {
      return new Promise((resolve) => setTimeout(resolve, milliseconds));
    };

    sleep(1500).then(() => {
      document.querySelector('.contact__form').reset();
    });
  }
});
