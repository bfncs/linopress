# Linopress

Serverless simple CMS/Static Site Generator

## Todo

* Editor saves on change
* Frontend polls for changes
* API delivers sitemap
* Editor shows frontend to show sitemap
* Frontend uses websockets to listen for change messages

## The plan (well, kind of)

### `npm start`

* Node API
 * GET /sitemap
 * GET /content/path/to/content
   * Page config object with array of pattern config objects
 * POST/PUt /content/path/to/content
* React Frontend:
 * Open on sitemap tree view, edit button for every leaf, add button for adding leaf below
 * Render Editor and Content Side-by-Side (toggleable)
 * Page config object is saved as state
 * Ability to modify existing patterns and add new ones
 * Save to save to disk in project through API
* Components & Entities
 * Pattern Components get pattern config as props and render component
 * Pattern Editor Components enable modification of a Pattern Component instance
 * Page Editor Components allow editing page metadata and define addable components

### `npm run build`
Normal static site generator. Each route (/sitemap) is rendered, config state is added to window object for rejuicing in the client. No client transitions between routes but hard reloads (maybe STATIC JSON GET API later).

### `git push`

git push to deploy!

No complexity. Simple. Stupid. No versioning, no user & access management, no administration. But: hefty performance, rock solid security, beautiful editor & developer experience!

Next: I18N
