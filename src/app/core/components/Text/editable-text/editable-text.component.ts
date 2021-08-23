import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { faCheck, faPencilAlt, faTimes } from '@fortawesome/free-solid-svg-icons';

import { AppColors } from 'src/app/core/data/models/app-colors';
import { AppFonts } from 'src/app/core/data/models/app-fonts';
import { TextInputComponent } from '../text-input/text-input.component';

@Component({
  selector: 'app-editable-text',
  templateUrl: './editable-text.component.html',
  styleUrls: ['./editable-text.component.css']
})
export class EditableTextComponent implements OnInit {
  // data
  @Input() text: string;
  @ViewChild('editField') editInputField: TextInputComponent;
  // https://stackoverflow.com/questions/46422007/error-error-no-value-accessor-for-form-control-with-unspecified-name-attribute/54755671
  @Input() control: any
  // bug sol'n - figure out a way to removing the control value from the input on showing the input without deleting the control value

  // events
  @Output() submit = new EventEmitter()
  @Output() cancel = new EventEmitter()

  // styles
  @Input() width: string = "100%"
  @Input() textColor: string;
  @Input() fontSize: string = "25px"
  @Input() font: string = AppFonts.Handwriting

  @Input() inputBlurStyles: {}
  @Input() inputFocusStyles: {}

  // state
  @Input() isEditing: boolean = false;

  editBtnIcon = faPencilAlt;
  cancelEditBtn = faTimes;
  confirmChangeBtn = faCheck;

  constructor() { }

  ngOnInit(): void {
  }

  getWrapperStyles(): {} {
    return {
      width: this.width
    }
  }

  getTextStyles(): {} {
    return {
      color: this.textColor,
      fontSize: this.fontSize,
      fontFamily: this.font
    }
  }

  getEditBtnStyles(): {} {
    return {
      fontSize: this.fontSize
    }
  }

  getInputFieldStyles(): {} {
    return {
      backgroundColor: AppColors.elevation2,
      color: "#fff"
    }
  }

  onEditBtnClick(): void {
    this.toggleEditing()
  }

  toggleEditing(): void {
    this.isEditing = !this.isEditing
  }

  onCancelChanges(): void {
    this.toggleEditing();
    this.cancel.emit()
  }

  onConfirmChanges(): void {
    if(this.editInputField.text != ""){
      this.text = this.editInputField.text;
    }
    this.toggleEditing()
    this.submit.emit()
  }
}
