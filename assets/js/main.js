gsap.registerPlugin(ScrollTrigger);

/* 스무스 스크롤 */
const lenis = new Lenis();

lenis.on("scroll", (e) => {
  // console.log(e)
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
lenis.stop();

$(function () {
  $("html, body").animate({ scrollTop: 0 }, "slow");
});


/* nav 호버 애니메이션 */
$(".nav a").hover(
  function () {
    $(this).css({ color: "#c52535", transform: "translateY(-100%)" });
  },
  function () {
    $(this).css({ color: "", transform: "" });
  }
);

/* 인트로 */
ScrollTrigger.matchMedia({
  "(max-width:1023px)":function(){
    lenis.start();
  },
  /* 1024px이상일때 */
  "(min-width:1024px)":function(){
    const introTl = gsap.timeline();
introTl
  .to(
    ".logo .gon",
    {
      x: 0,
      duration: 1,
      delay:1,
      ease: "expo.inOut",
    },
    "a"
  )

  .to(
    ".logo .shiro",
    {
      x: 0,
      duration: 1,
      delay:1,
      ease: "expo.inOut",
    },
    "a"
  )

  .to(
    ".logo .gon",
    {
      y: 20,
      duration: 1,
      ease: "expo.inOut",
    },
    "b"
  )

  .to(
    ".logo .shiro",
    {
      y: 20,
      duration: 1,
      ease: "expo.inOut",
    },
    "b"
  )

  .to(
    ".logo .gon",
    {
      y: 0,
      duration: 1,
      ease: "expo.inOut",
    },
    "c"
  )

  .to(
    ".logo .shiro",
    {
      y: 0,
      duration: 1,
      ease: "expo.inOut",
    },
    "c"
  )

  .to(
    ".intro-bg .bar1",
    {
      xPercent: -100,
      duration: 1,
      ease: "expo.inOut",
    },
    "c"
  )

  .to(
    ".intro-bg .bar2",
    {
      xPercent: 100,
      duration: 1,
      ease: "expo.inOut",
      onComplete: function () {
        // 애니메이션이 끝난 후에 수행할 작업을 여기에 추가합니다.
        // 예를 들어, visibility, display, opacity 등의 속성을 원래대로 변경합니다.
        $(".intro-bg").hide();
        lenis.start();
      },
    },
    "c"
  )

  .to(
    ".sc-visual .visual-bottom",
    {
      delay: 0.3,
      duration: 1,
      opacity: 1,
      ease: "none",
    },
    "c"
  );
  }
});



  ScrollTrigger.matchMedia({
    /* 1023px 이하일때 */
    "(max-width:1023px)":function(){

    },
    /* 1024px 이상일때 */
    "(min-width:1024px)":function(){
      gsap.to(".bottom-text-group", {
        opacity: 0,
        scrollTrigger: {
          trigger: ".visual-bottom",
          start: "top center",
          end: "bottom center",
          scrub: 1,
        },
      });
    }
  })


/* 로고 스케일 */
ScrollTrigger.matchMedia({
  "(max-width:1023px)":function(){
    ScrollTrigger.create({
      animation: gsap.to(".logo", {
        yPercent: -200,
      }),
      trigger: ".sc-visual",
      start: "top top",
      end: "30% top",
      scrub: 1,
      ease:"power1.inOut",
    });
  },

  "(min-width:1024px)":function(){
    const trigger = ScrollTrigger.create({
      animation: gsap.from(".logo", {
        y: "9vh",
        scale: 13,
        yPercent: -50,
      }),
      scrub: 0.5,
      trigger: ".sc-visual",
      start: "center center",
      endTrigger: ".sc-about",
      end: "40% center",
    });
    
    // 색상을 변경하는 함수를 정의합니다.
    function changeColor(progress) {
      gsap.to(".logo", { color: progress >= 0.7 ? "#333" : "#fff", duration: 0.3 }); // 부드럽게 변경되도록 duration을 추가했습니다.
    }
    
    // ScrollTrigger의 onUpdate 콜백을 이용하여 색상을 변경하는 함수를 호출합니다.
    trigger.animation.eventCallback("onUpdate", function () {
      const triggerPosition = trigger.progress;
      changeColor(triggerPosition);
    });
    
    gsap.to(".nav", {
      opacity: 1,
      scrollTrigger: {
        trigger: ".sc-about",
        start: "top center",
        endTrigger: ".sc-about",
        end: "20% center",
        scrub: true,
      },
    });
  }
})

/* work 백그라운드 */

const projectItems = document.querySelectorAll('.project-item');
const projectBg = document.querySelector('.project-bg');
const windmill = document.querySelector('.project-top .windmill img');
const projectLink = document.querySelector('.project-link');
const nav = document.querySelector('.nav');
const logo = document.querySelector('.logo');

projectItems.forEach((item, index) => {
  item.addEventListener('mouseenter', function() {
    const imageUrl = `assets/images/workBack${index + 1}.jpg`;
    if (window.innerWidth > 1023) { // 창 너비가 1023px보다 클 때만 실행
      const backgroundImageUrl = `url(${imageUrl})`;
      projectBg.style.backgroundImage = backgroundImageUrl;

      // 호버된 이미지와 windmill, project-link을 제외한 모든 이미지의 투명도를 조절합니다.
      projectItems.forEach((otherItem, i) => {
        if (i !== index) {
          otherItem.querySelector('img').style.transition = 'opacity 0.3s ease'; // 트랜지션 효과 추가
          otherItem.querySelector('img').style.opacity = '0'; // 투명도 조절
        }
      });
      windmill.style.transition = 'opacity 0.3s ease'; // windmill에도 트랜지션 효과 추가
      windmill.style.opacity = '0'; // windmill도 투명도 조절
      projectLink.style.transition = 'opacity 0.3s ease'; // project-link에도 트랜지션 효과 추가
      projectLink.style.opacity = '0'; // project-link도 투명도 조절
      nav.style.opacity = '0'; // nav도 투명도 조절
      nav.style.transition = 'opacity 0.3s ease'; // nav에도 트랜지션 효과 추가
      logo.style.opacity = '0'; // logo도 투명도 조절
      logo.style.transition = 'opacity 0.3s ease'; // logo 트랜지션 효과 추가
    }
  });

  item.addEventListener('mouseleave', function() {
    if (window.innerWidth > 1023) { // 창 너비가 1023px보다 클 때만 실행
      projectBg.style.backgroundImage = '';

      // 호버가 끝나면 모든 이미지와 windmill, project-link의 투명도를 원래대로 돌립니다.
      projectItems.forEach((otherItem) => {
        otherItem.querySelector('img').style.transition = 'opacity 0.3s ease'; // 트랜지션 효과 추가
        otherItem.querySelector('img').style.opacity = '1';
      });
      windmill.style.transition = 'opacity 0.3s ease'; // windmill에도 트랜지션 효과 추가
      windmill.style.opacity = '1';
      projectLink.style.transition = 'opacity 0.3s ease'; // project-link에도 트랜지션 효과 추가
      projectLink.style.opacity = '1';
      nav.style.opacity = '1'; // project-link도 투명도 조절
      nav.style.transition = 'opacity 0.3s ease'; // nav에도 트랜지션 효과 추가
      logo.style.opacity = '1'; // logo도 투명도 조절
      logo.style.transition = 'opacity 0.3s ease'; // logo 트랜지션 효과 추가
    }
  });
});





/* -------------------- 스와이퍼 -------------------- */

let swiper = new Swiper(".news-slide", {
  slidesPerView: 2, //초기값 설정 ,모바일값이 먼저!!
  loop: true,
  parallax: true,
  centeredSlides: true,
  navigation: {
    prevEl: ".swiper-button-prev",
    nextEl: ".swiper-button-next",
  },
  breakpoints: {
    320: {
      slidesPerView: 1.1,
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 1.1,
    },
    640: {
      slidesPerView: 1.2, //브라우저가 640보다 클 때
      // spaceBetween: 20,
    },
    768: {
      slidesPerView: 1.2, //브라우저가 768보다 클 때
    },
    1024: {
      slidesPerView: 2, //브라우저가 1024보다 클 때
    },
  },
});

/* business pinned slide */

let workInfoItems = document.querySelectorAll(".business-img-box");

workInfoItems.forEach((item, index) => {
  item.style.zIndex = workInfoItems.length - index;
});

gsap.set(".business-img-box", {
  clipPath: function () {
    return "inset(0px 0px 0px 0px)";
  },
});

gsap.set(".business-img-box img", {
  scale: 1.4,
});

const animation = gsap.to(".business-img-box:not(:last-child)", {
  clipPath: function () {
    return "inset(100% 0px 0px 0px)";
  },
  stagger: 0.5,
  ease: "none",
});

const scaleAni = gsap.to(".business-img-box img", {
  scale: 1,
});

ScrollTrigger.create({
  trigger: ".sc-business",
  start: "top top",
  end: "bottom bottom",
  animation: animation,
  scrub: true,
  // markers:true,
});

ScrollTrigger.create({
  trigger: ".sc-business",
  start: "top top",
  end: "bottom bottom",
  animation: scaleAni,
  scrub: true,
});

const infos = document.querySelectorAll(".info"); // 모든 .info 요소 선택

infos.forEach((info, index) => {
  ScrollTrigger.create({
    trigger: info,
    start: "top center",
    end: "bottom center",
    // markers:true,
    onToggle: (self) => {
      const { isActive } = self;
      let styles;

      // 각 .info 요소에 따라 스타일 지정
      switch (index) {
        case 1:
          styles = isActive
            ? { backgroundColor: "#e6e6e3", color: "#333" }
            : { backgroundColor: "rgb(197, 37, 53)", color: "#fff" };
          break;
        case 2:
          styles = isActive
            ? { backgroundColor: "#c2a395", color: "#fff" }
            : { backgroundColor: "rgb(197, 37, 53)", color: "#fff" };
          break;
        case 3:
          styles = isActive
            ? { backgroundColor: "#333333", color: "#fff" }
            : { backgroundColor: "rgb(197, 37, 53)", color: "#fff" };
          break;
        default:
          styles = { backgroundColor: "#c52535", color: "#fff" };
          break;
      }

      gsap.to(".info", {
        backgroundColor: styles.backgroundColor,
        color: styles.color,
        duration: 0.5,
        ease: "power2.out",
      });
    },
  });
});

let mm = gsap.matchMedia();

mm.add("(max-width:1023px)", (matches) => {
  const infos = document.querySelectorAll(".info");

  infos.forEach((info, index) => {
    ScrollTrigger.create({
      trigger: info,
      start: "top center",
      end: "bottom center",
      // markers: true,
      onToggle: (self) => {
        const { isActive } = self;
        let styles;
        // 각 .info 요소에 따라 스타일 지정
        switch (index) {
          case 1:
            styles = isActive
              ? { backgroundColor: "#e6e6e3", color: "#333" }
              : { backgroundColor: "rgb(197, 37, 53)", color: "#fff" };
            break;
          case 2:
            styles = isActive
              ? { backgroundColor: "#c2a395", color: "#fff" }
              : { backgroundColor: "rgb(197, 37, 53)", color: "#fff" };
            break;
          case 3:
            styles = isActive
              ? { backgroundColor: "#333333", color: "#fff" }
              : { backgroundColor: "rgb(197, 37, 53)", color: "#fff" };
            break;
          default:
            styles = { backgroundColor: "rgb(197, 37, 53)", color: "#fff" };
            break;
        }

        gsap.to(".info", {
          backgroundColor: styles.backgroundColor,
          color: styles.color,
          duration: 0.5,
          ease: "power2.out",
        });
      },
    });
  });
  // 여러 요소를 선택하고 GSAP 애니메이션을 적용

let elements = gsap.utils.toArray(".spBusiness-img-box img");

elements.forEach(function(element) {
  gsap.set(element, {
    opacity: 0,
    scale: 1.2,
    // yPercent: -5
  });

  gsap.to(element, {
    opacity: 1,
    scale: 1,
    // yPercent: 0,
    duration:0.5,
    "clip-path": "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: 'top center',
      end: 'bottom center',
      toggleActions: "play none none reverse", // start, end, start-back, end-back
      onLeaveBack:()=>{
        gsap.to(element, {
          // 원래 상태로 돌아가는 애니메이션 속성 설정
          opacity: 0,
          scale: 1.2,
          yPercent: -5,
          duration: 0.5, // 애니메이션 지속 시간
          ease: "power2.inOut" // 애니메이션 이징 설정
        });
      },
    }
  });
});


  // gsap.set(".spBusiness-img-box img",{
  //   opacity:0,
  //   scale:1.2,
  //   yPercent:-5,
  // });

  // gsap.to(".spBusiness-img-box img",{
  //   opacity:1,
  //   scale:1,
  //   yPercent:0,
  //   "clip-path": "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
  //   ease:"none",

  //   scrollTrigger:{
  //     trigger:'.sc-business',
  //     start:'top center',
  //     end:'center center',
  //     // toggleActions: "restart pause reverse none",
  //     scrub:true,
  //     markers:true
  //   }
  // })
});

/* 푸터 */
const fooInsta = document.querySelector(".foo-insta");
const fooTwit = document.querySelector(".foo-twit");
const topRight = document.querySelector(".top-right");
const topLeft = document.querySelector(".top-left");

topLeft.addEventListener("mouseover", function () {
  topLeft.style.background = "#333";
  topLeft.style.color = "#fff";
});
topLeft.addEventListener("mouseout", function () {
  topLeft.style.background = "";
  topLeft.style.color = "#333";
});

fooInsta.addEventListener("mouseover", function () {
  topRight.style.background = "#CF2E92";
  topRight.style.color = "#fff";
});

fooInsta.addEventListener("mouseout", function () {
  topRight.style.background = "";
  topRight.style.color = "#333";
});

fooTwit.addEventListener("mouseover", function () {
  topRight.style.background = "#1d9bf0";
  topRight.style.color = "#fff";
});

fooTwit.addEventListener("mouseout", function () {
  topRight.style.background = "";
  topRight.style.color = "#333";
});
