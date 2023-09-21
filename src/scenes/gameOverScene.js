import {Scene} from 'phaser';
import * as fnc from '../game.js';
import {cfg} from '../game.js'
import { GameScene } from "/src/scenes/gameScene"


export class GameOverScene extends Scene {
  constructor() {
    super('GameOverScene')
    this.fruitsObj = {
      0: 'banana',
      1: 'redTomato',
      2: 'greenTomato',
      3: 'strawberry',
      4: 'pineapple',
      5: 'kiwi',
      6: 'plum',
      7: 'cherry',
      8: 'grapes',
      9: 'orange',
      10: 'lemon',
      11: 'watermelon',
      12: 'apple',
      13: 'iceCream'
    }
  }


  init() {
    console.log('GameOverScene was loading...');
    this.game.sound.stopAll() //stop all sounds
    this.cameras.main.setBackgroundColor('#000000')
  }

  preload() {
    // LOAD IMAGE
    //---fruit
    this.load.spritesheet('fruits', '../assets/images/fruitsSprite/fruits.png', {
      frameWidth: 28,
      frameHeight: 28,
      startFrame: 0,
      endFrame: 12,

    })
    //---coin
    this.load.spritesheet('coin', '../assets/images/coinSprite/coin40_40.png', {
      frameWidth: 40,
      frameHeight: 40,
      startFrame: 0,
      endFrame: 5,
    })


    //---cup
    fnc.loadMultiImages(this, 'cup', '../assets/images/cup/', 3)

    //---btnExit
    this.load.image('btnExit', '/assets/images/buttons/btnExit.png')
    this.load.image('frame', '../assets/images/frame/1.png')

    //LOAD AUDIO
    //bg
    this.load.audio('bgFinal', '../assets/sounds/background/bgFinal.mp3')
    this.load.audio('btnExitClick', '/assets/sounds/effects/btnClick/clickExit.wav')
  }

  create() {
    //grid create for dev test
    // fnc.createGridSystem(this)

    //-------------------------------((( ADD IMAGE)))-------------------------
    //---btn exit
    this.btnExit = this.add.image(cfg.width - 60, 20, 'btnExit').setOrigin(0.0).setScale(0.5)
    //frame
    this.add.image(cfg.width / 2, cfg.height / 3, 'frame', )



    //-------------------------------((( ADD AUDIO)))-------------------------
    fnc.createAudio(this, 'bgFinal', 0.3).play()

    this.soundBtnExitClick = () => fnc.createAudio(this, 'btnExitClick').play()
    //ADD TEXT
    fnc.createText(this, cfg.width * 0.2 + 10, 100, 'STATISTIC', 46).setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000)
    fnc.createText(this, cfg.width / 3 - 25, cfg.height / 3 - 70, `Level: ${cfg.global.currentLevel} `, 24, 'orange')
    fnc.createText(this, cfg.width / 3 - 25, cfg.height / 3 - 15, `Points: ${cfg.global.currentPoints}`, 24, 'darkgreen')
    this.cupText = fnc.createText(this, cfg.width / 3 - 30, cfg.height / 3 + 40, `Cup: `, 24, 'brown')

    const level = cfg.global.currentLevel
    const cup = level >= 15 ? 'cup1' : level >= 9 ? 'cup2' : level >= 5 ? 'cup3' : null
    if (cup) this.add.image(cfg.width / 3 + 70, cfg.height / 3 + 50, cup).setScale(0.1)
    else this.cupText.setText('No cups!')

    fnc.createText(this, cfg.width * 0.1 + 20, cfg.height - 100, 'Game Over', 46, ) //.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000)

    //sort fruits result
    let sortStatisticArray = Object.entries(cfg.global.objStatistic)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .filter(x => x[0] != 'coin' ? x : null)

    this.counter = 1
    this.horizontalFix = 0

    for (const [key, val] of sortStatisticArray) {
      this.counter++
      if (this.counter >= 8) {
        this.horizontalFix = 200
        this.counter = 2
      }
      let fruit = this.fruitsObj[key]
      fnc.createText(this, cfg.width * 0.3 + this.horizontalFix, cfg.height / 2 + 36 * this.counter - 10, `- ${val}`, 20, )
      const fruitImage = this.physics.add.sprite(cfg.width * 0.3 - 30 + this.horizontalFix, cfg.height / 2 + 36 * this.counter, 'fruits', key)
      fruitImage.body.setAllowGravity(false);

    }
    
    //add coin image
    this.coin = this.physics.add.sprite(cfg.width / 2 - 30, cfg.height / 2 + 40, 'coin', 1).setScale(0.6)
    this.coin.body.setAllowGravity(false) 
    this.coin.play('coinAnimation')
   
    //text coin counter
    fnc.createText(this, cfg.width / 2 - 4, cfg.height / 2 + 30,`- ${cfg.global.objStatistic['coin'] || 0}` , 20)

    Array.from([this.btnExit, ]).forEach((btn, index) => {
      btn.setInteractive({
          cursor: 'pointer',
          index
        }).on('pointerover', () => this.btnExit.setTint(0xc0c0c0))
        .on('pointerout', () => this.btnExit.setTint(0xffffff))
        .on('pointerdown', () => {
          this.scene.start('IntroScene')
          //play sound
          this.soundBtnExitClick()
          // this.game.sound.stopAll()  //stop all sounds
          this.sound.removeAll() //remove all sounds
          // clear statistic
          cfg.global.objStatistic = {}
          // Remove and add again GameScene
          setTimeout(() => this.scene.remove('GameScene', GameScene), 200)
          setTimeout(() => this.scene.add('GameScene', GameScene), 500)
        })
    })

  }
};