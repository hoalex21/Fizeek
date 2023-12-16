import { defineConfig } from "cypress";
import prisma from "./db";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        async removeUserByEmail(email) {
          await prisma.user.deleteMany({
            where: {
              email: email
            }
          });
          return null;
        }
      });
    },
  },
});
