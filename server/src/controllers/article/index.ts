import createArticle from './create-article.js';
import deleteArticle from './delete-article.js';
import listArticle from './list-article.js';
import updateArticle from './update-article.js';

const articleController = {
  create: createArticle,
  list: listArticle,
  delete: deleteArticle,
  update: updateArticle,
};

export default articleController;
