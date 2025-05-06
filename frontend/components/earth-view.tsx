"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

interface EarthViewProps {
  orbitParams: {
    altitude: number
    inclination: number
    eccentricity: number
  }
}

export default function EarthView({ orbitParams }: EarthViewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (!containerRef.current || isInitialized) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    )
    camera.position.z = 15

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    containerRef.current.appendChild(renderer.domElement)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05

    // Earth
    const earthGeometry = new THREE.SphereGeometry(5, 32, 32)
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load("/earth-map.png"),
      bumpMap: new THREE.TextureLoader().load("/earth-bump.png"),
      bumpScale: 0.1,
      specularMap: new THREE.TextureLoader().load("/earth-specular.png"),
    })
    const earth = new THREE.Mesh(earthGeometry, earthMaterial)
    scene.add(earth)

    // Clouds
    const cloudGeometry = new THREE.SphereGeometry(5.1, 32, 32)
    const cloudMaterial = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load("/earth-clouds.png"),
      transparent: true,
      opacity: 0.4,
    })
    const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial)
    scene.add(clouds)

    // Satellite orbit
    const orbitRadius = 5 + orbitParams.altitude / 100
    const orbitGeometry = new THREE.BufferGeometry()
    const orbitPoints = []
    const segments = 128

    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2
      const x = orbitRadius * Math.cos(theta)
      const y = orbitRadius * Math.sin(theta) * Math.sin((orbitParams.inclination * Math.PI) / 180)
      const z = orbitRadius * Math.sin(theta) * Math.cos((orbitParams.inclination * Math.PI) / 180)
      orbitPoints.push(new THREE.Vector3(x, y, z))
    }

    orbitGeometry.setFromPoints(orbitPoints)
    const orbitMaterial = new THREE.LineBasicMaterial({ color: 0x00ffff })
    const orbit = new THREE.Line(orbitGeometry, orbitMaterial)
    scene.add(orbit)

    // Satellite
    const satelliteGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.2)
    const satelliteMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff })
    const satellite = new THREE.Mesh(satelliteGeometry, satelliteMaterial)
    scene.add(satellite)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 3, 5)
    scene.add(directionalLight)

    // Animation
    let angle = 0
    const animate = () => {
      requestAnimationFrame(animate)

      // Rotate Earth
      earth.rotation.y += 0.001
      clouds.rotation.y += 0.0012

      // Move satellite
      angle += 0.005
      const satX = orbitRadius * Math.cos(angle)
      const satY = orbitRadius * Math.sin(angle) * Math.sin((orbitParams.inclination * Math.PI) / 180)
      const satZ = orbitRadius * Math.sin(angle) * Math.cos((orbitParams.inclination * Math.PI) / 180)
      satellite.position.set(satX, satY, satZ)

      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return

      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    }

    window.addEventListener("resize", handleResize)
    setIsInitialized(true)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
    }
  }, [orbitParams, isInitialized])

  return <div ref={containerRef} className="earth-container h-full w-full" />
}
