import { Router } from "express";
import ArticlesController from "../controllers/ArticlesController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

router.get("/", ArticlesController.listAll);

router.get("/:id", ArticlesController.getOneById);

router.post(
  "/",
  [checkJwt, checkRole(["ADMIN"])],
  ArticlesController.newArticle
);

router.patch(
  "/:id",
  [checkJwt, checkRole(["ADMIN"])],
  ArticlesController.editArticle
);

router.delete(
  "/:id",
  [checkJwt, checkRole(["ADMIN"])],
  ArticlesController.deleteArticle
);

export default router;
