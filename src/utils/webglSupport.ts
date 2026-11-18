export interface WebGLCapabilities {
  hasWebGL: boolean;
  isSoftwareGl: boolean;
}

let cachedCapabilities: WebGLCapabilities | null = null;

export function detectWebGLCapabilities(): WebGLCapabilities {
  if (cachedCapabilities) return cachedCapabilities;
  if (typeof document === 'undefined') {
    return { hasWebGL: false, isSoftwareGl: true };
  }

  try {
    const canvas = document.createElement('canvas');
    const gl =
      (canvas.getContext('webgl2') as WebGL2RenderingContext | null) ||
      (canvas.getContext('webgl') as WebGLRenderingContext | null);

    if (!gl) {
      cachedCapabilities = { hasWebGL: false, isSoftwareGl: true };
      return cachedCapabilities;
    }

    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const rendererParam = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(rendererParam) || '');
    gl.getExtension('WEBGL_lose_context')?.loseContext();

    const isSoftwareGl = /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    cachedCapabilities = { hasWebGL: true, isSoftwareGl };
    return cachedCapabilities;
  } catch {
    cachedCapabilities = { hasWebGL: false, isSoftwareGl: true };
    return cachedCapabilities;
  }
}
