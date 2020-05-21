import { importScript } from "../../../utils"

export class TestAdvancedBloomFilter {
    public constructor(app: vf.Application, uiStage: vf.gui.Stage) {
        this.onLoad(app, uiStage);
    }

    private onLoad(app: vf.Application, uiStage: vf.gui.Stage) {
        let url =
            process.env.NODE_ENV === "production"
                ? "//s.vipkidstatic.com/vf/plugin/TextChoice/0.0.3.js"
                : "./dist/filterAdvancedBloom.js";

        importScript(url, 'AdvancedBloomFilter', (value: any, className: string) => {

            let rect = new vf.gui.Rect();

            rect.color = 0x00ff00;
            rect.x = 20;
            rect.y = 20;
            rect.style.width = 200;
            rect.style.height = 200;
            uiStage.addChild(rect);
            
            // bloomScale number
            // To adjust the strength of the bloom. Higher values is more intense brightness.
            
            // Default Value:
            // 1.0
            rect.style.filter.AdvancedBloomFilter.bloomScale =1;

            //  blur number
            // Sets the strength of the Blur properties simultaneously
            
            // Default Value:
            // 2
            rect.style.filter.AdvancedBloomFilter.blur = 2;

            //  brightness number
            // The brightness, lower value is more subtle brightness, higher value is blown-out.
            
            // Default Value:
            // 1.0
            rect.style.filter.AdvancedBloomFilter.brightness = 1;


            //  kernels number
            // Sets the kernels of the Blur Filter
            
            // Default Value:
            // 4
            rect.style.filter.AdvancedBloomFilter.kernels = 4;

            //  pixelSize number | Array.<number> | PIXI.Point
            // Sets the pixelSize of the Kawase Blur filter
            
            // Default Value:
            // 1
            rect.style.filter.AdvancedBloomFilter.pixelSize = 1;

            //  quality number
            // Sets the quality of the Blur Filter
            
            // Default Value:
            // 4
            rect.style.filter.AdvancedBloomFilter.quality = 4;

            //  resolution number
            // The resolution of the filter.
            rect.style.filter.AdvancedBloomFilter.resolution = 1;
            
            //  threshold number
            // Defines how bright a color needs to be to affect bloom.
            
            // Default Value:
            // 0.5
            rect.style.filter.AdvancedBloomFilter.threshold = .5;
            
            //noise
            let pic = new vf.gui.Image();
            pic.style.left = 70;
            pic.style.top = 50;
            pic.style.width = 100;
            pic.style.height = 160;
            pic.src = './assets/dino.png';

            uiStage.addChild(pic);
            pic.style.filter.AdvancedBloomFilter.bloomScale = 1
            setInterval(() => {
               pic.style.filter.AdvancedBloomFilter.bloomScale = Math.random()*2;
               pic.style.filter.AdvancedBloomFilter.threshold =  Math.random()*5;
            }, 10)
        });

    }
}