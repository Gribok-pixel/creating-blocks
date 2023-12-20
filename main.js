"use strict"

const cube = document.querySelector('.cube')


function tranform(e) {
    e.stopImmediatePropagation()
    // const ball = e.target
    const ball = this

    let shiftX = e.clientX - ball.getBoundingClientRect().left;
    let shiftY = e.clientY - ball.getBoundingClientRect().top;

    ball.style.position = 'absolute'
    ball.style.zIndex = 100

    moveAt(e.pageX, e.pageY)

    function moveAt(pageX, pageY) {
        ball.style.left = pageX - shiftX + 'px';
        ball.style.top = pageY - shiftY + 'px';
        
        if (parseInt(ball.style.left) < cube.getBoundingClientRect().left) {
            ball.style.left = cube.getBoundingClientRect().left + 'px'
        }
        if ((parseInt(ball.style.left) + parseInt(ball.style.width)) > cube.getBoundingClientRect().right) {
            ball.style.left = cube.getBoundingClientRect().right - parseInt(ball.style.width) + 'px'
        }
        if (parseInt(ball.style.top) < cube.getBoundingClientRect().top) {
            ball.style.top = cube.getBoundingClientRect().top + 'px'
        }
        if ((parseInt(ball.style.top) + parseInt(ball.style.height)) > cube.getBoundingClientRect().bottom) {
            ball.style.top = cube.getBoundingClientRect().bottom - parseInt(ball.style.height) + 'px'
        }
    }

    function onMouseMove(e) {
        moveAt(e.pageX, e.pageY)
    }

    document.addEventListener('mousemove', onMouseMove)

    ball.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        ball.style.zIndex = 0
        ball.onmouseup = null;
    }
    document.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        ball.onmouseup = null;
    }


}
// document.onmouseup = function() {
//     document.removeEventListener('mousemove', onMouseMove);
//     ball.onmouseup = null;
// }
function rotate(event) {
    event.target.addEventListener('mousedown', tranform)
    let rotateX = 0;
    let rotateY = 0;

    document.onkeydown = function(e) {
        if (e.keyCode === 37) rotateY -= 4
        if (e.keyCode === 38) rotateX += 4
        if (e.keyCode === 39) rotateY += 4
        if (e.keyCode === 40) rotateX -= 4

        event.target.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`
    }
    
}


const createBtn = document.querySelector('.create-btn')
const inputWidth = document.querySelector('.input-width')
const inputHeight = document.querySelector('.input-height')
const inputRadius = document.querySelector('.input-radius')
const inputColor = document.querySelector('.input-color')

createBtn.addEventListener('click', () => {
    console.log(inputWidth.value)
    const newDiv = document.createElement('div')
    newDiv.classList.add('ball')
    if (inputWidth.value) {
        newDiv.style.width = inputWidth.value + 'px'
    } else {
        newDiv.style.width = 100 + 'px'
    }
    if (inputHeight.value) {
        newDiv.style.height = inputHeight.value + 'px'
    } else {
        newDiv.style.height = 100 + 'px'
    }
    if (inputRadius.value) {
        newDiv.style.borderRadius = inputRadius.value / 2 + '%'
    } else {
        newDiv.style.borderRadius = 0 + '%'
    }
    newDiv.style.backgroundColor = inputColor.value
    // newDiv.addEventListener('mousedown', tranform)
    document.addEventListener('mouseup', () => {
        newDiv.removeEventListener('mousedown', tranform)
    })
    
    newDiv.addEventListener('click', rotate)
    cube.appendChild(newDiv)
})








