
const navBar = document.getElementsByClassName('gh-header-actions')[0]

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

if (navBar) {
  navBar.appendChild(createButton())
  switchDiscussionStyle('display: none;')
}
