import {games} from "./store"
import { startLogger } from "./logger"
import { GameManageer } from "./store";

startLogger();

setInterval(() =>{
    games.push({
        id:Math.random().toString(),
        whitePlayerName:"Kiran",
        blackPlayerName:"Ravi",
        moves:[]
    })
},5000)