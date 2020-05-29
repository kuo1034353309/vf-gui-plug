import fragment from './colorMatrix.frag';

type ArrayFixed<T, L extends number> = [ T, ...Array<T> ] & { length: L };


export type ColorMatrix = ArrayFixed<number, 20>;

export class ColorMatrixFilter extends vf.gui.Filter
{
    public grayscale: ((scale: number, multiply: boolean) => void) | undefined;

    constructor()
    {
        const uniforms = {
            m: new Float32Array([1, 0, 0, 0, 0,
                0, 1, 0, 0, 0,
                0, 0, 1, 0, 0,
                0, 0, 0, 1, 0]),
            uAlpha: 1,
        };

        super(vf.gui.Filter.defaultFilterVertex, fragment, uniforms);
        
        this.alpha = 1;
    }

    /**
     * Transforms current matrix and set the new one
     *
     * @param {number[]} matrix - 5x4 matrix
     * @param {boolean} multiply - if true, current matrix and matrix are multiplied. If false,
     *  just set the current matrix with @param matrix
     */
    private _loadMatrix(matrix: ColorMatrix, multiply = false): void
    {
        let newMatrix = matrix;

        if (multiply)
        {
            this._multiply(newMatrix, this.uniforms.m, matrix);
            newMatrix = this._colorMatrix(newMatrix) as any;
        }

        // set the new matrix
        this.uniforms.m = newMatrix;
    }

    /**
     * Multiplies two mat5's
     *
     * @private
     * @param {number[]} out - 5x4 matrix the receiving matrix
     * @param {number[]} a - 5x4 matrix the first operand
     * @param {number[]} b - 5x4 matrix the second operand
     * @returns {number[]} 5x4 matrix
     */
    private _multiply(out: ColorMatrix, a: ColorMatrix, b: ColorMatrix): ColorMatrix
    {
        // Red Channel
        out[0] = (a[0] * b[0]) + (a[1] * b[5]) + (a[2] * b[10]) + (a[3] * b[15]);
        out[1] = (a[0] * b[1]) + (a[1] * b[6]) + (a[2] * b[11]) + (a[3] * b[16]);
        out[2] = (a[0] * b[2]) + (a[1] * b[7]) + (a[2] * b[12]) + (a[3] * b[17]);
        out[3] = (a[0] * b[3]) + (a[1] * b[8]) + (a[2] * b[13]) + (a[3] * b[18]);
        out[4] = (a[0] * b[4]) + (a[1] * b[9]) + (a[2] * b[14]) + (a[3] * b[19]) + a[4];

        // Green Channel
        out[5] = (a[5] * b[0]) + (a[6] * b[5]) + (a[7] * b[10]) + (a[8] * b[15]);
        out[6] = (a[5] * b[1]) + (a[6] * b[6]) + (a[7] * b[11]) + (a[8] * b[16]);
        out[7] = (a[5] * b[2]) + (a[6] * b[7]) + (a[7] * b[12]) + (a[8] * b[17]);
        out[8] = (a[5] * b[3]) + (a[6] * b[8]) + (a[7] * b[13]) + (a[8] * b[18]);
        out[9] = (a[5] * b[4]) + (a[6] * b[9]) + (a[7] * b[14]) + (a[8] * b[19]) + a[9];

        // Blue Channel
        out[10] = (a[10] * b[0]) + (a[11] * b[5]) + (a[12] * b[10]) + (a[13] * b[15]);
        out[11] = (a[10] * b[1]) + (a[11] * b[6]) + (a[12] * b[11]) + (a[13] * b[16]);
        out[12] = (a[10] * b[2]) + (a[11] * b[7]) + (a[12] * b[12]) + (a[13] * b[17]);
        out[13] = (a[10] * b[3]) + (a[11] * b[8]) + (a[12] * b[13]) + (a[13] * b[18]);
        out[14] = (a[10] * b[4]) + (a[11] * b[9]) + (a[12] * b[14]) + (a[13] * b[19]) + a[14];

        // Alpha Channel
        out[15] = (a[15] * b[0]) + (a[16] * b[5]) + (a[17] * b[10]) + (a[18] * b[15]);
        out[16] = (a[15] * b[1]) + (a[16] * b[6]) + (a[17] * b[11]) + (a[18] * b[16]);
        out[17] = (a[15] * b[2]) + (a[16] * b[7]) + (a[17] * b[12]) + (a[18] * b[17]);
        out[18] = (a[15] * b[3]) + (a[16] * b[8]) + (a[17] * b[13]) + (a[18] * b[18]);
        out[19] = (a[15] * b[4]) + (a[16] * b[9]) + (a[17] * b[14]) + (a[18] * b[19]) + a[19];

        return out;
    }

