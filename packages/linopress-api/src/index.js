const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mkdirp = require('mkdirp');
const jetpack = require('fs-jetpack');
const generateSitemap = require('./lib/generateSitemap');

const app = express();
const jsonParser = bodyParser.json();

const contentBasePath = path.resolve(__dirname + '/../../../content/');

const includesDirectoryTraversal = pathString =>
  pathString !== path.normalize(pathString);

const addFilenameIfNoneProvided = (pathString, filename) => {
  const parsed = path.parse(pathString);
  return parsed.ext === ''
    ? parsed.dir + '/' + parsed.base + '/' + filename
    : pathString;
};

const getFilePath = requestedPath =>
  path.resolve(
    contentBasePath + addFilenameIfNoneProvided(requestedPath, 'index.json')
  );

const writeFile = (targetPath, contents, cb) => {
  mkdirp(path.dirname(targetPath), err => {
    if (err) return cb(err);
    fs.writeFile(targetPath, contents, cb);
  });
};

app.all('*', (req, res, next) => {
  if (includesDirectoryTraversal(req.path)) {
    res.status(404).send('Not Found');
    return;
  }
  next();
});

app.get('/api/content*', (req, res) => {
  const requestedPath = req.path.replace(/^\/api\/content\/?/, '/');
  res.sendFile(getFilePath(requestedPath), {}, err => {
    if (err) {
      res.status(404).send('Not Found');
    }
  });
});

app.post('/api/content*', jsonParser, (req, res) => {
  if (!req.body) {
    res.status(400).send('Bad Request');
    return;
  }

  const requestedPath = req.path.replace(/^\/api\/content\/?/, '/');
  const filePath = getFilePath(requestedPath);

  writeFile(filePath, JSON.stringify(req.body, null, 2), err => {
    if (err) {
      throw err;
    }
    res.status(200).send('Ok');
  });
});

app.get('/api/schema', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/schema.json`));
});

app.get('/api/sitemap', (req, res) => {
  jetpack
    .inspectTreeAsync(contentBasePath, { relativePath: true })
    .then(tree => {
      res.status(200).json(generateSitemap(tree));
    });
});

app.use((err, req, res, next) => {
  console.error(err);
  if (err instanceof SyntaxError) {
    res.status(400).send('Bad Request');
    return;
  }
  res.status(500).send();
});

app.listen(3001);
