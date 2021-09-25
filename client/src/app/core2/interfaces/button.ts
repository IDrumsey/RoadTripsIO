import { ElementRef, EventEmitter } from "@angular/core";

export interface Button {
    select(): void;
    unselect(): void;
    clicked: EventEmitter<any>
    getElement(): ElementRef
}
