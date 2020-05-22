
import { importScript } from "../../../utils"

export class TestDisplacementFilter {
    public constructor(app: vf.Application, uiStage: vf.gui.Stage) {
        this.onLoad(app, uiStage);
    }

    private onLoad(app: vf.Application, uiStage: vf.gui.Stage) {
        let url =
            process.env.NODE_ENV === "production"
                ? "//s.vipkidstatic.com/vf/plugin/TextChoice/0.0.3.js"
                : "./dist/filterDisplacement.js";

        importScript(url, 'DisplacementFilter', (value: any, className: string) => {

            let rect = new vf.gui.Rect();

            rect.color = 0x00ff00;
            rect.x = 20;
            rect.y = 20;
            rect.style.width = 200;
            rect.style.height = 200;
            uiStage.addChild(rect);

            //属性们
            
           //console.log(rect.style.filter) 
        //    setTimeout(() => {
        //     console.log(rect.style.filter) 
        //    }, 1000);

           // rect.style.filter.DisplacementFilter

            let pic = new vf.gui.Image();
            pic.style.left = 70;
            pic.style.top = 50;
            pic.style.width = 100;
            pic.style.height = 160;
            pic.src = './assets/dino.png';
          

            uiStage.addChild(pic);
            pic.style.filter.DisplacementFilter.maskSprite = rect;
            
            setTimeout(() => {
               // pic.style.filter.DisplacementFilter(rect,1)
            }, 1000);
            
           
            setInterval(() => {
             //   pic.style.filter.DisplacementFilter
            }, 500)
        });

    }
}