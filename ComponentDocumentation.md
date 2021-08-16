# Component Documentation

## **Icon Button**

---

### Selector: app-icon-button

### Description : An icon that acts as a button

## Inputs -

### `icon` - Required

### Type : IconDefinition | null

### Description : The icon that is displayed. If this is not provided, the button will not work.

### `iconSize` -

### Type : string

### Default : "25px"

### Description : The size of the icon

### `regularColor` -

### Type : string

### Default : "#ebf2ff"

### Description : The color of the icon when not being hovered over

### `highlightColor` -

### Type : string | null

### Default : "#b7f3ff"

### Description : The color of the icon when being hovered over

<br/>

## **Circular Icon Button / Square Icon Button**

---

### Selector: app-circular-icon-button / app-circular-icon-button

### Description : An icon that acts as a button in the shape of a circle or square

## Inputs -

### `regularBackgroundColor` -

### Type : string

### Default : #101010

### Description: The background color of the button when not being hovered over

### `backgroundHighlightColor` -

### Type : string

### Description: The background color of the button when being hovered over.

### `padding` -

### Type : number

### Default : 5

### Description: The padding in pixels of the outline

### `regularBorderColor` -

### Type : string | null

### Default : "#ebf2ff"

### Description: The border color of the circle / square. By default, the border won't change color on hover.

### `borderHighlightColor` -

### Type : string | null

### Default : null

### Description: The border color of the circle / square on hover. If this is set to null, the border will not change colors on hover.

### `borderWidth` -

### Type : number

### Default : 2

### Description: The width of the outlining shape's border in pixels

### `size` -

### Type : string

### Default : "25px"

### Description: The width and height of the outlining shape

<br/>

## **Rectangle Button**

---

### Selector: app-rectangle-button

### Description : A button in the shape of a rectangle with text on it

## Inputs -

### `text` - Required

### Type : string

### Description: The text that appears on the button

### `fontSize` -

### Type : string

### Default : "25px"

### Description: The size of the text

### `defaultFontColor` -

### Type : string

### Default : "#ebf2ff"

### Description: The color of the text when the button isn't being hovered over

### `fontHoverColor` -

### Type : string

### Description: The color of the text when the button is being hovered over

### `font` -

### Type : string

### Default : "Fira Sans"

### Description: The font family of the text

### `width` -

### Type : string

### Default : "100%"

### Description: The width of the rectangle/button

### `height` -

### Type : string

### Description: The height of the rectangle/button

### `defaultBgColor` -

### Type : string

### Default : "#404040"

### Description: The color of the background when not being hovered over

### `bgHoverColor` -

### Type : string

### Description: The color of the background when being hovered over

### `padding` -

### Type : string

### Default : "10px"

### Description: The padding of the rectangle/button

<br/>

## **Toolbar**

---

### Selector: app-toolbar

### Description : A group of button components

## Inputs -

### `orientation` -

### Type : ComponentOrientations

### Default : ComponentOrientations.Horizontal

### Description : The orientation of the buttons. They can be horizontal or vertical

### `height` -

### Type : string

### Default : "auto"

### Description : The height of the toolbar which wraps the buttons

### `width` -

### Type : string

### Default : "auto"

### Description : The width of the toolbar which wraps the buttons

### `gap` -

### Type : number

### Default : 5

### Description : The number of pixels between each button

<br/>

## **Expandable Toolbar**

---

### Selector: app-expandable-toolbar

### Description : A group of button components that can be expanded and collapsed. This component extends the toolbar component.

## Inputs -

### `isExpanded` -

### Type : boolean

### Default : true

### Description : Whether or not all the buttons in the toolbar are showing

## Controls -

### `#Toggle` -

### Description : Placed on one of the button child components, this references which button will act as the toggle for expanding and collapsing the toolbar. If this control isn't specified, the first button child component is set to the toggle button.

<br/>

## **Select Toolbar**

---

### Selector: app-select-toolbar

### Description : A group of button components that can all be selected and unselected. It's like checkboxes but with the custom buttons.

## Inputs -

### `selectForegroundColor`

### Type : string

### Default : "#fff"

### Description : The color of the foreground in a button component when it's selected

### `selectBackgroundColor`

### Type : string

### Description : The color of the background in a button component when it's selected

## Controls -

### `#Selected` -

### Description : Indicates the a button component within the toolbar is initially selected

<br/>

## **Single Select Toolbar**

---

### Selector: app-single-select-toolbar

### Description : A group of button components of which only one can be selected and unselected at a time. It's like checkboxes but with the custom buttons. This component extends the select toolbar component.

<br/>

## **Text Input**

---

### Selector: app-text-input

### Description : A customizable text input.

## Inputs -

### `control`

### Type : FormControl

### Description : The form control to bind the input to

### `text`

### Type : string

### Default : ""

### Description : The value of the text input

### `placeholder`

### Type : string

### Description : The placeholder of the text input

### `name` - Required

### Type : string

### Description : The name of the text input element used when referencing the input value

### `textColor`

### Type : string

### Default : "#f8faff"

### Description : The color of the text

### `fontSize`

### Type : string

### Default : "20px"

### Description : The size of the text

### `font`

### Type : string

### Default : "Fira Sans"

### Description : The font family of the text

### `padding`

### Type : number

### Default : 5

### Description : The padding of the text input

### `width`

### Type : string

### Default : "100%"

### Description : The width of the component

### `bgColor`

### Type : string

### Default : "#2a2a2a"

### Description : The background color of the text input

### `focusBoxShadowBlurRadius`

### Type : number

### Default : 5

### Description : The blur radius of the box shadow that appears when the input is focused on

### `focusBoxShadowColor`

### Type : string

### Default : "#ebf2ff"

### Description : The color of the box shadow that appears when the input is focused on

### `blurStyles`

### Type : {}

### Description : The styles of the text input when not being focused on. Use this when there is an style input not specified that you want on the component.

### `focusStyles`

### Type : {}

### Description : The styles of the text input when being focused on. Use this when there is an style input not specified that you want on the component.

<br/>

## **Editable Text**

---

### Selector: app-editable-text

### Description : Some text that can be edited.

## Inputs -

### `text`

### Type : string

### Default : ""

### Description : The value of the text

### `width`

### Type : string

### Default : "75%"

### Description : The width of the component

### `textColor`

### Type : string

### Description : The color of the text when not editing

### `fontSize`

### Type : string

### Default : "25px"

### Description : The font size of the text when not editing

### `font`

### Type : string

### Default : "Caveat Brush"

### Description : The font family of the text when not editing

### `inputBlurStyles`

### Type : {}

### Description : The styles of the text input when not being focused on. Use this when there is an style input not specified that you want on the component.

### `inputFocusStyles`

### Type : {}

### Description : The styles of the text input when being focused on. Use this when there is an style input not specified that you want on the component.

### `isEditing`

### Type : boolean

### Default : false

### Description : Whether or not the component renders in its editing state or not
