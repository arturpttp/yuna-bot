import { Command } from "@/discord/base";
import { settings } from "@/settings";
import { createEmbed, createTimeout } from "@magicyan/discord";
import { ChannelType } from "discord.js";
import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
  CategoryChannel,
  channelMention,
} from "discord.js";

new Command({
  name: "say",
  description: "Create a embed with this command",
  dmPermission,
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "text",
      description: "the text to say",
      type: ApplicationCommandOptionType.String,
      required,
    },
    {
      name: "title",
      description: 'title of the embed, "none" to embed without title',
      type: ApplicationCommandOptionType.String,
    },
    {
      name: "channel",
      description: "channel to send",
      type: ApplicationCommandOptionType.Channel,
    },
  ],
  async run(interaction) {
    if (!interaction.channel) return;
    const { options } = interaction;
    const text = options.getString("text") ?? "Undefined text!";
    let title = options.getString("title") ?? undefined;
    const isEmbed = title !== undefined;
    console.log({ options });
    let channel = options.getChannel("channel");
    if (!channel?.isTextBased || channel.type !== ChannelType.GuildText) {
      channel = null;
    }
    console.log({ channel });
    if (isEmbed) {
      if (title === "none") title = undefined;
      (channel ?? interaction.channel).send({
        embeds: [
          createEmbed({
            color: settings.colors.theme.fuchsia,
            title,
            description: text,
          }),
        ],
      });
    } else {
      (channel ?? interaction.channel).send({ content: text });
    }
    interaction.reply({
      content: `Sent in ${channelMention((channel ?? interaction.channel).id)}`,
      ephemeral,
    });
    createTimeout({
      time: 10000,
      run() {
        interaction.deleteReply();
      },
    });
  },
});
