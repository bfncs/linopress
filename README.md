# Linopress

Linopress is a static site generator based on [React](https://facebook.github.io/react/) components and [JSON Schema](http://json-schema.org/) with a local GUI to make editing easy.

⚠ Use only with a truckload of salt, this is just an exploration of the concepts and utterly rough around the edges.

## Install

Checkout this repository and install node dependencies:

```
git clone git@github.com:bfncs/linopress.git
cd linopress
npm install
```

## Edit

To start editing start up all components with `npm start`. This will fire up frontend and editor in your browser.

All content changes will be persisted to your filesystem in `content/`. If you want to edit react components or add new ones, do this in `src/components/` and change the JSON schema for the editor in `packages/linopress-api/schema.json` if needed.

## Build

Run `npm run build` to build a statically deployable rendering of your website into `build/`. 


## Roadmap

* Split actual content from generator, API and editor
* Editor can revert changes (using a temporary file that has to be explicitly commited)
* I18N of content
* Frontend uses websockets to listen for change messages instead of polling
* Drop [jdorn/json-editor](https://github.com/jdorn/json-editor) in favor of [mozilla-services/react-jsonschema-form](https://github.com/mozilla-services/react-jsonschema-form) once [#52](https://github.com/mozilla-services/react-jsonschema-form/issues/52) is resolved