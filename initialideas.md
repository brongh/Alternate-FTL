Alternate FTL

Idea -> Two spaceships shooting at each other. One is controlled by player, the other by computer.
How to play -> 
	-version 1: Use your mouse to click on different rooms to repair them when you are hit (% chance to damage a room at random).
	
	*Weapons will fire automatically at enemy everytime cooldown is over or when its room is not damaged.
	
	*Shield will overload, requiring player to reactivate it (takes a few seconds to recharge).
	
	*Defense module will intercept enemy fire (% chance to intercept).
	Hull Status will indicate health of the ship. If it reaches zero. player loses.

	MAYBE*** --> can target fire a certain of the enemy ship, so that the player can take out a particular module of the enemy spaceship.

How computer plays ->
	-version 1: Computer will automatically repair its over modules. similar functions to player's spaceship.

How to begin making the game ->

1. Core functions
- Statements to indicate Hull Points (HP) and Shield Points (SP).
- Functions to fire weapon ---> timeset to hit target. Chance to hit/miss. timeset for cooldown to fire again.
- Functions to take damage ---> if shield on, reduce SP, else reduce HP ++ % chance to damage a random module. Damaged modules will stop functioning.
- Functions to repair different module (or rooms). Should take a few seconds to repair. Can only repair one room at a time. Modules will only function again once it is repaired. Cool down will go back to full. 
- Functions for Defense module --> % chance to intercept enemy fire. If damaged, will not intercept.
