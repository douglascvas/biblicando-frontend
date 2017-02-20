# Biblicando (frontend)

This project represents the frontend part of Biblicando.

The main technologies used are: `react` and `typescript`.
In production mode the project uses also server side rendering with react.

###  How to run:
Run once:
```bash
npm install
```
 
To run in development mode (using mock data), type: 
```bash
npm run dev
```

To run in production mode (using access to biblicando backend), type:
```bash
npm run start
```
Of course to run in production mode you need biblicando-backend also running =)

Then open your browser and type `http://localhost:8000`


###  Flow:
1. Gulp moves the assets to the `build/dist` folder.
2. Gulp transpiles typescript in the `build/main` folder.
3. Webpack minifies and bundles the transpiled javascript files, then saves it in the `build/dist folder`.
4. Server loads the transpiled (but not bundled) files.
 
##### Why not only using webpack then to transpile the source?
 
Because of the server side rendering. The server needs to be transpiled as well and needs to access the application js from NodeJS. Therefore it needs the transpiled code to be each in their own files. 
