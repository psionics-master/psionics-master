const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");

const spinButton = document.getElementById("spinButton");
const buyEnergyButton = document.getElementById("buyEnergy");
const energyDisplay = document.getElementById("energy");
const resultDisplay = document.getElementById("result");

let energy = 100;
let isSpinning = false;
const slices = [
    { label: "+10 Karma", color: "#FF5733", icon: "🔮" },
    { label: "+5 Spins", color: "#FFC300", icon: "🎰" },
    { label: "+20 Psionic Coins", color: "#33FF57", icon: "💎" },
    { label: "Jackpot!", color: "#3380FF", icon: "🏆" },
];

const numSlices = slices.length;
const anglePerSlice = (2 * Math.PI) / numSlices;
let currentAngle = 0;

// **Fix: Properly draw all slices**
function drawWheel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < numSlices; i++) {
        const slice = slices[i];
        const startAngle = i * anglePerSlice;
        const endAngle = (i + 1) * anglePerSlice;

        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, startAngle, endAngle);
        ctx.fillStyle = slice.color;
        ctx.fill();
        ctx.strokeStyle = "white";
        ctx.stroke();

        // **Fix: Properly position text/icons**
        const textX = canvas.width / 2 + Math.cos(startAngle + anglePerSlice / 2) * 80;
        const textY = canvas.height / 2 + Math.sin(startAngle + anglePerSlice / 2) * 80;

        ctx.fillStyle = "white";
        ctx.font = "16px Arial";
        ctx.fillText(slice.icon, textX - 10, textY);
    }
}

// **Fix: Make the spin function actually rotate**
function spinWheel() {
    if (isSpinning || energy < 5) {
        alert("Not enough energy!");
        return;
    }

    isSpinning = true;
    energy -= 5;
    energyDisplay.innerText = energy;

    let spinTime = 4000; // 4 seconds spin duration
    let startTime = performance.now();
    let finalRotation = Math.random() * 360 + 360 * 5; // Ensures at least 5 full spins

    function animateSpin(time) {
        let elapsed = time - startTime;
        let progress = elapsed / spinTime;

        if (progress < 1) {
            let easedProgress = 1 - Math.pow(1 - progress, 3);
            currentAngle = easedProgress * finalRotation;

            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate((currentAngle * Math.PI) / 180);
            ctx.translate(-canvas.width / 2, -canvas.height / 2);
            drawWheel();
            ctx.restore();

            requestAnimationFrame(animateSpin);
        } else {
            isSpinning = false;
            let winningIndex = Math.floor(((currentAngle % 360) / 360) * numSlices);
            let reward = slices[winningIndex].label;
            resultDisplay.innerText = `You won: ${reward}`;
        }
    }

    requestAnimationFrame(animateSpin);
}

// **Fix: Ensure wheel is drawn initially**
drawWheel();
spinButton.addEventListener("click", spinWheel);
