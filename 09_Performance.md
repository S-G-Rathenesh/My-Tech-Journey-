# 09_Performance.md - E'xploreMe Performance Optimization

## Rendering Optimizations
1. **Procedural & Low-Poly Geometry**: Build custom procedural 3D grids, neon pillars, and holographic pedestals without relying on multi-megabyte external GLTF models.
2. **Instanced Mesh Particles**: Use `instancedMesh` and dynamic particle buffers for high-density cyber dust and rain.
3. **Frustum Culling & Level of Detail (LOD)**: Disable rendering for out-of-view world zones.
4. **Adaptive DPR (Device Pixel Ratio)**: Automatically dynamically scale pixel ratio based on device framerate to maintain steady 60 FPS on mobile devices.
5. **Asset Preloading & Code Splitting**: Dynamically import non-essential modals and dynamic UI overlays.
