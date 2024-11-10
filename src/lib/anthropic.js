import { writable } from "svelte/store";
import { Anthropic } from "@anthropic-ai/sdk";

export let anthropicStatus = writable("");

const c_anthropic = new Anthropic({
	apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
    dangerouslyAllowBrowser: true
});

export async function imageAnthropic(imagedata) {
    console.log("Running Anthropic Analysis")
    anthropicStatus.set("Running Anthropic analysis")
	let message = await c_anthropic.messages.create({
		model: "claude-3-5-sonnet-20241022",
		max_tokens: 1024,
		messages: [
			{
				role: "user",
				content: [
					{
						type: "image",
						source: {
							type: "base64",
							media_type: "image/png",
							data: imagedata,
						},
					},
					{
						type: "text",
						text: `generate music suggestions based on this image: Describe the mood, setting, and cultural context, and suggest music styles, artists, or songs from various languages that would enhance the scene. Consider genres and artists from popular global music scenes, including American, Latin, European, Asian, and African influences, with options in languages like English, Spanish, French, Hindi, Korean, Arabic, and more. Base your suggestions on the image's emotional tone, colors, and visual themes, aligning music choices with the ambiance and cultural diversity reflected. List 10 songs in JSON format, with a key "songs" which contains an array, each array element matches the format of a key "artist" which contains the artists name, and the key "title" which contains the songs title. Do not add any other text to your response, only the JSON format specified. If you would like, you can place exactly why you picked these songs in a new value on the JSON object titled "reasoning", but the overall structure of your response should be purely JSON.`,
					},
				],
			},
		],
	});
    anthropicStatus.set("Songs generated, obtaining song data from Spotify")
	console.log(message["content"][0]["text"]);
    let json = JSON.parse(message["content"][0]["text"])
	console.log(json);
    return json;
}
