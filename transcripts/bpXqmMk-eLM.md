---
title: ¿Qué es un RC **Release Candidate** de Linux?
source: https://www.youtube.com/watch?v=bpXqmMk-eLM
---

**0:08** Si estás acercándote al mundo de Linux, seguramente ya hayas visto el término release candidate en algún correo, en un anuncio de kernel o en un foro de administradores.
**0:20** Suele venir acompañado de una advertencia muy clara: No lo pongas en producción hasta que no se revise bien. Y sobre todo en el caso del Linux 7.0,
**0:28** Estas RC han estado muy en el foco porque Linus Torbals no se ha cortado en decir que le han tenido en un sin vivir.
**0:35** Release candidate en español vendría a ser como un candidato a lanzamiento. En el ecosistema Linux una RC es una versión del kernel que está casi lista para ser la versión oficial, pero que aún está en fase de pruebas internas.
**0:51** Es como si dijéramos que el edificio está construido, pero todavía se están haciendo las últimas inspecciones de seguridad, de fontanería y de electricidad antes de habilitar el edificio para que la gente viva ahí.
**1:01** En el caso de Linux, la RC no es algo de tu fedora o de tu distribución, sino del núcleo del sistema operativo. El kernel que hace que Linux funcione bajo servidores, ordenadores de escritorio, móviles, sistemas e incluso superordenadores.
**1:18** Es el motor central de todo el sistema. El proceso típico de Linux funciona así:
**1:22** Primero se abre la ventana de integración Merch Windows, unas pocas semanas en las que se aceptan cambios fuertes, nuevos drivers, reescritura de subsistemas, soporte para hardware nuevo, funciones grandes, etcétera.
**1:36** Cuando esa ventana se cierra, Linux Torbals lanza la Linux 7.0 0 RC1, por ejemplo, la primera release candidate del ciclo. A partir de ahí, cada semana sale la RC2, RC3, RC4, hasta que el kernel se considera lo suficientemente estable como para llamarse versión Linux 7.0 estable.
**1:56** En la práctica, si ves Linux 7.0 0 RC1 significa que no es la versión definitiva todavía, pero sí lo suficientemente avanzada como para que expertos, testers y distribuciones la pongan a prueba en entornos de laboratorio, en servidores de prueba, en máquinas de desarrollo para ver cómo se comporta con distintos hardware y configuraciones.
**2:17** Y aquí es donde entra el nerviosismo de Linux con el tamaño de ciertas RCS.
**2:22** En el kernel de Linux, cada línea de código que entra afecta a millones de máquinas, servidores, datacers, PCs, routers, cámaras. Por eso, si un RC llega tarde con muchos cambios grandes o si se meten parches delicados en subsistemas críticos, el riesgo de fallo se multiplica.
**2:38** En el caso de Linux 7.0 RC2, Linux comentó que estaba especialmente nervioso con el tamaño de esta. Llegó con más problemas de lo habitual, toqueteando partes sensibles del kernel, donde un fallo puede traducirse en cuelgues, pérdidas de datos o caída de rendimiento.
**2:55** Para él, ese volumen de cambios tan grande, tan cerca del lanzamiento, significa que el ciclo de desarrollo se está desviando de la calma que normalmente desearía.
**3:03** Con la RC3 y la RC4, la cosa no mejoró tanto. La 7.0 RC4, por ejemplo, traía cambios importantes en el scheduler, en el subsistema de memoria y en controladores de GPU, corrigiendo errores que podían hacer que el sistema se quedara colgado bajo ciertas condiciones de carga de procesos.
**3:21** Para Linux, que una RC de mitad de ciclo siga trayendo cambios tan serios, era una señal, de nuevo, de que el sistema no estaba yendo como debería.
**3:30** Pero con la RC5 el ritmo cambió. El número de cambios se redujo. Se entraron más en correcciones de books, mappings y detalles de hardware, dejando de lado las grandes reescrituras.
**3:40** Linux lo leyó como una buena señal y dijo algo así como que las cosas se estaban calmando. Aún así, la RC6 volvió a traer ciertos problemas y nuevos parches, lo que mostró que el ciclo del Linux 7.0 0 ha sido más movido de lo habitual con muchas pruebas, muchas correcciones y muchas miradas puestas en el timing.
**3:58** En cuanto a la pregunta clave, ¿cuándo llega el Linux 7.0 y cuántas RC hacen falta? La realidad es que no hay un número fijo, no es un listón de 7 RC y se cierra sí o sí. Todo depende de cómo se vaya estabilizando el código.
**4:11** Lo normal suele ser que pasen entre 6 y 8 RCS, por ejemplo, de la 7.0 RC1 hasta la 7.0 0 RC8 antes de que Linux marque la versión como estable.
**4:20** En el caso de Linux 7.0, el calendario previsto apuntaba que la versión estable llegaría mediados de abril de 2026 tras un ciclo de desarrollo de unas 10 semanas desde la RC1.
**4:31** Algunas fechas concretas barajadas eran el 5, el 12 o el 19 de abril de 2026, dependiendo de si el proceso se cerraba con siete RC o se alargaba con alguna extra.
**4:42** Si no aparecen contratiempos graves, la versión final debería estar disponible en esos días y esas fechas son en las que muchas distribuciones como Ubuntu 26.4 LTS y Fedora 44 están mirando para integrar Linux 7.0 como kernel base.
**4:59** ¿Y por qué todo este lío nerviosismo y protagonismo? Pues porque bajo la capa de RC Linux 7.0 0 es una de las actualizaciones más potentes de la última década con apoyo de gigantes como Google, Intel e incluso Microsoft que ya no mira Linux como un enemigo, sino como un aliado.
**5:15** Así que aunque las RC pueden poner los pelos de punta al propio Linux, también son la garantía de que el kernel, que luego llega a tu servidor o a tu PC, han pasado por una ronda de pruebas intensas diseñadas precisamente para que no tengas que saltar del caos de Windows 11 a un nuevo caos en un kernel inestable.
**5:36** Si te ha gustado este vídeo, dale like, suscríbete y cualquier duda o sugerencia puedes dejarla en la caja de comentarios. Nos vemos en el siguiente vídeo.
