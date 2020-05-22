
import { importScript } from "../../../utils"

export class TestBulgePinchFilter{
    public constructor(app: vf.Application, uiStage: vf.gui.Stage){
        this.onLoad(app, uiStage);
    }

    private onLoad(app: vf.Application, uiStage: vf.gui.Stage){
        let url =
            process.env.NODE_ENV === "production"
                ? "//s.vipkidstatic.com/vf/plugin/TextChoice/0.0.3.js"
                : "./dist/filterBulgePinch.js";
                
        importScript(url, 'BulgePinchFilter', (value: any, className: string) => {
            
            let rect = new vf.gui.Rect();
            
            rect.color = 0x00ff00;
            rect.x = 20;
            rect.y = 20;
            rect.style.width = 200;
            rect.style.height = 200;
            uiStage.addChild(rect);

            // center vf.Point
            // The x and y coordinates of the center of the circle of effect.
            rect.style.filter.BulgePinchFilter.center = [.5,.5];

            //  radius number
            // The radius of the circle of effect.
            rect.style.filter.BulgePinchFilter.radius = 4;

            //  strength number
            // The strength of the effect. -1 to 1 (-1 is strong pinch, 0 is no effect, 1 is strong bulge)
            rect.style.filter.BulgePinchFilter.strength = 1;
            
            let pic = new vf.gui.Image();
            pic.style.left = 70;
            pic.style.top = 50;
            pic.style.width = 100;
            pic.style.height = 160;
            pic.src = './assets/dino.png';
            
            uiStage.addChild(pic);
            pic.style.filter.BulgePinchFilter.strength = 1;
            pic.style.filter.BulgePinchFilter.radius = 30;
            rect.style.filter.BulgePinchFilter.center = [.5,.5];
            let r = 1 ;
            const strengthMax = 1*100;
            const radiusMax = 100*100;
           
            setInterval(()=>{
                if(r<100){
                    r++;
                }else{
                    r=1;
                }
                
                pic.style.filter.BulgePinchFilter.strength =(r/strengthMax) -1;
                pic.style.filter.BulgePinchFilter.radius =r
               
               // pic.style.filter.BulgePinchFilter.size = Math.random()*10;
            },1)
           
        });

    }
}