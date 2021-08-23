import { Subject } from "rxjs"

export class ButtonManager {
    constructor(fgDefaultColor: string, selected: boolean, showing: boolean, disabled: boolean, selectable: boolean, fgHoverColor?: string, fgSelectColor?: string, enabledTitle?: string, disabledTitle?: string){
        // init default values
        this.opacity = this.defaultOpacity
        
        // assign inputs
        this.fgDefaultColor = fgDefaultColor
        this.fgColor = this.fgDefaultColor
        this.selected = selected
        this.showing = showing
        this.disabled = disabled
        if(this.disabled){
            this.disable()
        }

        this.selectable = selectable

        if(fgHoverColor){
            this.fgHoverColor = fgHoverColor
        }

        if(fgSelectColor){
            this.fgSelectColor = fgSelectColor
        }

        if(enabledTitle){
            this.enabledTitle = enabledTitle
        }

        if(disabledTitle){
            this.disabledTitle = disabledTitle
        }

        if(!this.disabled && this.enabledTitle){
            this.hoverTitle = this.enabledTitle
        }
        else if(this.disabled && this.disabledTitle){
            this.hoverTitle = this.disabledTitle
        }
        else{
            this.hoverTitle = ''
        }
    }


    // styles refs
    protected fgDefaultColor: string
    protected fgHoverColor: string | null
    protected fgSelectColor: string | null

    protected defaultOpacity: number = 1
    protected disabledOpacity: number = 0.8

    // current styles
    fgColor: string
    opacity: number
    
    // state
    protected hovering: boolean = false
    protected selected: boolean = false
    protected showing: boolean = true
    protected disabled: boolean = false
    isDisabled(): boolean {
        return this.disabled
    }
    protected selectable: boolean = false

    protected watchingMouseEnter: boolean = true
    protected watchingMouseExit: boolean = true
    protected watchingClick: boolean = true

    // data
    protected disabledTitle: string | null
    protected enabledTitle: string | null
    hoverTitle: string

    // events
    mouseEnterEmitter = new Subject()
    mouseEnter(): void {
        if(this.watchingMouseEnter){
            this.onHoverStateHandler()
            this.onHoverStyleHandler()
        }

        this.mouseEnterEmitter.next()
    }

    mouseExitEmitter = new Subject()
    mouseExit(): void {
        if(this.watchingMouseExit){
            this.onMouseExitStateHandler()
            this.onMouseExitStyleHandler()
        }

        this.mouseExitEmitter.next()
    }

    clickEmitter = new Subject()
    click(): void {
        if(this.watchingClick){
            this.quietClickHandler()
        }

        this.clickEmitter.next()
    }

    quietClickHandler(): void {
        this.onClickStateHandler()
        this.onClickStyleHandler()
    }

    // helper functions
    disable(): void {
        this.disableStateHandler()
        this.disableStyleHandler()
    }

    enable(): void {
        this.enableStateHandler()
        this.enableStyleHandler()
    }

    // styles handlers
    protected onHoverStyleHandler: Function = () => {
        if(this.fgHoverColor){
            this.fgColor = this.fgHoverColor
        }
    }

    protected onMouseExitStyleHandler: Function = () => {
        this.fgColor = this.fgDefaultColor
    }

    protected onClickStyleHandler: Function = () => {
        if(this.selectable){
            if(this.selected){
                if(this.fgSelectColor){
                    this.fgColor = this.fgSelectColor
                }
            }
            else{
                if(this.fgHoverColor){
                    this.fgColor = this.fgHoverColor
                }
            }
        }
    }

    protected disableStyleHandler(): void {
        this.opacity = this.disabledOpacity
    }

    protected enableStyleHandler(): void {
        this.opacity = this.defaultOpacity
    }

    // state handlers
    protected onHoverStateHandler: Function = () => {
        this.hovering = true
    }

    protected onMouseExitStateHandler: Function = () => {
        this.hovering = false
    }

    protected onClickStateHandler: Function = () => {
        if(this.selectable){
            if(this.selected){
                this.watchingMouseExit = true
                this.watchingMouseEnter = true
            }
            else{
                this.watchingMouseExit = false
                this.watchingMouseEnter = false
            }

            this.selected = !this.selected
        }
    }

    protected disableStateHandler(): void {
        this.disabled = true
        if(this.disabledTitle){
            this.hoverTitle = this.disabledTitle
        }
        else{
            this.hoverTitle = ''
        }
        this.watchingMouseEnter = false
        this.watchingMouseExit = false
    }

    protected enableStateHandler(): void {
        this.disabled = false
        if(this.enabledTitle){
            this.hoverTitle = this.enabledTitle
        }
        else{
            this.hoverTitle = ''
        }
        this.watchingMouseEnter = true
        this.watchingMouseExit = true
    }
}
