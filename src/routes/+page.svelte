<script>
	import { line, Point } from "$lib";
	import {
		IconPencil,
		IconEraser,
		IconCircleFilled,
		IconTrash,
		IconLoader2,
	} from "@tabler/icons-svelte";
    import { fade } from "svelte/transition";
	import { onMount } from "svelte";
	import { imageAnthropic, anthropicStatus } from "$lib/anthropic";

	import { WebPlayback } from "svelte-spotify-web-playback";
	const client_id = "3e261e446ac04ff7b3c06e6de081f04c";

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
	let activeSong = {
		title: "Watching T.V.",
		artist: "Magdalena Bay",
		cover:
			"https://freight.cargo.site/w/500/h/500/q/75/i/Z1845198611633254597510343300932/Magdalena-Bay_Imaginal-Disk_Artwork-ForWeb.jpg",
		duration: 5498,
		url: "https://open.spotify.com/track/3e261e446ac04ff7b3c06e6de081f04c",
	};

	let tool = "pen";
	onMount(() => {
		ctx = canvas.getContext("2d");
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

	async function getAnthropicRecommendations() {
		let base = canvas.toDataURL();
		base = base.replace("data:image/png;base64,", "");
		let results = await imageAnthropic(base);
		let queue = results.songs;
		for (let i = 0; i < queue.length; i++) {
			queue[i].cover = "";
			queue[i].duration = 1000;
			queue[i].url = "";
		}
		return queue;
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

<WebPlayback {client_id} />

<canvas width={size} height={size} id="drawing-canvas" bind:this={canvas}
></canvas>
{#if songsRecommended}
	<img class="bg-image" src={activeSong.cover} alt="" />
{/if}
<div class="canvas-toolbar">
	<button
		class={tool == "pen" ? "active" : ""}
		on:click={() => chooseTool("pen")}><IconPencil /></button
	>
	<button
		class={tool == "eraser" ? "active" : ""}
		on:click={() => chooseTool("eraser")}><IconEraser /></button
	>
	<button
		aria-label={""}
		class={"red" + (curColor == "red" ? " active" : "")}
		on:click={() => setColor("red")}
	></button>
	<button
		aria-label={""}
		class={"orange" + (curColor == "orange" ? " active" : "")}
		on:click={() => setColor("orange")}
	></button>
	<button
		aria-label={""}
		class={"yellow" + (curColor == "yellow" ? " active" : "")}
		on:click={() => setColor("yellow")}
	></button>
	<button
		aria-label={""}
		class={"green" + (curColor == "green" ? " active" : "")}
		on:click={() => setColor("green")}
	></button>
	<button
		aria-label={""}
		class={"blue" + (curColor == "blue" ? " active" : "")}
		on:click={() => setColor("blue")}
	></button>
	<button
		aria-label={""}
		class={"purple" + (curColor == "purple" ? " active" : "")}
		on:click={() => setColor("purple")}
	></button>
	<button
		aria-label={""}
		class={"pink" + (curColor == "pink" ? " active" : "")}
		on:click={() => setColor("pink")}
	></button>
	<button
		aria-label={""}
		class={"black" + (curColor == "black" ? " active" : "")}
		on:click={() => setColor("black")}
	></button>
	<button
		aria-label={""}
		class={"white"}
		on:click={() => ctx.clearRect(0, 0, size, size)}
		><IconTrash></IconTrash></button
	>
</div>
<div class="drawing-size-ui">
	<button
		aria-label={""}
		class={drawingSize == 20 ? " active" : ""}
		on:click={() => (drawingSize = 20)}
		><IconCircleFilled size={24}></IconCircleFilled></button
	>
	<button
		aria-label={""}
		class={drawingSize == 10 ? " active" : ""}
		on:click={() => (drawingSize = 10)}
		><IconCircleFilled size={16}></IconCircleFilled></button
	>
	<button
		aria-label={""}
		class={drawingSize == 5 ? " active" : ""}
		on:click={() => (drawingSize = 5)}
		><IconCircleFilled size={10}></IconCircleFilled></button
	>
	<button
		aria-label={""}
		class={drawingSize == 2 ? " active" : ""}
		on:click={() => (drawingSize = 2)}
		><IconCircleFilled size={6}></IconCircleFilled></button
	>
</div>

<div class="queue-ui">
	Currently Playing:
	{#if songsRecommended}
		<div class="active-song">
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
				<div class="progress-inner" style:width={"50%"}></div>
			</div>
		</div>
	{:else}
		<div class="active-song">
			<div class="top">
				<div class="album-cover"></div>
				<div class="song-details">
					<div class="song-title">....</div>
					<div class="song-artist">....</div>
				</div>
			</div>
			<div class="progress-bar">
				<div class="progress-inner" style:width={"0%"}></div>
			</div>
		</div>
	{/if}
	Queue:
	<div class="upcoming-songs">
		{#if drawnAtAll}
			{#if songsRecommended}
				{#each songQueue as song, i}
					<div class="upcoming-song" transition:fade|global={{duration: 300, delay: i * 150}}>
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
