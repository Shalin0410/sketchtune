<script>
	import { line, Point } from "$lib";
	import {
		IconPencil,
		IconEraser,
		IconCircleFilled,
		IconTrash,
		IconLoader2,
	} from "@tabler/icons-svelte";
	import { tweened } from "svelte/motion";
	import { fade } from "svelte/transition";
	import { onMount } from "svelte";
	import { imageAnthropic, anthropicStatus } from "$lib/anthropic";
	import { getTrackData, getAccessToken } from "$lib/spotify";

	let progressBarStore = tweened(0);

	let accessToken = "";
	let canvas;
	let ctx;
	let drawingSize = 2;
	let pointerDown = false;
	let previousX = 0;
	let previousY = 0;
	let size = 512;
	let curColor = "black";

	let drawnAtAll = false;
	let songsRecommended = false;
	let startedFirstRecommendation = false;
	let songQueue = [];
	let activeSong = {};
	$: playSong(activeSong);

	let tool = "pen";
	let audio;
	onMount(async () => {
		ctx = canvas.getContext("2d");
		accessToken = await getAccessToken();
		console.log(accessToken);
	});

	function chooseTool(t) {
		tool = t;
		if (t == "eraser") {
			ctx.globalCompositeOperation = "destination-out";
			ctx.fillStyle = "white";
		} else {
			ctx.globalCompositeOperation = "source-over";
			ctx.fillStyle = curColor;
		}
	}
	let timeout;
	function playSong(song) {
		if (!songsRecommended) return;
		if (audio != null) audio.pause();
		clearTimeout(timeout);
		progressBarStore.set(0, {duration: 0});
		console.log(song);
		audio = new Audio(song.audioTrack);
		audio.play();
		progressBarStore.set(1, { duration: song.duration });
		timeout = setTimeout(() => {
			nextSong();
		}, song.duration);
	}

	function stopSong() {
		if (audio != null) audio.pause();
		clearTimeout(timeout);
		progressBarStore.set(0, {duration: 0});

	}

	let loading = false;
	async function getAnthropicRecommendations() {
		let base = canvas.toDataURL();
		loading = true;
		base = base.replace("data:image/png;base64,", "");
		let results = await imageAnthropic(base);
		let queue = results.songs;
		let newQueue = [];
		for (let i = 0; i < queue.length; i++) {
			let data = await getTrackData(queue[i].title + "-" + queue[i].artist, accessToken);
			console.log(data);
			queue[i].cover = data.album.images[0].url;
			queue[i].duration = 30000;
			queue[i].url = data.external_urls.spotify;
			queue[i].audioTrack = data.preview_url;
			if (data.preview_url != null) {
				newQueue.push(queue[i]);
			}
		}
		loading = false;
		return newQueue;
	}

	async function getAnthropicFirstTime() {
		let queue = await getAnthropicRecommendations();
		songQueue = queue;
		activeSong = songQueue.shift();
		songsRecommended = true;
		getAnthropicLoop();
	}

	async function getAnthropicLoop() {
		setTimeout(async () => {
			let queue = await getAnthropicRecommendations();
			queue.forEach((q) => {
				songQueue.push(q);
			});
			songQueue = [...songQueue];
			getAnthropicLoop();
		}, 300000); // wait five minutes before generating more
	}
	$: {
		if(songQueue.length == 2) {
			getAnthropicRecommendations().then((queue) => {
				queue.forEach((q) => {
					songQueue.push(q);
				});
				songQueue = [...songQueue];
			});
		}

	}

	function nextSong() {
		if (songQueue.length == 0) {
			clearQueue();
			return;
		}
		stopSong();
		activeSong = songQueue.shift();
		songQueue = [...songQueue];
	}

	function clearQueue() {
		songsRecommended = false;
		startedFirstRecommendation = false;
		getAnthropicFirstTime();
		stopSong();
		startedFirstRecommendation = true;
	}

	function processPoint(x, y) {
		let rect = canvas.getBoundingClientRect();
		x -= rect.left;
		y -= rect.top;
		x /= rect.width;
		y /= rect.height;
		x *= size;
		y *= size;
		x = Math.floor(x);
		y = Math.floor(y);
		return { x, y };
	}

	function setColor(color) {
		ctx.fillStyle = color;
		curColor = color;
	}

	function pointerDownHandler(e) {
		e.preventDefault();
		if (e.target != canvas) return;
		pointerDown = true;
		let { x, y } = processPoint(e.clientX, e.clientY);
		previousX = x;
		previousY = y;
	}

	function pointerUpHandler(e) {
		e.preventDefault();
		if (pointerDown) {
			drawnAtAll = true;
			setTimeout(() => {
				if (!startedFirstRecommendation) getAnthropicFirstTime();
				startedFirstRecommendation = true;
			}, 5000);
		}
		pointerDown = false;
	}

	function pointerMoveHandler(e) {
		e.preventDefault();
		if (!pointerDown || ctx == null) return;
		let { x, y } = processPoint(e.clientX, e.clientY);
		let linePoints = line(new Point(previousX, previousY), new Point(x, y));
		linePoints.forEach((point) => {
			ctx.beginPath();
			ctx.arc(point.x, point.y, drawingSize, 0, 2 * Math.PI);
			ctx.fill();
		});
		previousX = x;
		previousY = y;
	}
</script>

