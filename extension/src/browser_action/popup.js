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

document.addEventListener('DOMContentLoaded', function() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://rawgit.com/daniel-hayes/bookmarklet-extension/master/bookmarklet.config.json", true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      const bookmarklets = JSON.parse(xhr.responseText);
      const body = document.getElementById('popup');
      bookmarklets.forEach(bookmarklet => {
        body.innerHTML += `<button data-source="https://rawgit.com/daniel-hayes/bookmarklet-extension/master${bookmarklet.path}">${bookmarklet.name}</button>`;
      });

      const buttons = document.querySelectorAll('button');
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', click);
      }
    }
  }
  xhr.send();
});
