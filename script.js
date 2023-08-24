const ranCor = () => {
    const x = Math.floor(Math.random() * 1000);
    const y = Math.floor(Math.random() * 600);
    return {x: x, y: y};
};

const container = document.querySelector('.container');
const ball1 = document.querySelector('.ball1');
const ball2 = document.querySelector('.ball2');
const ball3 = document.querySelector('.ball3');
const ball4 = document.querySelector('.ball4');

ball2.style.top = `${ranCor().y}px`;
ball2.style.left = `${ranCor().x}px`;

ball3.style.top = `${ranCor().y}px`;
ball3.style.left = `${ranCor().x}px`;

ball4.style.top = `${ranCor().y}px`;
ball4.style.left = `${ranCor().x}px`;

const chase = (ball1,ball2,velocity) => {
    const ball1Rect = ball1.getBoundingClientRect();
    const ball2Rect = ball2.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect(); 
    console.log(containerRect);
    const deltaX = ball1Rect.left - ball2Rect.left;
    const deltaY = ball1Rect.top - ball2Rect.top;
    let distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
    if (distance > 22) {
        const stepX = velocity * deltaX/distance - 10;
        const stepY = velocity * deltaY/distance - 10;
        const newX = ball2Rect.left + stepX;
        const newY = ball2Rect.top + stepY;
        if((newX => containerRect.left   && newX <= containerRect.right)) ball2.style.left = `${newX}px`;
        if((newY => containerRect.top  && newY <= containerRect.bottom)) ball2.style.top = `${newY}px`;
        requestAnimationFrame(() => chase(ball1,ball2,velocity));
    } else {
        return;
    }
};
container.addEventListener('mousemove', (e) =>  {
    const left = e.clientX;
    const top = e.clientY;
    ball1.style.left = `${left}px`;
    ball1.style.top = `${top}px`;
});

const button = document.querySelector('button');
button.addEventListener('click',(e) => {
    chase(ball1,ball2,6);
    chase(ball1,ball3,8);
    chase(ball1,ball4,7);
});