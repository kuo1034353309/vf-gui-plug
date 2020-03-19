import fragment from './fragment.glsl';
export class FilterAlpha extends gui.Filter
{
    /**
     * 构造函数不能包含任何参数，需要以set get实现
     */
    constructor()
    {
        super(gui.Filter.defaultFilterVertex, fragment, { uAlpha: 1 });
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