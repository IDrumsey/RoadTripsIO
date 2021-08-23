import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { AppColors } from "src/app/core/data/models/app-colors";

import { IconButtonManager } from "./icon-button-manager";

export class ShapeIconButtonManager extends IconButtonManager {
    constructor(icon: IconDefinition, fgDefaultColor: string, isSelected: boolean, isShowing: boolean, isDisabled: boolean, isSelectable: boolean, fgHoverColor?: string, fgSelectColor?: string, enabledTitle?: string, disabledTitle?: string, iconSize?: string, bgRegularColor?: string, bgHoverColor?: string, bgSelectColor?: string, borderRegularColor?: string, borderHoverColor?: string, borderSelectColor?: string, padding?: number, size?: string, borderWidth?: number){
        super(icon, fgDefaultColor, isSelected, isShowing, isDisabled, isSelectable, fgHoverColor, fgSelectColor, enabledTitle, disabledTitle, iconSize)

        // define initial styles
        if(bgRegularColor){
            this.bgRegularColor = bgRegularColor
        }
        else{
            this.bgRegularColor = "rgba(0,0,0,0)"
        }

        if(bgHoverColor){
            this.bgHoverColor = bgHoverColor
        }

        if(bgSelectColor){
            this.bgSelectColor = bgSelectColor
        }

        if(this.selected){
            this.bgColor = this.bgSelectColor
        }
        else if(this.hovering){
            this.bgColor = this.bgHoverColor
        }
        else {
            this.bgColor = this.bgRegularColor
        }

        if(borderRegularColor){
            this.borderRegularColor = borderRegularColor
        }
        else{
            this.borderColor = this.defaultBorderRegularColor
        }

        if(borderHoverColor){
            this.borderHoverColor = borderHoverColor
        }

        if(borderSelectColor){
            this.borderSelectColor = borderSelectColor
        }

        if(this.selected){
            this.borderColor = this.borderSelectColor
        }
        else if(this.hovering){
            this.borderColor = this.borderHoverColor
        }
        else {
            this.borderColor = this.borderRegularColor
        }

        if(padding){
            this.padding = padding
        }
        else{
            this.padding = this.defaultPadding
        }

        if(size){
            this.size = size
        }
        else{
            this.size = this.defaultSize
        }

        if(borderWidth){
            this.borderWidth = borderWidth
        }
        else{
            this.borderWidth = this.defaultBorderWidth
        }

        this.mouseEnterEmitter.subscribe(() => {
            this.shapeHoverHandler()
        })
        this.mouseExitEmitter.subscribe(() => {
            this.shapeMouseExitHandler()
        })
        this.clickEmitter.subscribe(() => {
            this.shapeSelectHandler()
        })
    }

    // default styles
    protected defaultBorderRegularColor = AppColors.onColorLight
    protected defaultBorderWidth = 2
    protected defaultPadding = 5
    protected defaultSize = "25px"

    // defined styles
    protected bgRegularColor: string
    protected bgHoverColor: string
    protected bgSelectColor: string
    protected borderRegularColor: string
    protected borderHoverColor: string
    protected borderSelectColor: string

    // current styles
    protected padding: number
    protected size: string
    protected borderWidth: number
    protected bgColor: string
    protected borderColor: string

    getShapeStyles(): {} {
        return {
            backgroundColor: this.bgColor,
            border: `${this.borderWidth} solid ${this.borderColor}`,
            padding: `${this.padding}px`,
            width: this.size,
            height: this.size
        }
    }

    shapeHoverHandler(): void {
        if(this.watchingMouseEnter){
            if(this.bgHoverColor){
                this.bgColor = this.bgHoverColor
            }
        }
    }

    shapeMouseExitHandler(): void {
        if(this.watchingMouseExit){
            if(this.bgRegularColor){
                this.bgColor = this.bgRegularColor
            }
        }
    }

    shapeSelectHandler(): void {
        if(this.bgSelectColor){
            this.bgColor = this.bgSelectColor
        }
    }
    
}
