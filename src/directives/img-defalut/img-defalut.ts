import { Directive,Input } from '@angular/core';

/**
 * Generated class for the ImgDefalutDirective directive.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
 * for more info on Angular Directives.
 */
@Directive({
  selector: 'img[default]', // Attribute selector
  host: {
    '(error)': 'updateUrl()',
    '[src]':'src'
  }
})
export class ImgDefalutDirective {
  constructor() {
    console.log('Hello ImgDefalutDirective Directive');
  }
  @Input() src:string;
  @Input() default:string;

  updateUrl() {
    console.log('Yes directive !,',this.default);
    this.src = this.default;
  }

}
