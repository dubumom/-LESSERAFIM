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
  logo.style.zIndex = 1000; // 물어보기 -> 같은 부모 밑에 있는 태그끼리만 적용되는 것인지!
});
closeBtn.addEventListener('click',()=>{
  nav.style.display = 'none';
  menuBtn.style.opacity = 1;
  sns.style.left = '-50px';
});

//ASIDE : SNS 

sns.addEventListener('click',()=>{
  sns.classList.toggle('toggle');
});