    /**
     * Create a Float32 Array and normalize the offset component to 0-1
     *
     * @private
     * @param {number[]} matrix - 5x4 matrix
     * @return {number[]} 5x4 matrix with all values between 0-1
     */
    private _colorMatrix(matrix: ColorMatrix): ColorMatrix
    {
        // Create a Float32 Array and normalize the offset component to 0-1
        const m = new Float32Array(matrix);

        m[4] /= 255;
        m[9] /= 255;
        m[14] /= 255;
        m[19] /= 255;

        return m as any;
    }

    /**
     * Adjusts brightness
     *
     * @param {number} b - value of the brigthness (0-1, where 0 is black)
     * @param {boolean} multiply - if true, current matrix and matrix are multiplied. If false,
     *  just set the current matrix with @param matrix
     */
    public brightness(b: number, multiply: boolean): void
    {
        const matrix: ColorMatrix = [
            b, 0, 0, 0, 0,
            0, b, 0, 0, 0,
            0, 0, b, 0, 0,
            0, 0, 0, 1, 0,
        ];

        this._loadMatrix(matrix, multiply);
    }

    /**
     * Set the matrices in grey scales
     *
     * @param {number} scale - value of the grey (0-1, where 0 is black)
     * @param {boolean} multiply - if true, current matrix and matrix are multiplied. If false,
     *  just set the current matrix with @param matrix
     */
    public greyscale(scale: number, multiply: boolean): void
    {
        const matrix: ColorMatrix = [
            scale, scale, scale, 0, 0,
            scale, scale, scale, 0, 0,
            scale, scale, scale, 0, 0,
            0, 0, 0, 1, 0,
        ];

        this._loadMatrix(matrix, multiply);
    }

    /**
     * Set the black and white matrice.
     *
     * @param {boolean} multiply - if true, current matrix and matrix are multiplied. If false,
     *  just set the current matrix with @param matrix
     */
    public blackAndWhite(multiply: boolean): void
    {
        const matrix: ColorMatrix = [
            0.3, 0.6, 0.1, 0, 0,
            0.3, 0.6, 0.1, 0, 0,
            0.3, 0.6, 0.1, 0, 0,
            0, 0, 0, 1, 0,
        ];

        this._loadMatrix(matrix, multiply);
    }

