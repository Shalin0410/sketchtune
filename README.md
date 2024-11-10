# SketchTune - Feel Your Creations
![Logo](https://github.com/noahpin/sketchtune/blob/main/assets/logo.png?raw=true)
[Live Demo](https://sketchtune.vercel.app/)

## Elevator Pitch
Artists often express their feelings through their craft. Using music to amplify the emotions that fuel their art allows artists to fully immerse into their creations.

## Demos
### SketchTune Demo
[SketchTune App Demo](https://youtube.com/watch?v=Rd0SeUE460M)
### SketchTune Promo
[SketchTune Promo Video](https://www.youtube.com/watch?v=VHhIngk8Rn0)

## SketchTune
https://sketchtune.vercel.app/

## DAIN Implementation: Song Recommendations
https://github.com/shriya-r/HackSC-DAIN-Implementation

## Project Story

### Our inspirations
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
  

### Challenges we ran into
To ensure a seamless experience, the web UI, Claude AI, and Spotify Search API needed to be integrated in a way that provided artists with real-time feedback. We aimed to facilitate the artists' work without interruption, allowing them to continue drawing while we asynchronously processed their artwork with Claude AI and retrieved the corresponding Spotify playlist.

We faced several challenges integrating Spotify's Web SDK for dynamic music playback while artists worked on their creations. The SDK required users to have a Spotify Premium subscription, which limited accessibility for many potential users. Additionally, the Spotify SDK was optimized for React, while our project, SketchTune, was built using the Svelte framework, leading to compatibility issues.
We decided to utilize the Spotify Search API to address these constraints instead. By retrieving song preview URLs directly from the API and embedding them, we enabled music playback without needing a Premium account or altering the project's framework. This solution preserved the intended functionality while enhancing accessibility, creating a smooth and adaptable user experience.

Finding the correct documentation was essential to creating an accurate Spotify playlist using Claude AI. Due to several conflicting sources, identifying the right documentation ensured that the web UI could seamlessly integrate with the AI model and successfully retrieve the playlist from Claude AI.

### Accomplishments that we’re proud of
With the right prompt engineering, our Claude AI model created a diverse playlist for the artist that could fit various artists with different ethnic/cultural backgrounds. Based on the drawings provided to the model, it was able to determine the mood and style of the artists.

### What we learned
- Explored the process of integrating artificial intelligence with the Svelte framework, focusing on how to create seamless interactions between them.
- Gained an understanding of how the image analyzing model developed by Claude AI operates and learned how to generate a Spotify playlist based on the analysis results.
- Encountered some challenges with the Spotify SDK, which prompted us to discover effective workarounds. Specifically, we learned how to embed the preview URL obtained from the Spotify Search API, enabling a smoother experience when accessing music content.

### What's next for Sketchtune
- Develop a more personalized Spotify playlist based on the user's Spotify account, incorporating their listening history prior to using the app while also creating a new history within the app. Additionally, the app will enable artists to adjust the genre, theme, and mood of their Spotify playlists, allowing for more accurate and tailored recommendations.
- Ensure the Spotify SDK is fully functional, providing users access to all Spotify features and the complete versions of songs.
- Introduce advanced drawing features that enable artists to better express themselves.
- Create a responsive user interface that provides a seamless experience across all platforms, including iPad, laptop, and mobile devices.


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
