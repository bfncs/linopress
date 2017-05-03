import 'json-editor';
import schema from '../../linopress-api/schema.json';

JSONEditor.defaults.theme = 'foundation5';
JSONEditor.defaults.iconlib = 'fontawesome4';

function initEditor(domElement, schema) {
    new JSONEditor(
        domElement,
        {
            schema,
            disable_collapse: true,
            disable_edit_json: true,
            disable_properties: true,
            no_additional_properties: true,
        }
    );
}

const editorElement = document.getElementById('editor');

fetch(`/api/schema/`, { mode: 'no-cors' })
    .then(res => res.json())
    .then(json => initEditor(editorElement, json))
    .catch(err => console.error(`Unable to get schema from API".`, err))