    /**
     * Set the hue property of the color
     *
     * @param {number} rotation - in degrees
     * @param {boolean} multiply - if true, current matrix and matrix are multiplied. If false,
     *  just set the current matrix with @param matrix
     */
    public hue(rotation: number, multiply: boolean): void
    {
        rotation = (rotation || 0) / 180 * Math.PI;

        const cosR = Math.cos(rotation);
        const sinR = Math.sin(rotation);
        const sqrt = Math.sqrt;

        /* a good approximation for hue rotation
         This matrix is far better than the versions with magic luminance constants
         formerly used here, but also used in the starling framework (flash) and known from this
         old part of the internet: quasimondo.com/archives/000565.php

         This new matrix is based on rgb cube rotation in space. Look here for a more descriptive
         implementation as a shader not a general matrix:
         https://github.com/evanw/glfx.js/blob/58841c23919bd59787effc0333a4897b43835412/src/filters/adjust/huesaturation.js

         This is the source for the code:
         see http://stackoverflow.com/questions/8507885/shift-hue-of-an-rgb-color/8510751#8510751
         */

        const w = 1 / 3;
        const sqrW = sqrt(w); // weight is

        const a00 = cosR + ((1.0 - cosR) * w);
        const a01 = (w * (1.0 - cosR)) - (sqrW * sinR);
        const a02 = (w * (1.0 - cosR)) + (sqrW * sinR);

        const a10 = (w * (1.0 - cosR)) + (sqrW * sinR);
        const a11 = cosR + (w * (1.0 - cosR));
        const a12 = (w * (1.0 - cosR)) - (sqrW * sinR);

        const a20 = (w * (1.0 - cosR)) - (sqrW * sinR);
        const a21 = (w * (1.0 - cosR)) + (sqrW * sinR);
        const a22 = cosR + (w * (1.0 - cosR));

        const matrix: ColorMatrix = [
            a00, a01, a02, 0, 0,
            a10, a11, a12, 0, 0,
            a20, a21, a22, 0, 0,
            0, 0, 0, 1, 0,
        ];

        this._loadMatrix(matrix, multiply);
    }

    /**
     * Set the contrast matrix, increase the separation between dark and bright
     * Increase contrast : shadows darker and highlights brighter
     * Decrease contrast : bring the shadows up and the highlights down
     *
     * @param {number} amount - value of the contrast (0-1)
     * @param {boolean} multiply - if true, current matrix and matrix are multiplied. If false,
     *  just set the current matrix with @param matrix
     */
    public contrast(amount: number, multiply: boolean): void
    {
        const v = (amount || 0) + 1;
        const o = -0.5 * (v - 1);

        const matrix: ColorMatrix = [
            v, 0, 0, 0, o,
            0, v, 0, 0, o,
            0, 0, v, 0, o,
            0, 0, 0, 1, 0,
        ];

        this._loadMatrix(matrix, multiply);
    }

    /**
     * Set the saturation matrix, increase the separation between colors
     * Increase saturation : increase contrast, brightness, and sharpness
     *
     * @param {number} amount - The saturation amount (0-1)
     * @param {boolean} [multiply] - if true, current matrix and matrix are multiplied. If false,
     *  just set the current matrix with @param matrix
     */
    public saturate(amount = 0, multiply?: boolean): void
    {
        const x = (amount * 2 / 3) + 1;
        const y = ((x - 1) * -0.5);

        const matrix: ColorMatrix = [
            x, y, y, 0, 0,
            y, x, y, 0, 0,
            y, y, x, 0, 0,
            0, 0, 0, 1, 0,
        ];

        this._loadMatrix(matrix, multiply);
    }

    /**
     * Desaturate image (remove color)
     *
     * Call the saturate function
     *
     */
    public desaturate(): void // eslint-disable-line no-unused-vars
    {
        this.saturate(-1);
    }

    /**
     * Negative image (inverse of classic rgb matrix)
     *
     * @param {boolean} multiply - if true, current matrix and matrix are multiplied. If false,
     *  just set the current matrix with @param matrix
     */
    public negative(multiply: boolean): void
    {
        const matrix: ColorMatrix = [
            -1, 0, 0, 1, 0,
            0, -1, 0, 1, 0,
            0, 0, -1, 1, 0,
            0, 0, 0, 1, 0,
        ];

        this._loadMatrix(matrix, multiply);
    }

    /**
     * Sepia image
     *
     * @param {boolean} multiply - if true, current matrix and matrix are multiplied. If false,
     *  just set the current matrix with @param matrix
     */
    public sepia(multiply: boolean): void
    {
        const matrix: ColorMatrix = [
            0.393, 0.7689999, 0.18899999, 0, 0,
            0.349, 0.6859999, 0.16799999, 0, 0,
            0.272, 0.5339999, 0.13099999, 0, 0,
            0, 0, 0, 1, 0,
        ];

        this._loadMatrix(matrix, multiply);
    }

