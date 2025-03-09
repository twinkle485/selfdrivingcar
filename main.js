const canvas = document.getElementById("myCanvas");
canvas.width = 200;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

const road = new Road(canvas.width / 2, canvas.width * 0.9);
const car = new Car(road.getLaneCenter(1), 100, 30, 50, "KEYS");

// Generate AI cars
const N = 20; // Number of AI cars
const traffic = [];
for (let i = 0; i < N; i++) {
    traffic.push(new Car(road.getLaneCenter(Math.floor(Math.random() * 3)), -i * 100, 30, 50, "AI"));
}

animate();

function animate() {
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.borders, []);
    }
    car.update(road.borders, traffic);

    canvas.height = window.innerHeight;

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(0, -car.y + canvas.height * 0.7);

    road.draw(ctx);
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(ctx, "red");
    }
    
    car.draw(ctx, "blue");

    ctx.restore();

    if (!car.damaged) {
        requestAnimationFrame(animate);
    }    
}