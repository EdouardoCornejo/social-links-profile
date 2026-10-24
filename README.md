# Social Links Profile

Tarjeta de perfil de una sola pantalla con **avatar, ubicación, una breve bio y una lista de enlaces a redes sociales**, construida con **React 19 + TypeScript + Vite**. Es la solución al reto [Social links profile de Frontend Mentor](https://www.frontendmentor.io/challenges) y sirve también como plantilla de referencia para una app pequeña con **lint estricto, Prettier, _pre-commit hooks_ y CI**.

**Demo:** [social-links-profile-jet-nine.vercel.app](https://social-links-profile-jet-nine.vercel.app)

![Tech](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Tech](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Tech](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tech](https://img.shields.io/badge/ESLint-9-4B32C3?logo=eslint&logoColor=white)
![Tech](https://img.shields.io/badge/Prettier-3-F7B93E?logo=prettier&logoColor=black)

---

## Tabla de contenidos

- [Social Links Profile](#social-links-profile)
  - [Tabla de contenidos](#tabla-de-contenidos)
  - [Qué hace el proyecto](#qué-hace-el-proyecto)
  - [Cómo ejecutar el proyecto](#cómo-ejecutar-el-proyecto)
    - [Requisitos](#requisitos)
    - [Instalación](#instalación)
    - [Scripts](#scripts)
  - [Cómo funciona](#cómo-funciona)
    - [1. `src/App.tsx`](#1-srcapptsx)
    - [2. Componentes (`src/components`)](#2-componentes-srccomponents)
    - [3. Estilos](#3-estilos)
    - [Flujo de renderizado](#flujo-de-renderizado)
  - [Cómo extenderlo](#cómo-extenderlo)
  - [Calidad y CI](#calidad-y-ci)
  - [Tecnologías](#tecnologías)
  - [Estructura del proyecto](#estructura-del-proyecto)
  - [Personalización](#personalización)
  - [Licencia](#licencia)

---

## Qué hace el proyecto

- **Tarjeta de perfil** compuesta por componentes presentacionales pequeños: `Card`, `Avatar`, `Info` y `ButtonList`.
- **Enlaces sociales definidos como datos** en un único array (`links`): GitHub, Frontend Mentor, LinkedIn, Twitter e Instagram.
- **Enlaces externos seguros**: se abren en una pestaña nueva con `rel="noopener noreferrer"`.
- **Estados _hover_ y _focus_** en los botones (fondo verde lima `#c4f82a`) con transición.
- **_Responsive_**: la tarjeta tiene un ancho máximo de 384px y reduce su _padding_ por debajo de 420px.
- **Escala tipográfica** mediante clases `text-preset-*`.
- Sin librería de estado ni peticiones de red: cada componente solo renderiza sus _props_.

---

## Cómo ejecutar el proyecto

### Requisitos

| Herramienta | Versión                    |
| ----------- | -------------------------- |
| Node.js     | `>=22` (la CI usa Node 24) |
| Yarn        | 1.x (Classic)              |

### Instalación

```bash
git clone git@github.com:EdouardoCornejo/social-links-profile.git
cd social-links-profile
yarn install
yarn dev
```

Vite muestra una URL local (por defecto `http://localhost:5173`). El script `prepare` instala los Git hooks de Husky durante `yarn install`.

### Scripts

| Comando             | Comando real                                                   | Qué hace                                                   |
| ------------------- | -------------------------------------------------------------- | ---------------------------------------------------------- |
| `yarn dev`          | `vite`                                                         | Servidor de desarrollo con HMR.                            |
| `yarn build`        | `tsc -b && vite build`                                         | Comprueba tipos y genera el bundle en `dist/`.             |
| `yarn preview`      | `vite preview`                                                 | Sirve localmente el `dist/` generado.                      |
| `yarn lint`         | `eslint . --report-unused-disable-directives --max-warnings 0` | Lint del repo; cualquier warning hace fallar la ejecución. |
| `yarn lint:fix`     | `eslint . … --fix`                                             | Igual que `lint`, aplicando correcciones automáticas.      |
| `yarn format:fix`   | `prettier --write .`                                           | Formatea todos los archivos soportados.                    |
| `yarn format:check` | `prettier --check .`                                           | Falla si algún archivo no está formateado (lo usa la CI).  |
| `yarn prepare`      | `husky`                                                        | Instala los Git hooks; se ejecuta tras `yarn install`.     |

---

## Cómo funciona

### 1. `src/App.tsx`

`main.tsx` monta `<App />` en `<StrictMode>`. `App` contiene el contenido del perfil (nombre, ubicación, bio e imagen del avatar) y compone la tarjeta pasando todo por _props_.

### 2. Componentes (`src/components`)

Cada componente es un `FC` tipado en su propia carpeta con `index.tsx`:

- **`Card`** — contenedor de la tarjeta (`children`).
- **`Avatar`** — imagen circular de 88px (`url`, `alt`).
- **`Info`** — nombre, ubicación y descripción (`name`, `location`, `description`).
- **`ButtonList`** — recorre `links` y renderiza un `<a>` por enlace, usando `link.name` como `key`.
- **`data/index.ts`** — exporta el array `links` (`{ name, url }`).

`components/index.ts` re-exporta `Avatar`, `Card`, `data` e `Info`; `ButtonList` se importa directamente desde su carpeta.

### 3. Estilos

CSS global sin preprocesador: `src/index.css` carga la fuente **Inter** autoalojada con `@font-face` (pesos 400, 600 y 700 desde `src/assets/fonts/static`, `font-display: swap`), define el fondo oscuro, el _reset_ básico y las clases `text-preset-1`, `text-preset-2` y `text-preset-2-bold`; `src/App.css` contiene el layout de la tarjeta, el avatar y los botones.

### Flujo de renderizado

```
main.tsx
  └─ <App />
       └─ Card
            ├─ Avatar      ← avatar-jessica.jpeg
            ├─ Info        ← name, location, description
            └─ ButtonList  ← links (components/data)
                  └─ <li><a target="_blank" rel="noopener noreferrer">…</a></li>
```

---

## Cómo extenderlo

**Añadir o cambiar un enlace**: edita el array `links` en `src/components/data/index.ts`. `ButtonList` renderiza cada entrada y usa `name` como `key`, así que mantén los nombres únicos.

```ts
export const links = [
  { name: 'GitHub', url: 'https://github.com/tu-usuario' },
  { name: 'Mastodon', url: 'https://mastodon.social/@tu-usuario' }, // nueva entrada
  // …
];
```

**Cambiar la identidad del perfil**: modifica las _props_ de `<Info />` y `<Avatar />` en `src/App.tsx` y reemplaza `src/assets/images/avatar-jessica.jpeg` (actualizando el import).

**Añadir un componente**: crea `src/components/<Nombre>/index.tsx` exportando un `FC` tipado, añade `export * from './<Nombre>';` a `src/components/index.ts` y úsalo en `App.tsx`.

---

## Calidad y CI

- **Lint** — `eslint.config.js` (flat config) con `@eslint/js` recomendado, `typescript-eslint` `recommendedTypeChecked`, `react-hooks` y `react-refresh`; 0 warnings. `enum` y `namespace` están prohibidos con `no-restricted-syntax`.
- **Formato** — Prettier (`.prettierrc.json`: punto y coma, comillas simples, `trailingComma: all`, 100 columnas). `eslint-config-prettier` desactiva las reglas en conflicto.
- **Pre-commit** — `.husky/pre-commit` ejecuta `yarn lint-staged` y después `yarn build`, así que un commit falla ante errores de lint, tipos o build.
- **CI** — `.github/workflows/ci.yml` corre en push y PR a `main` con Node 24: `yarn install --frozen-lockfile`, `format:check`, `lint` y `build`.
- **TypeScript** — `strict`, `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch` y `erasableSyntaxOnly`.
- **Deploy** — `vercel.json` desactiva el auto-deploy desde Git.

---

## Tecnologías

- **React 19** + **TypeScript 5.9**
- **Vite 8**
- **CSS** plano (sin framework de estilos).
- **ESLint 9**, **Prettier 3**, **Husky**, **lint-staged**.

---

## Estructura del proyecto

```
social-links-profile/
├── .github/workflows/ci.yml
├── .husky/pre-commit
├── public/
│   └── FEmentor.png             # Favicon
├── src/
│   ├── assets/
│   │   ├── fonts/               # Archivos de la fuente Inter (+ licencia OFL)
│   │   └── images/avatar-jessica.jpeg
│   ├── components/
│   │   ├── Avatar/index.tsx
│   │   ├── ButtonList/index.tsx
│   │   ├── Card/index.tsx
│   │   ├── Info/index.tsx
│   │   ├── data/index.ts        # Array `links`
│   │   └── index.ts             # Barrel
│   ├── App.tsx                  # Contenido del perfil
│   ├── App.css                  # Layout de la tarjeta
│   ├── index.css                # Reset y escala tipográfica
│   └── main.tsx
├── eslint.config.js
├── index.html
├── vercel.json
├── vite.config.ts
└── package.json
```

---

## Personalización

| Qué                      | Dónde                               | Valor por defecto                       |
| ------------------------ | ----------------------------------- | --------------------------------------- |
| Enlaces sociales         | `links` en `components/data`        | 5 enlaces genéricos                     |
| Nombre / ubicación / bio | _Props_ de `<Info />` en `App.tsx`  | Jessica Randall, London, United Kingdom |
| Color de acento          | `.location` y `:hover` en `App.css` | `#c4f82a`                               |
| Fondo de la tarjeta      | `.card` en `App.css`                | `#1f1f1f`                               |
| Ancho máximo             | `.card` en `App.css`                | `384px`                                 |

> Las URLs de `links` son genéricas (por ejemplo `https://www.github.com`); reemplázalas por tus perfiles reales.

---

## Licencia

Sin licencia. Proyecto personal de práctica basado en un reto de [Frontend Mentor](https://www.frontendmentor.io); todos los derechos reservados.
