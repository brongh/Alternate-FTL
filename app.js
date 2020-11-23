// TODOs
// fix the final outcome from repeating


// ==================================PLAYER STATS==========================================
// weapon/defense --> 1 = working, 0 = not working.
const player = {
    'hp': 100,
    'sp': 100,
    'weapon': 1,
    'defense': 1,
    'damage': 10
}


// higher defenseRating --> harder to hit. value 1 == 100% hit rate.
const defenseRatingP = 2;
const fireWeaponP = () => {
    if (defenseModC() === 0) {
        if (computer.sp > 0) {
            PdamageSP = randomModifier(player.damage)
            computer.sp -= PdamageSP;
            shieldC.value -= PdamageSP
            console.log('Enemy status: sp: ' + computer.sp + "| hp: " + computer.hp);
        } else {
            PdamageHP = randomModifier(player.damage);
            computer.hp -= PdamageHP;
            healthC.value -=PdamageHP;
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
            damageSP = randomModifier(computer.damage);
            player.sp -= damageSP;
            shieldP.value -= damageSP;
            console.log('Your status: sp: ' + player.sp + "| hp: " + player.hp);
        } else {
            damageHP = randomModifier(computer.damage);
            player.hp -= damageHP;
            healthP.value -= damageHP;
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
    
    // grids id = x1y1 e.g. 
    for (let y = 1; y < 26; y++) {
        for (let x = 1; x < 26; x++) {
            $('<div>').appendTo($('#container'))
                .attr('id', 'x' + x + 'y' + y)
                .text(x + '.' + y)
                .css('grid-column', x).css('grid-row', y);
        }
    }
    //spaceship player
    for (let x = 2; x < 11; x++) {
        for (let y = 3; y < 15; y++) {
            $('#x' + x + 'y' + y).css('background', 'grey').text('');
        }
    }
    for (let x = 4; x < 11; x++) {
        $('#x' + x + 'y3').css('background', 'white');
    }
    for (let x = 4; x < 11; x++) {
        $('#x' + x + 'y14').css('background', 'white');
    }
    for (let x = 9; x < 11; x++) {
        $('#x' + x + 'y4').css('background', 'white');
    }
    for (let x = 9; x < 11; x++) {
        $('#x' + x + 'y13').css('background', 'white');
    }

    // spaceship computer


    // separator for spaceships and status
    for (let x = 1; x < 26; x++) {
        $('#x' + x + 'y17').css('background', 'black').text('');
    }

    // hp sp bar for player ================================================================
    const statusP = Object.keys(player);
    for (let i = 0; i < statusP.length; i++) {
        const items = 19 + i;
        $('#x2y' + items).text(statusP[i]).css('border', '1px solid black');
    }
    const statusValueP = Object.values(player);
    for (let i =0; i < statusValueP.length; i++) {
        const items = 19 + i;
        $('#x3y' + items).text(statusValueP[i]).css('border','1px solid black');
    }
    // hp bar
    
    for (let x = 4; x < 9; x++) {
        $('#x' + x + 'y19').remove();
    }
    $('<progress>').appendTo('#container')
    .css('grid-column-start', 4).css('grid-column-end', 8).css('grid-row', 19)
    .attr('value', 100).attr('max', 100).attr('id','healthP');
    // sp bar
    for (let x = 4; x < 9; x++) {
        $('#x' + x + 'y20').remove();
    }
    $('<progress>').appendTo('#container')
    .css('grid-column-start', 4).css('grid-column-end', 8).css('grid-row', 20)
    .attr('value', 100).attr('max', 100).attr('id','shieldP');
    // weapon bar
    for (let x = 4; x < 9; x++) {
        $('#x' + x + 'y21').remove();
    }
    $('<progress>').appendTo('#container')
    .css('grid-column-start', 4).css('grid-column-end', 8).css('grid-row', 21)
    .attr('value', 1).attr('max', 1).attr('id','weaponStatusP');
    //defense bar
    for (let x = 4; x < 9; x++) {
        $('#x' + x + 'y22').remove();
    }
    $('<progress>').appendTo('#container')
    .css('grid-column-start', 4).css('grid-column-end', 8).css('grid-row', 22)
    .attr('value', 1).attr('max', 1).attr('id','defenseStatusP');

    // status bars for computer ==========================================================
    const statusC = Object.keys(computer);
    for (let i = 0; i < statusC.length; i++) {
        const items = 19 + i;
        $('#x18y' + items).text(statusC[i]).css('border', '1px solid black');
    }
    const statusValueC = Object.values(computer);
    for (let i =0; i < statusValueC.length; i++) {
        const items = 19 + i;
        $('#x19y' + items).text(statusValueC[i]).css('border','1px solid black');
    }

    let healthP = $('#healthP');
    let shieldP = $('#shieldP');
    let defenseStatusP = $('#defenseStatusP');
    let weaponStatusP = $('#weaponStatusP');
    // hp bar
    
    for (let x = 20; x < 25; x++) {
        $('#x' + x + 'y19').remove();
    }
    $('<progress>').appendTo('#container')
    .css('grid-column-start', 20).css('grid-column-end', 24).css('grid-row', 19)
    .attr('value', 100).attr('max', 100).attr('id','healthC');
    // sp bar
    for (let x = 20; x < 25; x++) {
        $('#x' + x + 'y20').remove();
    }
    $('<progress>').appendTo('#container')
    .css('grid-column-start', 20).css('grid-column-end', 24).css('grid-row', 20)
    .attr('value', 100).attr('max', 100).attr('id','shieldC');
    // weapon bar
    for (let x = 20; x < 25; x++) {
        $('#x' + x + 'y21').remove();
    }
    $('<progress>').appendTo('#container')
    .css('grid-column-start', 20).css('grid-column-end', 24).css('grid-row', 21)
    .attr('value', 1).attr('max', 1).attr('id','weaponStatusC');
    //defense bar
    for (let x = 20; x < 25; x++) {
        $('#x' + x + 'y22').remove();
    }
    $('<progress>').appendTo('#container')
    .css('grid-column-start', 20).css('grid-column-end', 24).css('grid-row', 22)
    .attr('value', 1).attr('max', 1).attr('id','defenseStatusC');
    let healthC = $('#healthC');
    let shieldC = $('#shieldC');
    let defenseStatusC = $('#defenseStatusC');
    let weaponStatusC = $('#weaponStatusC');

    render();
})

$();

