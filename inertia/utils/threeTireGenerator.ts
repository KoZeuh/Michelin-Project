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

  // Variables d'animation
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

  // Construction de la roue
  private strut(p1: THREE.Vector3, p2: THREE.Vector3, mat: THREE.Material, w: number, d?: number) {
    const dir = new THREE.Vector3().subVectors(p2, p1)
    const len = dir.length()
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, len, d || w), mat)
    m.position.copy(p1).add(p2).multiplyScalar(0.5)
    m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize())
    return m
  }

  private buildWheel() {
    const g = new THREE.Group()
    const rimMat = new THREE.MeshStandardMaterial({
      color: 0x0e1119,
      roughness: 0.34,
      metalness: 0.55,
    })
    const aero = new THREE.Mesh(new THREE.TorusGeometry(1.3, 0.3, 12, 200), rimMat)
    aero.scale.set(1, 1, 0.28)
    g.add(aero)
    const hook = new THREE.Mesh(
      new THREE.TorusGeometry(BEAD, 0.05, 16, 200),
      new THREE.MeshStandardMaterial({ color: 0x3a4254, roughness: 0.3, metalness: 0.8 })
    )
    hook.scale.set(1, 1, 0.6)
    g.add(hook)
    const hub = new THREE.Mesh(
      new THREE.CylinderGeometry(0.17, 0.17, 0.6, 30),
      new THREE.MeshStandardMaterial({ color: 0x14181f, roughness: 0.34, metalness: 0.9 })
    )
    hub.rotation.x = Math.PI / 2
    g.add(hub)

    const flMat = new THREE.MeshStandardMaterial({
      color: 0x232a36,
      roughness: 0.4,
      metalness: 0.85,
    })
    ;[-0.27, 0.27].forEach((z) => {
      const fl = new THREE.Mesh(new THREE.CylinderGeometry(0.27, 0.27, 0.045, 30), flMat)
      fl.rotation.x = Math.PI / 2
      fl.position.z = z
      g.add(fl)
    })

    const casMat = new THREE.MeshStandardMaterial({
      color: 0x9aa3b2,
      roughness: 0.3,
      metalness: 0.92,
    })
    for (let k = 0; k < 5; k++) {
      const c = new THREE.Mesh(
        new THREE.CylinderGeometry(0.36 - k * 0.035, 0.36 - k * 0.035, 0.028, 28),
        casMat
      )
      c.rotation.x = Math.PI / 2
      c.position.z = 0.31 + k * 0.05
      g.add(c)
    }

    const spMat = new THREE.MeshStandardMaterial({
      color: 0xc2cad6,
      roughness: 0.3,
      metalness: 0.85,
    })
    const NS = 24
    for (let s = 0; s < NS; s++) {
      const a = (s / NS) * Math.PI * 2
      const z = s % 2 ? 0.27 : -0.27
      const p1 = new THREE.Vector3(Math.cos(a) * 0.27, Math.sin(a) * 0.27, z)
      const p2 = new THREE.Vector3(Math.cos(a) * 1.3, Math.sin(a) * 1.3, 0)
      g.add(this.strut(p1, p2, spMat, 0.017, 0.05))
    }
    return g
  }

  private buildTread(spec: any) {
    const g = new THREE.Group()
    const w = spec.width
    const Rc = BEAD + w
    const rubber = new THREE.MeshStandardMaterial({
      color: 0x0c0f15,
      roughness: spec.tread === 'slick' ? 0.32 : 0.72,
      metalness: 0.18,
    })
    g.add(new THREE.Mesh(new THREE.TorusGeometry(Rc, w, 40, 220), rubber))

    if (spec.tread !== 'slick') {
      const cfg =
        spec.tread === 'cx'
          ? { size: [0.085, 0.075, 0.13], around: 40, phis: [-0.66, -0.34, 0, 0.34, 0.66] }
          : { size: [0.055, 0.05, 0.09], around: 62, phis: [-0.62, -0.4, -0.14, 0.14, 0.4, 0.62] }

      const km = new THREE.MeshStandardMaterial({
        color: 0x05060a,
        roughness: 0.86,
        metalness: 0.1,
      })
      const im = new THREE.InstancedMesh(
        new THREE.BoxGeometry(cfg.size[0], cfg.size[1], cfg.size[2]),
        km,
        cfg.phis.length * cfg.around
      )
      const o = new THREE.Object3D()
      let i = 0

      for (let t = 0; t < cfg.around; t++) {
        const theta = (t / cfg.around) * Math.PI * 2
        cfg.phis.forEach((phi, pi) => {
          const th = theta + (pi % 2 ? Math.PI / cfg.around : 0)
          const rr = Rc + w * Math.cos(phi)
          const x = rr * Math.cos(th),
            y = rr * Math.sin(th),
            zz = w * Math.sin(phi)
          o.position.set(x, y, zz)
          o.lookAt(
            x + Math.cos(phi) * Math.cos(th),
            y + Math.cos(phi) * Math.sin(th),
            zz + Math.sin(phi)
          )
          const center = Math.abs(phi) < 0.18
          const sc = center ? 1.1 : Math.abs(phi) > 0.55 ? 0.8 : 0.95
          o.scale.set(sc, sc, center ? 1.2 : 1)
          o.updateMatrix()
          im.setMatrixAt(i++, o.matrix)
        })
      }
      g.add(im)
    } else {
      g.add(
        new THREE.Mesh(
          new THREE.TorusGeometry(Rc + w * 0.985, 0.01, 8, 200),
          new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 0.5 })
        )
      )
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
