import TopSlide from './topslide';
import $ from 'jquery';
import { gsap,Cubic,Quad  } from "gsap";
import ScrollEvent from './scrollEvent';



const section1 = document.querySelector('.section1'),
    section2 = document.querySelector('.section2'),
    section3 = document.querySelector('.section3'),
    section4 = document.querySelector('.section4');
let s2Top = getAbsoluteTop(section2),wH = window.innerHeight,s2H = section2.offsetHeight;
let s3Top = getAbsoluteTop(section3),s3H = section3.offsetHeight;
let s4Top = getAbsoluteTop(section4),s4H = section4.offsetHeight;


const scrollAni = (per)=>{
    gsap.to(".box", {rotation: 27*per, y: 200*per, duration: 0.5})    
}
let sa1 = new ScrollEvent(s2Top,
    s2H-$('.section2 .inner').innerHeight(),
    $('.section2 .inner'),true,scrollAni);

function getAbsoluteTop(element) {
    return window.pageYOffset + element.getBoundingClientRect().top;
}








