// TODOs
// fix the final outcome from repeating
var ticker = 0;
var playerTimeStopDef = 0;
var playerTimeStopShi = 0;
var playerTimeStopWea = 0;
var overdriveTime = 0;
var playerLaserTicker = 0;
var computerLaserTicker = 0;
let clock = 0;

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

let computerRepairTime = 160;
let computerAtkSpd = 40;
const overDriveDuration = 150;
const playerRepairTimer = 40;
const playerAtkSpd = 30;

const computerStatsEz = () => {
    computer.damage = 20;
    computerRepairTime = 160;
    computerAtkSpd = 40;
}
const computerStatsMed = () => {
    computer.damage = 30;
    computerRepairTime = 140;
    computerAtkSpd = 35;
}
const computerStatsHard = () => {
    computer.damage = 45;
    computerRepairTime = 120;
    computerAtkSpd = 30;
}
$(() => {
    // =====================================controllers======================================
    $('#ez, #medium, #hard').on('click', () => {
        let target = $(event.target);
        $('#chooseDiff').hide();
        $('#left-container').css('display','flex');
        if (target.is('#ez')) {
            computerStatsEz();
        } else if (target.is('#medium')) {
            computerStatsMed();
        } else if (target.is('#hard')) {
            computerStatsHard();
        }
    })
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
        } else if (a === 1) {
            PorC.weapon = 0;
        } else if (a === 2) {
            PorC.defense = 0;
        }
    }
    // information log =========================================================================================
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
        }
    }
    const weaponTriggerP = () => {
        if (ticker % playerAtkSpd === 0) {
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
            } else {
                damageHP = randomModifier(computer.damage);
                player.hp -= damageHP;
                showRedBeam();
                const malIndex = malfunctionChance(shieldOffMalfunctionChance);
                const modIndex = moduleMalfunctionChance();
                if (malIndex === 0) {
                    whatToDamage(modIndex, player);
                }
            }
        }
    }
    const weaponTriggerC = () => {
        if (ticker % computerAtkSpd === 0) {
            if (computer.weapon === 1) {
                fireWeaponC();
            }
        }
    }
    // laser beams start from column 7 end 17
    const showGreenBeam = () => {
        $('#greenbeam').show();
        $('#comExplode').show();
        playerLaserTicker = ticker;
    }
    const hideGreenBeam = () => {
        $('#greenbeam').hide();
        $('#comExplode').hide();
    }
    const showRedBeam = () => {
        $('#redbeam').show();
        $('#playExplode').show();
        computerLaserTicker = ticker;
    }
    const hideRedBeam = () => {
        $('#redbeam').hide();
        $('#playExplode').hide();
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
    // laser and explosion effects
    $('#comExplode').hide();
    $('#greenbeam').hide();
    $('#playExplode').hide();
    $('#redbeam').hide();
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
        // game clock
        $('<div>').appendTo($('#container')).css('grid-column-start', 13).css('grid-column-end', 15)
            .css('grid-row', 1).css('background', 'black').css('color', 'white').text(clock);
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

        //status update
        const statusFuncP = (a, b) => {
            if (a === 1) {
                $(b).text('Functioning').css('color', 'green');
            } else if (a === 2) {
                $(b).text('Repairing').css('color', 'yellow');
            } else {
                $(b).text('Click to repair').css('color', 'red');
            }
        }
        statusFuncP(player.shield, '#shieldStatusP');
        statusFuncP(player.weapon, '#weaponStatusP');
        statusFuncP(player.defense, '#defenseStatusP');
        $('#playerDamageStats').text(player.damage);

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
        $('#computerDamageStats').text(computer.damage);
        // REPAIR FUNCTIONS  --- PLAYER ==========================
        $('#defenseStatusP').on('click', (event) => {
            // need to find a way to countdown before fixing
            player.defense = 2;
            playerTimeStopDef = ticker;
        });
        const elapsedTimeD = ticker - playerTimeStopDef;
        if (elapsedTimeD > playerRepairTimer && playerTimeStopDef !== 0) {
            player.defense = 1;
            playerTimeStopDef = 0;
        }


        $('#weaponStatusP').on('click', (event) => {
            player.weapon = 2;
            playerTimeStopWea = ticker;

        })
        const elapsedTimeW = ticker - playerTimeStopWea;
        if (elapsedTimeW > playerRepairTimer && playerTimeStopWea !== 0) {
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
        if (elapsedTimeS > playerRepairTimer && playerTimeStopShi !== 0) {
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
        const $clock = () => {
            clock += 1;
        }
        if (ticker % 30 === 0) {
            $clock();
        }
        // start of game.
        weaponTriggerC();
        weaponTriggerP();
        // recursive function, outcomes
        var timeoutID;
        timeoutID = setTimeout(render, 33.33);
        if (computer.hp < 1 | player.hp < 1) {
            if (computer.hp < 1 | player.hp < 1) {
                if (computer.hp > 0) {
                    alert('You lost');
                    $end();
                } else if (player.hp > 0) {
                    alert('You won');
                    $end();
                }
            }
            clearTimeout(timeoutID);
        }
    }
    const $end = () => {
        $('#reload').css('visibility','visible');
        $('#endgame').css('visibility','visible');
    }
    $('#startGame').on('click', render);
    $('#reload').on('click', () => {
        location.reload();
    })

})

$();