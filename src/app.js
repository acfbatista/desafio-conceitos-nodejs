const express = require("express");
const cors = require("cors");
const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs, likes } = request.body;

  if (likes) {
    return response.status(400).json({ error: 'The repository cannot contain []like] propertie'});
  }

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { likes } = request.body;
  const newRepository = { title, url, techs } = request.body;
  const repositoryIndex = repositories.findIndex(repository => repository.id = id);

  if (likes) {
    return response.status(400).json({ error: 'The repository cannot contain []like] propertie'});
  }

  if (repositoryIndex < 0) {
    return response.status(404).json({ error: 'Repository not found'});
  }

  repository = Object.assign(repositories[repositoryIndex], newRepository);

  repositories[repositoryIndex] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex(repository => repository.id = id);

  if (repositoryIndex < 0) {
    return response.status(404).json({ error: 'Repository not found'});
  }

  repositories.splice(repositoryIndex, 1);

  return response.send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex(repository => repository.id = id);

  if (repositoryIndex < 0) {
    return response.status(404).json({ error: 'Repository not found'});
  }

  repositories[repositoryIndex].likes++;

  return response.json({ likes: repositories[repositoryIndex].likes });
});

module.exports = app;
