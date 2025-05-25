let gameseq = [];  // jaise-jaise game color flash krta hai(c1,c2,c3,c4), waise-waise gameseq me color aate rhega push hoke.. 
let userseq = [];

let h2 = document.querySelector("h2");

let btns = ["c1","c2","c3","c4"];              // from css..
// step 1:- 
let started = false;
let level = 0;
document.addEventListener("keypress",function(){
    if(started==false){
        console.log("game started");
        started = true;
        LevelUp();
    }
});

 function gameFlash(btn){
    btn.classList.add("gameflash");
    setTimeout(function(){
        btn.classList.remove("gameflash");
    },250);
 }
 function userflash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
 }

 // step 2:- 

function LevelUp(){
    userseq = [];    // jaise hi agle level pr aae to user seq khali ho gya bcz hme wapas se sara button dbana hoga..
    level++;
    h2.innerText = `Level ${level}`;
     
    // choose rand button which is going to flash..
    let randIdx = Math.floor(Math.random()*4);
    let randCol = btns[randIdx];
    let randBtn = document.querySelector(`.${randCol}`);       // Understand this line
     
    gameseq.push(randCol);
    // flash the random button....
    gameFlash(randBtn);
}

function checkAns(idx){
    // let idx = level-1;  // current level ki value hi size of gameseq and userseq array hoga..
    if(gameseq[idx]===userseq[idx]){
        if(userseq.length == gameseq.length){
          setTimeout(LevelUp,1000);// jaise hi LevelUp hoga waise hi game flash kraega ek nya button..
        }
    }
    else{
        h2.innerHTML = `Game over!! your score was ${level} <br>  Press any key to start`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },150);
        reset();
    }
}

function butnpress(){
        let btn = this;    // the button press by user.. 
        userflash(btn);

        usercolor = btn.getAttribute("id");
        userseq.push(usercolor);

        checkAns(userseq.length-1);
    }

// step 3:- 
 
    let allBtn = document.querySelectorAll(".btn");
    for(butn of allBtn){
        butn.addEventListener("click",butnpress);
    }

    
    function reset(){
        started = false;
        gameseq = [];
        userseq = [];
        level = 0;
    }
