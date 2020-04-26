
function getScene() {

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
    return uiStage;
}



function checkModule(){

    // if(window.require === undefined){
    //     window.require = function(v){console.log(v)};
    // }
    // if(window.exports === undefined){
    //     window.exports = {};
    // }
    // if(window.module === undefined){
    //     window.module = {};
    // }
    // if(window.module.exports === undefined){
    //     window.module.exports = {};
    // }

}


/**
 * 加载script js 或js模块
 * 1. 支持普通的全局js加载，常规script标签方式引入
 * 2. 支持通过 “tsc xxx.ts -m umd” 编译生成的文件动态加载 
 * 
 * @param url url地址
 * @param moduleName 模块名，可加载umd模块，访问形式为gui.moduleName
 * 
 * @example 
 * let Cls = await importScript('http://127.0.0.1:5501/dist/test2.js',"Test");
 * let text = new Cls(); //或 let text = new gui.Test();
 * 
 */
function importScript(url,moduleName,callBack){

    var _namespace = gui;
    
    checkModule();
    

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = false;
    script.src = url;

    const loadError = (e) => {
        return callBack(e);
    };
    
    const loadCallback = () => {
        if (script && script.parentNode) {
            script.parentNode.removeChild(script);
        }
        // tslint:disable-next-line: no-arg
        script.removeEventListener('load', loadCallback, false);
        script.removeEventListener('error', loadError, false);

        const plugs = vf.gui.plugs;
        if(moduleName){
            if(plugs.module.hasOwnProperty(moduleName)){
                vf.gui.plugs[moduleName] = plugs.module[moduleName];
                plugs.module = null;
                if(vf.gui.plugs[moduleName].isFilter){
                    vf.gui.Filter.list.set(moduleName,vf.gui.plugs[moduleName]);
                }
                return callBack(vf.gui.plugs[moduleName],moduleName);
            }
            return callBack(undefined);
        }
        return callBack(true);
    };
    
    // tslint:disable-next-line: only-arrow-functions
    script.addEventListener('load', loadCallback, false);
    script.addEventListener('error', loadError, false);
    document.body.appendChild(script);

}

