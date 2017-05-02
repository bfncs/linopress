import 'json-editor';
import schema from './schema.json';

JSONEditor.defaults.theme = 'foundation5';
JSONEditor.defaults.iconlib = 'fontawesome4';

new JSONEditor(
    document.getElementById('editor'),
    {
        schema,
        disable_collapse: true,
        disable_edit_json: true,
        disable_properties: true,
        no_additional_properties: true,
    }
);
