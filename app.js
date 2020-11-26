// TODOs
// fix the final outcome from repeating
var ticker = 0;
var playerTimeStopDef = 0;
var playerTimeStopShi = 0;
var playerTimeStopWea = 0;
var overdriveTime = 0;
var playerLaserTicker = 0;
var computerLaserTicker = 0;

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

const computerRepairTime = 200;
const overDriveDuration = 120;
$(() => {
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
    // information log =========================================================================================
    //const msg = $('<p>').appendTo($('#botConsole')).attr('class', 'scrolltext');
    const textS = $('<p>').attr('class', 'scrolltext');
    const damageInflicted = (a) => {
        const msg = textS.text('You inflicted ' + a + 'damage');
        $('#botConsole').prepend(msg);
    }
    const atkMissed = () => {
        const msg = textS.text('Your attack missed');
        $('#botConsole').prepend(msg);
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
    // ======================== PLAYER =================================================
    // higher defenseRating --> harder to hit. value 1 == 100% hit rate.
    const defenseRatingP = 3;
    const fireWeaponP = () => {
        if (defenseModC() === 0) {
            if (computer.sp > 0) {
                PdamageSP = randomModifier(player.damage)
                computer.sp -= PdamageSP;
                showGreenBeam();
                damageInflicted(PdamageSP);
                const malIndex = malfunctionChance(shieldOnMalfunctionChance);
                const modIndex = moduleMalfunctionChance();
                if (malIndex === 0) {
                    whatToDamage(modIndex, computer);
                }
            } else {
                PdamageHP = randomModifier(player.damage);
                computer.hp -= PdamageHP;
                showGreenBeam();
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
                showRedBeam();
                const malIndex = malfunctionChance(shieldOnMalfunctionChance);
                const modIndex = moduleMalfunctionChance();
                if (malIndex === 0) {
                    whatToDamage(modIndex, player);
                }
                console.log(player);
            } else {
                damageHP = randomModifier(computer.damage);
                player.hp -= damageHP;
                showRedBeam();
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
    // laser beams start from column 7 end 17
    const showGreenBeam = () => {
        $('#greenbeam').show();
        playerLaserTicker = ticker;
    }
    const hideGreenBeam = () => {
        $('#greenbeam').hide();
    }
    const showRedBeam = () => {
        $('#redbeam').show();
        computerLaserTicker = ticker;
    }
    const hideRedBeam = () => {
        $('#redbeam').hide();
    }
    // special abilities buttons
    $('#overdrive').on('click', () => {
        overdriveTime = ticker;
        player.damage += 40;
        $('#overdrive').hide();
        $('#overdrive1').hide();
    })
    $('#sabotage').on('click', () => {
        const modIndex = moduleMalfunctionChance();
        whatToDamage(modIndex, computer);
        $('#sabotage').hide();
        $('#sabotage1').hide();
    })
    $('#shieldRecharge').on('click', () => {
        player.sp = 100;
        $('#shieldRecharge').hide();
        $('#shieldRecharge1').hide();
    })
    $('#refresh').on('click', () => {
        $('.abilities').show();
        $('#refresh').hide();
        $('#refresh1').hide();
    })
    // ===================================================================================================
    // STATIC RENDER ========================================================================================
    $('<div>').text('PLAYER').css('font-size', '30px').css('color', 'green').css('font-weight', 'bold')
        .css('grid-column-start', 1).css('grid-column-end', 4).css('grid-row-start', 1)
        .css('grid-row-end', 2).appendTo('#container').css('font-family', 'Orbitron')
    // laser and explosion effects
    $('<img>').attr('src', 'img/explosion0.png')
        .css('width', '50px').css('height', '50px')
        .css('position', 'absolute').css('right', '35%').appendTo($('#greenbeam'));
    $('<img>').attr('src', 'img/littlegreenbeam.png')
        .css('width', '600px').css('height', '20px').appendTo($('#greenbeam'));
    $('#greenbeam').appendTo('#container').css('grid-column-start', 7)
        .css('grid-column-end', 13).css('grid-row', 5).hide();
    $('<img>').attr('src', 'img/explosion0.png')
        .css('width', '50px').css('height', '50px')
        .css('position', 'absolute').css('left', '32%').appendTo($('#redbeam'));
    $('<img>').attr('src', 'img/littleredbeam.png')
        .css('width', '600px').css('height', '20px').appendTo($('#redbeam'));
    $('#redbeam').appendTo('#container').css('grid-column-start', 3)
        .css('grid-column-end', 10).css('grid-row', 9).hide();
    // =====================================================================================================
    // separator for spaceships and status
    /* for (let x = 1; x < 26; x++) {
        $('#x' + x + 'y17').css('background', 'black').text('');
    } */
    // hp sp bar for player ================================================================

    const statusP = Object.keys(player);
    for (let i = 0; i < statusP.length; i++) {
        const items = 19 + i;
        $('<div>').text(statusP[i]).css('border', '1px solid black')
            .css('grid-column', 3).css('grid-row', items)
            .attr('class', 'statusNames').appendTo('#container');
    }
    const statusC = Object.keys(computer);
    for (let i = 0; i < statusC.length; i++) {
        const items = 19 + i;
        $('<div>').text(statusC[i]).css('border', '1px solid black')
            .css('grid-column', 19).css('grid-row', items)
            .attr('class', 'statusNames').appendTo('#container');
    }
    //====================================================================================
    // DYNAMIC RENDER =====================================================================
    const render = () => {
        ticker += 1; // global time ticker
        // player laser
        const elapsedTimeLaserP = ticker - playerLaserTicker;
        if (elapsedTimeLaserP > 10 && playerLaserTicker !== 0) {
            hideGreenBeam();
        }
        const elapsedTimeLaserC = ticker - computerLaserTicker;
        if (elapsedTimeLaserC > 10 && computerLaserTicker !== 0) {
            hideRedBeam();
        }
        // hp bar
        $('<progress>').appendTo('#container')
            .css('grid-column-start', 4).css('grid-column-end', 8).css('grid-row', 19)
            .attr('value', player.hp).attr('max', 100).attr('id', 'healthP');
        // sp bar
        $('<progress>').appendTo('#container')
            .css('grid-column-start', 4).css('grid-column-end', 8).css('grid-row', 20)
            .attr('value', player.sp).attr('max', 100).attr('id', 'shieldP');
        if (player.sp < 1) {
            $('<div>').appendTo('#container')
                .css('grid-column-start',)
        }
        $('<div>').appendTo('#container')
            .css('grid-column-start', 4).css('grid-column-end', 8).css('grid-row', 21)
            .attr('id', 'shieldStatusP').css('font-size', '18px');
        
        // weapon bar
        $('<div>').appendTo('#container')
            .css('grid-column-start', 4).css('grid-column-end', 8).css('grid-row', 22)
            .attr('id', 'weaponStatusP').css('font-size', '18px');
        //defense bar
        $('<div>').appendTo('#container')
            .css('grid-column-start', 4).css('grid-column-end', 8).css('grid-row', 23)
            .attr('id', 'defenseStatusP').css('font-size', '18px');
        //status update
        const statusFuncP = (a, b) => {
            if (a === 1) {
                $(b).text('Functioning').css('color', 'green');
            } else if (player.shield === 2) {
                $(b).text('Repairing').css('color', 'yellow');
            } else {
                $(b).text('Click to repair').css('color', 'red');
            }
        }
        statusFuncP(player.shield,  '#shieldStatusP');
        statusFuncP(player.weapon, '#weaponStatusP');
        statusFuncP(player.defense, '#defenseStatusP');
        $('<div>').appendTo('#container')
            .css('grid-column-start', 4).css('grid-column-end', 8).css('grid-row', 24)
            .text('').css('font-size', '18px').attr('id', 'playerDamageStats');
        $('#playerDamageStats').text(player.damage);
        // shield status
        /* if (player.sp > 0) {
            player.shield = 1;
        } else if (player.sp < 1 && player.shield !== 2) {
            player.shield = 0;
        } */
        const shieldCheck = (a) => {
            if (a.sp > 0) {
                a.shield = 1;
            } else if (a.sp < 1 && a.shield !== 2) {
                a.shield = 0;
            }
        }
        shieldCheck(player);

        // status bars for computer ==========================================================

        // shield status
        shieldCheck(computer);
        $('<div>').appendTo('#container')
            .css('grid-column-start', 20).css('grid-column-end', 24).css('grid-row', 21)
            .attr('id', 'shieldStatusC').css('font-size', '18px');

        // weapon bar
        $('<div>').appendTo('#container')
            .css('grid-column-start', 20).css('grid-column-end', 24).css('grid-row', 22)
            .attr('id', 'weaponStatusC').css('font-size', '18px');

        //defense bar
        $('<div>').appendTo('#container')
            .css('grid-column-start', 20).css('grid-column-end', 24).css('grid-row', 23)
            .attr('id', 'defenseStatusC').css('font-size', '18px');
        $('<progress>').appendTo('#container')
            .css('grid-column-start', 20).css('grid-column-end', 24).css('grid-row', 19)
            .attr('value', computer.hp).attr('max', 100).attr('id', 'healthC');
        $('<progress>').appendTo('#container')
            .css('grid-column-start', 20).css('grid-column-end', 24).css('grid-row', 20)
            .attr('value', computer.sp).attr('max', 100).attr('id', 'shieldC');
        const statusFunc = (a, b) => {
            if (a === 1) {
                $(b).text('Functioning').css('color', 'green');
            } else {
                $(b).text('Repairing').css('color', 'red');
            }
        }
        statusFunc(computer.shield, $('#shieldStatusC'));
        statusFunc(computer.weapon, $('#weaponStatusC'));
        statusFunc(computer.defense, $('#defenseStatusC'));

        $('<div>').appendTo('#container')
            .css('grid-column-start', 20).css('grid-column-end', 24).css('grid-row', 24)
            .text(computer.damage).css('font-size', '18px');

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
        if (computer.weapon === 0 && ticker % computerRepairTime === 0) {
            computer.weapon = 1;
        }
        if (computer.defense === 0 && ticker % computerRepairTime === 0) {
            computer.defense = 1;
        }
        if (computer.sp < 1 && ticker % computerRepairTime === 0) {
            computer.sp = 50;
        }

        // pause

        $('#pauseGame').on('click', () => {
            clearTimeout(timeoutID);
        })

        // Overdrive timer
        const elapsedOverDrive = ticker - overdriveTime;
        if (overdriveTime !== 0 && elapsedOverDrive === overDriveDuration) {
            player.damage = 15;
            overdriveTime = 0;
        }

        // not working




        // start of game.


        weaponTriggerC();
        weaponTriggerP();
        // recursive function, outcomes
        var timeoutID;
        timeoutID = setTimeout(render, 30);
        if (computer.hp < 1 | player.hp < 1) {
            if (computer.hp < 1 | player.hp < 1) {
                if (computer.hp > 0) {
                    alert('You lost');
                } else if (player.hp > 0) {
                    alert('You won');
                }
            }
            clearTimeout(timeoutID);
        }
    }



    $('#startGame').on('click', render);

})



$();