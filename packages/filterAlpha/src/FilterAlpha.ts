import fragment from './fragment.glsl';
export class FilterAlpha extends gui.Filter
{
    /**
     * @param {number} [alpha=1] Amount of alpha from 0 to 1, where 0 is transparent
     */
    constructor(alpha = 1.0)
    {
        super(PIXI.defaultFilterVertex, fragment, { uAlpha: 1 });

        this.alpha = alpha;
        
    }

    /**
     * Coefficient for alpha multiplication
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