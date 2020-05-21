import {vertex} from '../../filterTools/fragments';
import fragment from './ascii.frag';


// TODO (cengler) - The Y is flipped in this shader for some reason.

/**
 * @author Vico @vicocotea
 * original shader : https://www.shadertoy.com/view/lssGDj by @movAX13h
 */

/**
 * An ASCII filter.<br>
 */
class AsciiFilter extends vf.gui.Filter {

    constructor(size = 8) {
        super(vertex, fragment);
        this.size = size;
    }

    /**
     * The pixel size used by the filter.
     *
     * @member {number}
     */
    get size() {
        return this.uniforms.pixelSize;
    }
    set size(value) {
        this.uniforms.pixelSize = value;
    }
}

export { AsciiFilter };

