import Demo from '../common/demo'
import vert from '../shaders/pos_size.vs'
import frag from '../shaders/red.fs'

export class DrawPoint extends Demo{
  constructor(name) {
    super(name,{vert,frag})
    this.render()
  }

  render() {
    
    let gl = this.ctx

    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.drawArrays(gl.POINTS, 0, 1)
  }
}
