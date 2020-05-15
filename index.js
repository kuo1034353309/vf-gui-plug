
//导入测试插件
import {TestTextChoice} from './packages/TextChoice/test'
import {TestTextFillBlanks} from './packages/TextFillBlanks/test'

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
new TestTextFillBlanks(app, uiStage);


