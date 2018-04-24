import { SettingService } from './../../services/setting';
import { Component } from '@angular/core';
import { Toggle } from 'ionic-angular';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage { 

  constructor(private settingService: SettingService){
  }

  onToggle(toggle: Toggle){
    this.settingService.setBackground(toggle.checked);    
  }

  checkAltBackground(){
    return this.settingService.isAltBackground();
  }

}
