import { gsap } from "gsap";
import $ from 'jquery';
import Scrollbar from 'smooth-scrollbar';
import {getAbsoluteTop} from './offsetfunc';

const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
const isBelowIE11 = !!window.navigator.userAgent.match(/(MSIE|Trident)/);
const isFakeScroll = !isMac && !isBelowIE11;

class ScrollEvent{
    constructor(el,stickyEl,isSticky,callback){
        this.el = el;
        this.start = getAbsoluteTop(el);
        this.gap = el.offsetHeight-(isSticky?stickyEl.offsetHeight:0);     
        this.end=this.start+this.gap;       
        this.stickyEl = stickyEl;    
        this.beforePer=undefined;
        this.isSticky = isSticky || false;
        this.callback = callback;
        this.isFixed=false;
        this.isNotFixed=false;
        this.init();
    }
    init(){
        EventDispatcher.add(this, Events.SCROLL_EVENT, this.doScroll);
        EventDispatcher.add(this, Events.RESIZE, this.resize);
    }
    resize(){
        this.gap = this.el.offsetHeight-(this.isSticky?this.stickyEl.offsetHeight:0);     
        this.end = this.start+this.gap; 
        $(window).trigger('scroll');
    }
    perEvent(st,callback){
        let maxSt = isFakeScroll?document.querySelector('.scroll-content').clientHeight:document.body.clientHeight - window.innerHeight;
        let per = (st-this.start)/( (this.end>maxSt?maxSt:this.end)-this.start);
        per = per < 0 ? 0 : per > 1 ? 1 : per;     

        if(this.beforePer==per && (per==0||per==1))return;
        callback(per);
       
    }
    doScroll(st) {   
        this.perEvent(st,per=>{
            this.beforePer=per;
            this.callback && this.callback(per);
          
            if(!this.isSticky)return;
            isFakeScroll && gsap.to(this.stickyEl, { y:per*this.gap, duration: 0});

            if(!this.isNotFixed && (per==0 || per==1 )){
                this.stickyEl.classList.remove('will-change-transform');
               
                !isFakeScroll && ($(this.stickyEl).attr('style','transform:translate(0, '+per*this.gap+'px)'));
                              
                this.isNotFixed = true;
                this.isFixed = false;

            }else if(!this.isFixed){
                this.stickyEl.classList.add('will-change-transform');
               
                !isFakeScroll && ($(this.stickyEl).attr('style','transform:translate(0, 0);top:0;left:0;right:0;position:fixed'));
                               
                this.isFixed = true;
                this.isNotFixed = false;
                
            }
                /*
                (per==0 || per==1)?
                    (this.stickyEl.style.top=per*this.gap+"px",this.stickyEl.style.position='absolute')
                    :(this.stickyEl.style.position='fixed', this.stickyEl.style.top=0);
                */
                
            
     
        });
    }
}


if(isFakeScroll){   
    document.querySelector('#wrap').style.position = "fixed";
    const scrollbar = Scrollbar.init(document.querySelector('#wrap'));
    scrollbar.addListener((status) => {
        let last_scroll = status.offset.y; 
        EventDispatcher.is(Events.SCROLL_EVENT,last_scroll);
       
    });
    
}else{
    let ticking = false;
   
    document.querySelector('#wrap').style.position = "relative";
    window.addEventListener('scroll', function(e) {
      
        let last_scroll = $(window).scrollTop();
        EventDispatcher.is(Events.SCROLL_EVENT,last_scroll);
        /*
        if (!ticking) {
            window.requestAnimationFrame(function() {
                EventDispatcher.is(Events.SCROLL_EVENT,last_scroll);
                ticking = false;
            });
    
            ticking = true;
        }
        */
    });
}

export default ScrollEvent;