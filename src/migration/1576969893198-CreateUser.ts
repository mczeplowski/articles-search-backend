// import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
// import { User } from "../entity/User";

// export class CreateUser1576969893198 implements MigrationInterface {
//   public async up(queryRunner: QueryRunner): Promise<any> {
//     let user = new User();
//     user.username = "user";
//     user.password = "user";
//     user.hashPassword();
//     user.role = "USER";
//     const userRepository = getRepository(User);
//     await userRepository.save(user);
//   }

//   public async down(queryRunner: QueryRunner): Promise<any> {}
// }
