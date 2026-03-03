"use client";
import { useEffect, useRef } from "react";

export default function GlobalSpaceBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        let animFrameId: number;
        let THREE: typeof import("three") | null = null;
        let renderer: import("three").WebGLRenderer | null = null;
        let scene: import("three").Scene | null = null;
        let camera: import("three").PerspectiveCamera | null = null;
        let starField: import("three").Points | null = null;
        let dustField: import("three").Points | null = null;
        let nebulaGroup: import("three").Group | null = null;
        let nebulaCloudsData: { sprite: import("three").Sprite, rotSpeed: number }[] = [];

        async function init() {
            if (!canvasRef.current) return;
            THREE = await import("three");

            renderer = new THREE.WebGLRenderer({
                canvas: canvasRef.current,
                antialias: false,
                alpha: false,
                powerPreference: "high-performance"
            });
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setClearColor(0x000000, 1);

            scene = new THREE.Scene();

            camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 3000);
            camera.position.z = 1;

            // ─── Stars ────────────────────────────────────────────────
            const STAR_COUNT = 12000;
            const starPositions = new Float32Array(STAR_COUNT * 3);
            const starColors = new Float32Array(STAR_COUNT * 3);
            const starSizes = new Float32Array(STAR_COUNT);
            const colorPalette = [
                [1.0, 1.0, 1.0], [0.8, 0.9, 1.0], [1.0, 0.95, 0.8], [0.7, 0.85, 1.0], [1.0, 0.8, 0.6],
            ];
            for (let i = 0; i < STAR_COUNT; i++) {
                const r = 400 + Math.random() * 1400;
                const theta = Math.acos(2 * Math.random() - 1);
                const phi = Math.random() * Math.PI * 2;
                starPositions[i * 3 + 0] = r * Math.sin(theta) * Math.cos(phi);
                starPositions[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
                starPositions[i * 3 + 2] = r * Math.cos(theta);
                const col = colorPalette[Math.floor(Math.random() * colorPalette.length)];
                starColors[i * 3 + 0] = col[0];
                starColors[i * 3 + 1] = col[1];
                starColors[i * 3 + 2] = col[2];
                starSizes[i] = Math.random() < 0.02 ? 3.5 + Math.random() * 3 : 0.6 + Math.random() * 1.5;
            }
            const starGeo = new THREE.BufferGeometry();
            starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
            starGeo.setAttribute("color", new THREE.BufferAttribute(starColors, 3));
            starGeo.setAttribute("size", new THREE.BufferAttribute(starSizes, 1));
            const starMat = new THREE.ShaderMaterial({
                vertexColors: true,
                transparent: true,
                depthWrite: false,
                uniforms: { uTime: { value: 0 } },
                vertexShader: `
                    attribute float size;
                    varying vec3 vColor;
                    uniform float uTime;
                    void main() {
                        vColor = color;
                        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                        float twinkle = 0.7 + 0.3 * sin(uTime * 2.0 + position.x * 0.01 + position.y * 0.007);
                        gl_PointSize = size * twinkle * (300.0 / -mvPosition.z);
                        gl_Position = projectionMatrix * mvPosition;
                    }
                `,
                fragmentShader: `
                    varying vec3 vColor;
                    void main() {
                        float d = length(gl_PointCoord - vec2(0.5));
                        if (d > 0.5) discard;
                        float alpha = 1.0 - smoothstep(0.1, 0.5, d);
                        gl_FragColor = vec4(vColor, alpha);
                    }
                `
            });
            starField = new THREE.Points(starGeo, starMat);
            scene.add(starField);

            // ─── Cosmic Dust ──────────────────────────────────────────
            const DUST_COUNT = 6000;
            const dustPos = new Float32Array(DUST_COUNT * 3);
            const dustCol = new Float32Array(DUST_COUNT * 3);
            for (let i = 0; i < DUST_COUNT; i++) {
                const galaxySpread = Math.random() < 0.6 ? 0.1 : 1.0;
                const theta = (Math.random() - 0.5) * Math.PI * galaxySpread;
                const phi = Math.random() * Math.PI * 2;
                const r = 500 + Math.random() * 1000;
                dustPos[i * 3 + 0] = r * Math.sin(theta) * Math.cos(phi);
                dustPos[i * 3 + 1] = r * (Math.random() - 0.5) * (galaxySpread < 0.5 ? 80 : 400);
                dustPos[i * 3 + 2] = r * Math.sin(theta) * Math.sin(phi);
                const brightness = 0.3 + Math.random() * 0.5;
                dustCol[i * 3 + 0] = brightness * 0.6;
                dustCol[i * 3 + 1] = brightness * 0.7;
                dustCol[i * 3 + 2] = brightness;
            }
            const dustGeo = new THREE.BufferGeometry();
            dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
            dustGeo.setAttribute("color", new THREE.BufferAttribute(dustCol, 3));
            const dustMat = new THREE.PointsMaterial({
                size: 0.8, vertexColors: true, transparent: true, opacity: 0.35,
                depthWrite: false, blending: THREE.AdditiveBlending,
            });
            dustField = new THREE.Points(dustGeo, dustMat);
            scene.add(dustField);

            // ─── Hyperrealistic Nebula ──────────────────────────────────────────────
            const generateNebulaTexture = () => {
                const canvas = document.createElement("canvas");
                canvas.width = 512;
                canvas.height = 512;
                const ctx = canvas.getContext("2d")!;

                const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
                gradient.addColorStop(0, "rgba(255,255,255,1)");
                gradient.addColorStop(0.2, "rgba(255,255,255,0.8)");
                gradient.addColorStop(0.5, "rgba(255,255,255,0.2)");
                gradient.addColorStop(1, "rgba(0,0,0,0)");

                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, 512, 512);

                const imgData = ctx.getImageData(0, 0, 512, 512);
                const data = imgData.data;
                for (let i = 0; i < data.length; i += 4) {
                    const noise = (Math.random() - 0.5) * 50;
                    const a = data[i + 3];
                    if (a > 0) {
                        data[i] = Math.max(0, Math.min(255, data[i] + noise));
                        data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise));
                        data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise));
                    }
                }
                ctx.putImageData(imgData, 0, 0);

                return new THREE!.CanvasTexture(canvas);
            };

            const nebulaTexture = generateNebulaTexture();
            nebulaGroup = new THREE!.Group();
            scene.add(nebulaGroup);

            const NEBULA_CLOUD_COUNT = 80; // Fewer clouds for realism
            const nebHues = [
                new THREE!.Color(0x0a1128), // Very dark blue
                new THREE!.Color(0x1a0b2e), // Very dark purple
                new THREE!.Color(0x081c15), // Very dark teal
                new THREE!.Color(0x14213d), // Deep navy
                new THREE!.Color(0x000814)  // Almost black blue
            ];

            for (let i = 0; i < NEBULA_CLOUD_COUNT; i++) {
                const cloudMaterial = new THREE!.SpriteMaterial({
                    map: nebulaTexture,
                    color: nebHues[Math.floor(Math.random() * nebHues.length)],
                    transparent: true,
                    opacity: 0.03 + Math.random() * 0.06, // Much lower opacity
                    blending: THREE!.AdditiveBlending,
                    depthWrite: false
                });

                const sprite = new THREE!.Sprite(cloudMaterial);

                const clusterAngle = Math.random() * Math.PI * 2;
                const clusterRadius = 400 + Math.random() * 1000;
                const spread = 300 + Math.random() * 500;

                sprite.position.set(
                    Math.cos(clusterAngle) * clusterRadius + (Math.random() - 0.5) * spread,
                    (Math.random() - 0.5) * 600,
                    Math.sin(clusterAngle) * clusterRadius + (Math.random() - 0.5) * spread
                );

                const scale = 500 + Math.random() * 1000;
                sprite.scale.set(scale, scale, 1);

                cloudMaterial.rotation = Math.random() * Math.PI * 2;

                nebulaCloudsData.push({
                    sprite,
                    rotSpeed: (Math.random() - 0.5) * 0.001
                });

                nebulaGroup.add(sprite);
            }

            // ─── Shooting Stars ──────────────────────────────────────
            class ShootingStar {
                group: import("three").Group;
                line: import("three").Line;
                head: import("three").Mesh;
                velocity: import("three").Vector3 = new (THREE as any).Vector3();
                active: boolean = false;
                maxDist = 1500;

                constructor() {
                    const lineGeo = new (THREE as any).BufferGeometry().setFromPoints([
                        new (THREE as any).Vector3(0, 0, 0),
                        new (THREE as any).Vector3(0, 0, -40)
                    ]);
                    const lineMat = new (THREE as any).LineBasicMaterial({
                        color: 0xffffff,
                        transparent: true,
                        opacity: 0,
                    });
                    this.line = new (THREE as any).Line(lineGeo, lineMat);

                    const headGeo = new (THREE as any).SphereGeometry(0.8, 8, 8);
                    const headMat = new (THREE as any).MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 });
                    this.head = new (THREE as any).Mesh(headGeo, headMat);

                    this.group = new (THREE as any).Group();
                    this.group.add(this.line);
                    this.group.add(this.head);
                    scene!.add(this.group);
                }

                launch() {
                    this.active = true;
                    // Random start position in a sphere far away
                    const r = 800 + Math.random() * 400;
                    const theta = Math.random() * Math.PI * 2;
                    const phi = Math.random() * Math.PI;
                    this.group.position.set(
                        r * Math.sin(phi) * Math.cos(theta),
                        r * Math.sin(phi) * Math.sin(theta),
                        r * Math.cos(phi)
                    );
                    // Point towards a random direction semi-towards center
                    const target = new (THREE as any).Vector3(
                        (Math.random() - 0.5) * 400,
                        (Math.random() - 0.5) * 400,
                        (Math.random() - 0.5) * 400
                    );
                    this.group.lookAt(target);
                    this.velocity.subVectors(target, this.group.position).normalize().multiplyScalar(12 + Math.random() * 8);
                    (this.line.material as any).opacity = 0.6;
                    (this.head.material as any).opacity = 1.0;
                }

                update() {
                    if (!this.active) return;
                    this.group.position.add(this.velocity);
                    if (this.group.position.length() > this.maxDist) {
                        this.active = false;
                        (this.line.material as any).opacity = 0;
                        (this.head.material as any).opacity = 0;
                    }
                }
            }

            const shootingStarsPool: ShootingStar[] = [];
            for (let i = 0; i < 3; i++) shootingStarsPool.push(new ShootingStar());

            let t = 0;
            function animate() {
                animFrameId = requestAnimationFrame(animate);
                t += 0.0004;

                // Randomly launch a shooting star (infrequent: ~1 per 3-5 seconds on average)
                if (Math.random() < 0.005) {
                    const inactive = shootingStarsPool.find(s => !s.active);
                    if (inactive) inactive.launch();
                }
                shootingStarsPool.forEach(s => s.update());

                if (camera) {
                    camera.rotation.y = Math.sin(t * 0.6) * 0.06;
                    camera.rotation.x = Math.sin(t * 0.4) * 0.03;
                }
                if (starField) {
                    (starField.material as any).uniforms.uTime.value = t * 30;
                    starField.rotation.y = t * 0.015;
                }
                if (dustField) dustField.rotation.y = t * 0.008;
                if (nebulaGroup) {
                    nebulaGroup.rotation.y = t * 0.003;
                    nebulaGroup.rotation.z = Math.sin(t * 0.5) * 0.1;
                    nebulaCloudsData.forEach(cloud => {
                        cloud.sprite.material.rotation += cloud.rotSpeed;
                    });
                }
                renderer!.render(scene!, camera!);
            }
            animate();

            const onResize = () => {
                if (!camera || !renderer) return;
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            };
            window.addEventListener("resize", onResize);
        }

        init();
        return () => {
            cancelAnimationFrame(animFrameId);
            renderer?.dispose();
        };
    }, []);

    return (
        <div style={{ position: "fixed", inset: 0, zIndex: -1, background: "#000000", pointerEvents: "none", overflow: "hidden" }}>
            <canvas
                ref={canvasRef}
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
            />
            {/* Subtle edges vignette */}
            <div style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                background: "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,5,0.75) 100%)",
            }} />
        </div>
    );
}
