import TopSlide from './topslide';
import Scrollbar from 'smooth-scrollbar';
import $ from 'jquery';
import { gsap,Cubic,Quad  } from "gsap";

const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
const isBelowIE11 = !!window.navigator.userAgent.match(/(MSIE|Trident)/);
const isFakeScroll = !isMac && !isBelowIE11;

class ScrollAni{
    constructor(start,end,el){
        this.start=start;      
        this.end=end;       
        this.el = el;    
        this.beforePer=undefined;
    }
    perEvent(st,callback){
        let maxSt = isFakeScroll?document.querySelector('.scroll-content').clientHeight:document.body.clientHeight - window.innerHeight;
        let per = (st-this.start)/( (this.end>maxSt?maxSt:this.end)-this.start);
        per = per < 0 ? 0 : per > 1 ? 1 : per;     
    
        if(this.beforePer==per && (per==0||per==1))return;
        callback(per);
    }
    doScroll(st,callback) {            
        this.perEvent(st,per=>{this.beforePer=per;callback&&callback(per,this.el);})
    }
}


let last_scroll = 0;

let section1 = document.querySelector('.section1'),
    section2 = document.querySelector('.section2'),
    section3 = document.querySelector('.section3'),
    section4 = document.querySelector('.section4');
let s2Top = getAbsoluteTop(section2),wH = window.innerHeight,s2H = section2.offsetHeight;
let s3Top = getAbsoluteTop(section3),s3H = section3.offsetHeight;
let s4Top = getAbsoluteTop(section4),s4H = section4.offsetHeight;

//let sa1 = new ScrollAni(s2Top+s2H-wH,s2Top+s2H-wH+s2H,section3);
let sa1 = new ScrollAni(s2Top,s2Top+wH,$('.section2 .inner'));
let sa2 = new ScrollAni(s2Top,s2Top+s2H,section2);

function getAbsoluteTop(element) {
    return window.pageYOffset + element.getBoundingClientRect().top;
}

if(isFakeScroll){   
    document.querySelector('#wrap').style.position = "fixed";
    const scrollbar = Scrollbar.init(document.querySelector('#wrap'));
    scrollbar.addListener((status) => {
        last_scroll = status.offset.y; 
        sa1.doScroll(last_scroll,scrollEvent);
       
    });
    scrollbar.updatePluginOptions('overscroll', {
        effect: 'glow',
      });
    
}else{
    let ticking = false;
    document.querySelector('#wrap').style.position = "relative";
    window.addEventListener('scroll', function(e) {
      
        last_scroll = $(window).scrollTop();
    
        if (!ticking) {
            window.requestAnimationFrame(function() {
                sa1.doScroll(last_scroll,scrollEvent);
                ticking = false;
            });
    
            ticking = true;
        }
    });
}


const scrollEvent = (per,el)=>{
    console.log(per)
    if (isFakeScroll){
        gsap.to('.sticky', { y:per*el.innerHeight(), duration: 0})
    }else{

    }
    gsap.to(".box", {rotation: 27*per, y: 200*per, duration: 0.5})
    
    
}




