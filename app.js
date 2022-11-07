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
//Global variable for the index of the alien ship array
let index =0;
//#region 
const ussShip = {
    hull : 20,
    firepower: 5,
    accuracy : .7,
    isAlive: true,
    
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
}
//#endregion

//#region 
let alienShipFact = new AlienShipFactory();
alienShipFact.makeNewShips();
alienShipFact.makeNewShips();
let btn = document.querySelector('.btn');
let btnAttack = document.querySelector('.btnAttack')
let modal = document.querySelector('.modal');
let span = document.querySelector('.close');//closes the modal
let msg = document.querySelector('#msg');
//these two are buttons from the modal
let retreatModal = document.querySelector('#retreatBtn');
let attackModal = document.querySelector('#attackBtn');

//#endregion

function updatePlayerStats (){
    document.querySelector('.playerStats').innerHTML=`Hull :${ussShip.hull}<br> FirePower : ${ussShip.firepower}<br> Accuracy : ${ussShip.accuracy}`;
}

function updateEnemyStats() {
       document.querySelector('.enemyStats').innerHTML=`Hull :${alienShipFact.shipCollection[index].hullPower} <br> FirePower : ${alienShipFact.shipCollection[index].firepower}<br> Accuracy :${alienShipFact.shipCollection[index].accuracy}`;
}

function attackAliens(){ 
     if(alienShipFact.shipCollection[index].hullPower>=1){
    if(Math.random()< ussShip.accuracy)
    {
        alienShipFact.shipCollection[index].hullPower -=  ussShip.firepower;
        updateEnemyStats();
        return  msg.innerHTML='You hit the emeny!';
        }
        else{
        return  msg.innerHTML='You missed! Prepare to get attack'
        }
    }
    else if(alienShipFact.shipCollection[index].hullPower<=0) {
        //checks if the current index of the array is less or equal to the last one
        if(alienShipFact.shipCollection.indexOf(alienShipFact.shipCollection[index])<alienShipFact.shipCollection.length-1){
            index++;
            updateEnemyStats();
            //here I show the buttons to either retreat or keep attacking
            retreatModal.style.display= 'inline';
            attackModal.style.display='inline';
            return  msg.innerHTML=`You destroyed one alien ship! there are ${alienShipFact.shipCollection.length-1} left`
            }
            else{
                modalBtns.style.display='none';
                return  msg.innerHTML='You destroyed all alien ship congrats! Please reload the page to play again'
           }
        }
}

function retreat(){
    retreatModal.style.display='none';
    attackModal.style.display='none';
    return`you have retreated, GAME OVER COWARD!`
}
function attackUssShip(){

        if(ussShip.hull>1){
           if(Math.random()< alienShipFact.shipCollection[index].accuracy){
                   ussShip.hull -= alienShipFact.shipCollection[index].firepower;
                   updatePlayerStats();
                   return 'You got hit!';
               
       }
       else{
           return 'Enemy missed! Attack now'
       }
   }
   else if(ussShip.hull<=0) {
       return 'Game over, aliens have taken over earth! :('
       }
}

//Shows initial stats
updatePlayerStats();
updateEnemyStats();
// When the user clicks on the button, open the modal
btn.addEventListener('click', function(){
    modal.style.display ='block';
});
// When the user clicks on <span> (x), close the modal
span.addEventListener('click', function(){
    modal.style.display= 'none';
    btnAttack.style.display='block';
    btn.style.display ='none';
    
});
//Attack button changest the stats and return a modal message
btnAttack.addEventListener('click', function(){
    if(btnAttack.innerHTML=='Attack'){
        modal.style.display ='block';
        btnAttack.innerHTML = 'Await Attack';
        //attacks the aliens
        attackAliens();
           
    }
    else if(btnAttack.innerHTML !=="Attack"){
       modal.style.display ='block';
       btnAttack.innerHTML = 'Attack';
       //attacks the ussShip
      return msg.innerHTML= attackUssShip();
    }
})

retreatModal.addEventListener('click', function(){
 
 return msg.innerHTML = retreat();
// })
// attackModal.addEventListener('click', function(){

// })