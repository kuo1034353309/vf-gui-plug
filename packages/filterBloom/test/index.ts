
import { importScript } from "../../../utils"

export class TestBevelFilter{
    public constructor(app: vf.Application, uiStage: vf.gui.Stage){
        this.onLoad(app, uiStage);
    }

    private onLoad(app: vf.Application, uiStage: vf.gui.Stage){
        let url =
            process.env.NODE_ENV === "production"
                ? "//s.vipkidstatic.com/vf/plugin/TextChoice/0.0.3.js"
                : "./dist/filterBevel.js";
                
        importScript(url, 'BevelFilter', (value: any, className: string) => {
            
            let rect = new vf.gui.Rect();
            
            rect.color = 0x00ff00;
            rect.x = 20;
            rect.y = 20;
            rect.style.width = 200;
            rect.style.height = 200;
            uiStage.addChild(rect);
           
            // lightAlpha number
            // Alpha of the light.
            
            // Default Value:
            // 0.7
            rect.style.filter.BevelFilter.lightAlpha = 0.7;

            //  lightColor number
            // Color of the light.
            
            // Default Value:
            // 0xffffff
            rect.style.filter.BevelFilter.lightColor = 0xffffff;

            //  rotation number
            // The angle of the light in degrees.
            
            // Default Value:
            // 45
            rect.style.filter.BevelFilter.rotation = 45;

            //  shadowAlpha number
            // Alpha of the shadow.
            
            // Default Value:
            // 0.7
            rect.style.filter.BevelFilter.shadowAlpha = 0.7;

            //  shadowColor number
            // Color of the shadow.
            
            // Default Value:
            // 0x000000
            rect.style.filter.BevelFilter.shadowAlpha = 0.7;

            //  thickness number
            // The tickness of the bevel.
            
            // Default Value:
            // 2
            rect.style.filter.BevelFilter.thickness = 2;
           
            let pic = new vf.gui.Image();
            pic.style.left = 70;
            pic.style.top = 50;
            pic.style.width = 100;
            pic.style.height = 160;
            pic.src = './assets/dino.png';
            
            uiStage.addChild(pic);
            pic.style.filter.BevelFilter.rotation = 1;

            setInterval(()=>{
                pic.style.filter.BevelFilter.rotation = Math.random()*360;
            
            },10)
           
        });

    }
}