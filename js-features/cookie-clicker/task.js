cookie = document.getElementById('cookie')
click = document.getElementById('clicker__counter')
let isEnlarged = false; 

cookie.addEventListener('click', function() {
    click.textContent = Number(click.textContent) + 1;
    if (isEnlarged == false) {
        cookie.width += 100;
        cookie.height += 100;
    } else {
        cookie.width -= 100;
        cookie.height -= 100;
        }
    isEnlarged = !isEnlarged;
        });