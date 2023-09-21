import {  Scene} from 'phaser'
import * as fnc from '../game.js'
import {  cfg} from '../game.js'


export class GameScene extends Scene {
  constructor() {
    super('GameScene')
    this.fruitsObj = {
      0: 'banana',
      1: 'apple',
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
      12: 'iceCream'
    }

  }

  init() {
    console.log('Welcome to GameScene...')
    this.game.sound.stopAll() //stop all sounds
    this.playCounterTime = 0
    this.isDead = false
  }

  preload() {
    //-----------------------------load IMAGES
    //load snowflake
    this.load.atlas('snowflake', '/assets/images/particles/snowflake.png', '/assets/images/particles/snowflake.json');

    //------------------ buttons
    //---btnExit
    this.load.image('btnExit', '/assets/images/buttons/btnExit.png')
  
    //----------------backgrounds
    fnc.loadMultiImages(this, 'bg', '../assets/images/backgrounds/bg/', 4)

    //---images clouds
    this.load.image('cloudsWhite', '../assets/images/backgrounds/sky/cloudsWhite.png')
    this.load.image('cloudsBlack', '../assets/images/backgrounds/sky/cloudsBlack.png')

    //---images sea
    this.load.image('bgSea', '../assets/images/backgrounds/sea/sea.png')
    this.load.image('sea2', '../assets/images/backgrounds/sea/sea2.png')
    //---images ground
    this.load.image('bgGround', '../assets/images/backgrounds/ground/1.png')

    //---bg building
    this.load.image('bgBuilding', '../assets/images/backgrounds/skyscraper/background/1.png')

    //---building
    this.multiImagesBuilding = fnc.loadMultiImages(this, 'skyscraper', '../assets/images/backgrounds/skyscraper/buildings/', 5)

    //---cattail
    this.multiImagesCattail = fnc.loadMultiImages(this, 'cattail', '../assets/images/backgrounds/cattail/', 3)


    //--------------game object items images
    //---fly
    this.multiImagesFly = fnc.loadMultiImages(this, 'fly', '../assets/images/fly/', 3) // ['fly1', 'fly2', 'fly3']
    //---jet
    this.multiImagesJet = fnc.loadMultiImages(this, 'jet', '../assets/images/plane/jet/', 4)
    //---boing
    this.multiImagesBoing = fnc.loadMultiImages(this, 'boing', '../assets/images/plane/boing/', 3)
    //ship
    this.load.image('ship', '../assets/images/ship/ship.png')
    this.load.image('ship2', '../assets/images/ship/ship2.png')
    this.load.image('ship3', '../assets/images/ship/ship3.png')
    //--------------------------------sprite sheets fruit
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



    //---raven
    this.load.spritesheet('raven', '../assets/images/raven/ravenSprite.png', {
      frameWidth: 80,
      frameHeight: 54,
      startFrame: 0,
      endFrame: 3,
    })

    //------------------------------load AUDIO
    this.load.audio('bgGame', '/assets/sounds/background/bgGame.mp3')
    this.load.audio('bgGameNight', '../assets/sounds/background/bgGameNight.mp3')
    this.load.audio('bgGameRiver', '../assets/sounds/background/bgGameRiver.mp3')
    this.load.audio('bgGameWinter', '../assets/sounds/background/bgGameWinter.mp3')

    this.load.audio('btnExitClickSound', '/assets/sounds/effects/btnClick/clickExit.wav')
    this.load.audio('btnClickSound', '/assets/sounds/effects/btnClick/click1.wav')
    this.load.audio('levelCompleteSound', '../assets/sounds/background/levelComplete.wav')

    this.load.audio('fallingSound', '../assets/sounds/effects/items/falling.wav')
    this.load.audio('takeFruitSound', '../assets/sounds/effects/items/takeFruit.wav')
    this.load.audio('flyingSound', '../assets/sounds/effects/items/flying2.wav')

    this.load.audio('shipSound', '../assets/sounds/effects/boat/boatHorn.wav')
    this.load.audio('boatSound', '../assets/sounds/effects/boat/boatSmall.wav')
    this.load.audio('jetSound', '../assets/sounds/effects/plane/jet.ogg')
    this.load.audio('boingSound', '../assets/sounds/effects/plane/boing.wav')
    this.load.audio('ravenSound', '../assets/sounds/effects/raven/raven.ogg')
    this.load.audio('ravenEatFruitSound', '../assets/sounds/effects/raven/ravenEat.wav')
    this.load.audio('ravenEatCoinSound', '../assets/sounds/effects/items/takeCoin.wav')
    this.load.audio('fruitCollideSound', '../assets/sounds/effects/plane/fruitCollide.wav')
 

  }

