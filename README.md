
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="styles.css">
    <title>Генератор QR-кода для видео</title>
    <script src="script.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js"></script>
</head>
<body> 
    <input id="videoLink" type="text" placeholder="Введите ссылку на видео">
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
            <iframe id="videoFrame" width="560" height="315" frameborder="0" allowfullscreen></iframe>
        </div>
    </div>

    <script src="https://www.youtube.com/iframe_api"></script>
    <script>
        var player;

        function onYouTubeIframeAPIReady() {
            player = new YT.Player('videoFrame', {
                height: '1500',
                width: '1000',
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

            var qr = qrcode(0, 'M');
            qr.addData(videoLink);
            qr.make();
            var qrCanvas = document.createElement('canvas');
            qrCanvas.width = qrSize;
            qrCanvas.height = qrSize;
            var qrContext = qrCanvas.getContext('2d');
            qrContext.fillStyle = qrBgColor;
            qrContext.fillRect(0, 0, qrCanvas.width, qrCanvas.height);
            qrContext.fillStyle = qrColor;
            var moduleCount = qr.getModuleCount();
            var moduleSize = qrSize / moduleCount;
            for (var row = 0; row < moduleCount; row++) {
                for (var col = 0; col < moduleCount; col++) {
                    if (qr.isDark(row, col)) {
                        qrContext.fillRect(col * moduleSize, row * moduleSize, moduleSize, moduleSize);
                    }
                }
            }
            var qrImage = document.createElement('img');
            qrImage.src = qrCanvas.toDataURL('image/png');
            var qrContainer = document.getElementById('qrcode');
            qrContainer.innerHTML = '';
            qrContainer.appendChild(qrImage);

            // Установка идентификатора видео для воспроизведения
            player.loadVideoById(videoLink);
        }

        function clearQRCode() {
            document.getElementById('videoLink').value = '';
            document.getElementById('qrcode').innerHTML = '';
        }

        function copyToClipboard() {
            var qrContainer = document.getElementById('qrcode');
            var qrImage = qrContainer.querySelector('img');
            
            var tempInput = document.createElement('input');
            tempInput.setAttribute('value', qrImage.src);
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);

            alert('QR-код скопирован в буфер обмена!');
        }

        function pasteFromClipboard() {
            navigator.clipboard.readText().then(function(text) {
                document.getElementById('videoLink').value = text;
                openVideoModal(text);
            });
        }

        function openVideoModal(videoLink) {
            var modal = document.getElementById('videoModal');
            var videoFrame = document.getElementById('videoFrame');
            videoFrame.src = videoLink;
            modal.style.display = 'block';
        }

        function closeVideoModal() {
            var modal = document.getElementById('videoModal');
            var videoFrame = document.getElementById('videoFrame');
            videoFrame.src = '';
            modal.style.display = 'none';
        }

        window.onclick = function(event) {
            var modal = document.getElementById('videoModal');
            if (event.target == modal) {
                closeVideoModal();
            }
        };
    </script>

    <img src="https://status2010.files.wordpress.com/2010/09/00010exp.jpeg?w=300.jpg" alt="Описание изображения">
   <img src="https://img5.lalafo.com/i/posters/api/b3/09/96/8b3342a4ea85af14b775c85842.jpeg.jpg" alt="Описание изображения">
<img src="https://i.ytimg.com/vi/LRaLsVDTh8U/hqdefault.jpg.jpg" alt="Описание изображения">
<img src="https://sun9-14.userapi.com/c9375/g18539923/a_3ea5be04.jpg.jpg" alt="Описание изображения">
<img src="https://www.sostav.ru/articles/rus/2010/28.06/news/images/Baltika-3_Outdoor_m.jpg.jpg" alt="Описание изображения">



    <p>&copy; 2024 Разработчик  Dylan9332789Z Все права защищены. | <span id="companyLink"></span></p>
    


