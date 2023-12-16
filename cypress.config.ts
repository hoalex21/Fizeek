import { defineConfig } from "cypress";
import prisma from "./db";
import bcrypt from "bcrypt";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        async insertUser(user) {
          const passwordHash = await bcrypt.hash(user.password, 10);
          await prisma.user.create({
            data: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                username: user.username,
                password: passwordHash,
              }
          });
          return null;
        },
        async removeUserByEmail(email) {
          await prisma.user.deleteMany({
            where: {
              email: email
            }
          });
          return null;
        },
        async getUserByEmail(email) {
          const users = await prisma.user.findMany({
            where: {
              email: email
            }
          });

          return users[0];
        },
        async compareHash({string, hash}) {
          return bcrypt.compare(string, hash);
        },
      });
    },
  },
});
