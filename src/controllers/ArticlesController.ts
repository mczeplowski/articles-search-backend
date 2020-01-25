import { Request, Response } from "express";
import { getRepository, Like } from "typeorm";
import { validate } from "class-validator";

import { Article } from "../entity/Article";

class ArticlesController {
  static listAll = async (req: Request, res: Response) => {
    const { q } = req.query;

    const where = q
      ? {
          $or: [
            { title: { $regex: new RegExp(q, "i") } },
            { author: { $regex: new RegExp(q, "i") } },
            { content: { $regex: new RegExp(q, "i") } },
            { keyWords: { $regex: new RegExp(q, "i") } }
          ]
        }
      : null;

    const articlesRepository = getRepository(Article);
    const articles = await articlesRepository.find({
      select: ["_id", "title", "author", "content", "keyWords", "createdAt"],
      where
    });

    res.send(articles);
  };

  static getOneById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const articlesRepository = getRepository(Article);
    try {
      const article = await articlesRepository.findOneOrFail(id, {
        select: ["id", "title", "author", "content", "keyWords", "createdAt"]
      });

      res.send(article);
    } catch (error) {
      res.status(404).send("Article not found");
    }
  };

  static newArticle = async (req: Request, res: Response) => {
    let { title, author, keyWords, content } = req.body;

    let article = new Article();
    article.title = title;
    article.author = author;
    article.keyWords = keyWords;
    article.content = content;

    const errors = await validate(article);
    if (errors.length) {
      res.status(400).send(errors);
      return;
    }

    const articlesRepository = getRepository(Article);

    try {
      await articlesRepository.save(article);
    } catch (e) {
      res.status(409).send("username already in use");
      return;
    }

    res.status(201).send("User created");
  };

  static editArticle = async (req: Request, res: Response) => {
    const { id } = req.params;
    let { title, author, keyWords, content } = req.body;

    const articlesRepository = getRepository(Article);
    let article;
    try {
      article = await articlesRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send("Article not found");
      return;
    }

    article.title = title;
    article.author = author;
    article.keyWords = keyWords;
    article.content = content;

    const errors = await validate(article);
    if (errors.length) {
      res.status(400).send(errors);
      return;
    }

    try {
      await articlesRepository.save(article);
    } catch (e) {
      res.status(409).send("Error in saving");
      return;
    }
    res.status(204).send(article);
  };

  static deleteArticle = async (req: Request, res: Response) => {
    const { id } = req.params;

    const articlesRepository = getRepository(Article);
    let article: Article;
    try {
      article = await articlesRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send("Article not found");
      return;
    }
    articlesRepository.delete(id);

    res.status(204).send(article);
  };
}

export default ArticlesController;
