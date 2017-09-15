import { NgModule } from '@angular/core';
import { MaskDirective } from './mask/mask';
import { ImgDefalutDirective } from './img-defalut/img-defalut';
import { HiddenDirective } from './hidden/hidden';

@NgModule({
	declarations: [MaskDirective,
    ImgDefalutDirective,
    HiddenDirective],
	imports: [],
	exports: [MaskDirective,
    ImgDefalutDirective,
    HiddenDirective]
})
export class DirectivesModule {}
