import { Component, OnInit, ContentChildren, AfterContentInit, ContentChild, QueryList, Input, Output, EventEmitter } from '@angular/core';
import { ExpandDirections } from 'src/app/core/components/models/Toolbars/expand-directions';
import { Button } from 'src/app/core2/interfaces/button';
import { ButtonAliasComponent } from '../../buttons/button-alias/button-alias.component';

@Component({
  selector: 'app-expandable-toolbar2',
  templateUrl: './expandable-toolbar2.component.html',
  styleUrls: ['./expandable-toolbar2.component.scss']
})
export class ExpandableToolbar2Component implements OnInit, AfterContentInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    this.buttons = this.buttonComponents.toArray()
    if(!this.toggleButton){
      // if no toggle button was specified
      if(this.buttons.length > 0){
        this.toggleButton = this.buttons[0]
      }
    }
    // remove toggle button from buttons array
    let indexOfToggle = this.buttons.indexOf(this.toggleButton)
    if(indexOfToggle != -1){
      this.buttons.splice(indexOfToggle, 1)
    }

    // adjust ui to state
    this.isExpanded ? this.expand() : this.collapse()

    this.listenForToggleButtonClick()
  }

  // ------------------------------------- DATA -------------------------------------
  @ContentChild('toggle') toggleButton: Button
  @ContentChildren(ButtonAliasComponent) buttonComponents: QueryList<Button>
  buttons: Button[]

  // ------------------------------------- STATE -------------------------------------
  @Input() isExpanded = false
  @Input() expandDirection: ExpandDirections = ExpandDirections.Right

  // ------------------------------------- EVENTS -------------------------------------
  @Output() expanded = new EventEmitter()
  @Output() collapsed = new EventEmitter()

  // ------------------------------------- SIGNALERS -------------------------------------
  signal_expanded(): void {
    this.expanded.emit()
  }

  signal_collapsed(): void {
    this.collapsed.emit()
  }

  // ------------------------------------- STYLES -------------------------------------
  @Input() gap: string = "10px"

  getToolbarStyles(): {} {
    let flexDirection;
    switch(this.expandDirection){
      case ExpandDirections.Up: {
        flexDirection = "column-reverse"
        break
      }
      case ExpandDirections.Down: {
        flexDirection = "column"
        break
      }
      case ExpandDirections.Left: {
        flexDirection = "row-reverse"
        break
      }
      case ExpandDirections.Right: {
        flexDirection = "row"
        break
      }
    }
    return {
      gap: this.gap,
      flexDirection: flexDirection
    }
  }

  // ------------------------------------- FUNCTIONALITY -------------------------------------
  listenForToggleButtonClick(): void {
    if(this.toggleButton){
      this.toggleButton.clicked.subscribe(() => {
        this.toggleExpand()
      })
    }
  }

  toggleExpand(): void {
    if(this.isExpanded){
      this.collapse()
    }
    else{
      this.expand()
    }
  }

  expand(): void {
    this.showOtherButtons()
    this.isExpanded = true
    this.signal_expanded()
  }

  collapse(): void {
    this.hideOtherButtons()
    this.isExpanded = false
    this.signal_collapsed()
  }

  hideOtherButtons(): void {
    this.buttons.forEach(button => this.hideButton(button))
  }

  showOtherButtons(): void {
    this.buttons.forEach(button => this.showButton(button))
  }

  hideButton(button: Button): void {
    button.getElement().nativeElement.setAttribute('style', 'display: none')
  }

  showButton(button: Button): void {
    button.getElement().nativeElement.setAttribute('style', 'display: auto')
  }
}
