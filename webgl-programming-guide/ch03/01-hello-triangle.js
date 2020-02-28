import Demo from '../common/demo'
import vert from '../shaders/a_pos.vs'
import frag from '../shaders/red.fs'

export class HelloTriangle extends Demo{

  constructor(name){
    super(name,{vert,frag})

    let gl = this.ctx
    
    let vertices = new Float32Array([
      0.0, 0.5, -0.5, -0.5, 0.5, -0.5
    ])
    
    //定点个数
    this.count = 3

    // Create a buffer object
    let vertexBuffer = gl.createBuffer()

    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)

    // Write data into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

    let a_Position = gl.getAttribLocation(gl.program, 'a_Position')

    // Assign the buffer object to a_Position variable
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0)

    // Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position)

    this.render()

  }
  render() {
    let gl = this.ctx
    
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.drawArrays(gl.TRIANGLES, 0, this.count)
    // gl.drawArrays(gl.LINES, 0, this.count)
    // gl.drawArrays(gl.LINE_STRIP, 0, this.count)
    // gl.drawArrays(gl.LINE_LOOP, 0, this.count)
  }

}