    /**
     * Color motion picture process invented in 1916 (thanks Dominic Szablewski)
     *
     * @param {boolean} multiply - if true, current matrix and matrix are multiplied. If false,
     *  just set the current matrix with @param matrix
     */
    public technicolor(multiply: boolean): void
    {
        const matrix: ColorMatrix = [
            1.9125277891456083, -0.8545344976951645, -0.09155508482755585, 0, 11.793603434377337,
            -0.3087833385928097, 1.7658908555458428, -0.10601743074722245, 0, -70.35205161461398,
            -0.231103377548616, -0.7501899197440212, 1.847597816108189, 0, 30.950940869491138,
            0, 0, 0, 1, 0,
        ];

        this._loadMatrix(matrix, multiply);
    }

    /**
     * Polaroid filter
     *
     * @param {boolean} multiply - if true, current matrix and matrix are multiplied. If false,
     *  just set the current matrix with @param matrix
     */
    public polaroid(multiply: boolean): void
    {
        const matrix: ColorMatrix = [
            1.438, -0.062, -0.062, 0, 0,
            -0.122, 1.378, -0.122, 0, 0,
            -0.016, -0.016, 1.483, 0, 0,
            0, 0, 0, 1, 0,
        ];

        this._loadMatrix(matrix, multiply);
    }

    /**
     * Filter who transforms : Red -> Blue and Blue -> Red
     *
     * @param {boolean} multiply - if true, current matrix and matrix are multiplied. If false,
     *  just set the current matrix with @param matrix
     */
    public toBGR(multiply: boolean): void
    {
        const matrix: ColorMatrix = [
            0, 0, 1, 0, 0,
            0, 1, 0, 0, 0,
            1, 0, 0, 0, 0,
            0, 0, 0, 1, 0,
        ];

        this._loadMatrix(matrix, multiply);
    }

    /**
     * Color reversal film introduced by Eastman Kodak in 1935. (thanks Dominic Szablewski)
     *
     * @param {boolean} multiply - if true, current matrix and matrix are multiplied. If false,
     *  just set the current matrix with @param matrix
     */
    public kodachrome(multiply: boolean): void
    {
        const matrix: ColorMatrix = [
            1.1285582396593525, -0.3967382283601348, -0.03992559172921793, 0, 63.72958762196502,
            -0.16404339962244616, 1.0835251566291304, -0.05498805115633132, 0, 24.732407896706203,
            -0.16786010706155763, -0.5603416277695248, 1.6014850761964943, 0, 35.62982807460946,
            0, 0, 0, 1, 0,
        ];

        this._loadMatrix(matrix, multiply);
    }

    /**
     * Brown delicious browni filter (thanks Dominic Szablewski)
     *
     * @param {boolean} multiply - if true, current matrix and matrix are multiplied. If false,
     *  just set the current matrix with @param matrix
     */
    public browni(multiply: boolean): void
    {
        const matrix: ColorMatrix = [
            0.5997023498159715, 0.34553243048391263, -0.2708298674538042, 0, 47.43192855600873,
            -0.037703249837783157, 0.8609577587992641, 0.15059552388459913, 0, -36.96841498319127,
            0.24113635128153335, -0.07441037908422492, 0.44972182064877153, 0, -7.562075277591283,
            0, 0, 0, 1, 0,
        ];

        this._loadMatrix(matrix, multiply);
    }

    /**
     * Vintage filter (thanks Dominic Szablewski)
     *
     * @param {boolean} multiply - if true, current matrix and matrix are multiplied. If false,
     *  just set the current matrix with @param matrix
     */
    public vintage(multiply: boolean): void
    {
        const matrix: ColorMatrix = [
            0.6279345635605994, 0.3202183420819367, -0.03965408211312453, 0, 9.651285835294123,
            0.02578397704808868, 0.6441188644374771, 0.03259127616149294, 0, 7.462829176470591,
            0.0466055556782719, -0.0851232987247891, 0.5241648018700465, 0, 5.159190588235296,
            0, 0, 0, 1, 0,
        ];

        this._loadMatrix(matrix, multiply);
    }

