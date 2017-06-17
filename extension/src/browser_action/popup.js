// make this a class/object
let buttons = [];
let body;
let bookmarkletContainer;

const click = (e) => {
  e.preventDefault();
  const source = e.target.getAttribute('data-source');
  if (source) {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
      chrome.tabs.executeScript(tabs[0].id, {
        code: `const script = document.createElement('script');
              script.src = "${source}";
              document.body.appendChild(script);`
      });
    });
    window.close();
  }
}

const filter = (e) => {
  const inputValue = e.target.value.toLowerCase();
  const buttonList = buttons.filter(button => {
    if (button.innerText.toLowerCase().indexOf(inputValue) !== -1) {
      return button;
    }
  });

  // probably a better way to do this
  if (buttonList.length === 0) {
    bookmarkletContainer.innerHTML = '';
  } else {
    buttonList.forEach(bookmarklet => bookmarkletContainer.appendChild(bookmarklet));
  }
}

// TODO is it better to load entire repos using config file, or set these in the options page? or both?
document.addEventListener('DOMContentLoaded', () => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://rawgit.com/daniel-hayes/bookmarklet-extension/master/bookmarklet.config.json", true);
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      const bookmarklets = JSON.parse(xhr.responseText);
      body = document.getElementById('popup');
      bookmarkletContainer = document.getElementById('bookmarklets');

      bookmarkletContainer.innerHTML = '';
      bookmarklets.forEach(bookmarklet => {
        bookmarkletContainer.innerHTML += `<button data-source="https://rawgit.com/daniel-hayes/bookmarklet-extension/master${bookmarklet.path}">${bookmarklet.name}</button>`;
      });

      const input = document.getElementById('filter');
      buttons = [...document.querySelectorAll('button')]

      input.addEventListener('keyup', filter);
      body.addEventListener('click', click);
    }
  }
  xhr.send();
});
