
import { importScript } from "../../../utils"

export class TestNoiseFilter {
    public constructor(app: vf.Application, uiStage: vf.gui.Stage) {
        this.onLoad(app, uiStage);
    }

    private onLoad(app: vf.Application, uiStage: vf.gui.Stage) {
        let url =
            process.env.NODE_ENV === "production"
                ? "//s.vipkidstatic.com/vf/plugin/TextChoice/0.0.3.js"
                : "./dist/filterNoise.js";

        importScript(url, 'NoiseFilter', (value: any, className: string) => {

            let rect = new vf.gui.Rect();

            rect.color = 0x00ff00;
            rect.x = 20;
            rect.y = 20;
            rect.style.width = 200;
            rect.style.height = 200;
            uiStage.addChild(rect);
            

            /**
             * noise    number	0.5	optional
            The noise intensity, should be a normalized value in the range [0, 1].  
             */
            rect.style.filter.NoiseFilter.noise = 1;
            
            /**
             * seed	number		optional
            A random seed for the noise generation. Default is Math.random().
             */
            rect.style.filter.NoiseFilter.seed = 1;

            let pic = new vf.gui.Image();
            pic.style.left = 70;
            pic.style.top = 50;
            pic.style.width = 100;
            pic.style.height = 160;
            pic.src = './assets/dino.png';

            uiStage.addChild(pic);
            pic.style.filter.NoiseFilter
            setInterval(() => {
                pic.style.filter.NoiseFilter.noise = Math.random()*5;
            }, 10)
        });

    }
}