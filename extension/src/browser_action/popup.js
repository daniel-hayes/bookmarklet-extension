class Extension {
  constructor() {
    this.bookmarkletContainer;
    this.bookmarkletPanels = [];
  }

  triggerBookmarklet(e) {
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

  filter(e) {
    const inputValue = e.target.value.toLowerCase();
    const newList = this.bookmarkletPanels.filter(panel => {
      if (panel.innerText.toLowerCase().indexOf(inputValue) !== -1) {
        return panel;
      }
    });

    // probably a better way to do this
    if (newList.length === 0) {
      this.bookmarkletContainer.innerHTML = 'No results found.';
    } else {
      this.bookmarkletContainer.innerHTML = '';
      newList.forEach(button => this.bookmarkletContainer.appendChild(button));
    }
  }

  favorite(e) {
    chrome.storage.sync.get({
        favorites: []
    }, storedItems => {
      // add to favorites
      if (storedItems.favorites.indexOf(this.name) === -1 && this.name !== '') {
        storedItems.favorites.push(this.name);
      } else {
        // remove from favorites
        storedItems.favorites = storedItems.favorites.filter((favorite, index) => this.name !== favorite);
      }

      chrome.storage.sync.set({
        favorites: storedItems.favorites,
      });
    });
  }

  openOverlay(e) {
    const overlay = document.getElementById('overlay');
    const overlayContent = document.getElementById('overlayContent');
    overlayContent.innerHTML = `<p>${this.getAttribute('data-description')}</p>`;
    overlay.style.display = 'block';
  }

  closeOverlay(e) {
    const overlay = document.getElementById('overlay');
    const overlayContent = document.getElementById('overlayContent');
    overlayContent.innerHTML = '';
    overlay.style.display = 'none';
  }

  bookmarkletMarkup(bookmarklet, favorites) {
   return `
    <div class="bookmarklet">
      <button class="bookmarklet-button" data-source="${bookmarklet.path}">
        ${bookmarklet.title}
      </button>
      <div class="icons">
        <div class="info" data-description="${bookmarklet.description}">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ddd" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="16" x2="12" y2="12"/>
              <line x1="12" y1="8" x2="12" y2="8"/>
          </svg>
        </div>
        <label class="favorite-label">
          <input type="checkbox" class="favorite" name="${bookmarklet.path}" value="Favorite" ${favorites.indexOf(bookmarklet.path) !== -1 ? 'checked' : ''}>
          <svg class="star" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        </label>
      </div>
    </div>
    `;
  }

  addEventListeners() {
    document.getElementById('filter').addEventListener('keyup', this.filter.bind(this));
    document.getElementById('close').addEventListener('click', this.closeOverlay);

    this.bookmarkletPanels = Array.from(document.querySelectorAll('.bookmarklet'));
    for (let i = 0; i < this.bookmarkletPanels.length; i++) {
      this.bookmarkletPanels[i].querySelector('.favorite').addEventListener('click', this.favorite);
      this.bookmarkletPanels[i].querySelector('.info').addEventListener('click', this.openOverlay);
      this.bookmarkletPanels[i].querySelector('.bookmarklet-button').addEventListener('click', this.triggerBookmarklet);
    }
  }

  init() {
    // TODO is it better to load entire repos using config file, or set these in the options page? or both?
    document.addEventListener('DOMContentLoaded', () => {
      chrome.storage.sync.get({
        configUrl: '',
        favorites: [],
        urls: []
      }, storedItems => {
        const { favorites, urls } = storedItems;

        this.bookmarkletContainer = document.getElementById('bookmarklets');
        // reset "Loading" screen
        this.bookmarkletContainer.innerHTML = '';
        // maybe call this function again when you update your favorites
        urls.sort((nameA, nameB) => {
          if (favorites.indexOf(nameA.path) !== -1) {
            return -1;
          }

          return 1;
        }).forEach(bookmarklet => {
          this.bookmarkletContainer.innerHTML += this.bookmarkletMarkup(bookmarklet, favorites);
        });
        this.addEventListeners();

      });
    });
  }
}

const initExtension = new Extension();
initExtension.init();
