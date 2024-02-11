import { db } from "@/database";
import { log } from "@/settings";
import ck from "chalk";
import { Event } from "./../base/Event";

export default new Event({
  name: "ready",
  once: true,
  async run(client) {
    client.guilds.cache.forEach((guild) => {
      db.guilds.has(guild.id).then((has) => {
        if (!has)
          db.guilds
            .push(guild.id, {
              createdAt: guild.createdAt,
            })
            .finally(() => {
              log.success(
                ck.magenta(guild.name) + ck.yellow(" added to database.")
              );
            });
        else {
          log.info(
            ck.cyanBright(ck.underline(guild.name)) +
              ck.blueBright(" is in database.")
          );
        }
      });
    });
  },
});
