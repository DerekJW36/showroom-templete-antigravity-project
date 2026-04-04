import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import worldMap from '../../assets/images/world_map.png';

const GlobeBackground: React.FC = () => {
    const mountRef = useRef<HTMLDivElement>(null);
    const initialized = useRef(false);

    useEffect(() => {
        if (!mountRef.current || initialized.current) return;
        initialized.current = true;
        let isMounted = true;

        const container = mountRef.current;
        const W = window.innerWidth;
        const H = window.innerHeight;
        const R = 2;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 1000);
        camera.position.z = 6;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(W, H);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.enableZoom = false;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.5;

        // Points logic
        const image = new Image();
        image.src = worldMap;
        image.onload = () => {
            if (!isMounted) return;
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0);
            const data = ctx.getImageData(0, 0, image.width, image.height);

            const positions: number[] = [];
            const colors: number[] = [];
            const step = 0.8;

            for (let lat = -90; lat <= 90; lat += step) {
                for (let lng = -180; lng <= 180; lng += step) {
                    const r = Math.floor((lng + 180) / 360 * data.width);
                    const a = Math.floor(data.height - (lat + 90) / 180 * data.height);
                    const s = (a * data.width + r) * 4 + 3;

                    // Alpha channel > 100 means landmass
                    if (data.data[s] > 100) {
                        const phi = (90 - lat) * (Math.PI / 180);
                        const theta = (lng + 180) * (Math.PI / 180);
                        positions.push(
                            -R * Math.sin(phi) * Math.cos(theta),
                            R * Math.cos(phi),
                            R * Math.sin(phi) * Math.sin(theta)
                        );

                        // Luxury Gold color variation
                        const gold = new THREE.Color('#d4af37');
                        gold.offsetHSL(0, 0, (Math.random() - 0.5) * 0.1);
                        colors.push(gold.r, gold.g, gold.b);
                    }
                }
            }

            const geometry = new THREE.BufferGeometry();
            geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
            geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

            const material = new THREE.PointsMaterial({
                size: 0.025,
                vertexColors: true,
                transparent: true,
                opacity: 0.8,
                blending: THREE.AdditiveBlending,
                depthWrite: false
            });

            const points = new THREE.Points(geometry, material);
            scene.add(points);

            // Inner dark sphere to hide points on the back side
            const innerSphere = new THREE.Mesh(
                new THREE.SphereGeometry(R * 0.98, 32, 32),
                new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.4 })
            );
            scene.add(innerSphere);
        };

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        let animationFrameId: number;
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            isMounted = false;
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);

            // Cleanup ThreeJS: Dispose OrbitControls
            controls.dispose();

            // Recursively dispose geometry and materials to prevent WebGL memory leak
            scene.traverse((child) => {
                const mesh = child as THREE.Mesh | THREE.Points;
                if (mesh.isMesh || mesh.isPoints) {
                    if (mesh.geometry) mesh.geometry.dispose();
                    if (mesh.material) {
                        if (Array.isArray(mesh.material)) {
                            mesh.material.forEach((m) => m.dispose());
                        } else {
                            mesh.material.dispose();
                        }
                    }
                }
            });

            scene.clear();
            renderer.dispose();
            renderer.forceContextLoss();

            // Remove canvas from DOM
            if (container && container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }

            // Reset initialization flag so it can remount if needed (HMR)
            initialized.current = false;
        };
    }, []);

    return <div ref={mountRef} className="fixed inset-0 z-0 bg-black pointer-events-none" />;
};

export default GlobeBackground;
