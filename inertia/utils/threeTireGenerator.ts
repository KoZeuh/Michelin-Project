import * as THREE from 'three'

const BEAD = 1.6

export class MichelinThreeScene {
  private renderer!: THREE.WebGLRenderer
  private scene!: THREE.Scene
  private camera!: THREE.PerspectiveCamera
  private pivot!: THREE.Group
  private wheelObj!: THREE.Group
  private treadGroup?: THREE.Group
  private animationFrameId: number = 0
  private glReady = false
  private baseSpin = 0
  private scrollSpin = 0
  private switchOffset = 0
  private swSpin = 0
  private tTiltX = 0
  private tTiltY = 0
  private tiltX = 0
  private tiltY = 0

  constructor(private canvas: HTMLCanvasElement) {}

  public init() {
    try {
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        preserveDrawingBuffer: true,
      })
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      this.renderer.setSize(window.innerWidth, window.innerHeight, false)

      this.scene = new THREE.Scene()
      this.camera = new THREE.PerspectiveCamera(
        34,
        window.innerWidth / window.innerHeight,
        0.1,
        100
      )
      this.camera.position.set(0, 0, 9)

      // Lumières Michelin (Bleu / Jaune)
      this.scene.add(new THREE.AmbientLight(0x2b3f66, 0.7))
      const key = new THREE.DirectionalLight(0xffffff, 2.4)
      key.position.set(4, 6, 7)
      this.scene.add(key)
      const rimY = new THREE.DirectionalLight(0xfce500, 3.4)
      rimY.position.set(-6, -3, -3)
      this.scene.add(rimY)
      const rimB = new THREE.DirectionalLight(0x3a78ff, 2.8)
      rimB.position.set(7, -1, -5)
      this.scene.add(rimB)
      const fill = new THREE.DirectionalLight(0x6182bb, 0.9)
      fill.position.set(-5, 4, 3)
      this.scene.add(fill)

      this.pivot = new THREE.Group()
      this.scene.add(this.pivot)
      this.wheelObj = new THREE.Group()
      this.pivot.add(this.wheelObj)

      this.wheelObj.add(this.buildWheel())
      this.wheelObj.rotation.x = -0.52

      this.fitTire()
      this.glReady = true

      this.animate()
      return true
    } catch (error) {
      console.error('THREE init failed:', error)
      return false
    }
  }

