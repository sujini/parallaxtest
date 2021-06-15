import { gsap,Cubic,Quad  } from "gsap";
import $ from "jquery";
 class TopSlide {
 
     constructor() {
         this.name = 'TopSlide';
         this.onResize();
         this.init();
         this.cnt=0;
 
     }
 
     init(){
 
         window.onresize = this.onResize.bind(this);
         var self = this;
        // gsap.set($('#gnb .navi ul.depth1 > li'), {autoAlpha:0,y:-40});
        // gsap.set($('#gnb .navi .logo'), {autoAlpha:0,y:-40});
         gsap.set($('#misc_btns a'), {autoAlpha:0,y:-30});
         gsap.set($('.slide_section .btn_view_more span.label'), {autoAlpha:0,y:35});
 
         $('.dimmed').addClass('fout');
 
 
         gsap.to($('#misc_btns a'),.5, {delay:2.5,autoAlpha:1,y:0,ease:Cubic.easeOut,force3D: true});
 
         //gsap.to($('.slide_section .bg1'), 4, {delay:0.1,autoAlpha:1, scale:1,ease:Cubic.easeOut,force3D: true});
         $('.slide_section .bg').eq(0).addClass('active motion');
 
 
         setTimeout(function(){
             //self.showSlide(0,"start");
            self.startTimer();
 
         },1000);
 
         gsap.to($('.slide_section .carousel'), .5, {delay:1.5,autoAlpha:1,ease:Quad.easeOut,force3D: true});
         gsap.to($('.slide_section .btn_view_more'), .3, {delay:1.5,autoAlpha:1,ease:Quad.easeOut,force3D: true});
         gsap.to($('.slide_section .btn_view_more span.label'), .5, {delay:1.5,autoAlpha:1,y:0,ease:Quad.easeOut,force3D: true});
 
 
 
         EventDispatcher.add(this, Events.STARTSLIDE, this.startTimer);
         EventDispatcher.add(this, Events.STOPSLIDE, this.stopTimer);
 
     }
     showSlide(_idx){
         var $carouselLi = $('.slide_section .carousel li');
         $('#contents .slide_section .btn_view_more').attr('href', $carouselLi.eq( _idx).attr('data-link'));
         this.$before = (arguments[1]=="start"?$('.slide_section .bg').eq(2):$('.slide_section .bg.active'));
         this.$current =  $('.slide_section .bg').eq( _idx);
        /* gsap.to($before,2.5, {delay:0,autoAlpha:0,ease:Cubic.easeOut,onComplete:function(){
             gsap.to($before,0, {scale:1.2});
 
         }});
 
         gsap.to( $current, 4, {delay:0,autoAlpha:1, scale:1,ease:Cubic.easeOut});*/
         this.$before.removeClass('active');
         this.$current.addClass('active motion');
 
 
 
         $('.slide_section .carousel li.active').removeClass('active');
         $carouselLi.eq( _idx).addClass('active');
 
 
         $('.slide_section .text li').eq( _idx).addClass('active');
         this.$leave=$('.slide_section .text li.leave');
         this.$active=$('.slide_section .text li.active');
         this.$leave.attr('is_play','false');
         this.$active.attr('is_play','false');
         this.$before.attr('is_play','false');
 
     }
     startTimer(){
         if($('body').hasClass('stop')){return;}
         var self = this;
         this.isLoop = true;
         this.preper=this.preper || 0;
         var duration= 6000;
         var now = new Date().getTime();
         var endTime = now + duration;
         var timer_circle = document.getElementById("timer_circle");
         timer_circle.width = 50, timer_circle.height = 50;
         var ctx = timer_circle.getContext("2d");
         ctx.imageSmoothingEnabled = true, ctx.beginPath();
         this.animate = function(){
 
             if ( self.isLoop == false ) return;
             var now = new Date().getTime();
             var per = self.preper+1-Math.max((endTime - now) / duration, 0);
 
             self.before= per;
             self.setProgress(per);
 
             requestAnimationFrame(self.animate);
 
             if(per>=1){
                 self.preper=0;
                 endTime = now + duration;
                 self.cnt++;
                 if(self.cnt>2){
                     self.cnt=0;
                 }
 
                 self.showSlide(self.cnt);
             }
 
 
         };
         this.setProgress = function(tick) {
            var timer_circle = document.getElementById("timer_circle"),
            i = -0.5 + 2 * tick * 1.01,
            o = -0.5 * Math.PI,
            s = i * Math.PI,
            c = timer_circle.width / 2,
            l = timer_circle.height / 2,
            r = 20.5;
            ctx.clearRect(0, 0, timer_circle.width, timer_circle.height);
            ctx.beginPath();
            ctx.arc(c, l, r, o, s, false);
            ctx.lineWidth = 2;
            ctx.strokeStyle = "#000";
            ctx.stroke();
            ctx.closePath();

             if(tick>0.6) {
 
               
 
             }
             if(tick>0.85){
 
              
 
             }
             if(tick>=1){
 
                
             }
 
         }
 
         this.animate();
 
 
 
 
     }
 
 
     stopTimer(){
 
         var self=this;
         self.isLoop = false;
         cancelAnimationFrame(self.animate);
         self.preper=self.before;
 
 
     }
 
 
     onResize(){
 
         this.outerFit($('.slide_section'),$('.slide_section .bg1 video'),9/16,16/9);
 
       /*  this.outerFit($('.slide_section'),$('.slide_section .bg2'),9/16,16/9);
         this.outerFit($('.slide_section'),$('.slide_section .bg3'),1169/1440,1440/1169);*/
     }
 
     outerFit($target,$video,ratio,de_ratio){
 
         var windowWidth=$target.innerWidth(),
             windowHeight=$target.innerHeight();
 
         if((windowHeight/windowWidth) <ratio ){
 
             var width = windowWidth;
             var height = windowWidth * ratio;
             var marginTop = (height - windowHeight)/2 * -1;
             $video.css({
                 'width': width,
                 'height':height,
                 "left" :0,
                 "top":marginTop
             });
 
         }else{
 
             var height = windowHeight;
             var width = windowHeight * de_ratio;
             var marginLeft = (width - windowWidth)/2 * -1;
             $video.css({
                 'width': width,
                 'height':height,
                 "top" :0,
                 "left":marginLeft
             });
         }
 
     };
 
 }

