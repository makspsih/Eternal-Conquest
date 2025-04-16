class Character {
    constructor(name, charClass) {
        this.name = name;
        this.charClass = charClass;
        this.level = 1;
        this.exp = 0;
        this.expToNextLevel = 100;
        this.stats = this.getBaseStats();
        this.inventory = {
            weapons: [],
            armor: [],
            potions: []
        };
        this.equipment = {
            weapon: null,
            armor: null
        };
        this.status = {
            quests: []
        };
    }
    
    getBaseStats() {
        const baseStats = {
            hp: 100,
            maxHp: 100,
            mp: 50,
            maxMp: 50,
            str: 10,
            dex: 10,
            int: 10
        };
        
        // Бонусы в зависимости от класса
        switch (this.charClass) {
            case 'warrior':
                baseStats.str += 5;
                baseStats.hp += 20;
                baseStats.maxHp += 20;
                break;
            case 'mage':
                baseStats.int += 5;
                baseStats.mp += 20;
                baseStats.maxMp += 20;
                break;
            case 'rogue':
                baseStats.dex += 5;
                break;
        }
        
        return baseStats;
    }
    
    addItem(item) {
        if (item.type === 'weapon') {
            this.inventory.weapons.push(item);
        } else if (item.type === 'armor') {
            this.inventory.armor.push(item);
        } else if (item.type === 'potion') {
            this.inventory.potions.push(item);
        }
    }
    
    equipItem(item) {
        if (item.type === 'weapon') {
            this.equipment.weapon = item;
        } else if (item.type === 'armor') {
            this.equipment.armor = item;
        }
    }
    
    attack(target) {
        let damage = this.stats.str;
        
        // Бонус от оружия
        if (this.equipment.weapon) {
            damage += this.equipment.weapon.damage;
        }
        
        // Применение урона к цели
        target.stats.hp -= damage;
        return damage;
    }
    
    gainExp(amount) {
        this.exp += amount;
        while (this.exp >= this.expToNextLevel) {
            this.levelUp();
        }
    }
    
    levelUp() {
        this.level++;
        this.exp -= this.expToNextLevel;
        this.expToNextLevel = Math.floor(this.expToNextLevel * 1.5);
        
        // Увеличение характеристик
        this.stats.maxHp += 10;
        this.stats.hp = this.stats.maxHp;
        this.stats.maxMp += 5;
        this.stats.mp = this.stats.maxMp;
        this.stats.str += 2;
        this.stats.dex += 2;
        this.stats.int += 2;
    }
    
    die() {
        // Потеря опыта при смерти
        this.exp = Math.floor(this.exp * 0.9);
        
        // Восстановление здоровья
        this.stats.hp = this.stats.maxHp;
        this.stats.mp = this.stats.maxMp;
    }
    
    addQuest(quest) {
        this.status.quests.push(quest);
    }
}

class Monster {
    constructor(name, stats, expReward) {
        this.name = name;
        this.stats = stats;
        this.expReward = expReward;
    }
    
    attack(target) {
        const damage = this.stats.str;
        target.stats.hp -= damage;
        return damage;
    }
}

class Location {
    constructor(name, description) {
        this.name = name;
        this.description = description;
        this.monsters = [];
        this.quests = [];
        this.connections = [];
    }
    
    addMonster(monster) {
        this.monsters.push(monster);
    }
    
    addQuest(quest) {
        this.quests.push(quest);
    }
    
    addConnection(location) {
        this.connections.push(location);
    }
}

class Quest {
    constructor(id, title, description, requirements, reward) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.requirements = requirements;
        this.reward = reward;
        this.completed = false;
    }
}

// Примеры предметов
const items = {
    weapons: [
        { name: 'Деревянный меч', type: 'weapon', damage: 5 },
        { name: 'Железный меч', type: 'weapon', damage: 10 },
        { name: 'Стальной меч', type: 'weapon', damage: 15 }
    ],
    armor: [
        { name: 'Кожаная броня', type: 'armor', defense: 5 },
        { name: 'Железная броня', type: 'armor', defense: 10 },
        { name: 'Стальная броня', type: 'armor', defense: 15 }
    ],
    potions: [
        { name: 'Зелье здоровья', type: 'potion', heal: 30 },
        { name: 'Зелье маны', type: 'potion', restoreMp: 20 }
    ]
};

// Примеры монстров
const monsters = {
    forest: [
        { name: 'Гоблин', level: 1 },
        { name: 'Волк', level: 2 },
        { name: 'Орк', level: 3 }
    ],
    cave: [
        { name: 'Скелет', level: 2 },
        { name: 'Зомби', level: 3 },
        { name: 'Минотавр', level: 4 }
    ]
};

// Примеры квестов
const quests = {
    forest: [
        {
            title: 'Охота на гоблинов',
            description: 'Уничтожьте 5 гоблинов в лесу',
            reward: { exp: 100, gold: 50 }
        },
        {
            title: 'Сбор трав',
            description: 'Соберите 10 целебных трав',
            reward: { exp: 50, gold: 25 }
        }
    ],
    cave: [
        {
            title: 'Исследование пещеры',
            description: 'Найдите сокровище в глубине пещеры',
            reward: { exp: 200, gold: 100 }
        }
    ]
};

// Локации
const locations = {
    village: {
        name: 'Деревня',
        description: 'Мирная деревня, где можно отдохнуть и пополнить запасы.',
        monsters: []
    },
    forest: {
        name: 'Лес',
        description: 'Густой лес, населенный различными существами.',
        monsters: [
            new Monster('Гоблин', { hp: 30, str: 5 }, 20),
            new Monster('Волк', { hp: 25, str: 7 }, 15)
        ]
    },
    cave: {
        name: 'Пещера',
        description: 'Темная и опасная пещера, где обитают сильные монстры.',
        monsters: [
            new Monster('Тролль', { hp: 50, str: 12 }, 50),
            new Monster('Орк', { hp: 40, str: 10 }, 40)
        ]
    }
};

module.exports = {
    Character,
    Monster,
    Location,
    Quest,
    items,
    monsters,
    quests,
    locations
}; 