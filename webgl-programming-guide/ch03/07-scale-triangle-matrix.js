import Demo from '../common/demo'
import vert from '../shaders/a_pos_u_matrix.vert'
import frag from '../shaders/red.frag'

export class ScaleTriangleMatrix extends Demo{

  constructor(name){
    super(name,{vert,frag})

    let gl = this.ctx

    let vertices = new Float32Array([
      0.0, 0.5, -0.5, -0.5, 0.5, -0.5
    ])
    //定点个数
    this.count = 3

    let sx = 1.0, sy=1.5, sz=1.0

    let transMatrix = new Float32Array([
      sx,  0.0, 0.0, 0.0,   //第一列
      0.0, sy,  0.0, 0.0,   //第二列
      0.0, 0.0, sz,  0.0,   //第三列
      0.0, 0.0, 0.0, 1.0   //第四列
    ])

    let u_TransMatrix = gl.getUniformLocation(gl.program, 'u_TransMatrix')

    //注意 WebGL没有实现矩阵转置，所以第二个参数必须是false。
    gl.uniformMatrix4fv(u_TransMatrix,false, transMatrix)

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
  }

}