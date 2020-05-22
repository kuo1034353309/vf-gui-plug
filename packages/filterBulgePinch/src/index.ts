import {vertex} from '../../filterTools/fragments';
import fragment from './bulgePinch.frag';

/**
 * @author Julien CLEREL @JuloxRox
 * original filter https://github.com/evanw/glfx.js/blob/master/src/filters/warp/bulgepinch.js by Evan Wallace : http://madebyevan.com/
 */

/**
 * Bulges or pinches the image in a circle.<br>
 * ![original](../tools/screenshots/dist/original.png)![filter](../tools/screenshots/dist/bulge-pinch.gif)
 *
 * @class
 * @extends PIXI.Filter
 * @memberof PIXI.filters
 * @see {@link https://www.npmjs.com/package/@pixi/filter-bulge-pinch|@pixi/filter-bulge-pinch}
 * @see {@link https://www.npmjs.com/package/pixi-filters|pixi-filters}
 * @param {object} [options] Options to use for filter.
 * @param {PIXI.Point|Array<number>} [options.center=[0,0]] The x and y coordinates of the center of the circle of effect.
 * @param {number} [options.radius=100] The radius of the circle of effect.
 * @param {number} [options.strength=1] -1 to 1 (-1 is strong pinch, 0 is no effect, 1 is strong bulge)
 */
class BulgePinchFilter extends vf.gui.Filter {

    constructor() {
        super(vertex, fragment);
        const o:any = {
            center: [0.5, 0.5],
            radius: 100,
            strength: 1
        }
        
        this.uniforms.dimensions = new Float32Array(2);
    }

    apply(filterManager:any, input:any, output:any, clear:any) {
        this.uniforms.dimensions[0] = input.filterFrame.width;
        this.uniforms.dimensions[1] = input.filterFrame.height;
        filterManager.applyFilter(this, input, output, clear);
    }

    /**
     * The radius of the circle of effect.
     *
     * @member {number}
     */
    get radius() {
        return this.uniforms.radius;
    }
    set radius(value) {
        this.uniforms.radius = value;
    }

    /**
     * The strength of the effect. -1 to 1 (-1 is strong pinch, 0 is no effect, 1 is strong bulge)
     *
     * @member {number}
     */
    get strength() {
        return this.uniforms.strength;
    }
    set strength(value) {
        this.uniforms.strength = value;
    }

    /**
     * The x and y coordinates of the center of the circle of effect.
     *
     * @member {PIXI.Point}
     */
    get center() {
        return this.uniforms.center;
    }
    set center(value) {
        this.uniforms.center = value;
    }
}

export { BulgePinchFilter };

