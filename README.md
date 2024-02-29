

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Генератор и сканер QR-кода</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js"></script>
    <script src="https://rawgit.com/sitepoint-editors/jsqrcode/master/src/qr_packed.js"></script>
</head>
<body>
    <h1>Генератор и сканер QR-кода</h1>

    <h2>Создать QR-код</h2>
    <input id="text" type="text" placeholder="Введите текст или URL">
    <button onclick="generateQR()">Создать QR-код</button>
    <div id="qrcode"></div>

    <h2>Сканировать QR-код</h2>
    <video id="video" width="300" height="300" style="display: none;"></video>
    <canvas id="canvas" width="300" height="300" style="display: none;"></canvas>
    <button onclick="startScan()">Начать сканирование</button>
    <div id="result"></div>

    <script>
        function generateQR() {
            var text = document.getElementById('text').value;
            var typeNumber = 4;
            var errorCorrectionLevel = 'L';
            var qr = qrcode(typeNumber, errorCorrectionLevel);
            qr.addData(text);
            qr.make();
            document.getElementById('qrcode').innerHTML = qr.createImgTag();
        }

        function startScan() {
            var video = document.getElementById('video');
            var canvas = document.getElementById('canvas');
            var context = canvas.getContext('2d');
            var resultContainer = document.getElementById('result');

            navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
                .then(function(stream) {
                    video.srcObject = stream;
                    video.setAttribute('playsinline', true);
                    video.play();
                    requestAnimationFrame(tick);
                });

            function tick() {
                if (video.readyState === video.HAVE_ENOUGH_DATA) {
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    context.drawImage(video, 0, 0, canvas.width, canvas.height);
                    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                    var code = jsQR(imageData.data, imageData.width, imageData.height, {
                        inversionAttempts: "dontInvert",
                    });
                    if (code) {
                        resultContainer.innerHTML = 'Результат сканирования: ' + code.data;
                    }
                }
                requestAnimationFrame(tick);
            }
        }
    </script>
</body>
</html>
