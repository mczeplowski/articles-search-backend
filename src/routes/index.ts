import { Router } from "express";
import auth from "./auth";
import users from "./users";
import articles from "./articles";

const routes = Router();

routes.use("/auth", auth);
routes.use("/users", users);
routes.use("/articles", articles);

export default routes;
