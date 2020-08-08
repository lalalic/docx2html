import Converter from './converter'
import Style from './style/converter'

var AZ=/[A-Z]/g, 
  r=function(a){return '-'+a.toLowerCase()},
  clozed=/Z$/gi;
  
function asStyle(x){
  var a=[]
  for(var i in x)
    !$tool.isFunction(x[i]) && a.push(i.replace(AZ,r)+':'+x[i])
  return a.join(';')
}

export default class Shape extends Converter{
  get tag(){return 'div'}
  
  convertStyle(el){
    el.style.position='absolute'
    el.style.overflow='hidden'

    var pathStyle={stroke:'black', strokeWidth:2, fillOpacity:0},
      bgStyle=this.makeBackgroundStyle();
    super.convertStyle(...arguments)
    var style=this.wordModel.getDirectStyle(),
      propConverter=new this.constructor.Properties(el.style,this, pathStyle, bgStyle);
    style && style.parse([propConverter])
    if(this.path){
      if(el.style.background)
        pathStyle.fillOpacity=0
      var bgImage=el.style.background,
        grad=pathStyle.grad;
      delete pathStyle.grad;        
      
      var svg='<svg xmlns="http://www.w3.org/2000/svg">'
          +(grad ? '<defs>'+grad+'</defs>' : '')
          +this.path+' style="'+asStyle(pathStyle)+'" /></svg>';
      var svgImage='url('+this.doc.asImageURL(svg)+')';
      bgStyle.backgroundImage=svgImage
      bgStyle.backgroundSize='100% 100%'
    }
  }
  makeBackgroundStyle(){
    //make background el to hold svg background
    var id='shape'+this.doc.uid()
    this.content.setAttribute('id',id)
    var style=this.doc.createStyle('#'+id+'::before')
    style.content='""'
    style.zIndex=-1
    style.position='absolute'
    style.width='100%'
    style.height='100%'
    style.left=0
    style.top=0
    return style
  }
}

Shape.Properties=class Properties extends Style.Properties{
  constructor(style,parent, pathStyle, bgStyle){
    super(...arguments)
    this.pathStyle=pathStyle
    this.bgStyle=bgStyle
  }

  xfrm(x){
    this.style.width=x.width+'px'
    this.style.height=x.height+'px'
    x.x && (this.style.left=x.x+'px')
    x.y && (this.style.top=x.y+'px')
    
    x.rotation && this.styless('transform','rotate('+x.rotation+'deg)')
    
    this.world=x
  }
  ln(x){
    x.color && (this.pathStyle.stroke=x.color);
    x.width!=undefined && (this.pathStyle.strokeWidth=x.width+'px');
    
    switch(x.cap){
    case 'rnd':
      this.pathStyle.strokeLinecap='round'
      break
    default:
      
    }
    
    if(x.dash){
      switch(this.lineStyle(x.dash)){
      case 'dotted':
        this.pathStyle.strokeDasharray="5,5"
        break
      break
      case 'dashed':
        this.pathStyle.strokeDasharray="10,10"
      break
      }
    }
  }
  solidFill(x){
    this.pathStyle.fill=x
    this.pathStyle.fillOpacity=1
  }
  gradFill(x){
    if(this.style.backgroundImage)
      return
      
    var grad=[]
    switch(x.path){
    case 'linear':
      grad.push('<linearGradient id="grad"')
      switch(x.angel){
      case 0:
        grad.push('x1="0%" y1="0%" x2="100%" y2="0%">')
        break
      case 90:
        grad.push('x1="0%" y1="0%" x2="0%" y2="100%">')
        break
      case 180:
        grad.push('x1="100%" y1="0%" x2="0%" y2="0%">')
        break
      case 270:
        grad.push('x1="0%" y1="100%" x2="0%" y2="0%">')
        break
      }
      grad.push('</linearGradient>')
      break
    case 'circle':
      grad.push('<radialGradient  id="grad"')
      grad.push('cx="50%" cy="50%" r="50%" fx="50%" fy="50%">')
      grad.push('</radialGradient>')
      break
    }
    var end=grad.pop()
    for(var i=0,len=x.stops.length,a;i<len;i++)
      grad.push('<stop offset="'+(a=x.stops[i]).position+'%" style="stop-opacity:1;stop-color:'+a.color+'"/>')
    grad.push(end)
    
    this.pathStyle.grad=grad.join(' ')
    this.pathStyle.fill='url(#grad)'
    this.pathStyle.fillOpacity=1
  }
  blipFill(x){
    this.style.background='url('+this.doc.asImageURL(x)+')'
    this.style.backgroundSize='100% 100%'
    this.noFill()
  }
  noFill(x){
    this.pathStyle.fillOpacity=0
  }
  lnRef(x){
    this.ln(x)
  }
  fillRef(x){
    if(this.style.backgroundImage)
      return
    
    if(typeof(x.path)!='undefined')
      return this.gradFill(x);
      
    if(typeof(x)=='string')
      this.pathStyle.fill=x
    else if(typeof(x.color)!='undefined')
      this.pathStyle.fill=x.color
    else
      return;
    this.pathStyle.fillOpacity=1
  }
  fontRef(x){
    x.color && (this.style.color=x.color);
    x.family && (this.style.fontFamily=x.family);
  }
  path(x, t){
    switch(x.shape){
    case 'line':
      this.parent.path='<line x1="0" y1="0" x2="'+this.world.width+'pt" y2="'+this.world.height+'pt"'
      break
    case 'rect':
      this.parent.path='<rect width="'+this.world.width+'pt" height="'+this.world.height+'pt"'
      break;  
    case 'roundRect':
      this.parent.path='<rect rx="'+(t=Math.min(this.world.width, this.world.height)/12)+'pt" ry="'+t+'pt" width="'+this.world.width+'pt" height="'+this.world.height+'pt"'
      break;
    case 'ellipse':
      this.parent.path='<ellipse cx="'+this.world.width/2+'pt" cy="'+this.world.height/2+'pt" rx="'+this.world.width/2+'pt" ry="'+this.world.height/2+'pt"'
      break
    case 'path':
      this.parent.path='<path d="'+x.path+'"'
      if(!clozed.test(x.path))
        this.noFill()
      break
    }
  }
  spAutoFit(){
    this.style.height='auto'
  }
  lIns(x){
    this.style.paddingLeft=x+'px'
  }
  tIns(x){
    this.style.paddingTop=x+'px'
  }
  rIns(x){
    this.style.paddingRight=x+'px'
  }
  bIns(x){
    this.style.paddingBottom=x+'px'
  }
  anchor(x){
    this.style.display='table-cell'
    this.style.verticalAlign=x
  }
  vert(x){
    this.style.height=this.world.width+'px'
    this.style.width=this.world.height+'px'
    var delta=(this.world.width-this.world.height)/2
            
    this.bgStyle.height=this.world.height+'px'
    this.bgStyle.width=this.world.width+'px'
    this.styless('transform','translate(-'+delta+'pt,'+delta+'pt) rotate(-'+x+'deg) ', this.bgStyle)

    this.styless('transform','translate('+delta+'pt,-'+delta+'pt) rotate('+(x+this.world.rotation||0)+'deg)')
  }
}