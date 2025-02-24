import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-institution-view-configuration',
  templateUrl: './institution-view-configuration.component.html',
  styleUrls: ['./institution-view-configuration.component.css']
})
export class InstitutionViewConfigurationComponent {
  @Input() viewConfiguration: any;
}
