export const modelsConfig = {
  // 1. Toggle these to true once you scan your real equipment and drop the .glb files
  // into the public folder at:
  // - public/models/tower.glb
  // - public/models/pcb.glb
  // - public/models/substation.glb
  useRealisticScans: {
    tower: false,
    pcb: false,
    substation: false,
  },
  
  // 2. Local paths in the public directory
  scanPaths: {
    tower: "/models/tower.glb",
    pcb: "/models/pcb.glb",
    substation: "/models/substation.glb",
  },

  // 3. Custom offsets and scales for your scanned models
  scannedOffsets: {
    tower: {
      position: [0, -2.5, 0] as [number, number, number],
      scale: 1.0,
    },
    pcb: {
      position: [0, 0, 0] as [number, number, number],
      scale: 1.0,
    },
    substation: {
      position: [0, -0.5, 0] as [number, number, number],
      scale: 1.0,
    }
  }
};
