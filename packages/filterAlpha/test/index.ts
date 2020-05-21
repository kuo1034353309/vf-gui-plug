
import { importScript } from "../../../utils"

export class TestFilterAlpha{
    public constructor(app: vf.Application, uiStage: vf.gui.Stage){
        this.onLoad(app, uiStage);
    }

    private onLoad(app: vf.Application, uiStage: vf.gui.Stage){
        let url =
            process.env.NODE_ENV === "production"
                ? "//s.vipkidstatic.com/vf/plugin/TextChoice/0.0.3.js"
                : "./dist/filterAlpha.js";
        importScript(url, 'FilterAlpha', (value: any, className: string) => {
            // console.log(value);
            // const button = new vf.gui.Button();
            // button.style.left = 150;
            // button.style.top = 30;
            // button.style.width = 100;
            // button.style.height = 50;
            // button.label.style.color = 0xff0000;
            // button.text = "提交";
            // uiStage.addChild(button);
            // button.style.filter.FilterAlpha.alpha = 0.3;
            let rect = new vf.gui.Rect();
            
            rect.color = 0x00ff00;
            rect.x = 20;
            rect.y = 20;
            rect.style.width = 200;
            rect.style.height = 200;
            uiStage.addChild(rect);
                     
            rect.style.filter.FilterAlpha.alpha = .5;          

            let pic = new vf.gui.Image();
            pic.style.left = 70;
            pic.style.top = 50;
            pic.style.width = 100;
            pic.style.height = 160;
            pic.src = './assets/dino.png';
            
            uiStage.addChild(pic);
            pic.style.filter.FilterAlpha.alpha = .5;
           
        });

    }
}