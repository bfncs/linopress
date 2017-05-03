# Linopress

Serverless simple CMS/Static Site Generator

## Todo

* Remove old editor
* API can deliver scheme (statically)
* Editor fetches scheme from API
* Editor can save to document via API
* Frontend polling for changes
* API delivers sitemap
* Editor has frontend to show sitemap
* Websockets for change messages

## The plan

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
