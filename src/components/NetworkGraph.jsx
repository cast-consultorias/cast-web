import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function NetworkGraph() {
  const mountRef = useRef(null)

  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    const W = el.clientWidth
    const H = el.clientHeight

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(W, H)
    renderer.setClearColor(0x000000, 0)
    el.appendChild(renderer.domElement)

    // Scene + camera
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 100)
    camera.position.z = 8

    // Build node positions
    const COUNT = 70
    const positions = Array.from({ length: COUNT }, () => [
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 4,
    ])

    // Nodes (points)
    const nodeGeo = new THREE.BufferGeometry()
    nodeGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(positions.flat()), 3)
    )
    const nodeMat = new THREE.PointsMaterial({
      color: 0xc9a84c,
      size: 0.06,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.85,
    })
    scene.add(new THREE.Points(nodeGeo, nodeMat))

    // Edges (lines)
    const lineVerts = []
    for (let i = 0; i < COUNT; i++) {
      for (let j = i + 1; j < COUNT; j++) {
        const dx = positions[i][0] - positions[j][0]
        const dy = positions[i][1] - positions[j][1]
        const dz = positions[i][2] - positions[j][2]
        if (Math.sqrt(dx * dx + dy * dy + dz * dz) < 2.5) {
          lineVerts.push(...positions[i], ...positions[j])
        }
      }
    }
    const lineGeo = new THREE.BufferGeometry()
    lineGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(lineVerts), 3)
    )
    const lineMat = new THREE.LineBasicMaterial({
      color: 0xc9a84c,
      transparent: true,
      opacity: 0.12,
    })
    const lines = new THREE.LineSegments(lineGeo, lineMat)
    scene.add(lines)

    // Group both for rotation
    const group = new THREE.Group()
    group.add(scene.children[0])
    group.add(lines)
    scene.add(group)

    // Mouse tracking
    let mouseX = 0
    let mouseY = 0
    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove)

    // Resize
    const onResize = () => {
      const w = el.clientWidth
      const h = el.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    // Animate
    let frame
    const clock = new THREE.Clock()
    const animate = () => {
      frame = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      group.rotation.y = t * 0.06 + mouseX * 0.3
      group.rotation.x = mouseY * 0.2
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="w-full h-full" />
}
