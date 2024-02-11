import { Event } from "./../base/Event";

export default new Event({
  name: "guildCreate",
  run(guild) {
    if (!guild) return;
  },
});
