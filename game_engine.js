function spawnEnemy() {
    const enemy = document.createElement('div');
    enemy.className = 'enemy-frog';
    enemy.style.top = `${Math.random() * 100}px`;
    enemy.style.left = `${Math.random() * 100}px`;
    enemy.dataset.hp = 50; // Здоровье врага
    enemy.addEventListener('click', () => {
        const damage = Math.floor(Math.random() * 10) + 1;
        enemy.dataset.hp -= damage;
        logBattle(`Вы нанесли ${damage} урона врагу!`);
        if (enemy.dataset.hp <= 0) {
            enemy.remove();
            logBattle('Вы победили врага!');
        }
    });
    document.querySelector('.battle-area').appendChild(enemy);
}
setInterval(spawnEnemy, 5000);