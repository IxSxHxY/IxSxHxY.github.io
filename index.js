// index.js
const sectors = [
    { color: '#f82', label: 'Stack' },
    { color: '#0bf', label: '10' },
    { color: '#fb0', label: '200' },
    { color: '#0fb', label: '50' },
    { color: '#b0f', label: '100' },
    { color: '#f0b', label: '5' },
    { color: '#bf0', label: '500' }
]

// Recipient's Telegram ID or username
const RECIPIENT_TELEGRAM_ID = "REPLACE_WITH_RECIPIENT_ID"; // Replace with the actual ID or username

const rand = (m, M) => Math.random() * (M - m) + m
const tot = sectors.length
const spinEl = document.querySelector('#spin')
const ctx = document.querySelector('#wheel').getContext('2d')
const dia = ctx.canvas.width
const rad = dia / 2
const PI = Math.PI
const TAU = 2 * PI
const arc = TAU / sectors.length

const friction = 0.991 // 0.995=soft, 0.99=mid, 0.98=hard
let angVel = 0 // Angular velocity
let ang = 0 // Angle in radians
let currentResult = null; // Store the current result
let isSpinning = false; // Track if wheel is currently spinning

const getIndex = () => Math.floor(tot - (ang / TAU) * tot) % tot

function drawSector(sector, i) {
    const ang = arc * i
    ctx.save()
    // COLOR
    ctx.beginPath()
    ctx.fillStyle = sector.color
    ctx.moveTo(rad, rad)
    ctx.arc(rad, rad, rad, ang, ang + arc)
    ctx.lineTo(rad, rad)
    ctx.fill()
    // TEXT
    ctx.translate(rad, rad)
    ctx.rotate(ang + arc / 2)
    ctx.textAlign = 'right'
    ctx.fillStyle = '#fff'
    ctx.font = 'bold 30px sans-serif'
    ctx.fillText(sector.label, rad - 10, 10)
    //
    ctx.restore()
}

function rotate() {
    const sector = sectors[getIndex()]
    ctx.canvas.style.transform = `rotate(${ang - PI / 2}rad)`
    
    if (isSpinning) {
        spinEl.textContent = 'Spinning...'
    } else if (angVel === 0 && currentResult) {
        spinEl.textContent = 'CLAIM'
        spinEl.style.background = '#2ca5e0' // Telegram blue color
    } else {
        spinEl.textContent = !angVel ? 'SPIN' : sector.label
    }
    
    spinEl.style.background = !angVel ? sector.color : sector.color
}

function frame() {
    if (!angVel) return
    
    angVel *= friction // Decrement velocity by friction
    
    if (angVel < 0.002) {
        angVel = 0 // Bring to stop
        isSpinning = false
        
        // Save the result
        currentResult = sectors[getIndex()]
        
        // Show result notification
        showResult()
    }
    
    ang += angVel // Update angle
    ang %= TAU // Normalize angle
    rotate()
}

function showResult() {
    if (!currentResult) return
    
    // Create a result container
    const resultContainer = document.getElementById('resultContainer') || createResultContainer()
    resultContainer.style.display = 'flex'
    
    // Update result text
    document.getElementById('resultText').textContent = `Congratulations! You won: ${currentResult.label}`
    
    // Change spin button to claim
    spinEl.textContent = 'CLAIM'
    spinEl.style.background = '#2ca5e0' // Telegram blue color
}

function createResultContainer() {
    const container = document.createElement('div')
    container.id = 'resultContainer'
    container.style.position = 'absolute'
    container.style.bottom = '0'
    container.style.left = '0'
    container.style.width = '100%'
    container.style.padding = '15px'
    container.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'
    container.style.color = 'white'
    container.style.textAlign = 'center'
    container.style.display = 'none'
    container.style.flexDirection = 'column'
    container.style.gap = '10px'
    
    const resultText = document.createElement('div')
    resultText.id = 'resultText'
    resultText.style.fontSize = '18px'
    container.appendChild(resultText)
    
    document.getElementById('wheelOfFortune').appendChild(container)
    
    return container
}

function sendResultToTelegram() {
    if (!currentResult) return
    
    try {
        // Check if Telegram WebApp is available
        if (window.Telegram && window.Telegram.WebApp) {
            // Show confirmation in Telegram
            window.Telegram.WebApp.showAlert(`You won: ${currentResult.label}!`);
            
            // Send data back to the bot
            window.Telegram.WebApp.sendData(JSON.stringify({
                prize: currentResult.label,
                recipientId: "402215730"
            }));
            
            // Close the WebApp
            setTimeout(() => {
                window.Telegram.WebApp.close();
            }, 1000);
        } else {
            // Fallback if Telegram WebApp is not available
            alert(`You won: ${currentResult.label}! This would be sent to the recipient in a real Telegram WebApp.`);
        }
    } catch (error) {
        console.error("Error sending result to Telegram:", error);
        alert("Failed to send result. Please try again.");
    }
}

function engine() {
    frame()
    requestAnimationFrame(engine)
}

function init() {
    sectors.forEach(drawSector)
    rotate() // Initial rotation
    engine() // Start engine
    
    spinEl.addEventListener('click', () => {
        if (angVel) return; // If already spinning, do nothing
        
        if (currentResult) {
            // If there's a result and button says CLAIM, send to Telegram
            sendResultToTelegram();
        } else {
            // Otherwise spin the wheel
            isSpinning = true;
            angVel = rand(0.25, 0.45);
            currentResult = null;
            
            // Hide result container if visible
            const resultContainer = document.getElementById('resultContainer');
            if (resultContainer) resultContainer.style.display = 'none';
        }
    })
    
    // Initialize Telegram WebApp if available
    if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.ready();
        window.Telegram.WebApp.expand();
    }
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);