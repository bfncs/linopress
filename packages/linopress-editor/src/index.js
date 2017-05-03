import 'json-editor';

JSONEditor.defaults.theme = 'foundation5';
JSONEditor.defaults.iconlib = 'fontawesome4';

const path = window.location.pathname
    .replace(/^\//, '')
    .replace(/\/$/, '');
const pathContentUri = `/api/content/${path}/index.json`;

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

    document.querySelector('[data-action="SAVE_DOCUMENT"]')
        .addEventListener('click',() => {
            const document = editor.getValue();
            savePage(
                path,
                document,
                () => console.log('Saved document, yay!')
            );
        });
}

function savePage (path, page, onSuccess) {
    const options = {
        method: 'post',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(page),
    };
    fetch(`/api/content/${path}`, options)
        .then(() => onSuccess())
        .catch(err => console.error(`Unable to save content for "${path}".`, err))
};

const editorElement = document.getElementById('editor');

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
