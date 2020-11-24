// TODOs
// fix the final outcome from repeating
var ticker = 0;
var playerTimeStopDef = 0;
var playerTimeStopShi = 0;
var playerTimeStopWea = 0;
var overdriveTime = 0;
// =====================================controllers======================================

// random module damage =================================================================
const shieldOnMalfunctionChance = 5;
const shieldOffMalfunctionChance = 2;
module = ['sp', 'shield', 'defense'];
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
const whatToDamage = (a, PorC) => {
    if (a === 0) {
        PorC.sp = 0;
        console.log('0');
    } else if (a === 1) {
        PorC.weapon = 0;
        console.log('1');
    } else if (a === 2) {
        PorC.defense = 0;
        console.log('2');
    }
}

// ==================================STATS==========================================
// weapon/defense --> 1 = working, 0 = not working.
const player = {
    'hp': 100,
    'sp': 100,
    'shield': 1,
    'weapon': 1,
    'defense': 1,
    'damage': 20
}
const computer = {
    'hp': 100,
    'sp': 100,
    'shield': 1,
    'weapon': 1,
    'defense': 1,
    'damage': 20
}
// information log =========================================================================================
const msg = $('<div>').appendTo($('#botConsole')).attr('class', 'scrolltext');
const damageInflicted = (a) => {
    msg.text('You inflicted ' + a + 'damage');
}
const atkMissed = () => {
    msg.text('Your attack missed');
}
// ======================== PLAYER =================================================
// higher defenseRating --> harder to hit. value 1 == 100% hit rate.
const defenseRatingP = 3;
const fireWeaponP = () => {
    if (defenseModC() === 0) {
        if (computer.sp > 0) {
            PdamageSP = randomModifier(player.damage)
            computer.sp -= PdamageSP;
            damageInflicted(PdamageSP);
            const malIndex = malfunctionChance(shieldOnMalfunctionChance);
            const modIndex = moduleMalfunctionChance();
            if (malIndex === 0) {
                whatToDamage(modIndex, computer);
            }
        } else {
            PdamageHP = randomModifier(player.damage);
            computer.hp -= PdamageHP;
            damageInflicted(PdamageSP);
            const malIndex = malfunctionChance(shieldOffMalfunctionChance);
            const modIndex = moduleMalfunctionChance();
            if (malIndex === 0) {
                whatToDamage(modIndex, computer);
            }

        }
    } else {
        atkMissed();
        console.log('Attack missed');
        console.log(computer);
    }
}
const weaponTriggerP = () => {
    if (ticker % 25 === 0) {
        if (player.weapon === 1) {
            fireWeaponP();
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

// higher defenseRating --> harder to hit. value 1 == 100% hit rate.
const defenseRatingC = 3;
const fireWeaponC = () => {
    if (defenseModP() === 0) {
        if (player.sp > 0) {
            damageSP = randomModifier(computer.damage);
            player.sp -= damageSP;
            const malIndex = malfunctionChance(shieldOnMalfunctionChance);
            const modIndex = moduleMalfunctionChance();
            if (malIndex === 0) {
                whatToDamage(modIndex, player);
            }
            console.log(player);
        } else {
            damageHP = randomModifier(computer.damage);
            player.hp -= damageHP;
            const malIndex = malfunctionChance(shieldOffMalfunctionChance);
            const modIndex = moduleMalfunctionChance();
            if (malIndex === 0) {
                whatToDamage(modIndex, player);
            }
            console.log(player);
        }
    } else {
        console.log("Computer's attack intercepted!");
        console.log(player);
    }
}
const weaponTriggerC = () => {
    if (ticker % 30 === 0) {
        if (computer.weapon === 1) {
            fireWeaponC();
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
    // special abilities buttons
    $('#overdrive').on('click', () => {
        overdriveTime = ticker;
        player.damage += 40;
        $('#overdrive').hide();
        console.log(player.damage);
    })
    $('#sabotage').on('click', () => {
        const modIndex = moduleMalfunctionChance();
        whatToDamage(modIndex, computer);
        $('#sabotage').hide();
    })
    $('#shieldRecharge').on('click', () => {
        player.sp = 100;
        $('#shieldRecharge').hide();
    })
    $('#refresh').on('click', () => {
        $('.abilities').show();
        $('#refresh').hide();
    })
    

    const staticRender = () => {
        // STATIC RENDER ========================================================================================
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
        const statusC = Object.keys(computer);
        for (let i = 0; i < statusC.length; i++) {
            const items = 19 + i;
            $('#x18y' + items).text(statusC[i]).css('border', '1px solid black');
        }
    }

    staticRender();


    // DYNAMIC RENDER =====================================================================
    const render = () => {
        ticker += 1; // global time ticker

        /* const statusValueP = Object.values(player);
        for (let i = 0; i < statusValueP.length; i++) {
            const items = 19 + i;
            $('#x3y' + items).text(statusValueP[i]).css('border', '1px solid black');
        } */
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
        $('<div>').appendTo('#container')
            .css('grid-column-start', 4).css('grid-column-end', 8).css('grid-row', 24)
            .text(player.damage);

        // shield status
        if (player.sp > 0) {
            player.shield = 1;
        } else if (player.sp < 1 && player.shield !== 2) {
            player.shield = 0;
        }


        // status bars for computer ==========================================================

        /* const statusValueC = Object.values(computer);
        for (let i = 0; i < statusValueC.length; i++) {
            const items = 19 + i;
            $('#x19y' + items).text(statusValueC[i]).css('border', '1px solid black');
        } */
        // hp bar
        for (let x = 20; x < 25; x++) {
            $('#x' + x + 'y19').remove();
        }
        // sp bar
        for (let x = 20; x < 25; x++) {
            $('#x' + x + 'y20').remove();
        }
        // shield status
        if (computer.sp > 0) {
            computer.shield = 1;
        } else if (computer.sp < 1 && computer.shield !== 2) {
            computer.shield = 0;
        }
        $('<div>').appendTo('#container')
            .css('grid-column-start', 20).css('grid-column-end', 24).css('grid-row', 21)
            .attr('id', 'shieldStatusC').css('font-size', '15px');

        // weapon bar
        for (let x = 20; x < 25; x++) {
            $('#x' + x + 'y21').remove();
        }
        $('<div>').appendTo('#container')
            .css('grid-column-start', 20).css('grid-column-end', 24).css('grid-row', 22)
            .attr('id', 'weaponStatusC').css('font-size', '15px');

        //defense bar
        for (let x = 20; x < 25; x++) {
            $('#x' + x + 'y22').remove();
        }
        $('<div>').appendTo('#container')
            .css('grid-column-start', 20).css('grid-column-end', 24).css('grid-row', 23)
            .attr('id', 'defenseStatusC').css('font-size', '15px');
        $('<progress>').appendTo('#container')
            .css('grid-column-start', 20).css('grid-column-end', 24).css('grid-row', 19)
            .attr('value', computer.hp).attr('max', 100).attr('id', 'healthC');
        $('<progress>').appendTo('#container')
            .css('grid-column-start', 20).css('grid-column-end', 24).css('grid-row', 20)
            .attr('value', computer.sp).attr('max', 100).attr('id', 'shieldC');
        if (computer.shield === 1) {
            $('#shieldStatusC').text('Functioning').css('color', 'green');
        } else {
            $('#shieldStatusC').text('Repairing').css('color', 'red');
        }
        if (computer.weapon === 1) {
            $('#weaponStatusC').text('Functioning').css('color', 'green');
        } else {
            $('#weaponStatusC').text('Repairing').css('color', 'red');
        }
        if (computer.defense === 1) {
            $('#defenseStatusC').text('Functioning').css('color', 'green');
        } else {
            $('#defenseStatusC').text('Repairing').css('color', 'red');
        }
        $('<div>').appendTo('#container')
            .css('grid-column-start', 20).css('grid-column-end', 24).css('grid-row', 24)
            .text(computer.damage);

        // REPAIR FUNCTIONS  --- PLAYER ==========================
        $('#defenseStatusP').on('click', (event) => {
            // need to find a way to countdown before fixing
            player.defense = 2;
            playerTimeStopDef = ticker;
        });
        const elapsedTimeD = ticker - playerTimeStopDef;
        if (elapsedTimeD > 20 && playerTimeStopDef !== 0) {
            player.defense = 1;
            playerTimeStopDef = 0;
        }


        $('#weaponStatusP').on('click', (event) => {
            player.weapon = 2;
            playerTimeStopWea = ticker;

        })
        const elapsedTimeW = ticker - playerTimeStopWea;
        if (elapsedTimeW > 30 && playerTimeStopWea !== 0) {
            player.weapon = 1;
            playerTimerStopWea = 0;
        }

        $('#shieldStatusP').on('click', (event) => {
            if (player.shield === 0) {
                player.shield = 2;
                playerTimeStopShi = ticker;
            }
        })
        const elapsedTimeS = ticker - playerTimeStopShi;
        if (elapsedTimeS > 20 && playerTimeStopShi !== 0) {
            player.sp = 50;
            playerTimeStopShi = 0;

        }
        // REPAIR FUNCTIONS -- COMPUTER ==============================
        if (computer.weapon === 0 && ticker % 80 === 0) {
            computer.weapon = 1;
        }
        if (computer.defense === 0 && ticker % 80 === 0) {
            computer.defense = 1;
        }
        if (computer.sp < 1 && ticker % 65 === 0) {
            computer.sp = 50;
        }

        // pause

        $('#pauseGame').on('click', () => {
            clearTimeout(timeoutID);
        })

        // Overdrive timer
        const elapsedOverDrive = ticker - overdriveTime;
        if (overdriveTime !== 0 && elapsedOverDrive === 100) {
            player.damage = 15;
            overdriveTime = 0;
        }




        // start of game.


        weaponTriggerC();
        weaponTriggerP();
        // recursive function, outcomes
        var timeoutID;
        timeoutID = setTimeout(render, 30);
        if (computer.hp < 1 | player.hp < 1) {
            if (computer.hp > 0) {
                player.hp = 0;
                console.log('You lost...');
            } else if (player.hp > 0) {
                computer.hp = 0;
                console.log('You won!!');
            }
            clearTimeout(timeoutID);
        }

    }
    $('#startGame').on('click', render);
})



$();