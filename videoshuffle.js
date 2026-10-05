function getEmbedSrc(videoId) {
  return `https://www.youtube.com/embed/${videoId}?controls=0&autoplay=1&mute=1&loop=1&playlist=${videoId}`;
}

document.addEventListener("DOMContentLoaded", () => {
  const player = document.getElementById("player");
  const statusEl = document.getElementById("status");
  const shuffleBtn = document.getElementById("shuffleBtn");
  const copyLinkBtn = document.getElementById("copyLinkBtn");
  const videoCountEl = document.getElementById("videoCount");

  if (!player) return;

  let videoIds = [];
  let currentVideoId = null;

  function setStatus(text, isError = false) {
    if (!statusEl) return;
    statusEl.textContent = text;
    statusEl.classList.toggle("is-error", isError);
  }

  function pickRandom(excludeId) {
    if (videoIds.length === 0) return null;
    if (videoIds.length === 1) return videoIds[0];
    let next;
    do {
      next = videoIds[Math.floor(Math.random() * videoIds.length)];
    } while (next === excludeId);
    return next;
  }

  function playVideo(videoId, { announce = true } = {}) {
    if (!videoId) return;
    currentVideoId = videoId;
    player.setAttribute("src", getEmbedSrc(videoId));
    if (announce) setStatus("");
    if (copyLinkBtn) copyLinkBtn.textContent = "Copy link";
  }

  async function loadVideos() {
    try {
      setStatus("Loading…");
      const res = await fetch("./videos.json", { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (!Array.isArray(data) || data.length === 0) throw new Error("No videos found");
      videoIds = data.filter((id) => typeof id === "string" && id.trim().length > 0);
      if (videoIds.length === 0) throw new Error("No valid video IDs");
      if (videoCountEl) videoCountEl.textContent = `${videoIds.length} videos`;
      playVideo(pickRandom(null));
    } catch (err) {
      setStatus("Could not load videos. Check videos.json and reload.", true);
      if (videoCountEl) videoCountEl.textContent = "";
    }
  }

  function shuffle() {
    if (videoIds.length === 0) return;
    const next = pickRandom(currentVideoId);
    playVideo(next);
  }

  async function copyLink() {
    const url = currentVideoId
      ? `https://www.youtube.com/watch?v=${currentVideoId}`
      : window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      if (copyLinkBtn) copyLinkBtn.textContent = "Copied!";
      setTimeout(() => {
        if (copyLinkBtn) copyLinkBtn.textContent = "Copy link";
      }, 1400);
    } catch {
      window.prompt("Copy this link:", url);
    }
  }

  if (shuffleBtn) shuffleBtn.addEventListener("click", shuffle);
  if (copyLinkBtn) copyLinkBtn.addEventListener("click", copyLink);

  document.addEventListener("keydown", (e) => {
    if (e.target instanceof HTMLElement && /input|textarea|select/i.test(e.target.tagName)) return;
    if (e.key === "n" || e.key === "N" || (e.code === "Space" && !e.repeat)) {
      e.preventDefault();
      shuffle();
    }
  });

  loadVideos();
});
