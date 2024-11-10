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
To ensure a seamless experience, the web UI, Claude AI, and Spotify Search API needed to be integrated in a way that provided artists with real-time feedback. We aimed to facilitate the artists' work without interruption, allowing them to continue drawing while we asynchronously processed their artwork with Claude AI and retrieved the corresponding Spotify playlist.

We faced several challenges integrating Spotify's Web SDK for dynamic music playback while artists worked on their creations. The SDK required users to have a Spotify Premium subscription, which limited accessibility for many potential users. Additionally, the Spotify SDK was optimized for React, while our project, SketchTune, was built using the Svelte framework, leading to compatibility issues.
To address these constraints, we decided to utilize the Spotify Search API instead. By retrieving song preview URLs directly from the API and embedding them, we enabled music playback without the need for a Premium account or altering the project's framework. This solution preserved the intended functionality while enhancing accessibility, creating a smooth and adaptable experience for all users.

To create an accurate Spotify playlist using Claude AI, it was essential to find the correct documentation. Due to several conflicting sources, identifying the right documentation ensured that the web UI could seamlessly integrate with the AI model and successfully retrieve the playlist from Claude AI.

### Accomplishments that you’re proud of
With the right prompt engineering we were able to provide a playlist 

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