private buildWheel() {
    const g = new THREE.Group()

    // 1. Jante (Rim) classique et fine (remplace l'énorme bloc noir Aero)
    const rimMat = new THREE.MeshStandardMaterial({ 
      color: 0x222222, 
      roughness: 0.4, 
      metalness: 0.5 
    })
    
    // Un simple anneau fin, collé au pneu (le pneu commence à 1.60)
    const rim = new THREE.Mesh(new THREE.TorusGeometry(1.54, 0.06, 32, 200), rimMat)
    rim.scale.set(1, 1, 0.8) // Légèrement aplatie sur les côtés
    g.add(rim)

    // 2. Moyeu (Hub) central affiné
    const hubMat = new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.5, metalness: 0.8 })
    
    const hubCore = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.4, 32), hubMat)
    hubCore.rotation.x = Math.PI / 2
    g.add(hubCore)
    
    const flangeZ = 0.14
    const flangeRadius = 0.08
    const flangeGeo = new THREE.CylinderGeometry(flangeRadius, flangeRadius, 0.03, 32)
    
    const leftFlange = new THREE.Mesh(flangeGeo, hubMat)
    leftFlange.rotation.x = Math.PI / 2
    leftFlange.position.z = flangeZ
    g.add(leftFlange)
    
    const rightFlange = new THREE.Mesh(flangeGeo, hubMat)
    rightFlange.rotation.x = Math.PI / 2
    rightFlange.position.z = -flangeZ
    g.add(rightFlange)

    // Disque de frein (anneau creux plutôt qu'un cylindre plein)
    const discMat = new THREE.MeshStandardMaterial({ color: 0xaaaaaa, metalness: 0.9, roughness: 0.4 })
    const disc = new THREE.Mesh(new THREE.TorusGeometry(0.25, 0.04, 8, 64), discMat)
    disc.scale.set(1, 1, 0.1) // Aplati pour faire une piste de freinage
    disc.position.z = 0.18
    g.add(disc)

    // 3. Rayons (Spokes) longs et fins
    const spMat = new THREE.MeshStandardMaterial({ color: 0xdddddd, roughness: 0.2, metalness: 1 })
    const NS = 24 
    
    for (let s = 0; s < NS; s++) {
      const isLeft = s % 2 === 0
      const z = isLeft ? flangeZ : -flangeZ
      
      const rimAngle = (s / NS) * Math.PI * 2
      const hubOffset = isLeft ? 0.4 : -0.4 
      const hubAngle = rimAngle + hubOffset

      const p1 = new THREE.Vector3(Math.cos(hubAngle) * flangeRadius, Math.sin(hubAngle) * flangeRadius, z)
      // On étire les rayons tout du long, jusqu'à la nouvelle jante
      const p2 = new THREE.Vector3(Math.cos(rimAngle) * 1.50, Math.sin(rimAngle) * 1.50, 0)
      
      const dir = new THREE.Vector3().subVectors(p2, p1)
      const len = dir.length()
      
      const spoke = new THREE.Mesh(new THREE.CylinderGeometry(0.005, 0.005, len, 8), spMat)
      spoke.position.copy(p1).add(p2).multiplyScalar(0.5)
      spoke.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize())
      g.add(spoke)
    }

    return g
  }
  
  private buildTread(spec: any) {
    const g = new THREE.Group()
    const w = spec.width
    const Rc = BEAD + w

    const rubber = new THREE.MeshStandardMaterial({
      color: 0x111317,
      roughness: spec.tread === 'slick' ? 0.6 : 0.9,
      metalness: 0.05,
    })

    const tireCarcass = new THREE.Mesh(new THREE.TorusGeometry(Rc, w, 48, 200), rubber)
    tireCarcass.scale.set(1, 1, 0.9)
    g.add(tireCarcass)

    if (spec.tread !== 'slick') {
      const isGravel = spec.tread === 'gravel'
      const cfg = isGravel
        ? {
            radiusTop: 0.012,
            radiusBottom: 0.025,
            height: 0.06,
            around: 70,
            phis: [-0.6, -0.3, 0, 0.3, 0.6],
          }
        : {
            radiusTop: 0.015,
            radiusBottom: 0.035,
            height: 0.1,
            around: 50,
            phis: [-0.6, -0.35, 0, 0.35, 0.6],
          }

      const km = new THREE.MeshStandardMaterial({ color: 0x111317, roughness: 0.9, metalness: 0.0 })

      const knobGeo = new THREE.CylinderGeometry(cfg.radiusTop, cfg.radiusBottom, cfg.height, 6)
      knobGeo.rotateX(Math.PI / 2)

      const im = new THREE.InstancedMesh(knobGeo, km, cfg.phis.length * cfg.around)
      const o = new THREE.Object3D()
      let i = 0

      for (let t = 0; t < cfg.around; t++) {
        const theta = (t / cfg.around) * Math.PI * 2

        cfg.phis.forEach((phi, pi) => {
          const th = theta + (pi % 2 ? Math.PI / cfg.around : 0)
          const rr = Rc + w * Math.cos(phi)

          const x = rr * Math.cos(th)
          const y = rr * Math.sin(th)
          const zz = w * Math.sin(phi) * 0.9 // * 0.9 à cause du scale de la carcasse

          o.position.set(x, y, zz)

          const nx = Math.cos(phi) * Math.cos(th)
          const ny = Math.cos(phi) * Math.sin(th)
          const nz = Math.sin(phi)
          o.lookAt(x + nx, y + ny, zz + nz)

          const center = Math.abs(phi) < 0.18
          const sc = center ? 1 : 0.85
          o.scale.set(sc, sc, center ? 1.2 : 0.9)

          o.updateMatrix()
          im.setMatrixAt(i++, o.matrix)
        })
      }
      g.add(im)
    }

    return g
  }

  public setTire(spec: any) {
    if (!this.wheelObj) return
    if (this.treadGroup) {
      this.wheelObj.remove(this.treadGroup)
      this.treadGroup.traverse((o: any) => {
        if (o.geometry) o.geometry.dispose()

        if (o.material) {
          ;(Array.isArray(o.material) ? o.material : [o.material]).forEach((m: THREE.Material) =>
            m.dispose()
          )
        }
      })
    }
    this.treadGroup = this.buildTread(spec)
    this.wheelObj.add(this.treadGroup)
    this.swSpin = 0.5
  }

  public updatePointer(clientX: number, clientY: number) {
    this.tTiltY = clientX / window.innerWidth - 0.5
    this.tTiltX = clientY / window.innerHeight - 0.5
  }

  public updateScroll(scrollMultiplier: number) {
    this.scrollSpin = scrollMultiplier
  }

  public resize() {
    if (!this.glReady) return
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight, false)
    this.fitTire()
  }

  public setPivotPositionX(x: number) {
    if (this.pivot) this.pivot.position.x = x
  }

  private fitTire() {
    if (!this.pivot) return
    const s = window.innerWidth < 760 ? 0.74 : window.innerWidth < 1100 ? 0.9 : 1
    this.pivot.scale.setScalar(s)
  }

  private animate = () => {
    if (this.glReady && this.renderer && this.scene && this.camera) {
      this.baseSpin += 0.0042
      this.switchOffset += this.swSpin
      this.swSpin *= 0.9
      this.tiltX += (this.tTiltX - this.tiltX) * 0.05
      this.tiltY += (this.tTiltY - this.tiltY) * 0.05

      this.pivot.rotation.x = this.tiltX * 0.32
      this.pivot.rotation.y = this.tiltY * 0.4
      this.pivot.position.y = Math.sin(this.baseSpin * 0.7) * 0.06

      this.wheelObj.rotation.set(-0.52, 0, this.baseSpin + this.scrollSpin + this.switchOffset)

      this.renderer.render(this.scene, this.camera)
    }
    this.animationFrameId = requestAnimationFrame(this.animate)
  }

  public dispose() {
    cancelAnimationFrame(this.animationFrameId)
    if (this.renderer) {
      this.renderer.dispose()
    }
  }
}
