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
						text: "Describe the mood of the drawing.",
					},
				],
			},
		],
	});
    console.log("Analysis complete, beginning song generation")
    anthropicStatus.set("Analysis complete, beginning song generation")
    console.log(message['content'][0]['text'])
	let song = await c_anthropic.messages.create({
		model: "claude-3-5-sonnet-20241022",
		max_tokens: 1024,
		messages: [
			{
				role: "user",
				content:
					'List 5 songs that match this vibe in JSON format, with a key "songs" which contains an array, each array element matches the format of a key "artist" which contains the artists name, and the key "title" which contains the songs title:' +
					message["content"][0]["text"],
			},
		],
	});
    anthropicStatus.set("Songs generated, obtaining song data from Spotify")
	console.log(song["content"][0]["text"]);
    let json = JSON.parse(song["content"][0]["text"])
	console.log(json);
    return json;
}
