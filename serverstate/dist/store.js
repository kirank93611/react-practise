"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.games = exports.GameManageer = void 0;
class GameManageer {
    constructor() {
        this.games = [];
    }
    addGame(game) {
        this.games.push(game);
    }
    getGames() {
        return this.games;
    }
    addMove(gameId, move) {
        const game = this.games.find(game => game.id === gameId);
        if (game) {
            game.moves.push(move);
        }
    }
    logState() {
        console.log(this.games);
    }
}
exports.GameManageer = GameManageer;
exports.games = [];
