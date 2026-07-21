shuffleVideo("player");

function getEmbedSrc(videoId) {
    return `https://www.youtube.com/embed/${videoId}?controls=0&autoplay=1&mute=1&loop=1&playlist=${videoId}`;
}

function shuffleVideo(playerId) {
    const player = document.getElementById(playerId);
    fetch("./videos.json")
        .then((res) => res.json())
        .then((videoIds) => {
            const videoId = videoIds[Math.floor(Math.random() * videoIds.length)];
            player.setAttribute("src", getEmbedSrc(videoId));
        });
}
