document.addEventListener('DOMContentLoaded', function() {
  const tooltipTriggers = document.querySelectorAll('.has-tooltip');
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  document.body.appendChild(tooltip);

  tooltipTriggers.forEach(trigger => {
    trigger.addEventListener('click', function(e) {
      e.preventDefault(); 


      const titleText = trigger.getAttribute('title');
      tooltip.textContent = titleText;

      const triggerRect = trigger.getBoundingClientRect();
      tooltip.style.left = `${triggerRect.left + triggerRect.width / 2}px`;
      tooltip.style.top = `${triggerRect.top - 10}px`;

      tooltip.classList.add('tooltip_active');
      tooltip.classList.add('pos-above'); 

      document.addEventListener('click', hideTooltip);
    });
  });

  function hideTooltip(e) {
    if (!e.target.closest('.has-tooltip')) {
      tooltip.classList.remove('tooltip_active');
    }
  }
});