    /**
     * We don't know exactly what it does, kind of gradient map, but funny to play with!
     *
     * @param {number} desaturation - Tone values.
     * @param {number} toned - Tone values.
     * @param {number} lightColor - Tone values, example: `0xFFE580`
     * @param {number} darkColor - Tone values, example: `0xFFE580`
     * @param {boolean} multiply - if true, current matrix and matrix are multiplied. If false,
     *  just set the current matrix with @param matrix
     */
    public colorTone(desaturation: number, toned: number, lightColor: number, darkColor: number, multiply: boolean): void
    {
        desaturation = desaturation || 0.2;
        toned = toned || 0.15;
        lightColor = lightColor || 0xFFE580;
        darkColor = darkColor || 0x338000;

        const lR = ((lightColor >> 16) & 0xFF) / 255;
        const lG = ((lightColor >> 8) & 0xFF) / 255;
        const lB = (lightColor & 0xFF) / 255;

        const dR = ((darkColor >> 16) & 0xFF) / 255;
        const dG = ((darkColor >> 8) & 0xFF) / 255;
        const dB = (darkColor & 0xFF) / 255;

        const matrix: ColorMatrix = [
            0.3, 0.59, 0.11, 0, 0,
            lR, lG, lB, desaturation, 0,
            dR, dG, dB, toned, 0,
            lR - dR, lG - dG, lB - dB, 0, 0,
        ];

        this._loadMatrix(matrix, multiply);
    }

    /**
     * Night effect
     *
     * @param {number} intensity - The intensity of the night effect.
     * @param {boolean} multiply - if true, current matrix and matrix are multiplied. If false,
     *  just set the current matrix with @param matrix
     */
    public night(intensity: number, multiply: boolean): void
    {
        intensity = intensity || 0.1;

        const matrix: ColorMatrix = [
            intensity * (-2.0), -intensity, 0, 0, 0,
            -intensity, 0, intensity, 0, 0,
            0, intensity, intensity * 2.0, 0, 0,
            0, 0, 0, 1, 0,
        ];

        this._loadMatrix(matrix, multiply);
    }

    /**
     * Predator effect
     *
     * Erase the current matrix by setting a new indepent one
     *
     * @param {number} amount - how much the predator feels his future victim
     * @param {boolean} multiply - if true, current matrix and matrix are multiplied. If false,
     *  just set the current matrix with @param matrix
     */
    public predator(amount: number, multiply: boolean): void
    {
        const matrix: ColorMatrix = [
            // row 1
            11.224130630493164 * amount,
            -4.794486999511719 * amount,
            -2.8746118545532227 * amount,
            0 * amount,
            0.40342438220977783 * amount,
            // row 2
            -3.6330697536468506 * amount,
            9.193157196044922 * amount,
            -2.951810836791992 * amount,
            0 * amount,
            -1.316135048866272 * amount,
            // row 3
            -3.2184197902679443 * amount,
            -4.2375030517578125 * amount,
            7.476448059082031 * amount,
            0 * amount,
            0.8044459223747253 * amount,
            // row 4
            0, 0, 0, 1, 0,
        ];

        this._loadMatrix(matrix, multiply);
    }

    /**
     * LSD effect
     *
     * Multiply the current matrix
     *
     * @param {boolean} multiply - if true, current matrix and matrix are multiplied. If false,
     *  just set the current matrix with @param matrix
     */
    public lsd(multiply: boolean): void
    {
        const matrix: ColorMatrix = [
            2, -0.4, 0.5, 0, 0,
            -0.5, 2, -0.4, 0, 0,
            -0.4, -0.5, 3, 0, 0,
            0, 0, 0, 1, 0,
        ];

        this._loadMatrix(matrix, multiply);
    }

