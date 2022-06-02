![gif](https://c.tenor.com/v1Aa0wigtKQAAAAd/boxhead.gif)

# Boxhead

A remake of the flashgame Boxhead, made with pixi.js & typescript.

# Installation

clone the repository and install the dependencies and run one of the commands available.
```
npm install && npm run
```

# Changelog

-   [#1 - Add a link to each pull request with a descriptive line.](#1)

# Code Review

1. `README.md` - Add information what the game is about.
2. `README.md` - Add instructions on how to play it and which keys to use.
3. `Bump.js` - Unused code, nice with a lot of describing comments though!
4. `Zombies.ts:2` - \* from Pixi. Perhaps better to import what you are using.
5. `Spots.ts:16` - Neighbors is misspelled, should be neighbours.
6. `Spots.ts:11-13` - Variables f, g, h is maybe not named in the best possible way.
7. `Player.ts 51-81` - Repetitive code, perhaps the content of the if-statements could be made to a function.
8. `Enemies/Skeleton` - Perhaps better named Zombie as in the other files.
9. `Game.ts:61` - A variable called "dt", perhaps it could have a more descriptive name.
10. `LICENSE` - Dont't forget to add a license to your project!
11. `BOXHEAD` - Nice work with this game, very fun to play!

# Testers

Tested by the following people:

1. Patrik
2. Chris
3. Simon
4. Theo

Tested by the following muggles (non-coders):

1,2,3,4. ...Neos familj
5. Kompisar
