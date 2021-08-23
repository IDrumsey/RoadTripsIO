import { Component, OnInit, Input } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-profile-image',
  templateUrl: './user-profile-image.component.html',
  styleUrls: ['./user-profile-image.component.css']
})
export class UserProfileImageComponent implements OnInit {
  // data
  path: string = "assets/images/pexels-andrea-piacquadio-722014.jpg"
  placeholderIcon = faUser

  // styles
  @Input() size: string = "200px"

  constructor() { }

  ngOnInit(): void {
  }

  getWrapperStyles(): {} {
    return {
      width: this.size,
      height: this.size,
      backgroundImage: `url('${this.path}')`
    }
  }

  getIconStyles(): {} {
    return {
      fontSize: "100px",
      color: "#000"
    }
  }

  hasImage(): boolean {
    return this.path != null
  }
}
