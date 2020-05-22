import {vertex} from '../../filterTools/fragments';
import fragment from './bevel.frag';


/**
 * Bevel Filter.<br>
 * ![original](../tools/screenshots/dist/original.png)![filter](../tools/screenshots/dist/bevel.png)
 *
 * @class
 * @extends PIXI.Filter
 * @memberof PIXI.filters
 * @see {@link https://www.npmjs.com/package/@pixi/filter-bevel|@pixi/filter-bevel}
 * @see {@link https://www.npmjs.com/package/pixi-filters|pixi-filters}
 * @param {object} [options] - The optional parameters of the filter.
 * @param {number} [options.rotation = 45] - The angle of the light in degrees.
 * @param {number} [options.thickness = 2] - The tickness of the bevel.
 * @param {number} [options.lightColor = 0xffffff] - Color of the light.
 * @param {number} [options.lightAlpha = 0.7] - Alpha of the light.
 * @param {number} [options.shadowColor = 0x000000] - Color of the shadow.
 * @param {number} [options.shadowAlpha = 0.7] - Alpha of the shadow.
 */
class BevelFilter extends vf.gui.Filter {
    _angle!:number;
    _thickness!:number;
    constructor() {
        
        super(vertex, fragment);
        let o:any = {
            rotation: 45,
            thickness: 2,
            lightColor: 0xffffff,
            lightAlpha: 0.7,
            shadowColor: 0x000000,
            shadowAlpha: 0.7,
        };
        this.uniforms.lightColor = new Float32Array(3);
        this.uniforms.shadowColor = new Float32Array(3);

        /**
         * The angle of the light in degrees.
         * @member {number}
         * @default 45
         */
        this.rotation = o.rotation;

        /**
         * The tickness of the bevel.
         * @member {number}
         * @default 2
         */
        this.thickness = o.thickness;

        /**
         * Color of the light.
         * @member {number}
         * @default 0xffffff
         */
        this.lightColor = o.lightColor;

        /**
         * Alpha of the light.
         * @member {number}
         * @default 0.7
         */
        this.lightAlpha = o.lightAlpha;

        /**
         * Color of the shadow.
         * @member {number}
         * @default 0x000000
         */
        this.shadowColor = o.shadowColor;

        /**
         * Alpha of the shadow.
         * @member {number}
         * @default 0.7
         */
        this.shadowAlpha = o.shadowAlpha;

    }

    /**
     * Update the transform matrix of offset angle.
     * @private
     */
    _updateTransform() {
        this.uniforms.transformX = this.thickness * Math.cos(this._angle);
        this.uniforms.transformY = this.thickness * Math.sin(this._angle);
    }

    get rotation() {
        return this._angle / vf.DEG_TO_RAD;
    }
    set rotation(value) {
        this._angle = value * vf.DEG_TO_RAD;
        this._updateTransform();
    }

    get thickness() {
        return this._thickness;
    }
    set thickness(value) {
        this._thickness = value;
        this._updateTransform();
    }

    get lightColor() {
        return vf.utils.rgb2hex(this.uniforms.lightColor);
    }
    set lightColor(value) {
        vf.utils.hex2rgb(value, this.uniforms.lightColor);
    }

    get lightAlpha() {
        return this.uniforms.lightAlpha;
    }
    set lightAlpha(value) {
        this.uniforms.lightAlpha = value;
    }

    get shadowColor() {
        return vf.utils.rgb2hex(this.uniforms.shadowColor);
    }
    set shadowColor(value) {
        vf.utils.hex2rgb(value, this.uniforms.shadowColor);
    }

    get shadowAlpha() {
        return this.uniforms.shadowAlpha;
    }
    set shadowAlpha(value) {
        this.uniforms.shadowAlpha = value;
    }
}

export { BevelFilter };
