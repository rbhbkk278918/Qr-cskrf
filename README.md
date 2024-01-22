


    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="styles.css">
    <title>Генератор QR-кода для видео</title>
    <script src="script.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js"></script>
    <link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>
    <input id="videoLink" type="text" placeholder="Введите идентификатор видео на YouTube">
    <button onclick="generateVideoQR()">Создать QR-код</button>
    <button onclick="pasteFromClipboard()">Вставить</button>
    <button onclick="clearQRCode()">Очистить</button>
    <button onclick="copyToClipboard()">Копировать в буфер</button>
    <br>
    <label for="qrSize">Размер QR-кода:</label>
    <input id="qrSize" type="number" min="100" max="500" value="200">
    
    <label for="qrColor">Цвет QR-кода:</label>
    <input id="qrColor" type="color" value="#000000">
    
    <label for="qrBgColor">Цвет фона QR-кода:</label>
    <input id="qrBgColor" type="color" value="#FFFFFF">
    
    <div id="qrcode"></div>

    <div id="videoModal" class="modal">
        <div class="modal-content">
            <span class="close" onclick="closeVideoModal()">&times;</span>
            <div id="player"></div>
        </div>
    </div>

    <script src="https://www.youtube.com/iframe_api"></script>
    <script>
        var player;

        function onYouTubeIframeAPIReady() {
            player = new YT.Player('player', {
                height: '315',
                width: '560',
                videoId: '', // Идентификатор видео будет установлен динамически
                events: {
                    'onReady': onPlayerReady
                }
            });
        }

        function onPlayerReady(event) {
            // Воспроизведение видео при готовности плеера
            event.target.playVideo();
        }

        function generateVideoQR() {
            var videoLink = document.getElementById('videoLink').value;
            var qrSize = document.getElementById('qrSize').value;
            var qrColor = document.getElementById('qrColor').value;
            var qrBgColor = document.getElementById('qrBgColor').value;

            // Генерация QR-кода как ранее

            var qrImage = document.createElement('img');
            qrImage.src = qrCanvas.toDataURL('image/png');
            var qrContainer = document.getElementById('qrcode');
            qrContainer.innerHTML = '';
            qrContainer.appendChild(qrImage);

            // Установка идентификатора видео для воспроизведения
            player.loadVideoById(videoLink);
        }

        // Остальной код остается без изменений
        // ...

    </script>

    <p>&copy; 2024 Ваша Компания. Все права защищены. | <span id="companyLink"></span></p>
    <!-- Add any other footer content here -->
    </footer>
</body>
</html>

</body>
</html>

