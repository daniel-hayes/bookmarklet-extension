(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var getAll = document.getElementById('getAll');
var run = document.getElementById('run');
// const save = document.getElementById('save');
var reset = document.getElementById('reset');

// Perhaps what you can do is GET ALL and then iterate over them.
// that way you know the key value and can loop over the results
// chrome.storage.local.get('code', value => {
//  if (value.code) {
//    editor.setValue(value.code);
//  }
// });

var Actions = function Actions() {
  _classCallCheck(this, Actions);
};

var inputArray = [];
var index = 0;

var Input = function () {
  function Input() {
    var inputValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Input);

    this.input;
    this.inputValue = inputValue;
  }

  _createClass(Input, [{
    key: 'addElement',
    value: function addElement(element) {
      this.inputWrapper = document.createElement('div');
      this.inputWrapper.innerHTML = '\n        ' + element() + '\n        <button class="button-alert" data-action="delete">Delete</button>\n    ';
      this.inputWrapper.querySelector('[data-action="delete"]').addEventListener('click', this.destroy.bind(this));
      index++;
      return this.inputWrapper;
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.inputWrapper.parentNode.removeChild(this.inputWrapper);
    }
  }, {
    key: 'input',
    value: function input() {
      // TODO add a description field... also add validation to ensure these are true URLs
      console.log(this.inputValue.description);
      return '\n      <input class="text-input" name="title' + index + '" type="text" value="' + (this.inputValue.title ? this.inputValue.title : '') + '">\n      <input class="text-input" name="path' + index + '" type="text" value="' + (this.inputValue.path ? this.inputValue.path : '') + '">\n      <textarea name="description' + index + '">' + (this.inputValue.description ? this.inputValue.description : '') + '</textarea>\n    ';
    }
  }, {
    key: 'init',
    value: function init(e) {
      document.getElementById('form').appendChild(this.addElement(this.input.bind(this)));
    }
  }]);

  return Input;
}();

document.getElementById('add').addEventListener('click', function (e) {
  createInput();
});

var createInput = function createInput(inputValue) {
  var input = new Input(inputValue);
  input.init();
  inputArray.push(input);
};

function save() {
  var form = document.getElementById('form');
  var urls = Array.from(form.querySelectorAll('div'));
  urls = urls.filter(function (input, index) {
    // probably a better way to do this...
    return input.children['path' + index].value !== '';
  }).map(function (input, index) {
    var children = input.children;
    return {
      title: children['title' + index].value,
      path: children['path' + index].value,
      description: children['description' + index].value
    };
  });

  chrome.storage.sync.set({
    urls: urls
  }, function () {
    alert('saved');
  });
}

function restore() {
  chrome.storage.sync.get({
    urls: []
  }, function (items) {
    var urls = items.urls;

    urls.forEach(function (urlInput) {
      createInput(urlInput);
    });
  });
}

// Saves options to chrome.storage
document.addEventListener('DOMContentLoaded', restore);
document.getElementById('save').addEventListener('click', save);

},{}]},{},[1]);
