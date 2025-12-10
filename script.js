function toggleTheme() {
    const body = document.body;
    const themeIcon = document.querySelector('.theme-icon');
    
    body.classList.toggle('light-mode');
    
    themeIcon.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        themeIcon.style.transform = 'rotate(0deg)';
    }, 400);
    
    if (body.classList.contains('light-mode')) {
        themeIcon.textContent = '☀️';
        saveTheme('light');
    } else {
        themeIcon.textContent = '🌙';
        saveTheme('dark');
    }
}

function saveTheme(theme) {
    try {
        const themeData = { theme: theme, timestamp: Date.now() };
        document.cookie = `theme=${theme};path=/;max-age=31536000`;
    } catch (e) {
        console.log('Theme preference saved for session');
    }
}

function loadTheme() {
    const cookies = document.cookie.split(';');
    const themeCookie = cookies.find(c => c.trim().startsWith('theme='));
    
    if (themeCookie) {
        const theme = themeCookie.split('=')[1];
        if (theme === 'light') {
            document.body.classList.add('light-mode');
            document.querySelector('.theme-icon').textContent = '☀️';
        }
    }
}

function calculateGrade() {
    const prelim = parseFloat(document.getElementById('prelim').value);
    const midterm = parseFloat(document.getElementById('midterm').value);
    const prefinals = parseFloat(document.getElementById('prefinals').value);
    const finals = parseFloat(document.getElementById('finals').value);

    if (isNaN(prelim) || isNaN(midterm) || isNaN(prefinals) || isNaN(finals) || 
        prelim < 0 || prelim > 100 || midterm < 0 || midterm > 100 || 
        prefinals < 0 || prefinals > 100 || finals < 0 || finals > 100) {
        
        showError();
        return;
    }

    const finalPercentageGrade = (prelim * 0.20) + 
                                 (midterm * 0.20) + 
                                 (prefinals * 0.20) + 
                                 (finals * 0.40);

    const roundedGrade = finalPercentageGrade.toFixed(2);

    const { equivalent, remarks, className } = getEquivalentGrade(roundedGrade);

    displayResults(roundedGrade, equivalent, remarks, className);
    if (parseFloat(roundedGrade) >= 97.50) {
        createConfetti();
    }
}

function getEquivalentGrade(percentage) {
    let equivalent = "N/A";
    let remarks = "N/A";
    let className = "";
    const p = parseFloat(percentage);

    if (p >= 97.50 && p <= 100.00) {
        equivalent = "1.00";
        remarks = "Excellent";
        className = "excellent";
    } else if (p >= 94.50 && p <= 97.49) {
        equivalent = "1.25";
        remarks = "Very Good";
        className = "very-good";
    } else if (p >= 91.50 && p <= 94.49) {
        equivalent = "1.50";
        remarks = "Very Good";
        className = "very-good";
    } else if (p >= 86.50 && p <= 91.49) {
        equivalent = "1.75";
        remarks = "Very Good";
        className = "very-good";
    } else if (p >= 81.50 && p <= 86.49) {
        equivalent = "2.00";
        remarks = "Satisfactory";
        className = "satisfactory";
    } else if (p >= 76.00 && p <= 81.49) {
        equivalent = "2.25";
        remarks = "Satisfactory";
        className = "satisfactory";
    } else if (p >= 70.50 && p <= 75.99) {
        equivalent = "2.50";
        remarks = "Satisfactory";
        className = "satisfactory";
    } else if (p >= 65.00 && p <= 70.49) {
        equivalent = "2.75";
        remarks = "Fair";
        className = "fair";
    } else if (p >= 59.50 && p <= 64.99) {
        equivalent = "3.00";
        remarks = "Fair";
        className = "fair";
    } else if (p < 59.50) {
        equivalent = "5.00";
        remarks = "Failed";
        className = "failed";
    }

    return { equivalent, remarks, className };
}

function displayResults(percentage, equivalent, remarks, className) {
    const percentageEl = document.getElementById('percentageResult');
    const equivalentEl = document.getElementById('equivalentResult');
    const remarksEl = document.getElementById('remarksResult');
    const resultBox = document.getElementById('resultBox');

    resultBox.style.animation = 'none';
    setTimeout(() => {
        resultBox.style.animation = 'fadeIn 0.5s ease-out';
    }, 10);

    animateValue(percentageEl, 0, parseFloat(percentage), 1000, '%');
    animateValue(equivalentEl, 0, parseFloat(equivalent), 1000, '');
    
    remarksEl.textContent = remarks;
    remarksEl.className = `result-value remarks ${className}`;
    
    resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function animateValue(element, start, end, duration, suffix = '') {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = progress * (end - start) + start;
        element.textContent = value.toFixed(2) + suffix;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

function showError() {
    const percentageEl = document.getElementById('percentageResult');
    const equivalentEl = document.getElementById('equivalentResult');
    const remarksEl = document.getElementById('remarksResult');
    
    percentageEl.textContent = "---";
    equivalentEl.textContent = "---";
    remarksEl.textContent = "Please enter valid grades (0-100)";
    remarksEl.className = "result-value remarks failed";
    
    const resultBox = document.getElementById('resultBox');
    resultBox.style.animation = 'shake 0.5s';
    setTimeout(() => {
        resultBox.style.animation = '';
    }, 500);
}

function createConfetti() {
    const colors = ['#6366f1', '#818cf8', '#10b981', '#f59e0b', '#ef4444'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            confetti.style.opacity = '0.8';
            
            document.body.appendChild(confetti);
            
            const duration = Math.random() * 3 + 2;
            const rotation = Math.random() * 360;
            const xMovement = (Math.random() - 0.5) * 200;
            
            confetti.animate([
                { 
                    transform: 'translateY(0) translateX(0) rotate(0deg)',
                    opacity: 0.8
                },
                { 
                    transform: `translateY(${window.innerHeight + 10}px) translateX(${xMovement}px) rotate(${rotation}deg)`,
                    opacity: 0
                }
            ], {
                duration: duration * 1000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });
            
            setTimeout(() => {
                confetti.remove();
            }, duration * 1000);
        }, i * 30);
    }
}

const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('input', function() {
        const value = parseFloat(this.value);
        if (this.value && (isNaN(value) || value < 0 || value > 100)) {
            this.style.borderColor = '#ef4444';
            this.style.animation = 'shake 0.3s';
        } else {
            this.style.borderColor = '';
            this.style.animation = '';
        }
    });
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calculateGrade();
        }
    });
});

window.addEventListener('DOMContentLoaded', loadTheme);
document.documentElement.style.scrollBehavior = 'smooth';
