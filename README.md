# Awesome-image-loader
 
A js script made to improve image loading and user experience.

## Initialisation

You must include the script that creates a new custom element on each page where you want to use it

```html
<script src="path/to/ImageElement.js"></script>
```

## The custom element

Use this simple custom element to make your images loading magically

```html
<image-element data-src="path/to/image.png" />
```

## Attributes available

- `data-src` (required)

The source of the image file

- `data-srcset`

The srcset attribute of the traditionnal `<img />` tag

- `data-alt`

The alt attribute of the traditionnal `<img />` tag

- `data-loader`

The text written where the image is loading.
By default, it is set to `"Loading..."`
