import { Component, Injectable, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-alias',
  templateUrl: './button-alias.component.html',
  styleUrls: ['./button-alias.component.scss']
})
@Injectable() export class ButtonAliasComponent implements OnInit {
  // allows for composition with different types of components that reference this one as an alias
  constructor() { }

  ngOnInit(): void {
  }

}
