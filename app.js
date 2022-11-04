//#region 
class AlienShip {
    constructor(hull, firepower, accuracy){
        this.hullPower = hull;
        this.firepower= firepower;
        this.accuracy=accuracy;
        this.isAlive = true;
    }
}
//#endregion

//#region 
const ussShip = {
    hull : 20,
    firepower: 5,
    accuracy : .7,
    isAlive: true,
    attack(){
         
        if(Math.random()< ussShip.accuracy){
        alienShipFact.shipCollection[0].hullPower -=  ussShip.firepower;
        updateEnemyStats();
        return 'You hit the emeny!'+ alienShipFact.shipCollection[0].hullPower;
    }
    else{
        return 'You missed! Prepare to get attack'
    }
    
}
}
//#endregion
//#region 
class AlienShipFactory{
    constructor(){
        this.shipCollection=[];
    }
    makeNewShips(){
        const newShip = new AlienShip(this.calcHull(), this.calcFirepower(), this.calcAccuracy() )
        this.shipCollection.push(newShip);
    }
    calcHull(){
        this.hullPower = Math.floor(Math.random()*(15-10+1))+10;
        return this.hullPower;
    }
    calcFirepower(){
        this.firepower = Math.floor(Math.random()*(4-2+1))+2;
        return this.firepower;
    }
    calcAccuracy(){
        this.accuracy = eval((Math.random()*(0.8-0.6)+0.6).toFixed(1));
        return this.accuracy;
    }
    attack(){
         
            if(Math.random()< this.shipCollection[0].accuracy){
            ussShip.hull -=  this.firepower;
            updatePlayerStats();
            return 'You hit the emeny!';
        }
        else{
            return 'You missed! Prepare to get attack'
        }
        
    }
}
//#endregion

let alienShipFact = new AlienShipFactory();
alienShipFact.makeNewShips();


console.log(alienShipFact.attack())
console.log(ussShip.attack())


function updatePlayerStats (){
    document.querySelector('.playerStats').innerHTML=`Hull :${ussShip.hull}<br> FirePower : ${ussShip.firepower}<br> Accuracy : ${ussShip.accuracy}`;
}

function updateEnemyStats() {
       document.querySelector('.enemyStats').innerHTML=`Hull :${alienShipFact.shipCollection[0].hullPower} <br> FirePower : ${alienShipFact.shipCollection[0].firepower}<br> Accuracy :${alienShipFact.shipCollection[0].accuracy}`;
}

