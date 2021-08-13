// Native
import {EventEmitter} from '@angular/core';
import { Subject } from 'rxjs';

import {ButtonInterface} from '../button-interface';

export class Button implements ButtonInterface {
    click: Subject<any> = new Subject();

    constructor(){}

    onClick(): void {
        this.click.next();
    }

    onIconMouseEnter(): void {}

    onIconMouseExit(): void {}

    hide(): void {}

    show(): void {}

    select(foregroundColor: string, backgroundColor?: string): void {
        console.log("selecting btn")
    }

    unselect(single?: boolean): void {
        console.log("unselecting btn")
    }
}
