import { Component, OnInit, Input } from '@angular/core';
import { AppColors } from '../../data/models/app-colors';
import { NavURLPiece } from '../data/models/nav-urlpiece';

@Component({
  selector: 'app-nav-url',
  templateUrl: './nav-url.component.html',
  styleUrls: ['./nav-url.component.scss']
})
export class NavURLComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

  // ------------------------------------ DATA ------------------------------------
  @Input() pieces: NavURLPiece[]

  // ------------------------------------ STYLES ------------------------------------

  getPieceStyles(piece: NavURLPiece): {} {
    if(piece.path != null){
      return this.enabledPieceStyles
    }
    else{
      return this.disabledPieceStyles
    }
  }

  commonPieceStyles = {
    fontWeight: "bold",
    fontStyle: "italic"
  }

  enabledPieceStyles = {
    cursor: "pointer",
    ...this.commonPieceStyles
  }

  disabledPieceStyles = {
    ...this.commonPieceStyles
  }
}
