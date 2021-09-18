import { Component, OnInit, Input } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-profile-image',
  templateUrl: './user-profile-image.component.html',
  styleUrls: ['./user-profile-image.component.css']
})
export class UserProfileImageComponent implements OnInit {
  // data
  @Input() path: string = "assets/images/pexels-andrea-piacquadio-722014.jpg"
  placeholderIcon = faUser
  @Input() iconSize = "100px"

  // styles
  @Input() size: string = "200px"

  constructor() { }

  ngOnInit(): void {
    this.iconStyles.fontSize = this.iconSize
  }

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

  hasImage(): boolean {
    return this.path != null
  }
}
