// import brace from 'brace';
// import 'brace/mode/javascript';
// import 'brace/theme/monokai';

// // const editor = brace.edit('javascript-editor');
// // editor.getSession().setMode('ace/mode/javascript');
// // editor.setTheme('ace/theme/monokai');





// const getAll = document.getElementById('getAll');
// const run = document.getElementById('run');
// // const save = document.getElementById('save');
// const reset = document.getElementById('reset');

// // Perhaps what you can do is GET ALL and then iterate over them.
// // that way you know the key value and can loop over the results
// // chrome.storage.local.get('code', value => {
// //  if (value.code) {
// //    editor.setValue(value.code);
// //  }
// // });

// class Actions {

//  // static getAll() {
//  //   chrome.storage.local.get(null, value => {
//  //     console.log(value);
//  //     // editor.setValue(value);
//  //   }); 
//  // }

//  // static runScript() {
//  //   chrome.tabs.executeScript({
//  //     code: editor.getValue()
//  //   });   
//  // }

//  // static save() {
//  //   chrome.storage.local.set({'code': editor.getValue()}, () => {
//  //     console.log('hey!');
//  //   });
//  // }

//  // static reset() {
//  //   chrome.storage.local.remove('code', () => {
//  //     console.log('removed');
//  //   });
//  // }
// }

// // const fixtures = [
// //   {title: 'This is my title'},
// //   {title: 'This is'},
// //   {title: 'This the title'},
// //   {title: 'Title'}
// // ];

// // let index = 0;

// // const updateDOM = (elements, selector) => {
// //   if (selector) {
// //     document.querySelector(selector).appendChild(elements);  
// //   } else {
// //     document.body.appendChild(elements);
// //   }
// // }

// // const addElement = (element, attributes = {}, children) => {
// //   const el = document.createElement(element);
// //   index++;

// //   if (Array.isArray(children)) {
// //     children.forEach(childElement => el.appendChild(childElement));
// //   } else if (typeof children === 'object') {
// //     el.appendChild(children);
// //   } else if (typeof children === 'string') {
// //     el.innerHTML = children;
// //   }

// //   Object.keys(attributes).forEach(attribute => el.setAttribute(attribute, attributes[attribute]));
// //   el.setAttribute('data-index', index);

// //   return el
// // }

// // const removeElement = (index) => {
// //   const el = document.querySelector(`[data-index="${index}"]`);
// //   console.log(el);
// //   el.parentNode.removeChild(el);
// // }

// // // fixtures.forEach(fixture => {
// // //   console.log(fixture.title);
// // //   const { title } = fixture;
// // //   addElement('div', {class: 'its-cool',title: 'element title', 'data-element': 'thing'}, title);
// // // });


// // document.body.addEventListener('click', (e) => {
// //   if (e.target.hasAttribute('data-element')) {
// //     removeElement(e.target.getAttribute('data-index'));
// //   }
// // });

// // document.getElementById('add').addEventListener('click', (e) => {
// //   updateDOM(addElement('button', {'data-element': 'subtract'}, [addElement('p', {}, 'Add'), addElement('p', {}, 'Subtract')]), '#content');
// // });























// let index = 0;
// const textEditors = [];

// class TextEditor {
//   constructor() {
//     this.editor;
//   }

//   addElement(element) {
//     index++;  
//     return `
//       <div data-index="${index}">
//         ${element(index)}
//       </div>
//     `;
//   }

//   textEditor() {
//     return `<div id="javascript-editor-${index}" class="text-editor"></div>`;
//   }

//  /*
//  * DOMposition
//  * @param DOMlocation {String} - top/bottom/after/before
//  * Visualization of position names:
//  *
//  *   <!-- beforebegin -->
//  *   <p>
//  *     <!-- afterbegin -->
//  *     foo
//  *     <!-- beforeend -->
//  *   </p>
//  *   <!-- afterend -->
//  *
//  */
//  DOMposition(DOMlocation) {
//     let method;
//     switch (DOMlocation) {
//       case 'top': method = 'afterbegin'; break;
//       case 'bottom': method = 'beforeend'; break;
//       case 'after': method = 'afterend'; break;
//       case 'before': method = 'beforebegin'; break;
//     }

