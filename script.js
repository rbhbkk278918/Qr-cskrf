function openVideoModal(videoLink) {
    var modal = document.getElementById('videoModal');
    var videoFrame = document.getElementById('videoFrame');
    videoFrame.src = 'https:' + videoLink;  // Add 'https:' before videoLink
    modal.style.display = 'block';
}
