const getAll = document.getElementById('getAll');
const run = document.getElementById('run');
// const save = document.getElementById('save');
const reset = document.getElementById('reset');

// Perhaps what you can do is GET ALL and then iterate over them.
// that way you know the key value and can loop over the results
// chrome.storage.local.get('code', value => {
//  if (value.code) {
//    editor.setValue(value.code);
//  }
// });

class Actions {

 // static getAll() {
 //   chrome.storage.local.get(null, value => {
 //     console.log(value);
 //     // editor.setValue(value);
 //   }); 
 // }

 // static runScript() {
 //   chrome.tabs.executeScript({
 //     code: editor.getValue()
 //   });   
 // }

 // static save() {
 //   chrome.storage.local.set({'code': editor.getValue()}, () => {
 //     console.log('hey!');
 //   });
 // }

 // static reset() {
 //   chrome.storage.local.remove('code', () => {
 //     console.log('removed');
 //   });
 // }
}

const inputArray = [];
let index = 0;

class Input {

  constructor(inputValue = {}) {
    this.input;
    this.inputValue = inputValue;
  }

  addElement(element) {
    this.inputWrapper = document.createElement('div');
    this.inputWrapper.innerHTML = `
        ${element()}
        <button class="button-alert" data-action="delete">Delete</button>
    `;
    this.inputWrapper.querySelector('[data-action="delete"]').addEventListener('click', this.destroy.bind(this));
    index++;
    return this.inputWrapper;
  }

  destroy() {
    this.inputWrapper.parentNode.removeChild(this.inputWrapper);
  }

  input() {
    // TODO add a description field... also add validation to ensure these are true URLs
    console.log(this.inputValue.description);
    return `
      <input class="text-input" name="title${index}" type="text" value="${this.inputValue.title ? this.inputValue.title : ''}">
      <input class="text-input" name="path${index}" type="text" value="${this.inputValue.path ? this.inputValue.path : ''}">
      <textarea name="description${index}">${this.inputValue.description ? this.inputValue.description : ''}</textarea>
    `;
  }

  init(e) {
    document.getElementById('form').appendChild(this.addElement(this.input.bind(this)));
  }
}

document.getElementById('add').addEventListener('click', (e) => {
  createInput();
});

const createInput = (inputValue) => {
  const input = new Input(inputValue);
  input.init();
  inputArray.push(input);
}

function save() {
  const form = document.getElementById('form');
  let urls = Array.from(form.querySelectorAll('div'));
  urls = urls.filter((input, index) => {
    // probably a better way to do this...
    return input.children[`path${index}`].value !== '';
  })
  .map((input, index) => {
    const children = input.children;
    return {
      title: children[`title${index}`].value,
      path: children[`path${index}`].value,
      description: children[`description${index}`].value
    }
    });

  chrome.storage.sync.set({
    urls: urls
  }, () => {
    alert('saved');
  });
}

function restore() {
  chrome.storage.sync.get({
    urls: []
  }, items => {
    const { urls } = items;
    urls.forEach(urlInput => {
      createInput(urlInput);
    });
  });
}

// Saves options to chrome.storage
document.addEventListener('DOMContentLoaded', restore);
document.getElementById('save').addEventListener('click', save);
