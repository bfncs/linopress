const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

const includesDirectoryTraversal = (pathString) => (
  pathString !== path.normalize(pathString)
);

const addFilenameIfNoneProvided = (pathString, filename) => {
  const parsed = path.parse(pathString);
  return parsed.ext === ''
    ? parsed.dir + parsed.base + '/' + filename
    : pathString
};

const getFilePath = (requestedPath) => (
  path.resolve(
    '../../content/' + addFilenameIfNoneProvided(requestedPath, 'index.json')
  )
);

app.all('*', (req, res, next) => {
  if (includesDirectoryTraversal(req.path)) {
    res.status(404).send('Not Found');
    return;
  }
  next();
});

app.get('/api*', (req, res) => {
  const requestedPath = req.path.replace(/^\/api\/?/, '/');
  res.sendFile(getFilePath(requestedPath), {}, (err) => {
    if (err) {
      res.status(404).send('Not Found');
    }
  });
});

app.listen(3001);