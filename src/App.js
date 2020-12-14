import React, {Component} from 'react';
import './App.css';
import Player from './game/character';
import Obstacle from './game/obstacle';
import score from './img/unnamed.png';
import speed from './img/speed.png';
import life from './img/heart.png';
import Gameover from './game/gameover';
import Start from './game/start';
import RightSprite from './img/sprite.png';
import LeftSprite from './img/sprite2.png';
import Stand from './img/player-stand.png';
import Stand2 from './img/player-stand2.png';
import Score from './game/score';
const getRandomPosition = (e)=>{
  let leftrandom=Math.floor((Math.random() * 41)+1);
  let left=leftrandom*20;
  return left;
}

class App extends Component{
   state={
    //playerPos: getRandomPosition(),
    playerScore: 0,
    playerSpeed:10,
    playerLife: 5,
    playerTop: 260,
    playerLeft: 0,
    direction: "RIGHT",
    animatePos: 0,
    obstacleTop: -100,
    obstacleLeft: 80,
    gameOver: false,
    gameStop: 20,
    gameoverDisplay:"none",
    DisplayAll: 0,
    Screen: "",
    animation: "pause",
    img:Stand,
    StartD: 100,
    ScoreDisplay: 100,
    Scoreindex: 50
  }
  componentDidMount(){
    
      setInterval(this.componentScore, this.state.playerSpeed);
      setInterval(this.componentFallingObstacle, this.state.playerSpeed);
      setInterval(this.checkCollide, 1);
      setInterval(this.componentSpeed, this.state.playerSpeed);
      document.onkeydown=this.onKeyDown;
      setInterval(this.componentAnimation,100);
  }
  checkCollide=(e)=>{
    let topObstacle=this.state.obstacleTop;
    let leftObstacle=this.state.obstacleLeft;
    let leftPlayer=this.state.playerLeft;
    let tmpleft1=leftObstacle-20;
    let tmpleft2=leftObstacle-40;
    let tmpleft3=leftObstacle-60;
    let tmpright1=leftObstacle+20;
    let tmpright2=leftObstacle+40;
    let tmpright3=leftObstacle+60;
    let random;
    let HP=this.state.playerLife;
    if((topObstacle>=165)&&((tmpright1==leftPlayer)||(tmpright2==leftPlayer)||(tmpright3==leftPlayer)||(tmpleft1==leftPlayer)||(tmpleft2==leftPlayer)||(tmpleft3==leftPlayer)||(leftObstacle==leftPlayer))){
      random=getRandomPosition();
      this.setState({obstacleLeft: random});
      this.setState({obstacleTop: -100});
      HP-=1;
      if(HP<=0){
        this.setState({gameOver: true});
        this.setState({gameoverDisplay: ""});
        this.setState({DisplayAll: 0});
        //console.log("GAMEOVER: "+this.state.gameOver);
      } 
      this.setState({playerLife: HP});
    }
  }
  componentFallingObstacle=(e)=>{
    let top=this.state.obstacleTop;
    let random;
    top+=5;
    if(top>=240){
      top=-100;
      random=getRandomPosition();
      this.setState({obstacleLeft: random});
    }
    this.setState({obstacleTop: top});
  }
  componentScore=(e)=>{
    let timer=this.state.playerScore;
    if(this.state.gameOver!=true){
      timer+=1;
      this.setState({playerScore: timer});
    }
  }
  componentstopAnimate=(e)=>{ 
    this.setState({animation:"pause"});
    if(this.state.direction=="RIGHT"){
      this.setState({animatePos:0});
    }else{
      this.setState({animatePos:-640});
    }
  }
  
