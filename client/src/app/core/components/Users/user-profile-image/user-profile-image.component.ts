import { Component, OnInit, Input } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-profile-image',
  templateUrl: './user-profile-image.component.html',
  styleUrls: ['./user-profile-image.component.css']
})
export class UserProfileImageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.iconStyles.fontSize = this.iconSize
  }

  // ------------------------------- DATA -------------------------------
  @Input() path: string = "assets/images/pexels-andrea-piacquadio-722014.jpg"
  @Input() tooltip: string

  // ------------------------------- STYLES -------------------------------
  @Input() size: string = "200px"
  @Input() iconSize = "100px"
  placeholderIcon = faUser

  getWrapperStyles(): {} {
    return {
      width: this.size,
      height: this.size,
      backgroundImage: this.path ? `url('${this.path}')` : "none"
    }
  }

  iconStyles = {
    color: "#000",
    fontSize: this.iconSize
  }

  // ------------------------------- STATE -------------------------------
  hasImage(): boolean {
    return this.path != null
  }
}
