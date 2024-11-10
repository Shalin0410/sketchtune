import { writable, get } from "svelte/store";
// const clientId = "3e261e446ac04ff7b3c06e6de081f04c";
// const clientSecret = "419819b01043489b9dba972efb4898c2";
// Get Spotify access token
export async function getAccessToken() {
	const response = await fetch("https://accounts.spotify.com/api/token", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
		},
		body: "grant_type=client_credentials",
	});
	const data = await response.json();
	return data.access_token;
}

export async function getTrackData(songName, accessToken) {
	const response = await fetch(
		`https://api.spotify.com/v1/search?q=${encodeURIComponent(
			songName
		)}&type=track&limit=1&include_external=audio`,
		{
			headers: {
				Authorization: "Bearer " + accessToken,
			},
		}
	);
	const data = await response.json();
	console.log(data);
	return data.tracks.items[0];
}
