const dropList = document.querySelector('.dropdown__list');
const dropValue = document.querySelector('.dropdown__value');
const items = document.querySelectorAll('.dropdown__item');

  
dropValue.addEventListener('click', function() {
  dropList.classList.toggle('dropdown__list_active');
  });

items.forEach(item => {
  item.addEventListener('click', function(event) {
    event.preventDefault();
    const linkText = item.querySelector('.dropdown__link').textContent.trim();
    dropValue.textContent = linkText;
    dropList.classList.remove('dropdown__list_active');
    });
  });