//     return method;
//   }

//   init(e) {
//     document.getElementById('content').insertAdjacentHTML(this.DOMposition('bottom'), this.addElement(this.textEditor));
//     this.editor = brace.edit(`javascript-editor-${index}`);
//     this.editor.getSession().setMode('ace/mode/javascript');
//     this.editor.setTheme('ace/theme/monokai');

//     document.getElementById(`javascript-editor-${index}`).addEventListener('click', () => {
//       console.log(this.editor.getValue());
//     })
//   }
// }



// document.getElementById('add').addEventListener('click', () => {
//   const edit = new TextEditor();
//   edit.init();
//   textEditors.push(edit);
// });


// setTimeout(() => {
//   console.log(textEditors);
// }, 10000);












// function save() {
//   const configUrl = document.getElementById('config').value;

//   const textEditorValues = textEditors
//     .filter(textEditor => textEditor.editor.getValue() !== '')
//     .map(textEditor => textEditor.editor.getValue());

//   console.log(textEditorValues);

//   chrome.storage.sync.set({
//     configUrl: configUrl,
//     textEditorValues: textEditorValues
//   }, () => {
//     alert('saved');
//   });
// }

// function restore() {
//   chrome.storage.sync.get({
//     configUrl: '',
//     textEditorValues: []
//   }, items => {
//     const { configUrl, textEditorValues } = items;

//     document.getElementById('config').value = items.configUrl;

//     textEditorValues.forEach(value => {
//       const edit = new TextEditor();
//       edit.init();
//       edit.editor.setValue(value);
//       textEditors.push(edit);
//     });

//   });
// }
// // document.addEventListener('DOMContentLoaded', restore_options);
// // document.getElementById('save').addEventListener('click', save_options);

// // Saves options to chrome.storage
// console.log(chrome.storage);
// document.addEventListener('DOMContentLoaded', restore);
// document.getElementById('save').addEventListener('click', save);







import brace from 'brace';
import 'brace/mode/javascript';
import 'brace/theme/monokai';

// const editor = brace.edit('javascript-editor');
// editor.getSession().setMode('ace/mode/javascript');
// editor.setTheme('ace/theme/monokai');





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

// const fixtures = [
//   {title: 'This is my title'},
//   {title: 'This is'},
//   {title: 'This the title'},
//   {title: 'Title'}
// ];

// let index = 0;

// const updateDOM = (elements, selector) => {
//   if (selector) {
//     document.querySelector(selector).appendChild(elements);  
//   } else {
//     document.body.appendChild(elements);
//   }
// }

// const addElement = (element, attributes = {}, children) => {
//   const el = document.createElement(element);
//   index++;

//   if (Array.isArray(children)) {
//     children.forEach(childElement => el.appendChild(childElement));
//   } else if (typeof children === 'object') {
//     el.appendChild(children);
//   } else if (typeof children === 'string') {
//     el.innerHTML = children;
//   }

//   Object.keys(attributes).forEach(attribute => el.setAttribute(attribute, attributes[attribute]));
//   el.setAttribute('data-index', index);

//   return el
// }

// const removeElement = (index) => {
//   const el = document.querySelector(`[data-index="${index}"]`);
//   console.log(el);
//   el.parentNode.removeChild(el);
// }

// // fixtures.forEach(fixture => {
// //   console.log(fixture.title);
// //   const { title } = fixture;
// //   addElement('div', {class: 'its-cool',title: 'element title', 'data-element': 'thing'}, title);
// // });


// document.body.addEventListener('click', (e) => {
//   if (e.target.hasAttribute('data-element')) {
//     removeElement(e.target.getAttribute('data-index'));
//   }
// });

// document.getElementById('add').addEventListener('click', (e) => {
//   updateDOM(addElement('button', {'data-element': 'subtract'}, [addElement('p', {}, 'Add'), addElement('p', {}, 'Subtract')]), '#content');
// });























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
