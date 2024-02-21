//HEADER 고정
const header = document.querySelector('.h_wrapper');
const headerOst = header.offsetTop;

window.addEventListener('scroll',()=>{
  
  let scrollAmt = window.scrollY;
  console.log(scrollAmt);


if(scrollAmt > 491){
  header.classList.add('sticky');
} else {
  header.classList.remove('sticky');  
}
});


//HEADER : NAV
const menuBtn = document.querySelector('header div> span.menu');
const logo = document.querySelector('.logo')
const nav = document.querySelector('nav');
const closeBtn = nav.querySelector('.close');
const sns = document.getElementById('sns');
menuBtn.addEventListener('click',()=>{
  nav.style.display = 'block';
  menuBtn.style.opacity = 0;
  sns.style.left = '50px';
});
closeBtn.addEventListener('click',()=>{
  nav.style.display = 'none';
  menuBtn.style.opacity = 1;
  sns.style.left = '-50px'; // 왜 햄버거 바 까지 지워나요?
});
//HEADER : NAV 섹션이동
const menu =  document.querySelectorAll('#top_menu a');
const section =  document.querySelectorAll('#contents > section');

for(let m of menu){
  m.addEventListener('click',(e)=>{
    e.preventDefault();
    let targetId = m.getAttribute('href');
    console.log(targetId);
    let targetSection = document.querySelector(targetId);
    let targetOST = targetSection.offsetTop;
    window.scrollTo({left:0, top: targetOST, behavior:'smooth' });

    m.closest('#top_menu').style.display = 'none';
  });
}

//ASIDE : SNS 

sns.addEventListener('click',()=>{
  sns.classList.toggle('toggle');
});

//MAIN: BANNER

let slideWrapper = document.querySelector('.slide-wrapper'), 
    slideContainer = slideWrapper.querySelector('.slide-container'),  
    slides =slideContainer.querySelectorAll('li'),
    videos = slideContainer.querySelectorAll('video'), 
    slideCount = slides.length,
    currentSlideIdx = 0,
    pager = slideWrapper.querySelector('.pager'),
    timer,
    pagerHTML = '',
    prevBtn = slideWrapper.querySelector('#prev'), 
    nextBtn = slideWrapper.querySelector('#next');

if(slideCount > 1){
  slides.forEach((item, idx)=>{
    item.style.left = `${idx*100}%`;
    pagerHTML += `<a href="">${idx}</a>`;    
  });
}
pager.innerHTML = pagerHTML;
let pagerBtn = pager.querySelectorAll('a');

function moveSlide(num){
  slideContainer.style.left = `${-num*100}%`;
  currentSlideIdx = num;
  console.log(currentSlideIdx);

  if(currentSlideIdx === slideCount -1){
    nextBtn.classList.add('disabled');
  } else{
    nextBtn.classList.remove('disabled');
  }
  if(currentSlideIdx === 0){
    prevBtn.classList.add('disabled');
  } else{
    prevBtn.classList.remove('disabled');
  }
  for(let sl of slides){
    sl.classList.remove('active');
  }
  slides[currentSlideIdx].classList.add('active');
  for(let pb of pagerBtn){
    pb.classList.remove('active');
  }
  pagerBtn[currentSlideIdx].classList.add('active');
  for(let video of videos){
    video.pause();
  }
  if(slides[currentSlideIdx].querySelectorAll('video').length > 0){
    slides[currentSlideIdx].querySelector('video').play();
  }
}
moveSlide(0);
nextBtn.addEventListener('click',()=>{
  if(currentSlideIdx < slideCount -1){
    moveSlide(currentSlideIdx + 1);
  }
});
prevBtn.addEventListener('click',()=>{
  if(currentSlideIdx > 0){
    moveSlide(currentSlideIdx - 1);
  }
});

// 페이저로 슬라이드 이동하기
pagerBtn.forEach((item,idx)=>{
  item.addEventListener('click',(e)=>{
    e.preventDefault();
    moveSlide(idx);
  });
});

// 자동 슬라이드 
function autoSlide(){
  timer = setInterval(()=>{
    //let nextIdx = currentSlideIdx + 1;
    let nextIdx = (currentSlideIdx + 1) % slideCount;
    moveSlide(nextIdx);
  }, 3000);
}
autoSlide();

slideWrapper.addEventListener('mouseenter',()=>{
  clearInterval(timer);
});
slideWrapper.addEventListener('mouseleave',()=>{
  autoSlide();
});


//SCHEDULE : POPUP

var calendarEl = document.getElementById('calendar');
let popup = document.querySelector('dialog');
var calendar = new FullCalendar.Calendar(calendarEl, {
  initialView: 'dayGridMonth',
  googleCalendarApiKey: 'AIzaSyDfixLPrEr2-za6038iwvm-MzGiRJUjdHc',
  events: {
    googleCalendarId: '940e6a5675cd87e70f2e9c261f1168d3cc9d917573e66c26e25d540c3223f136@group.calendar.google.com'
  },
  eventClick: function(info) {
    info.jsEvent.preventDefault();
    //alert('Event: ' + info.event.title);
    //console.log(info.event.extendedProps.description);

    popup.querySelector('div').innerHTML = `
      <h3>${info.event.title}</h3>
      <div>${info.event.extendedProps.description}</div>
    `;
    popup.setAttribute('open','open')
    }
});
calendar.render();

popup.querySelector('button').addEventListener('click',()=>{
  popup.removeAttribute('open');
});

// MAIN:COMPANY
let slideUi = document.querySelector('.company_slide_contents');
let slide3 = document.querySelectorAll('.company_slide_contents li');
let cpSlideCount = slide3.length;
let currentIdx = 0;

slide3[0].classList.add('cpactive');


function autoSlide (){
  let timer = setInterval(()=>{
  let nextIdx = (currentIdx + 1) % cpSlideCount;
  slide3[currentIdx].classList.remove('cpactive');
  slide3[nextIdx].classList.add('cpactive');

  currentIdx = nextIdx;
}, 3000);
}

autoSlide();


//FOOTER : FAMLIY SITE
const footer = document.querySelector('.f_site');
const mainMenu = footer.querySelectorAll('.f_site ul > li');
const initHeight = footer.offsetHeight;
let tallestHeight = 0;

for(let li of mainMenu){
	let smheight = li.querySelector('ul').offsetHeight;
	if(smheight > tallestHeight){
		tallestHeight = smheight;
	}
	let footerHeight = tallestHeight + footer.offsetHeight + 50;
	footer.addEventListener('mouseover',()=>{
		footer.style.height = `${footerHeight}px`;
	});
	footer.addEventListener('mouseleave',()=>{
		footer.style.height = `${initHeight}px`;
	});
}
