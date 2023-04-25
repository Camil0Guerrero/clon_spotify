# Replicando Spotify haciendo uso de su API

Este proyecto aún esta en proceso, por lo que verán mucho desorden y código muy redundante, estoy tratando de apartar en "pages" los componentes que mostrare en el index.html aunque en este ya podemos encontrar un borrador de como se vera nuestro proyecto en cuanto termine

## Uso

En caso de querer usar o ir viendo el desarrollo del proyecto es necesario hacer el registro en el [API](https://developer.spotify.com/dashboard) de Spotify y guardar tu información en un archivo data.json en la carpeta de assets

```
  const data = {
    client_id: "",
    client_secret: "",
    redirect_uri: "url que el api enviara el código",
    scope: "user-read-private user-read-email playlist-read-private user-top-read",
  };

  export default data;
```

los scopes son necesarios para que el API nos de acceso a nuestros datos, como por ejemplo nuestras canciones mas escuchadas

### Gracias [JonMircha](https://www.youtube.com/@jonmircha)

Aunque este proyecto lo he hecho desde 0 yo solo, es de recalcar que todo el conocimiento que he estado practicando es gracias a él.

### Contacto

- [Twitter](https://twitter.com/cristian321893)
- [Facebook](https://www.facebook.com/camilo.guerrero.3597789/)
- [Instagram](https://www.instagram.com/camiloguerrero63/)
