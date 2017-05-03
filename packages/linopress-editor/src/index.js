import 'json-editor';

JSONEditor.defaults.theme = 'foundation5';
JSONEditor.defaults.iconlib = 'fontawesome4';

const path = window.location.pathname
    .replace(/^\//, '')
    .replace(/\/$/, '');
const pathContentUri = `/api/content/${path}/index.json`;

const editorElement = document.getElementById('editor');
const saveButtonElement = document.querySelector('[data-action="SAVE_DOCUMENT"]');

function initEditor(domElement, schema, content) {
    const editor = new JSONEditor(
        domElement,
        {
            schema,
            startval: content,
            disable_collapse: true,
            disable_edit_json: true,
            disable_properties: true,
            no_additional_properties: true,
        }
    );

    const saveDocument = () => {
        saveButtonElement.disabled = true;
        saveButtonElement.classList.remove('alert');
        savePage(path, editor.getValue())
            .catch(() => saveButtonElement.classList.add('alert'))
            .then(() => saveButtonElement.disabled = false);
    };
    editor.on('change', saveDocument);
    saveButtonElement.addEventListener('click',saveDocument);
}

function savePage (path, page) {
    const options = {
        method: 'post',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(page),
    };
    return fetch(`/api/content/${path}`, options);
}

const schemaPromise = fetch(`/api/schema/`)
    .then(res => res.json())
    .catch(err => console.error(`Unable to get schema from API".`, err));

const contentPromise = fetch(pathContentUri)
    .then(res => res.json())
    .catch(err => console.error(`Unable to get content for /${path} from API".`, err));

Promise.all([schemaPromise, contentPromise])
    .then(([schema, content]) => {
        initEditor(editorElement, schema, content)
    });
