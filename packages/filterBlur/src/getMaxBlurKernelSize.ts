

export function getMaxKernelSize(gl: any): number
{
    const maxVaryings = (gl.getParameter(gl.MAX_VARYING_VECTORS));
    let kernelSize = 15;

    while (kernelSize > maxVaryings)
    {
        kernelSize -= 2;
    }

    return kernelSize;
}
