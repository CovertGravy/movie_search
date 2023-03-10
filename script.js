const input = document.querySelector('input');
const mov_box = document.querySelector('.mov-list');

input.addEventListener('input',()=>{
    mov_box.classList.remove('d-none');
    if (input.value=='')
        mov_box.classList.add('d-none');
})