// TODOs
// fix the final outcome from repeating


// ==================================PLAYER STATS==========================================
// weapon/defense --> 1 = working, 0 = not working.
const player = {
    'hp': 100,
    'sp': 100,
    'weapon': 1,
    'defense': 1,
    'damage': 100
}

// higher defenseRating --> harder to hit. value 1 == 100% hit rate.
const defenseRatingP = 2;
const fireWeaponP = () => {
    if (defenseModC() === 0) {
        if (computer.sp > 0) {
            computer.sp -= randomModifier(player.damage);
            console.log('Enemy status: sp: ' + computer.sp + "| hp: " + computer.hp);
        } else {
            computer.hp -= randomModifier(player.damage);
            console.log('Enemy status: sp: ' + computer.sp + "| hp: " + computer.hp);
        }
    } else {
        console.log('Attack missed');
        console.log('Enemy status: sp: ' + computer.sp + "| hp: " + computer.hp);
    }
}
const weaponTriggerP = () => {
    if (player.weapon === 1) {
        fireWeaponP();
        if (computer.hp > 0 && player.hp > 0) {
            setTimeout(weaponTriggerP, 2000);
        } else if (player.hp > 0) {
            console.log('You have destroyed your enemy.');
        }
    } else {
        console.log('Weapon module is down! Repair it to fire your weapons,');
    }
}
// probability of hitting computer
const defenseModC = () => {
    if (computer.defense === 1) {
        const hitIndexC = Math.floor(Math.random() * defenseRatingC);
        return hitIndexC;
    } else {
        return 0;
    }
}

// ===========================COMPUTER STATS ===============================================
const computer = {
    'hp': 100,
    'sp': 100,
    'weapon': 1,
    'defense': 1,
    'damage': 30
}
// higher defenseRating --> harder to hit. value 1 == 100% hit rate.
const defenseRatingC = 2;
const fireWeaponC = () => {
    if (defenseModP() === 0) {
        if (player.sp > 0) {
            player.sp -= randomModifier(computer.damage);
            console.log('Your status: sp: ' + player.sp + "| hp: " + player.hp);
        } else {
            player.hp -= randomModifier(computer.damage);
            console.log('Your status: sp: ' + player.sp + "| hp: " + player.hp);
        }
    } else {
        console.log("Computer's attack intercepted!");
        console.log('Your status: sp: ' + player.sp + "| hp: " + player.hp);
    }
}
const weaponTriggerC = () => {
    if (computer.weapon === 1) {
        fireWeaponC();
        if (player.hp > 0 && computer.hp > 0) {
            setTimeout(weaponTriggerC, 2000);
        } else if (computer.hp > 0) {
            console.log('You died.');
        }
    } else {
        console.log("Enemy's weapons are down!");
    }
}
// probability of hitting player
const defenseModP = () => {
    if (player.defense === 1) {
        const hitIndexP = Math.floor(Math.random() * defenseRatingP);
        return hitIndexP;
    } else {
        return 0;
    }
}

// =====================================controllers======================================
const outcome = () => {
    if (player.hp < 1 && computer.hp < 1) {
        console.log("It's a draw! But you died anyway. GAME OVER...");
    } else if (player.hp > 0 && computer.hp < 1) {
        console.log("Good job Captain! You are victorious!");
    } else if (player.hp < 1 && computer.hp > 0) {
        console.log("Game over... You lost.");
    }
}

const randomModifier = (d) => {
    const deviation = 2 * d * 0.2;
    const lowestDamage = 0.8 * d;
    const finalDamage = lowestDamage + Math.floor(Math.random() * (deviation + 1));
    return finalDamage;
}
const render = () => {
    weaponTriggerC();
    weaponTriggerP();
}


$(() => {
    render();
})

$();

