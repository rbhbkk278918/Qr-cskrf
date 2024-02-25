

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="styles.css">
    <title>Генератор и сканер QR-кода для видео</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js"></script>
    <script src="https://rawgit.com/sitepoint-editors/jsqrcode/master/src/qr_packed.js"></script>
    <script src="https://www.youtube.com/iframe_api"></script>
    <script>
        var player;

        function onYouTubeIframeAPIReady() {
            player = new YT.Player('videoFrame', {
                height: '1500',
                width: '1000',
                videoId: '',
                events: {
                    'onReady': onPlayerReady
                }
            });
        }

        function onPlayerReady(event) {
            event.target.playVideo();
        }

        function generateVideoQR() {
            var videoLink = document.getElementById('videoLink').value;
            var videoId = getVideoIdFromLink(videoLink);

            if (!videoId) {
                console.error("Invalid YouTube video link. Please enter a valid link.");
                return;
            }

            var qrSize = document.getElementById('qrSize').value;
            var qrColor = document.getElementById('qrColor').value;
            var qrBgColor = document.getElementById('qrBgColor').value;

            console.log("Video ID: " + videoId);
            console.log("QR Size: " + qrSize);
            console.log("QR Color: " + qrColor);
            console.log("QR Background Color: " + qrBgColor);

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

            player.loadVideoById(videoId);

            console.log("QR code generated successfully!");
        }

        function getVideoIdFromLink(videoLink) {
            var match = videoLink.match(/[?&]v=([^?&]+)/);
            return match ? match[1] : '';
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
            });
        }

        function startScanning() {
            const scannerVideo = document.getElementById("scanner-video");
            const qrScanner = new QCodeDecoder();

            navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
                .then((stream) => {
                    scannerVideo.srcObject = stream;
                    return new Promise((resolve) => {
                        scannerVideo.onloadedmetadata = () => {
                            resolve();
                        };
                    });
                })
                .then(() => {
                    const handleScannerVideo = () => {
                        try {
                            qrScanner.decodeFromVideo(scannerVideo, (err, result) => {
                                if (result) {
                                    alert("QR Code содержит: " + result);
                                    stopScanning();
                                }
                                handleScannerVideo();
                            });
                        } catch (e) {
                            console.error(e);
                            handleScannerVideo();
                        }
                    };

                    handleScannerVideo();
                })
                .catch((error) => {
                    console.error("Ошибка при получении доступа к камере для сканирования: ", error);
                });
        }

        function stopScanning() {
            const scannerVideo = document.getElementById("scanner-video");
            scannerVideo.srcObject.getTracks().forEach(track => track.stop());
        }
    </script>
</head>
<body>
    <h1>сайт обновилась, встречайте версию 2.0993  
        новые функции поддержка и многое другое</h1>

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

    <div class="scanner-container">
        <h2>Сканер QR-кода</h2>
        <video id="scanner-video" width="300" height="300" autoplay playsinline></video>
        <button onclick="startScanning()">Начать сканирование</button>
        <button onclick="stopScanning()">Остановить сканирование</button>
    </div>

    <p>&copy; 2024 Разработчик Dylan9332789Z Все права защищены. | <span id="companyLink"></span></p>
</body>
</html>
