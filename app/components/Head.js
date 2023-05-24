export default function Head(title, style) {
	if (style) {
		style = `<link rel="stylesheet" href="/app/assets/css/${style}.css" />`;
	}

	return `
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Font -->
    <link
      rel="preconnect"
      href="https://encore.scdn.co/fonts/CircularSp-Book-4eaffdf96f4c6f984686e93d5d9cb325.woff2"
      as="font"
      type="font/woff2"
      crossorigin="anonymous" />
    <link
      rel="preconnect"
      href="https://encore.scdn.co/fonts/CircularSp-Bold-fe1cfc14b7498b187c78fa72fb72d148.woff2"
      as="font"
      type="font/woff2"
      crossorigin="anonymous" />
    <link
      rel="preconnect"
      href="https://encore.scdn.co/fonts/CircularSpTitle-Bold-2fbf72b606d7f0b0f771ea4956a8b4d6.woff2"
      as="font"
      type="font/woff2"
      crossorigin="anonymous" />
    <link
      rel="preconnect"
      href="https://encore.scdn.co/fonts/CircularSpTitle-Black-3f9afb402080d53345ca1850226ca724.woff2"
      as="font"
      type="font/woff2"
      crossorigin="anonymous" />

    <!-- Icon -->
    <link
      rel="icon"
      sizes="32x32"
      type="image/png"
      href="https://open.spotifycdn.com/cdn/images/favicon32.b64ecc03.png" />

    <!-- CSS Style -->
    <link rel="stylesheet" href="/app/assets/css/header.css" />
    <link rel="stylesheet" href="/app/assets/css/navMenu.css" />
    <link rel="stylesheet" href="/app/assets/css/main.css" />
    <link rel="stylesheet" href="/app/assets/css/footer.css" />
    <link rel="stylesheet" href="/app/assets/css/style.css" />
    ${style}
    <title>${title}</title>
  </head>

  `;
}
