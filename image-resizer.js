const imageUploadResizer = document.getElementById('image-upload-resizer');
const resizeWidthInput = document.getElementById('resize-width');
const resizeHeightInput = document.getElementById('resize-height');
const resizeButton = document.getElementById('resize-button');
const resizedImageOutput = document.getElementById('resized-image-output');

resizeButton.addEventListener('click', () => {
    const file = imageUploadResizer.files[0];
    const width = parseInt(resizeWidthInput.value, 10);
    const height = parseInt(resizeHeightInput.value, 10);

    if (!file) {
        alert('Please select an image file.');
        return;
    }

    if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
        alert('Please enter valid width and height.');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            const resizedDataUrl = canvas.toDataURL('image/jpeg');

            resizedImageOutput.innerHTML = `
                <p>Image resized successfully!</p>
                <img src="${resizedDataUrl}" alt="Resized Image" style="max-width:100%;"/>
                <a href="${resizedDataUrl}" download="resized-image.jpg" class="text-blue-600 underline">Download Resized Image</a>
            `;
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
});
