# Monke

Random shuffled monke videos — one video at a time. Static site hosted on GitHub Pages at [kortec.me](https://kortec.me).

Press **Shuffle** (or `N` / `Space`) for a fresh video. Playback autoplays muted and loops.

## Files

- `index.html` — page markup and player shell
- `videoshuffle.js` — loads `videos.json`, picks a random video, handles shuffle/copy-link
- `videos.json` — list of YouTube video IDs
- `style.css` — styling
- `icon.png` — favicon

## Add videos

Append YouTube video IDs to `videos.json`:

```json
["GXTqb6X2dUQ", "NEW_ID_HERE"]
```

## Run locally

Any static server works, e.g. `python3 -m http.server`, then open the printed URL.
