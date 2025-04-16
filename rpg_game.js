document.getElementById('attack-btn').addEventListener('click', () => {
    const damage = Math.floor(Math.random() * 10) + 5; // Случайный урон
    const enemy = document.querySelector('.enemy-frog');
    if (enemy) {
        enemy.classList.add('taking-damage');
        setTimeout(() => enemy.classList.remove('taking-damage'), 300);
        enemy.dataset.hp -= damage;
        logBattle(`Вы нанесли ${damage} урона врагу!`);
        checkEnemyHealth(enemy);
    }
});

function logBattle(message) {
    const battleLog = document.getElementById('battle-log');
    const newLog = document.createElement('p');
    newLog.textContent = message;
    battleLog.appendChild(newLog);
    battleLog.scrollTop = battleLog.scrollHeight;
}

function checkEnemyHealth(enemy) {
    if (enemy.dataset.hp <= 0) {
        enemy.remove();
        logBattle('Вы победили врага!');
    }
}