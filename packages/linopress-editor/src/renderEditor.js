import 'json-editor';

JSONEditor.defaults.theme = 'foundation5';
JSONEditor.defaults.iconlib = 'fontawesome4';

const getContentPath = pathName => {
  const path = pathName.replace(/^\/editor\//, '').replace(/\/$/, '');
  return path === '' ? '/' : `/${path}/`;
};

const insertDomElements = root => {
  const editorElement = document.createElement('div');
  root.appendChild(editorElement);

  const saveButtonElement = document.createElement('button');
  saveButtonElement.innerText = 'save';
  saveButtonElement.type = 'button';
  saveButtonElement.class = 'button';
  root.appendChild(saveButtonElement);

  const homeButtonElement = document.createElement('a');
  homeButtonElement.innerText = 'back';
  homeButtonElement.href = '/';
  homeButtonElement.className = 'button secondary';
  root.appendChild(homeButtonElement);

  return { editorElement, saveButtonElement };
};

export default root => {
  const path = getContentPath(window.location.pathname);
  const pathContentUri = `/api/content${path}index.json`;

  const { editorElement, saveButtonElement } = insertDomElements(root);

  function initEditor(domElement, schema, content) {
    const editor = new JSONEditor(domElement, {
      schema,
      startval: content,
      disable_collapse: true,
      disable_edit_json: true,
      disable_properties: true,
      no_additional_properties: true,
    });

    const saveDocument = () => {
      saveButtonElement.disabled = true;
      saveButtonElement.classList.remove('alert');
      savePage(path, editor.getValue())
        .catch(() => saveButtonElement.classList.add('alert'))
        .then(() => (saveButtonElement.disabled = false));
    };
    editor.on('change', saveDocument);
    saveButtonElement.addEventListener('click', saveDocument);
  }

  function savePage(path, page) {
    const options = {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(page),
    };
    return fetch(`/api/content${path}`, options);
  }

  const schemaPromise = fetch(`/api/schema/`)
    .then(res => res.json())
    .catch(err => console.error(`Unable to get schema from API".`, err));

  const contentPromise = fetch(pathContentUri)
    .then(res => res.json())
    .catch(err => {
      console.error(`Unable to get content for ${path} from API".`, err);
      return {};
    });

  Promise.all([schemaPromise, contentPromise]).then(([schema, content]) => {
    initEditor(editorElement, schema, content);
  });
};
