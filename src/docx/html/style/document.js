import Paragraph from './paragraph'
import Inline from './inline'

export default class Document extends Paragraph{
	_getPropertiesConverter(category){
		if(this[category])
			return this[category]
		switch(category){
		case 'inline':
			this.inlineStyle=this.doc.createStyle('span,a')
			return this[category]=new Inline.Properties(this.inlineStyle)
		case 'paragraph':
			this.paragraphStyle=this.doc.createStyle('p,h1,h2,h3,h4,h5,h6')
			return this[category]=new this.constructor.Properties(this.paragraphStyle)
		}
	}
}