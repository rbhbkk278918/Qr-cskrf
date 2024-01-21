


  
    <link rel="stylesheet" type="text/css" href="styles.css">
    <title>Генератор QR-кода для видео</title>
    <script src="script.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js"></script>

<body>
    <input id="videoLink" type="text" placeholder="Введите ссылку на видео">
    <button onclick="generateVideoQR()">Создать QR-код</button>
    <button onclick="clearQRCode()">Очистить</button> <!-- Добавляем кнопку "Очистить" -->
    <br>
    <div id="qrcode"></div>
    <script>
        function generateVideoQR() {
            var videoLink = document.getElementById('videoLink').value;
            var qr = qrcode(0, 'M');
            qr.addData(videoLink);
            qr.make();
            var qrCanvas = document.createElement('canvas');
            qrCanvas.width = 200;
            qrCanvas.height = 200;
            var qrContext = qrCanvas.getContext('2d');
            qrContext.fillStyle = "#FFFFFF";
            qrContext.fillRect(0, 0, qrCanvas.width, qrCanvas.height);
            qrContext.fillStyle = "#000000";
            var qrSize = qrCanvas.width;
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
        }
        function clearQRCode() {
            document.getElementById('videoLink').value = ''; // Очищаем поле ввода
            document.getElementById('qrcode').innerHTML = ''; // Очищаем контейнер QR-кода
        }
    </script>
  <nav>
        <ul>
            <li><a href="#about">О нас</a></li>
            <li><a href="#services">Услуги</a></li>
            <li><a href="#contact">Контакты</a></li>
        </ul>
    </nav>
    </body>
