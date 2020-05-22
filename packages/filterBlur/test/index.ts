
import { importScript } from "../../../utils"

export class TestBlurFilter{
    public constructor(app: vf.Application, uiStage: vf.gui.Stage){
        this.onLoad(app, uiStage);
    }

    private onLoad(app: vf.Application, uiStage: vf.gui.Stage){
        let url =
            process.env.NODE_ENV === "production"
                ? "//s.vipkidstatic.com/vf/plugin/TextChoice/0.0.3.js"
                : "./dist/filterBlur.js";
                
        importScript(url, 'BlurFilter', (value: any, className: string) => {
            
            let rect = new vf.gui.Rect();
            
            rect.color = 0x00ff00;
            rect.x = 20;
            rect.y = 20;
            rect.style.width = 200;
            rect.style.height = 200;
            uiStage.addChild(rect);
           
            // strength	number	8	optional
            // The strength of the blur filter.
            rect.style.filter.BlurFilter.strength = 8;

            // quality	number	4	optional
            // The quality of the blur filter.
            rect.style.filter.BlurFilter.quality = 4;

            // resolution	number	1	optional
            // The resolution of the blur filter. can't be 0;
            rect.style.filter.BlurFilter.resolution = 1;
            
            // kernelSize	number	5	optional
            // The kernelSize of the blur filter.Options: 5, 7, 9, 11, 13, 15.
            rect.style.filter.BlurFilter.kernelSize = 5;

            /**
             *  autoFit boolean inherited
             If enabled, PixiJS will fit the filter area into boundaries for better performance. Switch it off if it does not work for specific shader.
             */
            rect.style.filter.BlurFilter.autoFit = false;
            
            /**
             *  blendMode number overrides
            Sets the blendmode of the filter
            
             Default Value:
             vf.BLEND_MODES.NORMAL
             */
            rect.style.filter.BlurFilter.blendMode = vf.BLEND_MODES.NORMAL;

            /**
             * blur number
             Sets the strength of both the blurX and blurY properties simultaneously
            
             Default Value:
             2
             */
            rect.style.filter.BlurFilter.blur = 2;

            /**
             *  blurX number
             Sets the strength of the blurX property
            
             Default Value:
             2
             */
            rect.style.filter.BlurFilter.blurX = 2;

            /**
             * blurY number
             Sets the strength of the blurY property
            
             Default Value:
             2
             */
            rect.style.filter.BlurFilter.blurY = 2;

            /**
             * enabled boolean inherited
             If enabled is true the filter is applied, if false it will not.
             */
            rect.style.filter.BlurFilter.enabled = true;


            /**
             * padding number inherited overrides
             The padding of the filter. Some filters require extra space to breath such as a blur. Increasing this will add extra width and height to the bounds of the object that the filter is applied to.
             */
            rect.style.filter.BlurFilter.padding = 1;

            /**
             * repeatEdgePixels bool
             If set to true the edge of the target will be clamped
             
             Default Value:
             false
             */
            rect.style.filter.BlurFilter.repeatEdgePixels = false;

            /**
             * resolution number inherited overrides
             The resolution of the filter. Setting this to be lower will lower the quality but increase the performance of the filter.
             */
            rect.style.filter.BlurFilter.resolution = 4;

            let pic = new vf.gui.Image();
            pic.style.left = 70;
            pic.style.top = 50;
            pic.style.width = 100;
            pic.style.height = 160;
            pic.src = './assets/dino.png';
            
            uiStage.addChild(pic);
          
            pic.style.filter.BlurFilter;
            
            setInterval(()=>{
                pic.style.filter.BlurFilter.blur = Math.random()*5;
            },10)
           
        });

    }
}