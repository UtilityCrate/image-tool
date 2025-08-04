
document.getElementById('compress-button').addEventListener('click', async () => {
  const input = document.getElementById('image-upload-compressor').files[0];
  const targetKB = parseInt(document.getElementById('target-size-compressor').value);
  const output = document.getElementById('compressed-image-output');

  if (!input || !targetKB) {
    return alert('Please select an image and enter target size in KB.');
  }

  const targetMB = targetKB / 1024;

  const options = {
    maxSizeMB: targetMB > 0.05 ? targetMB : 0.05, // Minimum value so it doesn’t crash
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    onProgress: (p) => {
      output.innerHTML = `<p>Compressing: ${Math.round(p)}%</p>`;
    }
  };

  try {
    const compressedFile = await imageCompression(input, options);
    const compressedSize = (compressedFile.size / 1024).toFixed(2);
    const url = URL.createObjectURL(compressedFile);

    output.innerHTML = `
      <p class="text-sm text-gray-600">Compressed Size: ${compressedSize} KB</p>
      <img src="${url}" class="max-w-full rounded shadow mx-auto mb-2"/>
      <a href="${url}" download="compressed-image.jpg" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">Download Image</a>
    `;
  } catch (err) {
    console.error(err);
    alert('Compression failed. Please try with a different image.');
  }
});
