import {Scene} from'phaser';
import * as fnc from '../game.js';
import { cfg } from '../game.js'


let loadingSceneStarted = false; 
export class IntroScene extends Scene {
  constructor() {
    super('IntroScene')
  }

  init() {
    console.log('IntroScene was loading...')  
  }

  preload() {
    //============================(((LOAD GLOBAL DATA)))================================

    //============ LOAD JSON VARIABLE DATA TO STORE FOR GLOBAL USE ALL SCENES ==========
    //--- LOAD AUDIO FORM JSON  multi files data and Extract the enName and sound path
   
    //===========================END LOAD JSON==========================
    //-------------load global image
    //---fly 3 images
    // this.multiImagesFly = fnc.loadMultiImages(this, 'fly', '../assets/images/fly/', 3) // ['fly1', 'path/img/fly1']
    // cfg.global.globalImages = [this.multiImagesFly]
    
     //============================(((END LOAD GLOBAL DATA)))================================


    //------------------------------LOAD AUDIO
    this.load.audio('bgIntro', '/assets/sounds/background/bgIntro.mp3')
    this.load.audio('btnStartClick', '/assets/sounds/effects/btnClick/click0.wav')
    
    //------------------------------- LOAD IMAGES
    //---logo ring
    this.load.image('logo', '/assets/images/logo/1.png')

    //---logo Flay
    this.multiImagesFly = fnc.loadMultiImages(this, 'fly', '../assets/images/fly/', 3)  // ['fly1', 'fly2', 'fly3']
    
  
    //button start
    this.load.spritesheet('btnControls', '/assets/images/buttons/longBtn.png',
      { frameWidth: 500, frameHeight: 194, startFrame: 1, endFrame: 0 });
     
  }
 

  create() {
    //grid create for dev test
    // fnc.createGridSystem(this)
    
    //---------------- add background by black color
    this.cameras.main.setBackgroundColor('#000000')
     

     //---------------------------------((((add AUDIO))))-----------------------------
    this.soundBgIntro = fnc.createAudio(this, 'bgIntro', 0.5, true)
    // check is bg music not play, start music
    if (!this.sound.getAllPlaying().length) this.soundBgIntro.play()
      
    this.soundBtnStartClick = () => fnc.createAudio(this, 'btnStartClick').play()


    //--------------------------------((((add TEXT))))------------------------------
    //---logo
    this.titleText = fnc.createText(this, cfg.width / 6, cfg.height / 7, 'Cheeky Fly',  )


    //--------------------------------((((add IMAGES)))) --------------------------
    //---logo
    this.logo = this.add.image(cfg.width / 6 , cfg.height / 4 + 40, 'logo')
      .setOrigin(0, 0)
      .setScale(0.9)
    //---logoFlay
    this.flyAnimationLogo = this.add.sprite(cfg.width / 3 + 10, cfg.height / 3 + 70, this.multiImagesFly[0])
    this.flyAnimationLogo.setOrigin(0, 0).setScale(0.3)
      
      
    
   
      
      // ------------------------------buttons
      this.btnStart = this.add.image(cfg.width / 2 - 6, cfg.height - 90, 'btnControls').setScale(0.4, 0.5)
      //---start btn label
      fnc.createText(this, cfg.width / 2 - 44, cfg.height - 110, 'MENU', 26 )
      
      //---start menu label
      this.subTitleText = fnc.createText(this, cfg.width / 4, cfg.height - 50, 'Press button to Menu', 16)
    
      this.btnStart.setInteractive({ cursor: 'pointer' })                      //    write direct css command  in   setInteractive()
        .on('pointerover', () => this.btnStart.setTint(0xe0e0e0))
        .on('pointerout', () => this.btnStart.setTint(0xffffff))
        .on('pointerdown', () => {
          this.flyAnimationLogo.stop('flyAnimationLogo')
          this.anims.remove('flyAnimationLogo');
          //play sound
          this.soundBtnStartClick()
          this.scene.start('MenuScene')
        })

 
      //-------------------------------Tween Animations
    fnc.tweenAnimation.crateTextAnimationRightLeftMove(this, this.subTitleText, 100, 450, -1, 500)
    fnc.tweenAnimation.createRotateAnimation(this, this.logo)
    fnc.tweenAnimation.createTextChangeColorAnimation(this, this.titleText.name)

  
   
     //--------------------Animation   
     fnc.animation.createAnimationByArrayOfImages(this, 'flyAnimationLogo', this.multiImagesFly)
     this.flyAnimationLogo.play('flyAnimationLogo')
 
   }
}