  componentAnimation=(e)=>{
    let currentTop=this.state.playerTop;
    let currentLeft=this.state.playerLeft;
    let position=this.state.animatePos;
    let animation=this.state.animation;
    let direction=this.state.direction;
    if((animation==="play")&&(direction==="RIGHT")){
      currentLeft+=20;
      if(currentLeft>=740){
        currentLeft=740;
        this.setState({direction: "LEFT"});
        this.setState({img: LeftSprite});
      }
      this.setState({playerLeft:currentLeft});
      switch(position){
        case 0:
            position-=80;
            break;
        case -80:
            position-=80;
            break;
        case -160:
            position-=80;
            break;
        case -240:
            position-=80;
            break;
        case -320:
            position-=80;
            break;
        case -400:
            position-=80;
            break;
        case -480:
            position-=80;
            break;
        case -560:
            position=0;
            break;
        default:
            position=0;
      }
    }
    if((animation==="play")&&(direction==="LEFT")){
      currentLeft-=20;
      if(currentLeft<=0){
        currentLeft=0;
        this.setState({direction: "RIGHT"});
        this.setState({img: RightSprite});
      }
      this.setState({playerLeft:currentLeft});
      //console.log(position);
      switch(position){
        case -560:
            position+=80;
            break;
        case -480:
            position+=80;
            break;
        case -400:
            position+=80;
            break;
        case -320:
            position+=80;
            break;
        case -240:
            position+=80;
            break;
        case -160:
            position+=80;
            break;
        case -80:
            position+=80;
            break;
        case 0:
            position=-560;
        default:
            position=-560;
      }
    }
    this.setState({animatePos: position});
  }
  onKeyDown = (e) =>{
    let currentTop=this.state.playerTop;
    let currentLeft=this.state.playerLeft;
    switch (e.keyCode) {
      case 37:
        this.setState({animation:"play"});
        this.setState({direction: 'LEFT'});
        this.setState({img: LeftSprite});
        
        break;
      case 39:
        this.setState({animation:"play"});
        this.setState({direction: 'RIGHT'});  
        this.setState({img: RightSprite});
        break;
      default:
        this.setState({animation:"pause "});
        if(this.state.direction=="LEFT"){
          this.setState({img: Stand2});
          this.setState({animatePos:0});
          this.componentAnimation();
        }else if(this.state.direction=="RIGHT"){
          this.setState({animatePos:0});
          this.setState({img: Stand});
          this.componentAnimation();
        }
    }
  }
  gameRestart = (e) =>{
    this.setState({gameoverDisplay: "none"});
    this.setState({playerScore: 0});
    this.setState({playerSpeed: 10});
    this.setState({playerLife: 5});
    this.setState({animate: 0});
    this.setState({obstacleTop: -100});
    this.setState({gameOver: false});
    this.setState({DisplayAll: 100});
    this.setState({playerLeft: 0});
    this.setState({ScoreDisplay:0});
  }
  gameStart = (e) =>{
    this.setState({gameoverDisplay: "none"});
    this.setState({playerScore: 0});
    this.setState({playerSpeed: 10});
    this.setState({playerLife: 5});
    this.setState({animate: 0});
    this.setState({obstacleTop: -100});
    this.setState({gameOver: false});
    this.setState({DisplayAll: 100});
    this.setState({playerLeft: 0});
    this.setState({StartD: 0});
    this.setState({ScoreDisplay:0});
  }
  gameScore = (e) =>{
    this.setState({gameoverDisplay: "none"});
    this.setState({DisplayAll: 0});
    this.setState({StartD: 0});
    this.setState({ScoreDisplay: 100});
    //console.log("paalaman");
  }
  Goback = (e) =>{
    this.setState({DisplayAll: 0});
    this.setState({playerLeft: 0});
    this.setState({StartD: 100});
    this.setState({ScoreDisplay:0});
  }
  render(){
    return(
      <div className="screen">
        <div className="game_info" style={{opacity: this.state.DisplayAll}}>
          <ul>
            <li><img className="score" src={score} alt="Player"/> {this.state.playerScore}</li>
            <li><img className="speed" src={speed} alt="Player"/> {this.state.playerSpeed} ms</li>
            <li><img className="life" src={life} alt="Player"/> {this.state.playerLife}</li>
          </ul>
        </div>
        <div className="game_screen" >
          <Player img={this.state.img} top={this.state.playerTop} left={this.state.playerLeft} animate={this.state.animatePos} visible={this.state.DisplayAll} animation={this.state.animation} />
          <Start gameStart={this.gameStart} visible={this.state.StartD} gameScore={this.gameScore} />
          <Score visible={this.state.ScoreDisplay} Goback={this.Goback}/>
          <Gameover game={this.state.gameoverDisplay} gameRestart={this.gameRestart} score={this.state.playerScore} speed={this.state.playerSpeed} gameScore={this.gameScore} />
          <Obstacle top={this.state.obstacleTop} left={this.state.obstacleLeft} visible={this.state.DisplayAll} />
        </div>
      </div>
    );
  }
}

export default App;
