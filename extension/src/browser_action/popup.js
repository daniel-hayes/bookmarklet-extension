(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports = {
  test: require('./test'),
  test2: require('./test2')
};

},{"./test":2,"./test2":3}],2:[function(require,module,exports){
'use strict';

module.exports = {
  title: 'Test title',
  description: 'This is a test description',
  function: function _function() {
    var test = 'this is a test file';
    console.log(test);
  }
};

},{}],3:[function(require,module,exports){
'use strict';

module.exports = {
  title: 'Test title 2',
  description: 'This is a test description',
  function: function _function() {
    document.body.style.background = 'blue';
  }
};

},{}],4:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bookmarklets = require('./bookmarklets');

var _bookmarklets2 = _interopRequireDefault(_bookmarklets);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

console.log(_bookmarklets2.default, 'the tset');

var Extension = function () {
  function Extension() {
    _classCallCheck(this, Extension);

    this.bookmarkletContainer;
    this.bookmarkletPanels = [];
  }

  _createClass(Extension, [{
    key: 'triggerBookmarklet',
    value: function triggerBookmarklet(e) {
      e.preventDefault();
      var source = e.target.getAttribute('data-source');

      if (source) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          chrome.tabs.executeScript(tabs[0].id, {
            code: 'const script = document.createElement(\'script\');\n                script.innerHTML = ' + _bookmarklets2.default[source].function + '();\n                document.body.appendChild(script);'
          });
        });

        window.close();
      }
    }
  }, {
    key: 'filter',
    value: function filter(e) {
      var _this = this;

      var inputValue = e.target.value.toLowerCase();
      var newList = this.bookmarkletPanels.filter(function (panel) {
        if (panel.innerText.toLowerCase().indexOf(inputValue) !== -1) {
          return panel;
        }
      });

      // probably a better way to do this
      if (newList.length === 0) {
        this.bookmarkletContainer.innerHTML = 'No results found.';
      } else {
        this.bookmarkletContainer.innerHTML = '';
        newList.forEach(function (button) {
          return _this.bookmarkletContainer.appendChild(button);
        });
      }
    }
  }, {
    key: 'favorite',
    value: function favorite(e) {
      var _this2 = this;

      chrome.storage.sync.get({
        favorites: []
      }, function (storedItems) {
        // add to favorites
        if (storedItems.favorites.indexOf(_this2.name) === -1 && _this2.name !== '') {
          storedItems.favorites.push(_this2.name);
        } else {
          // remove from favorites
          storedItems.favorites = storedItems.favorites.filter(function (favorite, index) {
            return _this2.name !== favorite;
          });
        }

        console.log(storedItems.favorites, 'here');

        chrome.storage.sync.set({
          favorites: storedItems.favorites
        });
      });
    }
  }, {
    key: 'openOverlay',
    value: function openOverlay(e) {
      var overlay = document.getElementById('overlay');
      var overlayContent = document.getElementById('overlayContent');
      overlayContent.innerHTML = '<p>' + this.getAttribute('data-description') + '</p>';
      overlay.style.display = 'block';
    }
  }, {
    key: 'closeOverlay',
    value: function closeOverlay(e) {
      var overlay = document.getElementById('overlay');
      var overlayContent = document.getElementById('overlayContent');
      overlayContent.innerHTML = '';
      overlay.style.display = 'none';
    }
  }, {
    key: 'bookmarkletMarkup',
    value: function bookmarkletMarkup(bookmarklet) {
      var favorites = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      var bookmarkletData = _bookmarklets2.default[bookmarklet];
      return '\n    <div class="bookmarklet">\n      <button class="bookmarklet-button" data-source="' + bookmarklet + '">\n        ' + bookmarkletData.title + '\n      </button>\n      <div class="icons">\n        <div class="info" data-description="' + bookmarkletData.description + '">\n          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ddd" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n              <circle cx="12" cy="12" r="10"/>\n              <line x1="12" y1="16" x2="12" y2="12"/>\n              <line x1="12" y1="8" x2="12" y2="8"/>\n          </svg>\n        </div>\n        <label class="favorite-label">\n          <input type="checkbox" class="favorite" name="' + bookmarklet + '" value="Favorite" ' + (favorites.indexOf(bookmarklet) !== -1 ? 'checked' : '') + '>\n          <svg class="star" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">\n            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>\n          </svg>\n        </label>\n      </div>\n    </div>\n    ';
    }
  }, {
    key: 'addEventListeners',
    value: function addEventListeners() {
      document.getElementById('filter').addEventListener('keyup', this.filter.bind(this));
      document.getElementById('close').addEventListener('click', this.closeOverlay);

      this.bookmarkletPanels = Array.from(document.querySelectorAll('.bookmarklet'));
      for (var i = 0; i < this.bookmarkletPanels.length; i++) {
        this.bookmarkletPanels[i].querySelector('.favorite').addEventListener('click', this.favorite);
        this.bookmarkletPanels[i].querySelector('.info').addEventListener('click', this.openOverlay);
        this.bookmarkletPanels[i].querySelector('.bookmarklet-button').addEventListener('click', this.triggerBookmarklet);
      }
    }
  }, {
    key: 'init',
    value: function init() {
      var _this3 = this;

      // TODO is it better to load entire repos using config file, or set these in the options page? or both?
      document.addEventListener('DOMContentLoaded', function () {
        chrome.storage.sync.get({
          favorites: []
        }, function (storedItems) {
          var favorites = storedItems.favorites;


          console.log(favorites);

          _this3.bookmarkletContainer = document.getElementById('bookmarklets');
          // reset "Loading" screen
          _this3.bookmarkletContainer.innerHTML = '';

          Object.keys(_bookmarklets2.default).forEach(function (bookmarklet) {
            console.log(bookmarklet);
            _this3.bookmarkletContainer.innerHTML += _this3.bookmarkletMarkup(bookmarklet, favorites);
          });

          _this3.addEventListeners();
        });
      });
    }
  }]);

  return Extension;
}();

var initExtension = new Extension();
initExtension.init();

},{"./bookmarklets":1}]},{},[4]);
