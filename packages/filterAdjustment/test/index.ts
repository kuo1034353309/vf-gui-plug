
import { importScript } from "../../../utils"

export class TestAdjustmentFilter{
    public constructor(app: vf.Application, uiStage: vf.gui.Stage){
        this.onLoad(app, uiStage);
    }

    private onLoad(app: vf.Application, uiStage: vf.gui.Stage){
        let url =
            process.env.NODE_ENV === "production"
                ? "//s.vipkidstatic.com/vf/plugin/TextChoice/0.0.3.js"
                : "./dist/filterAdjustment.js";
                
        importScript(url, 'AdjustmentFilter', (value: any, className: string) => {
            
            let rect = new vf.gui.Rect();
            
            rect.color = 0x00ff00;
            rect.x = 20;
            rect.y = 20;
            rect.style.width = 200;
            rect.style.height = 200;
            uiStage.addChild(rect);
           
            rect.style.filter.AdjustmentFilter.gamma = 1;
            rect.style.filter.AdjustmentFilter.saturation = 1;
            rect.style.filter.AdjustmentFilter.contrast = 1;
            rect.style.filter.AdjustmentFilter.brightness = 1;
            rect.style.filter.AdjustmentFilter.red = 1;
            rect.style.filter.AdjustmentFilter.green = 1;
            rect.style.filter.AdjustmentFilter.blue = 1;
            rect.style.filter.AdjustmentFilter.alpha = 1;
           
            

            let pic = new vf.gui.Image();
            pic.style.left = 70;
            pic.style.top = 50;
            pic.style.width = 100;
            pic.style.height = 160;
            pic.src = './assets/dino.png';
            
            uiStage.addChild(pic);
            pic.style.filter.AdjustmentFilter.alpha = .8;

            setInterval(()=>{
                pic.style.filter.AdjustmentFilter.red = Math.random();
                pic.style.filter.AdjustmentFilter.gamma = Math.random();
                pic.style.filter.AdjustmentFilter.saturation = Math.random();
                pic.style.filter.AdjustmentFilter.contrast = Math.random();
                pic.style.filter.AdjustmentFilter.brightness = Math.random();
                pic.style.filter.AdjustmentFilter.red = Math.random();
                pic.style.filter.AdjustmentFilter.green = Math.random();
                pic.style.filter.AdjustmentFilter.blue = Math.random();
                pic.style.filter.AdjustmentFilter.alpha = Math.random();
            },1000)
           
        });

    }
}