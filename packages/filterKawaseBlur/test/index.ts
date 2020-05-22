
import { importScript } from "../../../utils"

export class TestKawaseBlurFilter {
    public constructor(app: vf.Application, uiStage: vf.gui.Stage) {
        this.onLoad(app, uiStage);
    }

    private onLoad(app: vf.Application, uiStage: vf.gui.Stage) {
        let url =
            process.env.NODE_ENV === "production"
                ? "//s.vipkidstatic.com/vf/plugin/TextChoice/0.0.3.js"
                : "./dist/filterKawaseBlur.js";

        importScript(url, 'KawaseBlurFilter', (value: any, className: string) => {

            let rect = new vf.gui.Rect();

            rect.color = 0x00ff00;
            rect.x = 20;
            rect.y = 20;
            rect.style.width = 200;
            rect.style.height = 200;
            uiStage.addChild(rect);
            
            /**
             * blur number
             The amount of blur, value greater than 0.
            
             Default Value:
             4
             */
            rect.style.filter.KawaseBlurFilter.blur = 1;

            /**
             * kernels Array.<number>
             * The kernel size of the blur filter, for advanced usage.
             * Default Value:
             * [0]
             * */ 
            rect.style.filter.KawaseBlurFilter.kernels = [0];

            /**
             * pixelSize PIXI.Point | Array.<number>
             Sets the pixel size of the filter. Large size is blurrier. For advanced usage.
            
             Default Value:
             [1, 1]
             */
            rect.style.filter.KawaseBlurFilter.pixelSize = [1,1];
            
            /**
             * quality number
             The quality of the filter, integer greater than 1.
            
             Default Value:
             3
             */
            rect.style.filter.KawaseBlurFilter.quality = 9;

            let pic = new vf.gui.Image();
            pic.style.left = 70;
            pic.style.top = 50;
            pic.style.width = 100;
            pic.style.height = 160;
            pic.src = './assets/dino.png';

            uiStage.addChild(pic);
         
            setInterval(() => {
               pic.style.filter.KawaseBlurFilter.pixelSize = Math.random()*5;
            }, 10)
        });

    }
}