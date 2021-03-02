import './sass/main.scss';
import canvasDots from './heroCanvas.js';
import canvasDotsBg from './bgCanvas.js';

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
