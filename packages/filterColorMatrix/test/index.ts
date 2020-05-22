
import { importScript } from "../../../utils"

export class TestColorMatrixFilter {
    public constructor(app: vf.Application, uiStage: vf.gui.Stage) {
        this.onLoad(app, uiStage);
    }

    private onLoad(app: vf.Application, uiStage: vf.gui.Stage) {
        let url =
            process.env.NODE_ENV === "production"
                ? "//s.vipkidstatic.com/vf/plugin/TextChoice/0.0.3.js"
                : "./dist/filterColorMatrix.js";

        importScript(url, 'ColorMatrixFilter', (value: any, className: string) => {

            let rect = new vf.gui.Rect();

            rect.color = 0x00ff00;
            rect.x = 20;
            rect.y = 20;
            rect.style.width = 200;
            rect.style.height = 200;
            uiStage.addChild(rect);

            //属性们
            /**
             *  alpha number 
             The opacity value to use when mixing the original and resultant colors.
             When the value is 0, the original color is used without modification. When the value is 1, the result color is used. When in the range (0, 1) the color is interpolated between the original and result by this amount.
             Default Value: 1
             */
            rect.style.filter.ColorMatrixFilter.alpha = 1;

            /**
             * autoFit boolean inherited
            If enabled, PixiJS will fit the filter area into boundaries for better performance.Switch it off if it does not work for specific shader.
             */
            rect.style.filter.ColorMatrixFilter.autoFit = true;

            /**
             *  blendMode number inherited
            Sets the blendmode of the filter
             Default Value:
             vf.BLEND_MODES.NORMAL
             */
            rect.style.filter.ColorMatrixFilter.blendMode = vf.BLEND_MODES.NORMAL;

            /**
             *  enabled boolean inherited
             If enabled is true the filter is applied, if false it will not.
             */
            rect.style.filter.ColorMatrixFilter.enabled = true;

            /**
             *  legacy boolean readonly inherited
             Legacy filters use position and uvs from attributes
             */
            rect.style.filter.ColorMatrixFilter.legacy;

            /**
             *  matrix Array.< number >
                 The matrix of the color matrix filter           
             Default Value:
             [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0]
             */
            rect.style.filter.ColorMatrixFilter.matrix = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0];

            /**
             *  padding number inherited
           The padding of the filter.Some filters require extra space to breath such as a blur.Increasing this will add extra width and height to the bounds of the object that the filter is applied to.            
             */
            rect.style.filter.ColorMatrixFilter.padding = 0;

            /**
             * program PIXI.Program inherited
             Program that the shader uses
             */
            rect.style.filter.ColorMatrixFilter.program;

            /**
             * resolution number inherited
             The resolution of the filter.Setting this to be lower will lower the quality but increase the performance of the filter.
             */
            rect.style.filter.ColorMatrixFilter.resolution = 1;

            /**
             *  uniforms object readonly inherited
            Shader uniform values, shortcut for uniformGroup.uniforms
             */
            rect.style.filter.ColorMatrixFilter.uniforms;


            //方法们
            /**
             *  _loadMatrix(matrix, multiply)
             Transforms current matrix and set the new one
             matrix	Array.< number >   5x4 matrix       
             multiply	boolean	false
             if true, current matrix and matrix are multiplied.If false, just set the current matrix with @param matrix
             */
            rect.style.filter.ColorMatrixFilter._loadMatrix();

            /**
             *  blackAndWhite(multiply)
             Set the black and white matrice.
             multiply	boolean
             if true, current matrix and matrix are multiplied.If false, just set the current matrix with @param matrix
             */
            rect.style.filter.ColorMatrixFilter.blackAndWhite();

            /**
             * brightness(b, multiply)
             Adjusts brightness
             b	number
             value of the brigthness(0 - 1, where 0 is black)
             multiply	boolean
             if true, current matrix and matrix are multiplied.If false, just set the current matrix with @param matrix
             */
            rect.style.filter.ColorMatrixFilter.brightness();

            /**
             *  browni(multiply)
             Brown delicious browni filter(thanks Dominic Szablewski)
             multiply	boolean
             if true, current matrix and matrix are multiplied.If false, just set the current matrix with @param matrix
             */
            rect.style.filter.ColorMatrixFilter.browni();

            /**
             *  colorTone(desaturation, toned, lightColor, darkColor, multiply)
             We don't know exactly what it does, kind of gradient map, but funny to play with!
             desaturation	number
             Tone values.

             toned	number
             Tone values.

             lightColor	string
             Tone values, example: 0xFFE580

             darkColor	string
             Tone values, example: 0xFFE580
               multiply	boolean
             if true, current matrix and matrix are multiplied.If false, just set the current matrix with @param matrix
             */
            rect.style.filter.ColorMatrixFilter.colorTone();

            /**
             *  contrast(amount, multiply)
            Set the contrast matrix, increase the separation between dark and bright Increase contrast: shadows darker and highlights brighter Decrease contrast: bring the shadows up and the highlights down

            amount	number
            value of the contrast(0 - 1)

            multiply boolean
            if true, current matrix and matrix are multiplied.If false, just set the current matrix with @param matrix
             */
            rect.style.filter.ColorMatrixFilter.contrast();

            /**
             *  desaturate()
             Desaturate image(remove color)
             Call the saturate function
             */
            rect.style.filter.ColorMatrixFilter.desaturate();

            /**
             * greyscale(scale, multiply)
             Set the matrices in grey scales
             scale	number
             value of the grey(0 - 1, where 0 is black)

             multiply	boolean
             if true, current matrix and matrix are multiplied.If false, just set the current matrix with @param matrix
             */
            rect.style.filter.ColorMatrixFilter.greyscale();

            /**
             *  hue(rotation, multiply)
             Set the hue property of the color
             rotation	number
             in degrees

             multiply	boolean
             if true, current matrix and matrix are multiplied.If false, just set the current matrix with @param matrix
             */
            rect.style.filter.ColorMatrixFilter.hue();

            /**
             *   kodachrome(multiply)
             Color reversal film introduced by Eastman Kodak in 1935.(thanks Dominic Szablewski)
             multiply	boolean
             if true, current matrix and matrix are multiplied.If false, just set the current matrix with @param matrix
             */
            rect.style.filter.ColorMatrixFilter.kodachrome();

            /**
             *  lsd(multiply)
              LSD effect
              Multiply the current matrix
              multiply	boolean
              if true, current matrix and matrix are multiplied.If false, just set the current matrix with @param matrix
             */
            rect.style.filter.ColorMatrixFilter.lsd();

            /**
             * negative(multiply)
             Negative image(inverse of classic rgb matrix)
             multiply	boolean
             if true, current matrix and matrix are multiplied.If false, just set the current matrix with @param matrix
             */
            rect.style.filter.ColorMatrixFilter.negative();

            /**
             * night(intensity, multiply)
             Night effect
             intensity	number
             The intensity of the night effect.

             multiply	boolean
             if true, current matrix and matrix are multiplied.If false, just set the current matrix with @param matrix
             */
            rect.style.filter.ColorMatrixFilter.night();

            /**
             * polaroid(multiply)       
             Polaroid filter

             multiply	boolean
             if true, current matrix and matrix are multiplied.If false, just set the current matrix with @param matrix
             */
            rect.style.filter.ColorMatrixFilter.polaroid();

            /**
             * predator(amount, multiply)
               Predator effect
               Erase the current matrix by setting a new indepent one
               amount	number
               how much the predator feels his future victim

               multiply	boolean
               if true, current matrix and matrix are multiplied.If false, just set the current matrix with @param matrix
             */
            rect.style.filter.ColorMatrixFilter.predator();

            /**
             *  reset()
            Erase the current matrix by setting the default one
             */
            rect.style.filter.ColorMatrixFilter.reset();

            /**
             * saturate(amount, multiply)
             Set the saturation matrix, increase the separation between colors Increase saturation: increase contrast, brightness, and sharpness

             amount	number	0
             The saturation amount(0 - 1)

             multiply	boolean
             if true, current matrix and matrix are multiplied.If false, just set the current matrix with @param matrix
             */
            rect.style.filter.ColorMatrixFilter.saturate();

            /**
             * sepia(multiply)
             Sepia image

             multiply	boolean
             if true, current matrix and matrix are multiplied.If false, just set the current matrix with @param matrix
             */
            rect.style.filter.ColorMatrixFilter.sepia();

            /**
             * technicolor(multiply)    
             Color motion picture process invented in 1916(thanks Dominic Szablewski)
             multiply	boolean
             if true, current matrix and matrix are multiplied.If false, just set the current matrix with @param matrix
             */
            rect.style.filter.ColorMatrixFilter.technicolor();

            /**
             * toBGR(multiply)
             Filter who transforms: Red -> Blue and Blue -> Red

             multiply	boolean
             if true, current matrix and matrix are multiplied.If false, just set the current matrix with @param matrix
             */
            rect.style.filter.ColorMatrixFilter.toBGR();

            /**
             * vintage(multiply)
             Vintage filter(thanks Dominic Szablewski)

             multiply	boolean
             if true, current matrix and matrix are multiplied.If false, just set the current matrix with @param matrix
             */
            rect.style.filter.ColorMatrixFilter.vintage();

            rect.style.filter.ColorMatrixFilter.matrix = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0]

            let pic = new vf.gui.Image();
            pic.style.left = 70;
            pic.style.top = 50;
            pic.style.width = 100;
            pic.style.height = 160;
            pic.src = './assets/dino.png';

            uiStage.addChild(pic);
            pic.style.filter.ColorMatrixFilter.matrix = [1, 1, 9, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0]
           // pic.style.filter.ColorMatrixFilter.vintage();
            //pic.style.filter.ColorMatrixFilter.hue(90,true);
            setInterval(() => {
                pic.style.filter.ColorMatrixFilter.matrix = [Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random()]
            }, 500)
        });

    }
}