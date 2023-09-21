import {Scene} from'phaser';
import * as fnc from '../game.js';
import {cfg} from '../game.js'
import { GameScene } from "../scenes/gameScene.js";

export class MenuScene extends Scene {
  constructor() {
    super('MenuScene')
  }
  init() {
    console.log('MenuScene was loading...')  
    //============== (((RESET DATA and restart GameScene))) =========
    cfg.global.currentPoints = 0 
    cfg.global.currentLevel = 1
    cfg.global.currentSpeed =-150
    setTimeout(() => this.scene.remove('GameScene', GameScene), 10)
    setTimeout(() => this.scene.add('GameScene', GameScene), 200) 
    //================================================================
  }

  preload() {
    //grid create for dev test
    //  fnc.createGridSystem(this)

    //------------------------------load AUDIO
    this.load.audio('btnClick', '/assets/sounds/effects/btnClick/click0.wav')
    this.load.audio('btnExitClick', '/assets/sounds/effects/btnClick/clickExit.wav')
   
    
    //-------------------------------load IMAGES

    //buttons Sprite
    this.load.spritesheet('allButtons', '/assets/images/buttons/longBtn.png', { frameWidth: 500, frameHeight: 194, })
    //---btnExit
    this.load.image('btnExit', '/assets/images/buttons/btnExit.png')
  
  }
 
  create() {
    //---------------- add background by black color
    this.cameras.main.setBackgroundColor('#000000')  


     //---------------------------------((((add AUDIO))))-----------------------------
    //---bg if music not play, start
    try {
       if (!this.sound.get('bgIntro').isPlaying) this.sound.get('bgIntro').play()
    } catch{}
   

    this.soundBtnClick = () => fnc.createAudio(this,'btnClick').play()
    this.soundBtnExitClick = () => fnc.createAudio(this, 'btnExitClick').play()
    
    //--------------------------------((((add TEXT))))------------------------------
    //---title
    const titleText = fnc.createText(this, 40,  cfg.height / 6, `Make\n\n      You\n\n         Choice...`, 28)
      .setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000)
    
    //---start game label
    const creditsText = fnc.createText(this, cfg.width / 7 + 10, cfg.height / 2 + 65, 'Press button to show credits', 16)
      // .setShadow(1, 1, "#FFA500", 1, true, true)
    
    const startGameText = fnc.createText(this, cfg.width / 7 + 20, cfg.height / 2 + 300, 'Press button to start game', 16)
       .setShadow(1, 1, "#000100", 1, true, true)
    

    //--------------------------------((((add IMAGES)))) --------------------------
    //---btn exit
    this.btnExit = this.add.image(cfg.width - 35, 37, 'btnExit').setScale(0.5)
   
    //-----------buttons from sprite
    //---btn credits
    this.btnCredits = this.add.sprite(cfg.width / 2 + 6, cfg.height / 2 + 20, 'allButtons', 0).setScale(0.4, 0.5)
    //-credits label
    fnc.createText(this, cfg.width / 2 - 60, cfg.height / 2, 'CREDITS', 24)

    //---btn start Play Game
    this.btnPlayGame = this.add.sprite(cfg.width / 2 - 10, cfg.height / 2 + 230, 'allButtons', 5).setScale(0.4, 0.5)
    //-play label
    fnc.createText(this, cfg.width / 2 - 40, cfg.height / 2 + 230, 'PLAY', 24)

    
    //---------------------------add interactive btn options
    Array.from([this.btnExit, this.btnCredits, this.btnPlayGame, ])
      .forEach((btn, index) => { btn.setInteractive({ cursor: 'pointer', index })
        .on('pointerover', () => btn.setTint(0xc0c0c0))
        .on('pointerout', () =>  btn.setTint(0xffffff)) 
        .on('pointerdown', () => {
          //  cfg.transitionBetweenScene('MenuScene') // translation between scene
          const currentScene = this.scene.scene;
          this.scene.stop(currentScene);

          if(index == 0) this.scene.start('IntroScene')
          if(index == 1) this.scene.start('CreditsScene')
          if(index == 2) this.scene.start('GameScene')
           // play sound btn click
          if (index == 0) this.soundBtnExitClick()
          else  this.soundBtnClick()

         }) 
       })



    //-------------------------------Tween Animations

    fnc.tweenAnimation.crateTextAnimationRightLeftMove(this, creditsText, cfg.width / 5, 1200, -1, 200)
    fnc.tweenAnimation.crateTextAnimationRightLeftMove(this, startGameText, cfg.width / 5, 600, 800, -1, 600)
   
    
  }

  update() {}

}