import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

import { ButtonManager } from "./button-manager";

export class IconButtonManager extends ButtonManager {
    constructor(icon: IconDefinition, fgDefaultColor: string, isSelected: boolean, isShowing: boolean, isDisabled: boolean, isSelectable: boolean, fgHoverColor?: string, fgSelectColor?: string, enabledTitle?: string, disabledTitle?: string, iconSize?: string){
        super(fgDefaultColor, isSelected, isShowing, isDisabled, isSelectable, fgHoverColor, fgSelectColor, enabledTitle, disabledTitle)
        this.icon = icon

        if(iconSize){
            this.iconSize = iconSize
        }
        else{
            this.iconSize = "auto"
        }
    }

    // styles refs

    // current styles
    icon: IconDefinition
    protected iconSize: string

    getIconStyles(): {} {
        return {
            color: this.fgColor,
            fontSize: this.iconSize,
            opacity: this.opacity
        }
    }
    
    // state

    // events

    // styles handlers

    // state handlers
}
