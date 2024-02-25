
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
    <script>
        document.addEventListener("DOMContentLoaded", function () {
            const scannerVideo = document.getElementById("scanner-video");
            const stopScanButton = document.getElementById("stop-scan");
            const retryScanButton = document.getElementById("retry-scan");
            const resultContainer = document.getElementById("result-container");
            const resultMessage = document.getElementById("result-message");

            let scanning = true;

            stopScanButton.addEventListener("click", () => {
                stopScanning();
            });

            retryScanButton.addEventListener("click", () => {
                retryScanning();
            });

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
                    const qrScanner = new QCodeDecoder();

                    const handleScannerVideo = () => {
                        if (!scanning) {
                            scannerVideo.srcObject.getTracks().forEach(track => track.stop());
                            return;
                        }

                        try {
                            qrScanner.decodeFromVideo(scannerVideo, (err, result) => {
                                if (result) {
                                    displayScannerResult(result);
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

            function displayScannerResult(result) {
                resultMessage.textContent = "QR Code содержит: " + result;
                resultContainer.classList.remove("hidden");
                retryScanButton.style.display = "block";
            }

            function displayScannerError(errorMessage) {
                resultMessage.textContent = errorMessage;
                resultContainer.style.backgroundColor = "#f8d7da";
                resultContainer.style.borderColor = "#f5c6cb";
                resultContainer.style.color = "#721c24";
                resultContainer.classList.remove("hidden");
                retryScanButton.style.display = "block";
            }

            function stopScanning() {
                scanning = false;
                stopScanButton.style.display = "none";
                retryScanButton.style.display = "block";
            }

            function retryScanning() {
                scanning = true;
                stopScanButton.style.display = "block";
                retryScanButton.style.display = "none";
                resultContainer.classList.add("hidden");
                resultContainer.style.backgroundColor = "#dff0d8";
                resultContainer.style.borderColor = "#c3e6cb";
                resultContainer.style.color = "#155724";
                handleScannerVideo();
            }
        });
    </script>
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

    <div class="scanner-container">
        <h2>Сканер QR-кода</h2>
        <video id="scanner-video" width="300" height="300" autoplay playsinline></video>
        <button id="stop-scan" class="control-button">Остановить сканирование</button>
        <button id="retry-scan" class="control-button hidden">Повторить сканирование</button>
        <div id="result-container" class="hidden">
            <p id="result-message"></p>
        </div>
    </div>
<p>сайт обновилася встречайте  версию 2.993  
    новые функции  подержака  и многое  другоe</p>

    <p>&copy; 2024 Разработчик Dylan9332789Z Все права защищены. | <span id="companyLink"></span></p>
</body>
</html>

