
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
export function importScript(url: string, moduleName: string, callBack: any){
    
    var _namespace : any = vf.gui;
    
    if(_namespace[moduleName]){
        throw new Error('模块命名冲突');
    }

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = false;
    script.src = url;

    const loadError = (e: any) => {
        return callBack(e);
    };
    
    const loadCallback = () => {
        if (script && script.parentNode) {
            script.parentNode.removeChild(script);
        }
        // tslint:disable-next-line: no-arg
        script.removeEventListener('load', loadCallback, false);
        script.removeEventListener('error', loadError, false);

        const module = _namespace.module;
        if(moduleName){
            if(module.hasOwnProperty(moduleName)){
                _namespace[moduleName] = module[moduleName];
                _namespace.module = null;
                if(_namespace[moduleName].isFilter){
                    _namespace.Filter.list.set(moduleName,_namespace[moduleName]);
                }
                return callBack(_namespace[moduleName],moduleName);
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