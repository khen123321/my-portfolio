import React, { useEffect, useRef } from 'react';

export function NeuralNoise({ color = [0.14, 0.39, 0.92], opacity = 0.6, speed = 0.0015 }) {
  const canvasRef = useRef(null);
  
  // Use refs to store mutable values that don't trigger re-renders
  const glRef = useRef(null);
  const uniformsRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0, tX: 0, tY: 0 });
  const animationFrameId = useRef(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    // Initialize WebGL
    const gl = canvasEl.getContext('webgl') || canvasEl.getContext('experimental-webgl');
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }
    glRef.current = gl;

    // Shader sources
    const vsSource = `
      precision mediump float;
      varying vec2 vUv;
      attribute vec2 a_position;
      void main() {
        vUv = 0.5 * (a_position + 1.0);
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;
    const fsSource = `
      precision mediump float;
      varying vec2 vUv;
      uniform float u_time;
      uniform float u_ratio;
      uniform vec2 u_pointer_position;
      uniform vec3 u_color;
      uniform float u_speed;
      vec2 rotate(vec2 uv, float th) {
        return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
      }
      float neuro_shape(vec2 uv, float t, float p) {
        vec2 sine_acc = vec2(0.0);
        vec2 res = vec2(0.0);
        float scale = 8.0;
        for (int j = 0; j < 15; j++) {
          uv = rotate(uv, 1.0);
          sine_acc = rotate(sine_acc, 1.0);
          vec2 layer = uv * scale + float(j) + sine_acc - t;
          sine_acc += sin(layer) + 2.4 * p;
          res += (0.5 + 0.5 * cos(layer)) / scale;
          scale *= 1.2;
        }
        return res.x + res.y;
      }
      void main() {
        vec2 uv = 0.5 * vUv;
        uv.x *= u_ratio;
        vec2 pointer = vUv - u_pointer_position;
        pointer.x *= u_ratio;
        float p = clamp(length(pointer), 0.0, 1.0);
        p = 0.5 * pow(1.0 - p, 2.0);
        float t = u_speed * u_time;
        vec3 col = vec3(0.0);
        float noise = neuro_shape(uv, t, p);
        noise = 1.2 * pow(noise, 3.0);
        noise += pow(noise, 10.0);
        noise = max(0.0, noise - 0.5);
        noise *= (1.0 - length(vUv - 0.5));
        col = u_color * noise;
        gl_FragColor = vec4(col, noise);
      }
    `;

    // Helper functions inside useEffect
    const createShader = (glContext, source, type) => {
      const shader = glContext.createShader(type);
      glContext.shaderSource(shader, source);
      glContext.compileShader(shader);
      if (!glContext.getShaderParameter(shader, glContext.COMPILE_STATUS)) {
        console.error('Shader compile error:', glContext.getShaderInfoLog(shader));
        glContext.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const createProgram = (glContext, vs, fs) => {
      const program = glContext.createProgram();
      glContext.attachShader(program, vs);
      glContext.attachShader(program, fs);
      glContext.linkProgram(program);
      if (!glContext.getProgramParameter(program, glContext.LINK_STATUS)) {
        console.error('Program link error:', glContext.getProgramInfoLog(program));
        return null;
      }
      return program;
    };

    const getUniforms = (glContext, program) => {
      const uniforms = {};
      const uniformCount = glContext.getProgramParameter(program, glContext.ACTIVE_UNIFORMS);
      for (let i = 0; i < uniformCount; i++) {
        const uniformName = glContext.getActiveUniform(program, i).name;
        uniforms[uniformName] = glContext.getUniformLocation(program, uniformName);
      }
      return uniforms;
    };

    const vertexShader = createShader(gl, vsSource, gl.VERTEX_SHADER);
    const fragmentShader = createShader(gl, fsSource, gl.FRAGMENT_SHADER);
    const shaderProgram = createProgram(gl, vertexShader, fragmentShader);
    
    if (!shaderProgram) return;

    uniformsRef.current = getUniforms(gl, shaderProgram);
    
    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    
    gl.useProgram(shaderProgram);
    const positionLocation = gl.getAttribLocation(shaderProgram, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Initial Resize
    const resizeCanvas = () => {
      const pixelRatio = Math.min(window.devicePixelRatio, 2);
      canvasEl.width = window.innerWidth * pixelRatio;
      canvasEl.height = window.innerHeight * pixelRatio;
      if (uniformsRef.current && uniformsRef.current.u_ratio) {
        gl.uniform1f(uniformsRef.current.u_ratio, canvasEl.width / canvasEl.height);
      }
      gl.viewport(0, 0, canvasEl.width, canvasEl.height);
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initial Uniform Setup
    gl.uniform3f(uniformsRef.current.u_color, color[0], color[1], color[2]);
    gl.uniform1f(uniformsRef.current.u_speed, speed);

    // Setup Events
    const updateMousePosition = (x, y) => {
      pointerRef.current.tX = x;
      pointerRef.current.tY = y;
    };
    
    const pointermove = (e) => updateMousePosition(e.clientX, e.clientY);
    const touchmove = (e) => {
      if (e.targetTouches[0]) updateMousePosition(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
    };
    
    window.addEventListener('pointermove', pointermove);
    window.addEventListener('touchmove', touchmove);
    window.addEventListener('click', pointermove);

    // Render Loop
    const render = () => {
      const currentTime = performance.now();
      const pointer = pointerRef.current;
      
      pointer.x += (pointer.tX - pointer.x) * 0.2;
      pointer.y += (pointer.tY - pointer.y) * 0.2;
      
      gl.uniform1f(uniformsRef.current.u_time, currentTime);
      gl.uniform2f(
        uniformsRef.current.u_pointer_position, 
        pointer.x / window.innerWidth, 
        1 - pointer.y / window.innerHeight
      );
      
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId.current = requestAnimationFrame(render);
    };

    render();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('pointermove', pointermove);
      window.removeEventListener('touchmove', touchmove);
      window.removeEventListener('click', pointermove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [color, speed]); // Re-run if color or speed props change

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        opacity,
      }}
    />
  );
}