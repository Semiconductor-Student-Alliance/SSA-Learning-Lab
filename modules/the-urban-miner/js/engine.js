// Main State Manager for The Urban Miner

// Initialize modules
const visionSim = new VisionPipeline();
const andGate = new AndGate();
const extractionLatch = new DFlipFlop();

// Game State
let armSafe = 1; // 1 = Safe to move
let targetFound = 0;

// DOM Elements
const targetBox = document.getElementById('target-box');
const targetStatus = document.getElementById('target-status');
const targetFoundInput = document.getElementById('tgt-found-input');
const systemStatus = document.getElementById('system-status');
const activateStatus = document.getElementById('activate-status');

// 1. Simulate Player adding AI Filters (In a full game, this would be drag-and-drop)
setTimeout(() => {
    // Simulate player action after 2 seconds
    visionSim.addFilter('grayscale');
    visionSim.addFilter('edge');
    
    if (visionSim.targetLocked) {
        // Update UI for Phase 1 Success
        targetBox.classList.remove('hidden');
        targetStatus.innerText = "TARGET_FOUND";
        targetStatus.classList.add('success-text');
        document.querySelector('.target-arrow').classList.add('success-arrow');
        
        // Trigger Phase 2 Hardware State Change
        targetFound = 1;
        targetFoundInput.innerText = `TGT_FOUND (${targetFound})`;
        targetFoundInput.classList.add('success-text');
        
        updateHardwareLogic();
    }
}, 2000);

// 2. Hardware Logic Evaluation
function updateHardwareLogic() {
    // Pass states through AND Gate
    const andOutput = andGate.evaluate(targetFound, armSafe);
    
    // Pass output to D Flip-Flop
    const finalActivation = extractionLatch.clockPulse(andOutput);
    
    if (finalActivation === 1) {
        // Update UI for Phase 2 Success
        activateStatus.innerText = "ACTIVATE";
        activateStatus.classList.add('act-text');
        document.querySelector('.act-arrow').classList.add('act-arrow');
        
        systemStatus.innerHTML = "&#9888; STATUS: HYDRAULICS ENGAGED. READY FOR EXTRACTION.";
        systemStatus.classList.add('active');
        
        // Update Score
        document.getElementById('si-score').innerText = "14";
        document.getElementById('au-score').innerText = "2";
    }
}
