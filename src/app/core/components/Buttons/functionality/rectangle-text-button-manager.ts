import { AppColors } from "src/app/core/data/models/app-colors"
import { AppFonts } from "src/app/core/data/models/app-fonts"
import { ButtonManager } from "./button-manager"

export class RectangleTextButtonManager extends ButtonManager {
    constructor(text: string, fgDefaultColor: string, isSelected: boolean, isShowing: boolean, isDisabled: boolean, isSelectable: boolean, fgHoverColor?: string, fgSelectColor?: string, enabledTitle?: string, disabledTitle?: string, bgRegularColor?: string, bgHoverColor?: string, bgSelectColor?: string, borderRegularColor?: string, borderHoverColor?: string, borderSelectColor?: string, borderWidth?: number, padding?: string, width?: string, height?: string, fontSize?: string, fontFamily?: string, borderRadius?: number){
        super(fgDefaultColor, isSelected, isShowing, isDisabled, isSelectable, fgHoverColor, fgSelectColor, enabledTitle, disabledTitle)

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

        if(width){
            this.width = width
        }
        else{
            this.width = "auto"
        }

        if(height){
            this.height = height
        }
        else{
            this.height = "auto"
        }

        if(borderWidth != null){
            this.borderWidth = borderWidth
        }
        else{
            this.borderWidth = this.defaultBorderWidth
        }

        if(fontSize){
            this.fontSize = fontSize
        }
        else{
            this.fontSize = this.defaultFontSize
        }

        if(fontFamily){
            this.fontFamily = fontFamily
        }
        else{
            this.fontFamily = this.defaultFontFamily
        }
        
        if(borderRadius != null){
            this.borderRadius = borderRadius
        }
        else{
            this.borderRadius = this.defaultborderRadius
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
    protected defaultPadding = "5px"
    protected defaultFontSize: string = "25px"
    protected defaultFontFamily: string = AppFonts.Data
    protected defaultborderRadius: number = 5

    // defined styles
    protected bgRegularColor: string
    protected bgHoverColor: string
    protected bgSelectColor: string
    protected borderRegularColor: string
    protected borderHoverColor: string
    protected borderSelectColor: string

    // current styles
    protected padding: string
    protected width: string
    protected height: string
    protected borderWidth: number
    protected bgColor: string
    protected borderColor: string
    protected fontSize: string
    protected fontFamily: string
    protected borderRadius: number

    getShapeStyles(): {} {
        return {
            backgroundColor: this.bgColor,
            border: `${this.borderWidth} solid ${this.borderColor}`,
            borderRadius: `${this.borderRadius}px`,
            padding: this.padding,
            width: this.width,
            height: this.height
        }
    }

    getTextStyles(): {} {
        return {
            color: this.fgColor,
            fontSize: this.fontSize,
            fontFamily: this.fontFamily
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
