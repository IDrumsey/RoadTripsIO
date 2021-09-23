import { AppColors } from "src/app/core/data/models/app-colors"
import { NotificationOptions } from "./notification-options"

const defaultOptions = {
    bgColor: AppColors.elevation3,
    textColor: AppColors.onColorLighter
}

export class Notification {
    constructor(message: string, options: NotificationOptions){
        this.message = message
        if(options.bgColor){
            this.bgColor = options.bgColor
        }
        else{
            this.bgColor = defaultOptions.bgColor
        }
        if(options.textColor){
            this.textColor = options.textColor
        }
        else{
            this.textColor = defaultOptions.textColor
        }
    }

    message: string
    bgColor: string
    textColor: string
}
