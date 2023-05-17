# Replicando Spotify haciendo uso de su API

Este proyecto esta creado para practicar y seguir aprendiendo sobre JavaScript, esta hecho para afianzar conceptos como las API y la manipulación de eventos. Si eres desarrollador y quieres hacer uso del código lo puede hacer sin problema lo puede usar para enfocarse en practicar otras areas.

Este proyecto por el momento se queda hasta aquí, me enfocare en seguir aprendiendo mas a fondo JavaScript y volver a React

## Uso

En caso de querer usar o ir viendo el desarrollo del proyecto es necesario hacer el registro en el [API](https://developer.spotify.com/dashboard) de Spotify y guardar tu información en un archivo data.json en la carpeta de assets

```
  const data = {
    client_id: "",
    client_secret: "",
    redirect_uri: "url donde el api enviara el código",
    scope: "user-read-private user-read-email playlist-read-private user-top-read user-library-read user-read-playback-state user-modify-playback-state user-follow-read",
  };

  export default data;
```

los scopes son necesarios para que el API nos de acceso a nuestros datos, como por ejemplo nuestras canciones mas escuchadas

Los previews de las canciones se pueden oir, al igual que esta enlazada con el contenido que se esta reproduciendo en el Spotify original aunque no esta en tiempo real, es necesario recargar para ver ello

### Gracias [JonMircha](https://www.youtube.com/@jonmircha)

Aunque este proyecto lo he hecho desde 0 yo solo, es de recalcar que todo el conocimiento que he estado practicando es gracias a él.

### Contacto

- [Twitter](https://twitter.com/cristian321893)
- [Facebook](https://www.facebook.com/camilo.guerrero.3597789/)
- [Instagram](https://www.instagram.com/camiloguerrero63/)
