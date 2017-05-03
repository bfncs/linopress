import 'json-editor';
import schema from '../../linopress-api/schema.json';

JSONEditor.defaults.theme = 'foundation5';
JSONEditor.defaults.iconlib = 'fontawesome4';

function initEditor(domElement, schema, content) {
    new JSONEditor(
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
}

const editorElement = document.getElementById('editor');

const schemaPromise = fetch(`/api/schema/`)
    .then(res => res.json())
    .catch(err => console.error(`Unable to get schema from API".`, err));

const path = window.location.pathname
    .replace(/^\//, '')
    .replace(/\/$/, '');
const pathContentUri = `/api/content/${path}/index.json`;
const contentPromise = fetch(pathContentUri)
    .then(res => res.json())
    .catch(err => console.error(`Unable to get content for /${path} from API".`, err));

Promise.all([schemaPromise, contentPromise])
    .then(([schema, content]) => {
        initEditor(editorElement, schema, content)
    });