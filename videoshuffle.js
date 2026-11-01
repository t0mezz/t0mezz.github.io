function getEmbedSrc(videoId) {
  return `https://www.youtube.com/embed/${videoId}?controls=0&autoplay=1&mute=1&loop=1&playlist=${videoId}`;
}

function suffleVideo(playerId) {
    let video = document.getElementById(playerId);
    fetch("./videos.json")
        .then((res) => res.json())
        .then((data) => {
            let videoId = data[Math.round(Math.random()*(data.length-1))];
        });
    
    // update videoplayer
    video.setAttribute("src", getEmbedSrc(videoId));
}