    /**
     * Erase the current matrix by setting the default one
     *
     */
    public reset(): void
    {
        const matrix: ColorMatrix = [
            1, 0, 0, 0, 0,
            0, 1, 0, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 0, 1, 0,
        ];

        this._loadMatrix(matrix, false);
    }

    /**
     * The matrix of the color matrix filter
     *
     * @member {number[]}
     * @default [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0]
     */
    get matrix(): ColorMatrix
    {
        return this.uniforms.m;
    }

    set matrix(value) // eslint-disable-line require-jsdoc
    {
        this.uniforms.m = value;
    }

    /**
     * The opacity value to use when mixing the original and resultant colors.
     *
     * When the value is 0, the original color is used without modification.
     * When the value is 1, the result color is used.
     * When in the range (0, 1) the color is interpolated between the original and result by this amount.
     *
     * @member {number}
     * @default 1
     */
    get alpha(): number
    {
        return this.uniforms.uAlpha;
    }

    set alpha(value) // eslint-disable-line require-jsdoc
    {
        this.uniforms.uAlpha = value;
    }
}

// Americanized alias
ColorMatrixFilter.prototype.grayscale = ColorMatrixFilter.prototype.greyscale;
















// /**
//  * @param {number} [options.gamma=1] - The amount of luminance
//  * @param {number} [options.saturation=1] - The amount of color saturation
//  * @param {number} [options.contrast=1] - The amount of contrast
//  * @param {number} [options.brightness=1] - The overall brightness
//  * @param {number} [options.red=1] - The multipled red channel
//  * @param {number} [options.green=1] - The multipled green channel
//  * @param {number} [options.blue=1] - The multipled blue channel
//  * @param {number} [options.alpha=1] - The overall alpha amount
//  */
// class AdjustmentFilter extends vf.gui.Filter {
//     constructor() {
//         super(vf.gui.Filter.defaultFilterVertex, fragment);
//         this.init()
//     }
//     init(){
//         this.uniforms.gamma = this.gamma||1;
//         this.uniforms.saturation = this.saturation||1;
//         this.uniforms.contrast = this.contrast||1;
//         this.uniforms.brightness = this.brightness||1;
//         this.uniforms.red = this.red||1;
//         this.uniforms.green = this.green||1;
//         this.uniforms.blue = this.blue||1;
//         this.uniforms.alpha = this.alpha||1;
//     }
//     get gamma(): number
//     {
//         return this.uniforms.gamma;
//     }

//     set gamma(value) // eslint-disable-line require-jsdoc
//     {
//         this.uniforms.gamma =  Math.max(value, 0.0001);
//     }
//     get saturation(): number
//     {
//         return this.uniforms.saturation;
//     }

//     set saturation(value) // eslint-disable-line require-jsdoc
//     {
//         this.uniforms.saturation = value;
//     }
//     get contrast(): number
//     {
//         return this.uniforms.contrast;
//     }

//     set contrast(value) // eslint-disable-line require-jsdoc
//     {
//         this.uniforms.contrast = value;
//     }
//     get brightness(): number
//     {
//         return this.uniforms.brightness;
//     }

//     set brightness(value) // eslint-disable-line require-jsdoc
//     {
//         this.uniforms.brightness = value;
//     }
//     get red(): number
//     {
//         return this.uniforms.red;
//     }

//     set red(value) // eslint-disable-line require-jsdoc
//     {
//         this.uniforms.red = value;
//     }
//     get green(): number
//     {
//         return this.uniforms.green;
//     }

//     set green(value) // eslint-disable-line require-jsdoc
//     {
//         this.uniforms.green = value;
//     }
//     get blue(): number
//     {
//         return this.uniforms.blue;
//     }

//     set blue(value) // eslint-disable-line require-jsdoc
//     {
//         this.uniforms.blue = value;
//     }
//     get alpha(): number
//     {
//         return this.uniforms.alpha;
//     }

//     set alpha(value) // eslint-disable-line require-jsdoc
//     {
//         this.uniforms.alpha = value;
//     }
// }

// export { AdjustmentFilter };
