
//导入测试插件
import {TestTextChoice} from './packages/TextChoice/test'
import {TestTextFillBlanks} from './packages/TextFillBlanks/test'
import {TestFilterAlpha} from './packages/filterAlpha/test'
import {TestAdjustmentFilter} from './packages/filterAdjustment/test'
import {TestColorMatrixFilter} from './packages/filterColorMatrix/test'
import {TestBlurFilter} from './packages/filterBlur/test'
//import {TestDisplacementFilter} from './packages/filterDisplacement/test'
import {TestFxaaFilter} from './packages/filterFxaa/test'
import {TestNoiseFilter} from './packages/filterNoise/test'
import {TestKawaseBlurFilter} from './packages/filterKawaseBlur/test'
import {TestAdvancedBloomFilter} from './packages/filterAdvancedBloom/test'
import {TestAsciiFilter} from './packages/filterAscii/test'
import {TestBevelFilter} from './packages/filterBevel/test'
import {TestBloomFilter} from './packages/filterBloom/test'
import {TestBulgePinchFilter} from './packages/filterBulgePinch/test'


var app = new vf.Application({ 
    width: window.innerWidth, 
    height: window.innerHeight,
    antialias:true,
    forceCanvas:false,
    resolution: window.devicePixelRatio,
    forceFXAA:true
});     
var uiStage = new gui.Stage(app.view.width, app.view.height,app);
app.stage.addChild(uiStage.container);
document.body.appendChild(app.view);

function updata(deltaTime) {
    gui.TickerShared.update(deltaTime,app.ticker.lastTime,app.ticker.elapsedMS);
}

app.ticker.maxFPS = 60;
app.ticker.add(updata, this);


//添加测试页面
//new TestTextChoice(app, uiStage);
//new TestTextFillBlanks(app, uiStage);
//new TestFilterAlpha(app, uiStage);
//new TestAdjustmentFilter(app, uiStage);
//new TestColorMatrixFilter(app, uiStage);
//new TestBlurFilter(app, uiStage);
//new TestDisplacementFilter(app, uiStage);//暂停中 因为构造函数不能传餐
//new TestFxaaFilter(app, uiStage);
//new TestNoiseFilter(app, uiStage);
//new TestKawaseBlurFilter(app, uiStage);
//new TestAdvancedBloomFilter(app, uiStage);
//new TestAsciiFilter(app, uiStage);
//new TestBevelFilter(app, uiStage);
//new TestBloomFilter(app, uiStage);
new TestBulgePinchFilter(app, uiStage);