<svelte:window
	on:pointerdown|nonpassive={pointerDownHandler}
	on:pointerup|nonpassive={pointerUpHandler}
	on:pointermove|nonpassive={pointerMoveHandler}
	on:touchstart|nonpassive={(e) => {
		e.preventDefault();
	}}
	on:touchmove|nonpassive={(e) => {
		e.preventDefault();
	}}
	on:touchend|nonpassive={(e) => {
		e.preventDefault();
	}}
/>

<canvas width={size} height={size} id="drawing-canvas" bind:this={canvas}
></canvas>
{#if songsRecommended}
	<img class="bg-image" src={activeSong.cover} alt="" />
{/if}
<div class="canvas-toolbar">
	<button
		class={tool == "pen" ? "active" : ""}
		on:pointerup={() => chooseTool("pen")}><IconPencil /></button
	>
	<button
		class={tool == "eraser" ? "active" : ""}
		on:pointerup={() => chooseTool("eraser")}><IconEraser /></button
	>
	<button
		aria-label={""}
		class={"red" + (curColor == "red" ? " active" : "")}
		on:pointerup={() => setColor("red")}
	></button>
	<button
		aria-label={""}
		class={"orange" + (curColor == "orange" ? " active" : "")}
		on:pointerup={() => setColor("orange")}
	></button>
	<button
		aria-label={""}
		class={"yellow" + (curColor == "yellow" ? " active" : "")}
		on:pointerup={() => setColor("yellow")}
	></button>
	<button
		aria-label={""}
		class={"green" + (curColor == "green" ? " active" : "")}
		on:pointerup={() => setColor("green")}
	></button>
	<button
		aria-label={""}
		class={"blue" + (curColor == "blue" ? " active" : "")}
		on:pointerup={() => setColor("blue")}
	></button>
	<button
		aria-label={""}
		class={"purple" + (curColor == "purple" ? " active" : "")}
		on:pointerup={() => setColor("purple")}
	></button>
	<button
		aria-label={""}
		class={"pink" + (curColor == "pink" ? " active" : "")}
		on:pointerup={() => setColor("pink")}
	></button>
	<button
		aria-label={""}
		class={"black" + (curColor == "black" ? " active" : "")}
		on:pointerup={() => setColor("black")}
	></button>
	<button
		aria-label={""}
		class={"white"}
		on:pointerup={() => ctx.clearRect(0, 0, size, size)}
		><IconTrash></IconTrash></button
	>
</div>
<div class="drawing-size-ui">
	<button
		aria-label={""}
		class={drawingSize == 20 ? " active" : ""}
		on:pointerup={() => (drawingSize = 20)}
		><IconCircleFilled size={24}></IconCircleFilled></button
	>
	<button
		aria-label={""}
		class={drawingSize == 10 ? " active" : ""}
		on:pointerup={() => (drawingSize = 10)}
		><IconCircleFilled size={16}></IconCircleFilled></button
	>
	<button
		aria-label={""}
		class={drawingSize == 5 ? " active" : ""}
		on:pointerup={() => (drawingSize = 5)}
		><IconCircleFilled size={10}></IconCircleFilled></button
	>
	<button
		aria-label={""}
		class={drawingSize == 2 ? " active" : ""}
		on:pointerup={() => (drawingSize = 2)}
		><IconCircleFilled size={6}></IconCircleFilled></button
	>
</div>

<div class="queue-ui">
	<div class="flex-hor">
		<div>Currently Playing:</div>
		<div class="clickable" on:pointerup={nextSong}>Skip Song</div>
	</div>
	{#if songsRecommended}
		<a class="active-song" href={activeSong.url} target="_blank">
			<div class="top">
				<div class="album-cover">
					<img src={activeSong.cover} alt="" />
				</div>
				<div class="song-details">
					<div class="song-title">{activeSong.title}</div>
					<div class="song-artist">{activeSong.artist}</div>
				</div>
			</div>
			<div class="progress-bar">
				<div
					class="progress-inner"
					style:width={`${$progressBarStore * 100}%`}
				></div>
			</div>
		</a>
	{:else}
		<div class="active-song">
			<div class="top">
				<div class="album-cover"></div>
				<div class="song-details" style:width={"100px"}>
					<div class="song-title gradient-loader">
						<div class="progress-bar"></div>
					</div>
					<div class="song-artist gradient-loader">
						<div class="progress-bar"></div>
					</div>
				</div>
			</div>
			<div class="progress-bar gradient-loader"></div>
		</div>
	{/if}
	<div class="flex-hor">
		<div>Queue:</div>
		<div class="clickable" on:pointerup={clearQueue}>Clear Queue</div>
	</div>
	<div class="upcoming-songs">
		{#if drawnAtAll}
			{#if songsRecommended}
				{#each songQueue as song, i}
					<div
						class="upcoming-song"
						in:fade|global={{ duration: 300, delay: i * 150 }}
					>
						<div class="top">
							<div class="album-cover">
								<img src={song.cover} alt="" />
							</div>
							<div class="song-details">
								<div class="song-title">{song.title}</div>
								<div class="song-artist">{song.artist}</div>
							</div>
						</div>
					</div>
				{/each}
				{#if loading}
				<div class="loader-parent">
					<IconLoader2 size={60}></IconLoader2>
				</div>
				{/if}
			{:else}
				<div class="loader-parent">
					<IconLoader2 size={60}></IconLoader2>
				</div>
				{$anthropicStatus}<span class={"fadeInOut"}>.</span><span
					class={"fadeInOut"}>.</span
				><span class={"fadeInOut"}>.</span>
			{/if}
		{:else}
			No queue available. Start drawing something to get recommendations!
		{/if}
	</div>
</div>
