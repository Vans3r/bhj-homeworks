const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.tab__content');

function switchTab(activeTabIndex) {
  contents.forEach(content => {
    content.classList.remove('tab__content_active');
  });
  if (activeTabIndex >= 0 && activeTabIndex < contents.length) {
    contents[activeTabIndex].classList.add('tab__content_active');
  }
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', function() {
    tabs.forEach(tab => {
      tab.classList.remove('tab_active');
    });
    tab.classList.add('tab_active');
    switchTab(index);
  });
});