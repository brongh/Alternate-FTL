// TODOs
// fix the final outcome from repeating
var ticker = 0;
var playerTimeStopDef = 0;
var playerTimeStopShi = 0;
var playerTimeStopWea = 0;
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
// random module damage =================================================================
const shieldOnMalfunctionChance = 5;
const shieldOffMalfunctionChance = 2;
const module = ['sp', 'weapon', 'defense'];
const malfunctionChance = (n) => {
    const chance = Math.floor(Math.random() * n);
    return chance;
}
const moduleMalfunctionChance = () => {
    const chance = Math.floor(Math.random() * module.length);
    return chance;
}

// damage modifier ======================================================================
const randomModifier = (d) => {
    const deviation = 2 * d * 0.2;
    const lowestDamage = 0.8 * d;
    const finalDamage = lowestDamage + Math.floor(Math.random() * (deviation + 1));
    return finalDamage;
}

// ==================================PLAYER STATS==========================================
// weapon/defense --> 1 = working, 0 = not working.
const player = {
    'hp': 100,
    'sp': 100,
    'shield': 1,
    'weapon': 1,
    'defense': 0,
    'damage': 10
}


// higher defenseRating --> harder to hit. value 1 == 100% hit rate.
const defenseRatingP = 3;
const fireWeaponP = () => {
    if (defenseModC() === 0) {
        if (computer.sp > 0) {
            PdamageSP = randomModifier(player.damage)
            computer.sp -= PdamageSP;
            const malIndex = malfunctionChance(shieldOnMalfunctionChance);
            const modIndex = moduleMalfunctionChance();
            if (malIndex === 0) {
                if (modIndex === 0) {
                    computer.sp = 0;
                } else if (modIndex === 1) {
                    computer.weapon = 0;
                } else if (modIndex === 2) {
                    computer.defense = 0;
                }
            }
            console.log(computer);
        } else {
            PdamageHP = randomModifier(player.damage);
            computer.hp -= PdamageHP;
            const malIndex = malfunctionChance(shieldOffMalfunctionChance);
            modIndex = moduleMalfunctionChance();
            if (malIndex === 0) {
                if (modIndex === 0) {
                    computer.sp = 0;
                } else if (modIndex === 1) {
                    computer.weapon = 0;
                } else if (modIndex === 2) {
                    computer.defense = 0;
                }
            }
            console.log(computer);
        }
    } else {
        console.log('Attack missed');
        console.log(computer);
    }
}
const weaponTriggerP = () => {
    if (ticker % 5 === 0) {
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
    'shield': 1,
    'weapon': 1,
    'defense': 1,
    'damage': 10
}
// higher defenseRating --> harder to hit. value 1 == 100% hit rate.
const defenseRatingC = 3;
const fireWeaponC = () => {
    if (defenseModP() === 0) {
        if (player.sp > 0) {
            damageSP = randomModifier(computer.damage);
            player.sp -= damageSP;
            const malIndex = malfunctionChance(shieldOnMalfunctionChance);
            const modIndex = moduleMalfunctionChance();
            if (malfunctionChance(shieldOnMalfunctionChance) === 0) {
                if (modIndex === 0) {
                    player.sp = 0;
                } else if (modIndex === 1) {
                    player.weapon = 0;
                } else if (modIndex === 2) {
                    player.defense = 0;
                }
            }
            console.log(player);
        } else {
            damageHP = randomModifier(computer.damage);
            player.hp -= damageHP;
            const malIndex = malfunctionChance(shieldOffMalfunctionChance);
            const modIndex = moduleMalfunctionChance();
            if (malIndex === 0) {
                if (modIndex === 0) {
                    player.sp = 0;
                } else if (modIndex === 1) {
                    player.weapon = 0;
                } else if (modIndex === 2) {
                    player.defense = 0;
                }
            }
            console.log(player);
        }
    } else {
        console.log("Computer's attack intercepted!");
        console.log(player);
    }
}
const weaponTriggerC = () => {
    if (ticker % 5 === 0) {
        if (computer.weapon === 1) {
            if (player.hp > 0 && computer.hp > 0) {
                fireWeaponC();
            } else if (computer.hp > 0) {
                console.log('You died.');
            }
        } else {
            console.log("Enemy's weapons are down!");
        }
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





$(() => {
    const render = (timestamp) => {
        ticker += 1; // global time ticker
        // =======================================================================================================
        // grids id = x1y1 e.g. 
        for (let y = 1; y < 26; y++) {
            for (let x = 1; x < 26; x++) {
                $('<div>').appendTo($('#container'))
                    .attr('id', 'x' + x + 'y' + y)
                    //.text(x + '.' + y)
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
        for (let x = 16; x < 25; x++) {
            for (let y = 3; y < 15; y++) {
                $('#x' + x + 'y' + y).css('background', 'grey').text('');
            }
        }
        for (let x = 16; x < 23; x++) {
            $('#x' + x + 'y3').css('background', 'white');
        }
        for (let x = 16; x < 23; x++) {
            $('#x' + x + 'y14').css('background', 'white');
        }
        for (let x = 16; x < 18; x++) {
            $('#x' + x + 'y4').css('background', 'white');
        }
        for (let x = 16; x < 18; x++) {
            $('#x' + x + 'y13').css('background', 'white');
        }
        // =====================================================================================================
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
        for (let i = 0; i < statusValueP.length; i++) {
            const items = 19 + i;
            $('#x3y' + items).text(statusValueP[i]).css('border', '1px solid black');
        }

        // hp bar

        for (let x = 4; x < 9; x++) {
            $('#x' + x + 'y19').remove();
        }
        $('<progress>').appendTo('#container')
            .css('grid-column-start', 4).css('grid-column-end', 8).css('grid-row', 19)
            .attr('value', player.hp).attr('max', 100).attr('id', 'healthP');
        // sp bar
        for (let x = 4; x < 9; x++) {
            $('#x' + x + 'y20').remove();
        }
        $('<progress>').appendTo('#container')
            .css('grid-column-start', 4).css('grid-column-end', 8).css('grid-row', 20)
            .attr('value', player.sp).attr('max', 100).attr('id', 'shieldP');
        if (player.sp < 1) {
            $('<div>').appendTo('#container')
                .css('grid-column-start',)
        }
        // shield status
        if (player.sp > 0) {
            player.shield = 1;
        } else if (player.sp < 1 && player.shield !== 2) {
            player.shield = 0;
        }
        $('<div>').appendTo('#container')
            .css('grid-column-start', 4).css('grid-column-end', 8).css('grid-row', 21)
            .attr('id', 'shieldStatusP').css('font-size', '15px');
        if (player.shield === 1) {
            $('#shieldStatusP').text('Functioning').css('color', 'green');
        } else if (player.shield === 2) {
            $('#shieldStatusP').text('Repairing').css('color', 'yellow');
        } else {
            $('#shieldStatusP').text('Click to repair').css('color', 'red');
        }
        // weapon bar
        for (let x = 4; x < 9; x++) {
            $('#x' + x + 'y21').remove();
        }
        $('<div>').appendTo('#container')
            .css('grid-column-start', 4).css('grid-column-end', 8).css('grid-row', 22)
            .attr('id', 'weaponStatusP').css('font-size', '15px');
        if (player.weapon === 1) {
            $('#weaponStatusP').text('Functioning').css('color', 'green');
        } else if (player.weapon === 2) {
            $('#weaponStatusP').text('Repairing').css('color', 'yellow');
        } else {
            $('#weaponStatusP').text('Click to repair').css('color', 'red');
        }
        //defense bar
        for (let x = 4; x < 9; x++) {
            $('#x' + x + 'y22').remove();
        }
        $('<div>').appendTo('#container')
            .css('grid-column-start', 4).css('grid-column-end', 8).css('grid-row', 23)
            .attr('id', 'defenseStatusP').css('font-size', '15px');
        if (player.defense === 1) {
            $('#defenseStatusP').text('Functioning').css('color', 'green');
        } else if (player.defense === 2) {
            $('#defenseStatusP').text('Repairing').css('color', 'yellow');
        } else {
            $('#defenseStatusP').text('Click to repair').css('color', 'red');
        }
        let healthP = $('#healthP');
        let shieldP = $('#shieldP');
        let defenseStatusP = $('#defenseStatusP');
        let weaponStatusP = $('#weaponStatusP');

        // status bars for computer ==========================================================
        const statusC = Object.keys(computer);
        for (let i = 0; i < statusC.length; i++) {
            const items = 19 + i;
            $('#x18y' + items).text(statusC[i]).css('border', '1px solid black');
        }
        const statusValueC = Object.values(computer);
        for (let i = 0; i < statusValueC.length; i++) {
            const items = 19 + i;
            $('#x19y' + items).text(statusValueC[i]).css('border', '1px solid black');
        }


        // hp bar

        for (let x = 20; x < 25; x++) {
            $('#x' + x + 'y19').remove();
        }
        $('<progress>').appendTo('#container')
            .css('grid-column-start', 20).css('grid-column-end', 24).css('grid-row', 19)
            .attr('value', computer.hp).attr('max', 100).attr('id', 'healthC');
        // sp bar
        for (let x = 20; x < 25; x++) {
            $('#x' + x + 'y20').remove();
        }
        $('<progress>').appendTo('#container')
            .css('grid-column-start', 20).css('grid-column-end', 24).css('grid-row', 20)
            .attr('value', computer.sp).attr('max', 100).attr('id', 'shieldC');
        // shield status
        $('<div>').appendTo('#container')
            .css('grid-column-start', 20).css('grid-column-end', 24).css('grid-row', 21)
            .attr('id', 'shieldStatusC').css('font-size', '15px');
        if (computer.shield === 1) {
            $('#shieldStatusC').text('Functioning');
        } else {
            $('#shieldStatusC').text('Click to repair').css('color', 'red');
        }
        // weapon bar
        for (let x = 20; x < 25; x++) {
            $('#x' + x + 'y21').remove();
        }
        $('<div>').appendTo('#container')
            .css('grid-column-start', 20).css('grid-column-end', 24).css('grid-row', 22)
            .attr('id', 'weaponStatusC').css('font-size', '15px');
        if (computer.weapon === 1) {
            $('#weaponStatusC').text('Functioning');
        } else {
            $('#weaponStatusC').text('Click to repair').css('color', 'red');
        }
        //defense bar
        for (let x = 20; x < 25; x++) {
            $('#x' + x + 'y22').remove();
        }
        $('<div>').appendTo('#container')
            .css('grid-column-start', 20).css('grid-column-end', 24).css('grid-row', 23)
            .attr('id', 'defenseStatusC').css('font-size', '15px');
        if (computer.defense === 1) {
            $('#defenseStatusC').text('Functioning');
        } else {
            $('#defenseStatusC').text('Click to repair').css('color', 'red');
        }
        let healthC = $('#healthC');
        let shieldC = $('#shieldC');
        let defenseStatusC = $('#defenseStatusC');
        let weaponStatusC = $('#weaponStatusC');


        // REPAIR FUNCTIONS
        $('#defenseStatusP').on('click', (event) => {
            // need to find a way to countdown before fixing
            player.defense = 2;
            playerTimeStopDef = ticker;
        });
        const elapsedTimeD = ticker - playerTimeStopDef;
        if (elapsedTimeD > 30) {
            player.defense = 1;
        }


        $('#weaponStatusP').on('click', (event) => {
            player.weapon = 2;
            playerTimeStopWea = ticker;
        })
        const elapsedTimeW = ticker - playerTimeStopWea;
        if (elapsedTimeW > 40) {
            player.weapon = 1;
        }

        $('#shieldStatusP').on('click', (event) => {
            if (player.shield === 0) {
                player.shield = 2;
                playerTimeStopShi = ticker;
            }
        })
        const elapsedTimeS = ticker - playerTimeStopShi;
        if (elapsedTimeS > 30) {
            player.sp = 100;
        }


        // start of game.
        weaponTriggerC();
        weaponTriggerP();
        // recursive function, outcomes
        var timeoutID;
        timeoutID = setTimeout(render, 100);
        if (computer.hp < 1 | player.hp < 1) {
            if (computer.hp > 0) {
                console.log('You lost...');
            } else if (player.hp > 0) {
                console.log('You won!!');
            }
            clearTimeout(timeoutID);
        }

    }

    render();
})

$();

