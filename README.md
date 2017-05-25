# Linopress

Linopress is a static site generator based on [React](https://facebook.github.io/react/) components and [JSON Schema](http://json-schema.org/) with a local GUI to make editing easy.

⚠ Use only with a truckload of salt, this is just an exploration of the concepts and utterly rough around the edges.

## Start a new project

To get started quickly, copy the files in `/example` to a new directory and install dependencies using `npm install`.

## Edit

To start editing start up editing mode with `npm start`. This will fire up the frontend at [`localhost:3000`](http://localhost:3000) in your browser. You can now start using the editing interface at [`localhost:3000/editor`](http://localhost:3000/editor). 

All content changes will be persisted to your filesystem in `content/`. If you want to edit react components or add new ones, do this in your project folder in `src/components/` and change the JSON schema for the editor in `src/api/schema.json` if needed.

## Build

Run `npm run build` to build a statically deployable rendering of your website into `build/`. 


## TODO

* Make ports configurable
* Editor can revert changes (using a temporary file that has to be explicitly commited)
* I18N of content
* Frontend uses websockets to listen for change messages instead of polling
* Drop [jdorn/json-editor](https://github.com/jdorn/json-editor) in favor of [mozilla-services/react-jsonschema-form](https://github.com/mozilla-services/react-jsonschema-form) once [#52](https://github.com/mozilla-services/react-jsonschema-form/issues/52) is resolved