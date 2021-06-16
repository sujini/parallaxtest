import { gsap } from "gsap";
import $ from 'jquery';
import Scrollbar from 'smooth-scrollbar';

const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
const isBelowIE11 = !!window.navigator.userAgent.match(/(MSIE|Trident)/);
const isFakeScroll = !isMac && !isBelowIE11;

class ScrollEvent{
    constructor(start,gap,el,isSticky,callback){
        this.start=start;
        this.gap = gap;     
        this.end=start+gap;       
        this.el = el;    
        this.beforePer=undefined;
        this.isSticky = isSticky || false;
        this.callback = callback;
        this.init();
    }
    init(){
        EventDispatcher.add(this, Events.SCROLL_EVENT, this.doScroll);
    }
    perEvent(st,callback){
        let maxSt = isFakeScroll?document.querySelector('.scroll-content').clientHeight:document.body.clientHeight - window.innerHeight;
        let per = (st-this.start)/( (this.end>maxSt?maxSt:this.end)-this.start);
        per = per < 0 ? 0 : per > 1 ? 1 : per;     
    
        if(this.beforePer==per && (per==0||per==1)){ this.el.removeClass('will-change-transform');return;}
        callback(per);
       
    }
    doScroll(st) {   
        this.el.addClass('will-change-transform');
        this.perEvent(st,per=>{
            this.beforePer=per;
            this.callback && this.callback(per);

            if(!this.isSticky)return;
            
            if(isFakeScroll){
                gsap.to(this.el, { y:per*this.gap, duration: 0});
            }else{
                (per==0 || per==1)?
                    this.el.css({position:'absolute',top:per*this.gap})
                    :this.el.css({position:'fixed',top:0});                  
            }
            
        })
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
    
        if (!ticking) {
            window.requestAnimationFrame(function() {
                EventDispatcher.is(Events.SCROLL_EVENT,last_scroll);
                ticking = false;
            });
    
            ticking = true;
        }
    });
}

export default ScrollEvent;