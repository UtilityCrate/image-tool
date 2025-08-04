document.getElementById('convert-button').addEventListener('click', async () => {
        const fileInput = document.getElementById('image-upload-converter');
        const format = document.getElementById('convert-format').value;
        const outputDiv = document.getElementById('converted-image-output');

        if (!fileInput.files.length) {
            alert('Please upload an image file.');
            return;
        }

        const file = fileInput.files[0];
        const img = new Image();
        const reader = new FileReader();

        reader.onload = function (e) {
            img.onload = function () {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);

                const mimeType = format === 'png' ? 'image/png' : 'image/jpeg';
                canvas.toBlob(function (blob) {
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `converted.${format}`;
                    link.textContent = `Download converted.${format}`;
                    link.className = "mt-2 text-blue-600 underline";

                    outputDiv.innerHTML = '';
                    outputDiv.appendChild(link);
                }, mimeType);
            };
            img.src = e.target.result;
        };

        reader.readAsDataURL(file);
    });

