let asteroids = []
let lasers = []
let w = 750
let h = 600
let d = 10
let s = 20
let rot = 90
let ship
let level = 1
let base = 1.05
let total = 15
let goal = Math.pow(base, level) * 15

function setup() {
    createCanvas(w, h)
    background(80)
    start()
}

let def = .3
let move = def
let alpha = 0
/*
    w - 87
    a - 65
    s - 83
    d - 68
*/
function draw() {
    if(asteroids.length == 0) {
        alert('level cleared')
        level++
        restart()
    }
    background(80)
    drawShip()
    drawAsteroids()
    drawLasers()
    if(checkCollisions()) {
        alert('game over')
        restart()
    }
    if(keyIsDown(87))
        move = 1
    else
        move = def
    if(keyIsDown(65)) {
        alpha = -2
    }
    else if(keyIsDown(68)) {
        alpha = 2
    }
    else {
        alpha = 0
    }
}

function start() {
    move = def
    alpha = 0
    ship = new Ship(w/2, h/2, d, s, rot)
    ship.draw()
    generateAsteroids(goal)
}

function restart() {
    asteroids.length = 0
    lasers.length = 0
    destroyed = 0
    start()
}

function checkCollisions() {
    for(let i = asteroids.length-1; i >= 0; i--) {
        if(ship.collides(asteroids[i])) {
            console.log('collision! GAME OVER!')
            level = 1
            return true
        }
        for(let j = lasers.length-1; j >= 0; j--) {
            if(asteroids[i].collides(lasers[j])) {
                asteroids[i].split(asteroids, lasers[j]);
                asteroids[i].clearShape()
                asteroids.splice(i, 1)
                lasers.splice(j, 1)
                break;
            }
        }
    }
    return false
}

function keyPressed() {
    if(keyCode == 32) {
        lasers.push(ship.shoot())
    }
}

function drawShip() {
    ship.rotate(alpha)
    ship.move(move)
    ship.wrap(w, h)
    ship.draw()
}

function drawLasers() {
    for(let i = lasers.length-1; i >= 0; i--) {
        if(lasers[i].wrap(w, h))
            lasers.splice(i, 1)
        else {
            lasers[i].move(1)
            lasers[i].draw()
        }
        
    }
}

function drawAsteroids() {
    for(let i = 0; i < asteroids.length; i++) {
        asteroids[i].move(1)
        asteroids[i].wrap(w, h)
        asteroids[i].draw()
    }
}

function generateAsteroids(num) {
    for(let i = 0; i < num; i++) {
        let xStart;
        let yStart;
        let choice = Math.random()
        if(choice < .25) { //move left
            xStart = 0
            yStart = h*Math.random()
        }
        else if(choice < .5) { //move up
            xStart = w*Math.random()
            yStart = 0
        }
        else if(choice < .75) { //move right
            xStart = w
            yStart = h*Math.random()
        }
        else { //move down
            xStart = w*Math.random()
            yStart = h
        }
        let size = Math.random()*20 + 16 * level
        let speed = Math.random()*2 + 2
        let rotation = Math.random()*360
        asteroids.push(new Asteroid(xStart, yStart, size, speed, rotation))
    }
}

