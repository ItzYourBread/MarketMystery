import { Constants, Client, CommandInteraction } from "eris"
import { getView } from "./subs/market/view"

export default {
	data: {
		name: "market",
		description: "SubCommands of Market",
		options: [
			{
				name: "view",
				type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
				description: "View all the stock companies"
			},
		]
	},
	async execute(client: Client, interaction: CommandInteraction) {
		switch (interaction.data.options[0].name) {
			case "view":
				getView(client, interaction);
				break;
		}
	}
}