class circleTimer {
    constructor(el,duration) {
        this.duration = duration;
        this.Timer = undefined;
        this.preper = 0;
        this.per = undefined;
        document.querySelector(el).setAttribute("d", (this.circlePath(20, 20, 18)));
        this.init();

    }
    init(){
        EventDispatcher.add(this, Events.STARTCIRCLEMOTION, this.startDrawingPath);
        EventDispatcher.add(this, Events.STOPCIRCLEMOTION, this.stopDrawingPath)
    }
    circlePath(cx, cy, r){
        var x = cx-r, y = cy-r;
        console.log('M '+cy+' '+y+' A '+r+' '+r+' 0 1 1 '+cx+' '+(cx+cy-x)+' A '+x+' '+x+' 0 1 1 '+cy+' '+y+' Z')
        return 'M '+cy+' '+y+' A '+r+' '+r+' 0 1 1 '+cx+' '+(cx+cy-x)+' A '+x+' '+x+' 0 1 1 '+cy+' '+y+' Z';
    }
    startDrawingPath() {
        const path = document.querySelector('path'), pathLength = path.getTotalLength();
        let now = new Date().getTime(), endTime = now + this.duration;
        let length = pathLength * this.preper;
      
        this.animate = ()=>{
            now = new Date().getTime();
            this.per = (1 + this.preper) - Math.max((endTime - now) / this.duration, 0);
    
            if (this.per >= 1) {
                this.per = 0; this.preper = 0;
                endTime = now + this.duration;
                cancelAnimationFrame(this.Timer);
                this.Timer = requestAnimationFrame(this.animate);
            }
    
            this.Timer = requestAnimationFrame(this.animate);
    
            length = pathLength * this.per;
            path.style.strokeDasharray = [length, pathLength].join(' ');
    
        }
        this.Timer = requestAnimationFrame(this.animate);
    }
    stopDrawingPath() {
        cancelAnimationFrame(this.Timer);

        this.preper = this.per;
    }

}
 
 export default TopSlide;
 
 
 
 
 
 
 var ct = new circleTimer('#circle_path',6000);
 
 ct.startDrawingPath();
 
 // Classes are used just like ES5 constructor functions:
 

    // var t = new TopSlide();
