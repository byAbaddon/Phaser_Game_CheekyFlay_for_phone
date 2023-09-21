import {Scene} from'phaser';
import * as fnc from '../game.js';
import { cfg } from '../game.js'
import { GameScene } from "./gameScene.js";


export class ReloadScene extends Scene {
  constructor() {
    super('ReloadScene')
  }
  init() {
    console.log('StoryScene was loading...')
    this.game.sound.stopAll()
  }

  preload() {}
 
  create() { 
    fnc.tweenAnimation.transitionBetweenScene(this, cfg)
    fnc.createText(this, cfg.width / 2 - 100, cfg.height / 2 - 20, 'LOADING...', 45, 'brown')

    //remove and add scene again to reset all level
    this.anims.anims.clear();
    setTimeout(() => this.scene.remove('GameScene', GameScene), 100)
    setTimeout(() =>  this.scene.add('GameScene' , GameScene), 500)
    setTimeout(() =>  this.scene.start('GameScene'), 750)
    
  }

  update(time, delta) {}
}