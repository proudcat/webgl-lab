// import {Spector,EmbeddedFrontend} from 'spectorjs'
import {initShader} from './webgl-util'

export default class Demo{
  constructor(name,shaders,context='webgl'){
    this.name = name

    let $container = document.querySelector('#container')

    let $div = document.createElement('div')
    $div.className='demo'

    let $button = document.createElement('button')
    $button.textContent=name
    $button.onclick = ()=>{
      console.log('click',this.name)
      // let spector = new Spector()

      // spector.onCapture.add(result => {
      //   let resultView = new EmbeddedFrontend.ResultView()
      //   resultView.display()
      //   resultView.addCapture(result)
      // })
      // window.requestAnimationFrame(()=>this.render())
   
      // spector.captureCanvas(this.$canvas)
      this.render()
    }
    
    let $canvas = document.createElement('canvas')
    $canvas.id = name
    $canvas.textContent='你的浏览器不支持 WebGL.'
    $canvas.addEventListener('webglcontextcreationerror', event => {
      console.log('WebGL Error:',event.statusMessage)
    }, false)

    $div.appendChild($button)
    $div.appendChild($canvas)
    $container.appendChild($div)
    
    this.$canvas = $canvas
    this.ctx = this.$canvas.getContext(context)

    $canvas.width =$canvas.clientWidth
    $canvas.height =$canvas.clientHeight

    if(context.includes('webgl')){
      this.ctx.viewport(0,0,this.ctx.drawingBufferWidth,this.ctx.drawingBufferHeight)
    }

    if(shaders){
      if(!initShader(this.ctx,shaders.vert,shaders.frag)){
        console.error('failed to initialize shaders')
        return
      }
    }

  }

  render(){
    throw '没有实现render方法'
  }

}