  create() {
    //---------------------------------((((add AUDIO))))-----------------------------
    this.soundBgGame = () => fnc.createAudio(this, 'bgGame', 0.2, true, 500).play()
    this.soundBgGameNight = () => fnc.createAudio(this, 'bgGameNight', true, 500).play()
    this.soundBgGameRiver = () => fnc.createAudio(this, 'bgGameRiver', true, 500).play()
    this.soundBgGameWinter = () => fnc.createAudio(this, 'bgGameWinter', true, 500).play()

    this.soundBtnClick = () => fnc.createAudio(this, 'btnClickSound').play()
    this.soundBtnExitClick = () => fnc.createAudio(this, 'btnExitClickSound').play()
    this.soundLevelComplete = () => fnc.createAudio(this, 'levelCompleteSound').play()
    //items
    this.soundFalling = () => fnc.createAudio(this, 'fallingSound', 0.5, false, 0, true).play()
    this.soundFlyEatFruit = () => fnc.createAudio(this, 'takeFruitSound').play()
    this.soundFlying = () => fnc.createAudio(this, 'flyingSound').play()
    this.soundJet = () => fnc.createAudio(this, 'jetSound', 0.5).play()
    this.soundBoing = () => fnc.createAudio(this, 'boingSound').play()
    this.soundBoat = () => fnc.createAudio(this, 'boatSound').play()
    this.soundShip = () => fnc.createAudio(this, 'shipSound', 0.5).play()
    this.soundRaven = () => fnc.createAudio(this, 'ravenSound', 1).play()
    this.soundRavenEatFruit = () => fnc.createAudio(this, 'ravenEatFruitSound', 1).play()
    this.soundFlyEatCoin = () => fnc.createAudio(this, 'ravenEatCoinSound', 1).play()  
    this.soundCollideFruit = () => fnc.createAudio(this, 'fruitCollideSound').play()
    //--------------------------------((((add IMAGES)))) --------------------------
    //----------- buttons  
    //---btn exit
    this.btnExit = this.add.image(cfg.width - 20, 25, 'btnExit').setScale(0.35).setDepth(1)
    // this.btnReload = this.add.image(cfg.width - 65, 25, 'btnReload').setScale(0.3)


    //--------------------------------------- add DATA

    //create bg
    this.bg = this.add.image(0, 0, 'bg1').setOrigin(0, 0)
    // this.add.image(0, 0, 'bgNight').setOrigin(0, 0)



    // get width and height  Texture 
    this.shipHeight = this.textures.get('ship').getSourceImage().height
    this.shipWidth = this.textures.get('ship').getSourceImage().width

    this.bgBuildingHeight = this.textures.get('bgBuilding').getSourceImage().height
    this.buildingWidth = this.textures.get('b1').getSourceImage().width
    this.buildingHeight = this.textures.get('b1').getSourceImage().height

    this.bgCattailWidth = this.textures.get('cattail1').getSourceImage().width
    this.bgCattailHeight = this.textures.get('cattail1').getSourceImage().height
    this.groundHeight = this.textures.get('bgGround').getSourceImage().height

    this.cloudHeight = this.textures.get('cloudsWhite').getSourceImage().height
    this.seaHeight = this.textures.get('bgSea').getSourceImage().height

    //create clouds
    this.bgClouds = this.add.tileSprite(0, 0, cfg.width, this.cloudHeight, 'cloudsWhite').setOrigin(0, 0) //.setDepth(-1)

    //create sea
    this.bgSea = this.add.tileSprite(0, cfg.height - this.seaHeight, cfg.width, cfg.height, 'bgSea').setOrigin(0, 0)

    //create ground
    // this.bgGround = this.add.tileSprite(0, cfg.height - this.groundHeight, cfg.width, cfg.height, 'bgGround').setOrigin(0, 0)




    //---sprite ship
    this.ship = this.physics.add.sprite(cfg.width - this.shipWidth, cfg.height - this.shipHeight, 'ship')
      .setName('ship')
      .setOrigin(0, 0)
      .setScale(0.5, 0.5)
      .setVelocityX(cfg.global.currentSpeed)
      .setCircle(90, 35, 30)

    this.ship.body.setAllowGravity(false)
    // .setSize(220, 240)
    // .setCollideWorldBounds(true)



    //===================== (((change background by level))) =========================
    //------------level % 2
    if ((cfg.global.currentLevel - 1) % 4 == 1) {
      this.soundBgGameNight()
      // this.bgClouds.setVisible(false)
      this.bg.setTexture('bg2')
      this.bgClouds.setTexture('cloudsBlack')
      this.bgSea.setTexture('bgBuilding')
      this.ship.setTexture('skyscraper1')
        .setName('skyscraper')
        .setOrigin(0, 0)
        .setScale(1, 1.1)
        .setSize(80, 250)
        .setPosition(cfg.width + 100, cfg.height - this.bgBuildingHeight * 2 + 30)
    }

    //--------------level % 3
    if ((cfg.global.currentLevel - 1) % 4 == 2) {
      this.soundBgGameRiver()
      // this.bgSea.setVisible(false)
      this.bgSea.setTexture('bgGround')
      this.bgSea.y += this.groundHeight - 50
      this.bg.setTexture('bg3')
      this.bgClouds.setTexture('cloudsBlack')
      // this.bgSea.setTexture('bgBuilding')
      this.ship.setTexture('cattail1')
        .setName('cattail')
        .setOrigin(0, 0)
        .setPosition(cfg.width + 100, cfg.height - this.bgCattailHeight + 10)
        .setScale(1, 1)
        .setSize(this.bgCattailWidth, this.bgCattailHeight) //29
    }

    //--------------level % 4
    if ((cfg.global.currentLevel - 1) % 4 == 3) {
      this.soundBgGameWinter()
      this.bgSea.setVisible(false)
      this.bg.setTexture('bg4')
      // this.bgClouds.setTexture('cloudsBlack')
      // this.bgSea.setTexture('sea2')
      this.ship.setTexture('ship2')
        .setName('ship2')
        .setOrigin(0, 0)
        .setScale(1.5, 1.5)
        .setSize(170, 30)
        .setPosition(cfg.width + 100, cfg.height - this.shipHeight + 105)

      //emitter snowflake
      this.snowflakeEmitter = this.add.particles(cfg.width / 2, -100, 'snowflake', {
        frame: ['one', 'two', 'three', 'four', 'five'],
        lifespan: 6000,
        speed: {
          min: 50,
          max: 150
        },
        scale: {
          start: 0.5,
          end: 0
        },
        gravityY: 50,
        bounce: 0.8,
        blendMode: 'ADD'
      })

    }

    //--------------------------------((((add TEXT))))------------------------------
    fnc.createText(this, 10, 15, `Level ${cfg.global.currentLevel}`, 20, 'teal')
    this.textPlayTime = fnc.createText(this, 140, 15, `km: ${this.playCounterTime}`, 20, 'brown')
    this.points = fnc.createText(this, cfg.width / 2 + 10, 15, `Score: ${cfg.global.currentPoints}`, 20, 'yellow')

    //--------------------------------((((Create sprite Objects)))) -------------------------------------------

    //--------------------------Fly
    this.fly = this.physics.add.sprite(10, 300, 'fly1')
      .setName('fly')
      .setOrigin(0, 0)
      .setScale(0.1, 0.12)
      .setFlip(true)
      .setBounce(0.1)
      .setCollideWorldBounds(true)
      .setCircle(140, 200, 50)
    //.setVelocity(0, 0)
    // .setOffset(50, 70)  //50 50
    // .setSize(30, 60)  // 30 80
    // .setInteractive() // for touch events
    //  this.fly.body.world.checkCollision.down = false

    //------------------------Raven 
    this.ravenGroup = this.physics.add.group({
      allowGravity: false,
      velocityX: cfg.global.currentSpeed,
      createCallback: (raven) => { // kill fruit if out of screen group biggest over 10   
        this.soundRaven()
        this.time.addEvent({
          delay: 5500,
          callback: () => {
            this.soundRaven()
            const [raven1, raven2, raven3] = this.ravenGroup.children.entries
            if (!raven2) {  //raven 1
              if ((cfg.global.currentLevel - 1) % 4 == 3) {
                // every 3 level raven border down + 100
                raven1.setPosition(cfg.width + Phaser.Math.Between(100, 400), Phaser.Math.Between(220, 680))
              } else {
                raven1.setPosition(cfg.width + Phaser.Math.Between(100, 400), Phaser.Math.Between(220, 560))
              }
              
            } else if (!raven3) { //raven 2
              raven1.setPosition(cfg.width + Phaser.Math.Between(100, 400), Phaser.Math.Between(220, 440))
              if ((cfg.global.currentLevel - 1) % 4 == 3) {
                // every 3 level raven border down + 100
                raven2.setPosition(cfg.width + Phaser.Math.Between(100, 400), Phaser.Math.Between(460, 680))
              } else { 
                raven2.setPosition(cfg.width + Phaser.Math.Between(100, 400), Phaser.Math.Between(460, 560))
              }
            } else { //raven 3
              raven1.setPosition(cfg.width + Phaser.Math.Between(100, 400), Phaser.Math.Between(220, 340))
              raven2.setPosition(cfg.width + Phaser.Math.Between(100, 400), Phaser.Math.Between(360, 460))  
              if ((cfg.global.currentLevel - 1) % 4 == 3) {
                // every 3 level raven border down + 100
                raven3.setPosition(cfg.width + Phaser.Math.Between(100, 400), Phaser.Math.Between(480, 680))
              } else { 
                raven3.setPosition(cfg.width + Phaser.Math.Between(100, 400), Phaser.Math.Between(480, 560))
              }
            }
          },
          loop: true,
          //  callbackScope: this, 
        })

      }
    })

    this.raven = this.physics.add.sprite(cfg.width + 100, 300, 'raven')
      .setName('raven')
      .setOrigin(0, 0)
      .setScale(1, 1)
      .setBounce(0.2)
      .setSize(55, 30) // 30 80

    this.raven2 = this.physics.add.sprite(cfg.width + 400, 500, 'raven')
      .setName('raven2')
      .setOrigin(0, 0)
      .setScale(1, 1)
      .setBounce(0.2)
      .setSize(55, 30) 

      this.raven3 = this.physics.add.sprite(cfg.width + 200, 400, 'raven')
      .setName('raven3')
      .setOrigin(0, 0)
      .setScale(1, 1)
      .setBounce(0.2)
      .setSize(55, 30) 
    
    this.ravenGroup.add(this.raven)
    if (cfg.global.currentLevel > 4) this.ravenGroup.add(this.raven2)
    if (cfg.global.currentLevel > 8) this.ravenGroup.add(this.raven3)




    //-------------------------PLANE  Jet and Boing
    this.planeGroup = this.physics.add.group({
      allowGravity: false,
      velocityX: cfg.global.currentSpeed,
      createCallback: (plain) => {
        // console.log(plain.name) // if name jet else 
        if (plain.name == 'boing') {
          plain.setVelocityX(cfg.global.currentSpeed * 1.7)
          this.soundBoing()
        } else {
          this.soundJet()
          plain.setVelocityX(cfg.global.currentSpeed * 1.5)
        }

        this.time.addEvent({
          delay: Phaser.Math.Between(3500, 8000), // 3500, 
          callback: () => {
            plain.name == 'boing' ? this.soundBoing() : this.soundJet()
            plain.y = Phaser.Math.Between(50, 180)
            plain.x = cfg.width + 20
          },
          loop: true,
        })

      }
    })

    //---sprite jet
    this.jet = this.physics.add.sprite(cfg.width + 100, 100, 'jet1')
      .setName('jet')
      .setOrigin(0, 0)
      .setScale(0.4, 0.4)
      .setSize(200, 100)


    //---sprite jet
    this.boing = this.physics.add.sprite(cfg.width + 100, 100, 'boing1')
      .setName('boing')
      .setOrigin(0, 0)
      .setScale(0.6, 0.6)
      .setSize(220, 70)


    //-----------------Add To Plain Group
    //first clear group
    this.planeGroup.clear()
    //---add Jet or Boing
    cfg.global.currentLevel & 1 ? this.planeGroup.add(this.jet) : this.planeGroup.add(this.boing)



    //------------------------ship && building && cattail
    //reset position
    // this.ship.x = cfg.width + 100//this.shipWidth
    //---create event to reset ship position
    this.time.addEvent({
      delay: Phaser.Math.Between(6000, 8000),
      callback: () => {
          if (this.ship.name == 'skyscraper') {
            this.ship.setTexture(`skyscraper${Phaser.Math.Between(1, 5)}`)
          }
          if (this.ship.name == 'cattail') {
            this.ship.setTexture(`cattail${Phaser.Math.Between(1, 3)}`)
            .setSize(this.bgCattailWidth, this.bgCattailHeight)
          }
          if (this.ship.name == 'ship2') {
            this.ship.setTexture(`ship${Phaser.Math.Between(2, 3)}`)
          }
        
        
          this.ship.name == 'ship' ? this.soundBoat() : null
          this.ship.name == 'ship2' ? this.soundShip() : null
          this.ship.x = cfg.width + this.shipWidth
      },
      callbackScope: this,
      loop: true,
    })



    //-----------------------Fruits
    this.fruitsGroup = this.physics.add.group({
      key: 'fruits',
      immovable: true,
      allowGravity: false,
      velocityX: cfg.global.currentSpeed,
      createCallback: (fruit) => { // kill fruit if out of screen group biggest over 10
        if (this.fruitsGroup) {
          if (this.fruitsGroup.children.entries.length > 10) {
            this.fruitsGroup.getChildren().filter(f => f.x < 0 ? f.destroy() : null)
            //  console.log(this.fruitsGroup.getChildren());

          }
        }
      }
    })


    //---create  event to make fruits
    this.time.addEvent({
      delay: 800,
      callback: createFruit,
      callbackScope: this,
      loop: true,
    })

    // //create random fruit
    function createFruit() {
      const randomFruitKey = Phaser.Math.Between(0, 12)
      const yPos = Phaser.Math.Between(cfg.height * 0.1, cfg.height - this.shipHeight)
      const fruit = this.physics.add.sprite(cfg.width + 50, yPos, 'fruits', randomFruitKey)
        .setName(randomFruitKey)
        .setCircle(9, 5, 5)
        .setScale(1.8)
      // .setVelocityX(-100)
      // .setCollideWorldBounds(true)
      // this.physics.world.enable(fruit)
      // fruit.body.setAllowGravity(false) 
      // fruit.body.world.checkCollision = true

      this.fruitsGroup.add(fruit)
    }
    

    //-----------------------------------------Coin
    this.coinGroup = this.physics.add.group({
      key: 'coin',
      immovable: true,
      allowGravity: false,
      velocityX: cfg.global.currentSpeed,
      createCallback: (coin) => { // kill fruit if out of screen group biggest over 10
        if (this.coinGroup) {
          this.coin.play('coinAnimation')
          if (this.coinGroup.children.entries.length > 10) {
            this.coinGroup.getChildren().filter(c => c.x < 0 ? c.destroy() : null)
          }
        }
      }
    })

      //---create  event to make coin
      this.time.addEvent({
        delay: Phaser.Math.Between(3000, 8000),
        callback: createCoin,
        callbackScope: this,
        loop: true,
      })
  
    
     // //create random coin
     function createCoin() {
      if ((cfg.global.currentLevel - 1) % 4 == 0) {
        this.randomYPos =  Phaser.Math.Between(50, 150)
      } else {
        this.upYPos = Phaser.Math.Between(50, 150)
        this.downYPos = Phaser.Math.Between(cfg.height - 50, cfg.height - 150)
        this.randomYPos = Math.random() < 0.5 ? this.upYPos : this.downYPos; 
      }
      
      this.coin = this.physics.add.sprite(cfg.width + 50, this.randomYPos, 'coin', 1)
          .setName('coin')
          .setCircle(20, 1, 1)
    
       this.coinGroup.add(this.coin) 
      }

    
    //  //---------------------------------((((Animation))))---------------------------------
   
    //---add fly Animation
    this.anims.remove('flyAnimation');
    fnc.animation.createAnimationByArrayOfImages(this, 'flyAnimation', this.multiImagesFly)
    this.fly.play('flyAnimation')

    //---add raven Animation   
    this.anims.remove('ravenAnimation');
    fnc.animation.createAnimationBySpriteOfImages(this, 'ravenAnimation', 'raven', 0, 3)
    this.raven.play('ravenAnimation')
    this.raven2.play('ravenAnimation')
    this.raven3.play('ravenAnimation')

    //---add jet Animation
    this.anims.remove('jetAnimation');
    fnc.animation.createAnimationByArrayOfImages(this, 'jetAnimation', this.multiImagesJet)
    this.jet.play('jetAnimation')

    //---add boing Animation
    this.anims.remove('boingAnimation')
    fnc.animation.createAnimationByArrayOfImages(this, 'boingAnimation', this.multiImagesBoing)
    this.boing.play('boingAnimation')

    //---add coin Animation
    this.anims.remove('coinAnimation')
    fnc.animation.createAnimationBySpriteOfImages(this, 'coinAnimation', 'coin', 0, 5)
    

    //--------------------------------((((COLLIDE)))) -------------------------------------------
    // this.physics.world.setBounds(0, 0, cfg.width, cfg.height); // world border
    // this.physics.start();

    // ship
    this.physics.add.overlap(this.ship, [this.coinGroup, this.fruitsGroup, this.ravenGroup,], (ship, item) => {
      item.destroy()
    })
    
    //---fly & fruit
    this.physics.add.overlap(this.fly, [this.fruitsGroup, this.coinGroup], (fly, item) => {   
      //add to statistics
      cfg.global.objStatistic[item.name] = (cfg.global.objStatistic[item.name] || 0) + 1
     
      if (item.name == 'coin') {
        this.soundFlyEatCoin() 
        cfg.global.currentPoints += 100 * cfg.global.currentLevel
      } else {
        this.soundFlyEatFruit() 
         cfg.global.currentPoints += item.name * cfg.global.currentLevel * 2
     }
        
      this.points.setText(`Score: ${cfg.global.currentPoints}`)
      item.destroy()
    })

    //---fruit & coin & raven & plain & ship
     this.physics.add.overlap(this.fruitsGroup, [this.coinGroup, this.ravenGroup, this.planeGroup, this.ship], (fruit, enemy) => {
      enemy.name == 'raven' ? this.soundRavenEatFruit() : this.soundCollideFruit()
      fruit.destroy()
    })

    //---fly & [raven , plane, ship ]
    this.physics.add.overlap(this.fly, [this.ravenGroup, this.planeGroup, this.ship], (fly, raven) => {
      this.isDead = true
    })
    
  //--- coin & raven & plain & ship
  this.physics.add.overlap(this.coinGroup, [this.ravenGroup, this.planeGroup, this.ship], (coin, item) => {
    coin.destroy()
  })
    //------------------------------------((((code))))-------------------------------
    //------------------((((((((((((MOVE by Touch Control ))))))))))))


    //-----------------------------------add interactive btn options
    Array.from([this.btnExit, ]).forEach((btn, index) => {
      btn.setInteractive({
          cursor: 'pointer',
          index
        })
        .on('pointerdown', () => {
          //  cfg.transitionBetweenScene('MenuScene') // translation between scene
          if (index == 0) { //exit
            this.game.sound.stopAll()
            this.anims.anims.clear()
            this.soundBtnExitClick()
            this.scene.stop(this.scene.scene)
            this.scene.start('MenuScene')
          }
        })

      //---play bg music  
      if ((cfg.global.currentLevel - 1) % 4 == 0) this.soundBgGame()
    })


    //--------------play Time event
    this.time.addEvent({
      delay: 1000,
      callback: this.playTime,
      callbackScope: this,
      loop: true,
    })

  }


