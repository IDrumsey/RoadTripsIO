import { Router } from "@angular/router"

export class NavURLPiece {
    constructor(private router: Router, name: string, path?: string){
        this.name = name
        if(path != null){
            this.path = path
        }
    }

    // ------------------------------- DATA -------------------------------
    name: string
    path: string

    // ------------------------------- FUNCTIONALITY -------------------------------
    route(): void {
        if(this.path != null){
            this.router.navigateByUrl(this.path)
        }
        else{
            throw "No path defined. Can't route."
        }
    }
}
