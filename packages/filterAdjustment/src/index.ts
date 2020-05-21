

import fragment from './fragment.glsl';

/**
 * @param {number} [options.gamma=1] - The amount of luminance
 * @param {number} [options.saturation=1] - The amount of color saturation
 * @param {number} [options.contrast=1] - The amount of contrast
 * @param {number} [options.brightness=1] - The overall brightness
 * @param {number} [options.red=1] - The multipled red channel
 * @param {number} [options.green=1] - The multipled green channel
 * @param {number} [options.blue=1] - The multipled blue channel
 * @param {number} [options.alpha=1] - The overall alpha amount
 */
class AdjustmentFilter extends vf.gui.Filter {
    constructor() {
        super(vf.gui.Filter.defaultFilterVertex, fragment);
        this.init()
        
    }
    init(){
        this.uniforms.gamma = this.gamma||1;
        this.uniforms.saturation = this.saturation||1;
        this.uniforms.contrast = this.contrast||1;
        this.uniforms.brightness = this.brightness||1;
        this.uniforms.red = this.red||1;
        this.uniforms.green = this.green||1;
        this.uniforms.blue = this.blue||1;
        this.uniforms.alpha = this.alpha||1;
    }
    get gamma(): number
    {
        return this.uniforms.gamma;
    }

    set gamma(value) // eslint-disable-line require-jsdoc
    {
        this.uniforms.gamma =  Math.max(value, 0.0001);
    }
    get saturation(): number
    {
        return this.uniforms.saturation;
    }

    set saturation(value) // eslint-disable-line require-jsdoc
    {
        this.uniforms.saturation = value;
    }
    get contrast(): number
    {
        return this.uniforms.contrast;
    }

    set contrast(value) // eslint-disable-line require-jsdoc
    {
        this.uniforms.contrast = value;
    }
    get brightness(): number
    {
        return this.uniforms.brightness;
    }

    set brightness(value) // eslint-disable-line require-jsdoc
    {
        this.uniforms.brightness = value;
    }
    get red(): number
    {
        return this.uniforms.red;
    }

    set red(value) // eslint-disable-line require-jsdoc
    {
        this.uniforms.red = value;
    }
    get green(): number
    {
        return this.uniforms.green;
    }

    set green(value) // eslint-disable-line require-jsdoc
    {
        this.uniforms.green = value;
    }
    get blue(): number
    {
        return this.uniforms.blue;
    }

    set blue(value) // eslint-disable-line require-jsdoc
    {
        this.uniforms.blue = value;
    }
    get alpha(): number
    {
        return this.uniforms.alpha;
    }

    set alpha(value) // eslint-disable-line require-jsdoc
    {
        this.uniforms.alpha = value;
    }
}

export { AdjustmentFilter };

