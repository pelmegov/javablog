import { Component, OnInit } from '@angular/core';
import {Tag} from '../../entities/tag/tag.model';

@Component({
  selector: 'jhi-side-bar',
  templateUrl: './side-bar.component.html',
  styles: []
})
export class SideBarComponent implements OnInit {
  tags: Tag[];

  constructor() { }

  ngOnInit() {
  }

}
