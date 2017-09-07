import { NgModule } from '@angular/core';
import { MaskDirective } from './mask/mask';
import { ImgDefalutDirective } from './img-defalut/img-defalut';

@NgModule({
	declarations: [MaskDirective,
    ImgDefalutDirective],
	imports: [],
	exports: [MaskDirective,
    ImgDefalutDirective]
})
export class DirectivesModule {}
