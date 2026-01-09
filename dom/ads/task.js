const rotators = document.querySelectorAll('.rotator__case');
let currentIndex = 0;

function rotate() {
  rotators.forEach(rotator => {
    rotator.classList.remove('rotator__case_active');
  });
  rotators[currentIndex].classList.add('rotator__case_active');

  currentIndex = (currentIndex + 1) % rotators.length;
}
setInterval(rotate, 1000);


