import { FilterAlpha } from '../../filterAlpha/src';
import { BlurFilterPass } from '../../filterBlur/src';

/**
 * The BloomFilter applies a Gaussian blur to an object.
 * The strength of the blur can be set for x- and y-axis separately.<br>
 * ![original](../tools/screenshots/dist/original.png)![filter](../tools/screenshots/dist/bloom.png)
 *
 */
class BloomFilter extends vf.gui.Filter {
    blurXFilter:BlurFilterPass;
    blurYFilter:BlurFilterPass;
    defaultFilter:FilterAlpha;
    constructor() {
        super();
        const o: any = {
            blur: 2,
            quality: 4,
            resolution: vf.settings.RESOLUTION,
            kernelSize: 5
        }
        let blurX;
        let blurY;
        blurX = blurY = o.blur;
        
        this.blurXFilter = new BlurFilterPass(true, blurX, o.quality, o.resolution, o.kernelSize);
        this.blurYFilter = new BlurFilterPass(false, blurY, o.quality, o.resolution, o.kernelSize);
        this.blurYFilter.blendMode = vf.BLEND_MODES.SCREEN;
        this.defaultFilter = new FilterAlpha();
    }

    /**
     * Sets the strength of both the blurX and blurY properties simultaneously
     *
     * @member {number}
     * @default 2
     */
    get blur() {
        return this.blurXFilter.blur;
    }
    set blur(value) {
        this.blurXFilter.blur = this.blurYFilter.blur = value;
    }

    /**
     * Sets the strength of the blurX property
     *
     * @member {number}
     * @default 2
     */
    get blurX() {
        return this.blurXFilter.blur;
    }
    set blurX(value) {
        this.blurXFilter.blur = value;
    }

    /**
     * Sets the strength of the blurY property
     *
     * @member {number}
     * @default 2
     */
    get blurY() {
        return this.blurYFilter.blur;
    }
    set blurY(value) {
        this.blurYFilter.blur = value;
    }
}

export { BloomFilter };

