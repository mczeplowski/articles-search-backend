import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { User } from "../entity/User";

class UsersController {
  static listAll = async (req: Request, res: Response) => {
    const usersRepository = getRepository(User);
    const users = await usersRepository.find({
      select: ["id", "username", "role"]
    });

    res.send(users);
  };

  static getOneById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const usersRepository = getRepository(User);
    try {
      const user = await usersRepository.findOneOrFail(id, {
        select: ["id", "username", "role"]
      });

      res.send(user);
    } catch (error) {
      res.status(404).send("User not found");
    }
  };

  static newUser = async (req: Request, res: Response) => {
    let { username, password, role } = req.body;

    let user = new User();
    user.username = username;
    user.password = password;
    user.role = role;

    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    user.hashPassword();

    const usersRepository = getRepository(User);
    try {
      await usersRepository.save(user);
    } catch (e) {
      res.status(409).send("username already in use");
      return;
    }

    res.status(201).send("User created");
  };

  static editUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { username, role } = req.body;

    const usersRepository = getRepository(User);
    let user;
    try {
      user = await usersRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send("User not found");
      return;
    }

    user.username = username;
    user.role = role;
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    try {
      await usersRepository.save(user);
    } catch (e) {
      res.status(409).send("username already in use");
      return;
    }
    res.status(204).send(user);
  };

  static deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    const usersRepository = getRepository(User);
    let user: User;
    try {
      user = await usersRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send("User not found");
      return;
    }
    usersRepository.delete(id);

    res.status(204).send(user);
  };
}

export default UsersController;
