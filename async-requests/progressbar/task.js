document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    const fileInput = document.getElementById('file');
    const progress = document.getElementById('progress');
    const sendButton = document.getElementById('send');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        if (!fileInput.files.length) {
            alert('Выберите файл для загрузки');
            return;
        }

        const file = fileInput.files[0];
        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener('progress', function(event) {
            if (event.lengthComputable) {
                const percentComplete = event.loaded / event.total;
                progress.value = percentComplete;

                const fileName = file.name;
                const fileSize = (file.size / (1024 * 1024)).toFixed(2) + ' MB';
                const descElement = document.querySelector('.input__wrapper-desc');
                descElement.textContent = `${fileName} (${fileSize})`;
            }
        });

        xhr.addEventListener('load', function() {
            if (xhr.status === 200) {
                alert('Файл успешно загружен!');
                progress.value = 1;
            } else {
                alert(`Ошибка сервера: ${xhr.status}`);
            }
        });

        xhr.addEventListener('error', function() {
            alert('Произошла ошибка при загрузке файла');
        });

        xhr.addEventListener('loadend', function() {
            console.log('Загрузка завершена');
            sendButton.disabled = false; 
        });

        xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/upload', true);

        const formData = new FormData();
        formData.append('file', file);

        sendButton.disabled = true;
        xhr.send(formData);
    });
});
