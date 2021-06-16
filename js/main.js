import TopSlide from './topslide';
import $ from 'jquery';
import { gsap,Cubic,Quad  } from "gsap";
import ScrollEvent from './scrollEvent';



const section1 = document.querySelector('.section1'),
    section2 = document.querySelector('.section2'),
    section3 = document.querySelector('.section3'),
    section4 = document.querySelector('.section4'),
    section2Inner = document.querySelector('.section2 .inner');



const scrollAni = (per)=>{
    gsap.to(".box", {rotation: 27*per, y: 200*per, duration: 0.5})    
}
let sa1 = new ScrollEvent(section2,section2Inner,true,scrollAni);








