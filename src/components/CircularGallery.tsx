import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform, Raycast, Vec2 } from 'ogl';
import { useEffect, useRef } from 'react';

type GL = Renderer['gl'];

function lerp(p1: number, p2: number, t: number): number {
  return p1 + (p2 - p1) * t;
}

function createTextTexture(gl: GL, text: string, font: string = 'bold 30px sans-serif', color: string = 'white') {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Could not get 2d context');
  context.font = font;
  const metrics = context.measureText(text);
  const textWidth = Math.ceil(metrics.width);
  canvas.width = textWidth + 40;
  canvas.height = 80;
  context.font = font;
  context.fillStyle = color;
  context.textBaseline = 'middle';
  context.textAlign = 'center';
  context.fillText(text, canvas.width / 2, canvas.height / 2);
  const texture = new Texture(gl, { generateMipmaps: false });
  texture.image = canvas;
  return { texture, width: canvas.width, height: canvas.height };
}

class Title {
  gl: GL; mesh: Mesh;
  constructor({ gl, plane, text, textColor, font }: any) {
    this.gl = gl;
    const { texture, width, height } = createTextTexture(gl, text, font, textColor);
    const program = new Program(gl, {
      vertex: `attribute vec3 position; attribute vec2 uv; uniform mat4 modelViewMatrix; uniform mat4 projectionMatrix; varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragment: `precision highp float; uniform sampler2D tMap; varying vec2 vUv; void main() { vec4 color = texture2D(tMap, vUv); if (color.a < 0.1) discard; gl_FragColor = color; }`,
      uniforms: { tMap: { value: texture } }, transparent: true
    });
    this.mesh = new Mesh(gl, { geometry: new Plane(gl), program });
    const aspect = width / height;
    const textHeight = plane.scale.y * 0.08;
    this.mesh.scale.set(textHeight * aspect, textHeight, 1);
    this.mesh.position.y = -plane.scale.y * 0.45;
    this.mesh.setParent(plane);
  }
}

class Media {
  extra = 0; plane: Mesh; program: Program; x = 0; widthTotal = 0; width = 0; viewport: any; screen: any; length: number; index: number; gl: GL;
  constructor({ geometry, gl, image, index, length, scene, screen, text, viewport, textColor, borderRadius, font }: any) {
    this.gl = gl; this.index = index; this.length = length; this.viewport = viewport; this.screen = screen;
    const texture = new Texture(gl, { generateMipmaps: true });
    this.program = new Program(gl, {
      vertex: `precision highp float; attribute vec3 position; attribute vec2 uv; uniform mat4 modelViewMatrix; uniform mat4 projectionMatrix; uniform float uTime; uniform float uSpeed; varying vec2 vUv; void main() { vUv = uv; vec3 p = position; p.z = sin(p.x * 2.0 + uTime) * uSpeed * 0.1; gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0); }`,
      fragment: `precision highp float; uniform vec2 uImageSizes; uniform vec2 uPlaneSizes; uniform sampler2D tMap; uniform float uBorderRadius; varying vec2 vUv; float roundedBoxSDF(vec2 p, vec2 b, float r) { vec2 d = abs(p) - b; return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r; } void main() { vec2 ratio = vec2(min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0), min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)); vec2 uv = vec2(vUv.x * ratio.x + (1.0 - ratio.x) * 0.5, vUv.y * ratio.y + (1.0 - ratio.y) * 0.5); vec4 color = texture2D(tMap, uv); float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius); float alpha = 1.0 - smoothstep(-0.002, 0.002, d); gl_FragColor = vec4(color.rgb, alpha); }`,
      uniforms: { tMap: { value: texture }, uPlaneSizes: { value: [0, 0] }, uImageSizes: { value: [0, 0] }, uSpeed: { value: 0 }, uTime: { value: Math.random() }, uBorderRadius: { value: borderRadius } },
      transparent: true
    });
    const img = new Image(); img.crossOrigin = 'anonymous'; img.src = image;
    img.onload = () => { texture.image = img; this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight]; };
    this.plane = new Mesh(gl, { geometry, program: this.program });
    (this.plane as any).index = index; 
    this.plane.setParent(scene);
    new Title({ gl, plane: this.plane, text, textColor, font });
    this.onResize();
  }
  update(scroll: any, direction: string) {
    this.plane.position.x = this.x - scroll.current - this.extra;
    const x = this.plane.position.x; 
    const H = this.viewport.width / 2;
    
    this.plane.position.y = 0;
    this.plane.rotation.z = 0;

    this.program.uniforms.uTime.value += 0.02;
    this.program.uniforms.uSpeed.value = Math.abs(scroll.current - scroll.last);
    
    if (direction === 'right' && x + this.plane.scale.x / 2 < -H * 2.0) this.extra -= this.widthTotal;
    if (direction === 'left' && x - this.plane.scale.x / 2 > H * 2.0) this.extra += this.widthTotal;
  }
  onResize(vp?: any, scr?: any) {
    if (vp) this.viewport = vp;
    if (scr) this.screen = scr;
    this.plane.scale.y = this.viewport.height * 0.75;
    this.plane.scale.x = this.viewport.width * 0.65;
    this.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];
    this.width = this.plane.scale.x + 2.5;
    this.widthTotal = this.width * this.length; 
    this.x = this.width * this.index;
  }
}

export default function HorizontalGallery({ items = [], textColor = '#FFFFFF', borderRadius = 0.02, onItemClick }: any) {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current || items.length === 0) return;
    const container = containerRef.current;
    const renderer = new Renderer({ alpha: true, antialias: true });
    const gl = renderer.gl;
    container.appendChild(gl.canvas);
    const camera = new Camera(gl); camera.position.z = 20;
    const scene = new Transform();
    
    const scroll = { current: 0, target: 0, last: 0, ease: 0.05 };
    const autoSpeed = 0.02; 
    let isUserInteracting = false; 
    
    const raycast = new Raycast(gl);
    const mouse = new Vec2();

    let medias: Media[] = [];
    const geometry = new Plane(gl, { heightSegments: 10, widthSegments: 10 });

    const onResize = () => {
      renderer.setSize(container.clientWidth, container.clientHeight);
      camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
      const fov = (camera.fov * Math.PI) / 180;
      const h = 2 * Math.tan(fov / 2) * camera.position.z;
      const viewport = { width: h * camera.aspect, height: h };
      const screen = { width: container.clientWidth, height: container.clientHeight };
      medias.forEach(m => m.onResize(viewport, screen));
    };

    medias = items.map((data: any, index: number) => new Media({ geometry, gl, image: data.image, index, length: items.length, scene, screen: { width: container.clientWidth, height: container.clientHeight }, text: data.text, viewport: { width: 1, height: 1 }, textColor, borderRadius, font: 'bold 40px Inter, sans-serif' }));

    onResize();
    window.addEventListener('resize', onResize);
    
    const onWheel = (e: any) => { scroll.target += e.deltaY * 0.01; };
    window.addEventListener('wheel', onWheel, { passive: true });

    let isDown = false, startX = 0, lastMoveTime = 0, startY = 0;
    
    const onDown = (e: any) => { 
      isDown = true; 
      isUserInteracting = true; 
      const pos = e.touches ? e.touches[0] : e; 
      startX = pos.clientX; 
      startY = pos.clientY; 
      lastMoveTime = Date.now(); 
    };

    const onMove = (e: any) => { 
      if (!isDown) return; 
      const pos = e.touches ? e.touches[0] : e; 
      scroll.target += (startX - pos.clientX) * 0.05; 
      startX = pos.clientX; 
    };

    const onUp = (e: any) => {
      if (!isDown) return;
      const pos = e.changedTouches ? e.changedTouches[0] : e;
      const dist = Math.sqrt(Math.pow(pos.clientX - startX, 2) + Math.pow(pos.clientY - startY, 2));
      
      if (Date.now() - lastMoveTime < 200 && dist < 15) {
        // Corrected NDC calculation
        const rect = container.getBoundingClientRect();
        mouse.set(
            ((pos.clientX - rect.left) / rect.width) * 2 - 1,
            ((pos.clientY - rect.top) / rect.height) * -2 + 1
        );
        
        // FIXED LINE: Using fromCamera instead of castMouse
        raycast.fromCamera(camera, mouse);
        
        const intersects = raycast.intersectBounds(medias.map(m => m.plane));
        if (intersects.length > 0 && onItemClick) onItemClick((intersects[0] as any).index);
      }
      
      isDown = false;
      setTimeout(() => { isUserInteracting = false; }, 1000); 
    };

    window.addEventListener('mousedown', onDown); window.addEventListener('mousemove', onMove); window.addEventListener('mouseup', onUp);
    window.addEventListener('touchstart', onDown, { passive: false }); window.addEventListener('touchmove', onMove, { passive: false }); window.addEventListener('touchend', onUp);

    const update = () => {
      if (!isUserInteracting) { scroll.target += autoSpeed; }
      scroll.current = lerp(scroll.current, scroll.target, scroll.ease);
      const dir = scroll.current > scroll.last ? 'right' : 'left';
      
      const totalW = medias[0]?.widthTotal || 0;
      if (totalW > 0) {
        if (scroll.target > totalW) { scroll.target -= totalW; scroll.current -= totalW; }
        if (scroll.target < -totalW) { scroll.target += totalW; scroll.current += totalW; }
      }

      medias.forEach(m => m.update(scroll, dir));
      renderer.render({ scene, camera });
      scroll.last = scroll.current;
      appRef.current = requestAnimationFrame(update);
    };
    update();

    return () => {
      cancelAnimationFrame(appRef.current);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('mousedown', onDown); window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchstart', onDown); window.removeEventListener('touchmove', onMove); window.removeEventListener('touchend', onUp);
      if (gl.canvas.parentNode) container.removeChild(gl.canvas);
    };
  }, [items, onItemClick, textColor, borderRadius]);

  return <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing overflow-hidden" />;
}