  update(time) {
    this.bgClouds.tilePositionX += 0.8 // move bg / clouds
    this.bgSea.tilePositionX += 0.5 // move bg / sea

    this.moving()
    this.isFlyDead()
  }

  //=====================================  Custom Function =======================


  //-------------move player
  moving() {
    // console.log(this.fly.body.velocity.y);
    // watch to touch event
    this.input.on('pointerdown', (pointer, event) => {
      this.fly.setVelocityY(-150)
    })

    //fly falling
    if (this.fly.body.velocity.y > 150) {
      this.fly.anims.pause()
      this.fly.body.velocity.y < 160 ? this.soundFalling() : null

    } else {
      this.fly.anims.resume()
      this.fly.body.velocity.y < -130 ? this.soundFlying() : null
    }

  }


  playTime() {
    this.playCounterTime++
    this.textPlayTime.setText(`km: ${this.playCounterTime}`)
    if (this.playCounterTime == 60) { //60
      this.game.sound.stopAll()
      fnc.createText(this, cfg.width / 8, cfg.height / 2 - 20, 'LEVEL COMPLETE', 35, 'darkgreen')
      this.soundLevelComplete()
      //increase level and speed
      cfg.global.currentLevel++
      cfg.global.currentSpeed -= 10
      //reload
      this.scene.pause('GameScene')
      setTimeout(() => {
        this.scene.start('ReloadScene')
      }, 2000);
    }
  }

  //------------check is dead
  isFlyDead() {
    let upBorder = this.fly.y <= 0
    let downBorder = this.fly.y >= cfg.height - this.fly.body.height - 6
    if ((cfg.global.currentLevel - 1) % 4 == 0) {
      downBorder = this.fly.y > cfg.height - this.seaHeight - this.fly.body.height
    }

    if (upBorder || downBorder || this.isDead) {
      this.fly.setTint(0xff0000)
      this.scene.pause('GameScene')
      fnc.createText(this, cfg.width / 6, cfg.height / 2 - 20, 'YOU ARE DEAD!', 35, 'brown')
      setTimeout(() => this.scene.start('GameOverScene'), 2000)
    }
  }

};
