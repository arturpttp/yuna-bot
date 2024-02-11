import { db } from "@/database";
import { log } from "@/settings";
import ck from "chalk";
import { Event } from "./../base/Event";

export default new Event({
  name: "guildCreate",
  run(guild) {
    if (!guild) return;
    
    db.guilds
      .push(guild.id, {
        createdAt: guild.createdAt,
      })
      .finally(() => {
        log.success(ck.magenta(guild.name) + ck.yellow(" added to database."));
      });
  },
});
