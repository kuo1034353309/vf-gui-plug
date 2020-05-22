
import { importScript } from "../../../utils"

export class TestBloomFilter{
    public constructor(app: vf.Application, uiStage: vf.gui.Stage){
        this.onLoad(app, uiStage);
    }

    private onLoad(app: vf.Application, uiStage: vf.gui.Stage){
        let url =
            process.env.NODE_ENV === "production"
                ? "//s.vipkidstatic.com/vf/plugin/TextChoice/0.0.3.js"
                : "./dist/filterBloom.js";
                
        importScript(url, 'BloomFilter', (value: any, className: string) => {
            
            let rect = new vf.gui.Rect();
            
            rect.color = 0x00ff00;
            rect.x = 20;
            rect.y = 20;
            rect.style.width = 200;
            rect.style.height = 200;
            uiStage.addChild(rect);
           
            // blur number
            // Sets the strength of both the blurX and blurY properties simultaneously
            
            // Default Value:
            // 2
            rect.style.filter.BloomFilter.blur =2;

            //  blurX number
            // Sets the strength of the blurX property
            
            // Default Value:
            // 2
            rect.style.filter.BloomFilter.blurX =2;

            //  blurY number
            // Sets the strength of the blurY property
            
            // Default Value:
            // 2
            rect.style.filter.BloomFilter.blurY =2;
           
            let pic = new vf.gui.Image();
            pic.style.left = 70;
            pic.style.top = 50;
            pic.style.width = 100;
            pic.style.height = 160;
            pic.src = './assets/dino.png';
            
            uiStage.addChild(pic);
           
            setInterval(()=>{
                pic.style.filter.BloomFilter.blur = Math.random()*10;
            },10)
           
        });

    }
}