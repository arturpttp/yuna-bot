import { Command } from "@/discord/base";
import { ApplicationCommandType } from "discord.js";

export default new Command({
  name: "invite",
  description: "Get the link to invite me.",
  type: ApplicationCommandType.ChatInput,
  run(interaction, store) {
    interaction.reply({
        ephemeral,
        content: `https://discord.com/api/oauth2/authorize?client_id=${interaction.client.user.id}&permissions=8&scope=applications.commands+bot`
    })
  },
});
