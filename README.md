# Biblicando (frontend)

This project represents the frontend part of Biblicando.

The main technologies used are: `react.js` and `typescript`.

####  How to run:
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


####  Flow:
1. Gulp moves the assets to the `build/dist` folder.
2. Gulp transpiles typescript in the `build/main` folder.
3. Webpack minifies and bundles the transpiled javascript files, then saves it in the `build/dist folder`.
 

