
const app = document.getElementsByClassName('application-main')[0]


function switchDiscussionStyle(style) {
  const discussion = document.getElementsByClassName('js-discussion')[0]
  if (discussion) {
    for (const child of discussion.children) {
      if (child.getElementsByClassName('timeline-comment-group').length === 0) {
        child.style = style
      }
    }
  }
}

/**
 * Creates a button to hide or show comments in a GitHub PR discussion.
 */
function createButton() {
  const button = document.createElement('button')
  button.id = 'id-button-show-commits'
  button.innerText = 'Show commits'
  button.classList.add('Button', 'Button--secondary', 'Button--small', 'flex-md-order-2', 'm-0', 'mr-md-0', 'active')
  button.onclick = function() {
    let style = ''
    let innerText = 'Hide commits'
    if (!this.classList.contains('active')) {
      style = 'display: none;'
      innerText = 'Show commits'
    }
    switchDiscussionStyle(style)
    
    this.classList.toggle('active')
    this.innerText = innerText
  }
  return button
}

if (app) {

  // Select the node that will be observed for mutations
  const targetNode = app;

  // Options for the observer (which mutations to observe)
  const config = { attributes: true, childList: true, subtree: true };

  // Callback function to execute when mutations are observed
  const callback = (mutationList, observer) => {
    
    const progress = document.getElementsByClassName('turbo-progress-bar')[0]
    if (!progress) {
      const navBar = document.getElementsByClassName('gh-header-actions')[0]
      if (navBar) {
        // if the button does not exist, create it
        if (!document.getElementById('id-button-show-commits')) {
          navBar.appendChild(createButton())
          // hide the comments
          switchDiscussionStyle('display: none;')
        }
      }
    }
  };

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback);

  // Start observing the target node for configured mutations
  observer.observe(targetNode, config);

}