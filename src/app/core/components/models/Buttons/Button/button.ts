// Native
import {EventEmitter} from '@angular/core';

import {ButtonInterface} from '../button-interface';

export class Button implements ButtonInterface {
    click: EventEmitter<any> = new EventEmitter();

    constructor(){}

    onClick(): void {
        this.click.emit();
    }

    onIconMouseEnter(): void {

    }

    onIconMouseExit(): void {
        
    }
}
