
import { importScript } from "../../../utils"

export class TestFxaaFilter {
    public constructor(app: vf.Application, uiStage: vf.gui.Stage) {
        this.onLoad(app, uiStage);
    }

    private onLoad(app: vf.Application, uiStage: vf.gui.Stage) {
        let url =
            process.env.NODE_ENV === "production"
                ? "//s.vipkidstatic.com/vf/plugin/TextChoice/0.0.3.js"
                : "./dist/filterFxaa.js";

        importScript(url, 'FxaaFilter', (value: any, className: string) => {

            let rect = new vf.gui.Rect();

            rect.color = 0x00ff00;
            rect.x = 20;
            rect.y = 20;
            rect.style.width = 200;
            rect.style.height = 200;
            uiStage.addChild(rect);
            
            //Basic FXAA (Fast Approximate Anti-Aliasing) 
            //implementation based on the code on geeks3d.com with the modification that the texture2DLod stuff was removed since it is unsupported by WebGL.
            rect.style.filter.FxaaFilter
            
            
            let pic = new vf.gui.Image();
            pic.style.left = 70;
            pic.style.top = 50;
            pic.style.width = 100;
            pic.style.height = 160;
            pic.src = './assets/dino.png';

            uiStage.addChild(pic);
          
            setInterval(() => {
               // pic.style.filter.ColorMatrixFilter.matrix = [Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random()]
            }, 500)
        });

    }
}