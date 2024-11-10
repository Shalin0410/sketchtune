# SketchTune - Feel Your Creation
![Logo](https://github.com/noahpin/sketchtune/blob/main/assets/logo.png?raw=true)
[Live Demo](https://sketchtune.vercel.app/)

## Elevator Pitch
Artists often express their feelings through their craft. Using music to amplify the emotions that fuel their art allows artists to fully immerse into their creations.

## Video Demo
[DEMO VIDEO](https://media.graphassets.com/s9KxU1npTjKeoMrytjoi)

## SketchTune
https://sketchtune.vercel.app/

## Project Story

### Your inspirations
The journey of SketchTune began with the idea of connecting art with music—exploring the powerful synergy between the two forms of creativity. Many artists find that listening to music while drawing or painting helps inspire them and facilitates a creative "flow" state. This connection led to the question: what if an artist's music could be driven by their artwork, dynamically evolving to match their emotions, brush strokes, and colors in real time? The team envisioned SketchTune as an artist's companion, utilizing AI and real-time analysis to create a personalized soundtrack that inspires and enhances the creative process.

### What it does
SketchTune is an innovative application that curates a personalized music playlist in real time as an artist draws or sketches. While the artist's strokes come to life on a digital canvas, the application analyzes various characteristics of their artwork—such as texture, color blending, cultural elements, and form—to select and adjust a dynamic playlist that enhances their creative flow and matches their mood. This combination of art and music creates an immersive experience, merging auditory and visual stimuli to inspire and boost creativity.
### Tech Stack
Frontend Software Framework: Svelte
- To create our digital canvas and play the recommended playlist from Spotify
  
LLM Model: Anthropic - Claude AI
- To convert images to recommended Spotify playlist
  
Spotify Search API
- Based on the recommended playlist, it would retrieve the songs from Spotify
  

### Challenges you ran into
To have a seamless experience, the web UI, Claude AI, and Spotify search API had to be integrated in such a way that it provided the artist with a real-time experience. Without hindering the artist's work and with their drawing capability, we had to asynchronously process their artwork with Claude AI and retrieve the Spotify playlist. 

### Accomplishments that you’re proud of

### What you learned

### What's next for The Project


# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
