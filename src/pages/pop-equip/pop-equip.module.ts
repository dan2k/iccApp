import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopEquipPage } from './pop-equip';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    PopEquipPage,
  ],
  imports: [
    IonicPageModule.forChild(PopEquipPage),DirectivesModule
  ],
})
export class PopEquipPageModule {}
