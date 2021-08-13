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

### Type : string

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
