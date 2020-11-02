const tabs = document.querySelector('.tabs');
const tabButtons = tabs.querySelectorAll('[role="tab"]');
const tabPanels = tabs.querySelectorAll('[role="tabpanel"]');

function handleTabClick(e) {
  // Hide all tab panels
  tabPanels.forEach(panel => {
    panel.hidden = true;
  });

  // Mark all tabs unselected
  tabButtons.forEach(tab => {
    // Must use setAttribute method for custom properties and aria properties
    tab.setAttribute('aria-selected', false);
  });

  // Mark the clicked tab as selected
  e.target.setAttribute('aria-selected', true);

  // find the associated tabPanel and display
  const { id } = e.target;
  // METHOD 1
  //   const tabPanel = tabs.querySelector(`[aria-labelledby="${id}"]`);
  //   tabPanel.hidden = false;

  // METHOD 2
  // Transforms a NodeList into an Array
  const tabPanelsAr = Array.from(tabPanels);
  // Returns the element with the correct id
  const tabPanel = tabPanelsAr.find(
    panel => panel.getAttribute('aria-labelledby') === id
  );
  tabPanel.hidden = false;
}

tabButtons.forEach(button => button.addEventListener('click', handleTabClick));
