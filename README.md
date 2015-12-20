# geekpack

geekpack is a template generator for react and webpack combined SPA.

# Features
* Compilation with webpack
* React and jsx
* react-router
* Stylesheets can be CSS, LESS, SASS, Stylus or mixed
* Embedded resources like images or fonts use DataUrls if appropriate
* import jQuery and expose global $ by default
* import bootstrap and react-bootstrap by default, and you can customise to meet you needs
* sample page included to help you start writing your compoment 
* Development
  * Development server
  * Hot Module Replacement development server (LiveReload for Stylesheets and React components enabled)
  * sourcemap to support browser debug
* Production
  * Server example for prerendering for React components
  
# Documentation


# Install

Install **Node.js** envoriment  
1. install nvm  
2. install nodejs via nvm  
3. install tnpm  

Please reference [ali node.js manual](http://node.alibaba-inc.com/env/README.html?spm=0.0.0.0.QpL0Ll)  

# Getting Started

1. tnpm install @ali/geekpack -g
2. geekpack init myProject
3. cd myProject && tnpm i
4. npm start
5. npm run build (bundle assets to __*build*__ directory)

# Directory Layout
````
myProject/
|
|- src/
|  |- index.js _______________________________ # 
|  |- routes.jsx _____________________________ # -
|
|  |- styles/
|    |- base.less ____________________________ # 
|
|  |- htmlTemplate/
|    |- index.html ___________________________ # -
|
|  |- config/
|    |- bootstrap.config.js __________________ # 
|    |- bootstrap.config.less ________________ # Modify bootstrap variables here.
|
|  |- components/
|
|    |- samplePage/
|      |- package.json _______________________ # -
|      |- samplePage.jsx _____________________ # -
|      |- samplePage.less ____________________ # 
|
|    |- customPages/
|      |- readme.md __________________________ # -
|
|    |- application/
|      |- application.jsx ____________________ # -
|      |- navigator.less _____________________ # variable
|      |- package.json _______________________ # -
|      |- routeCSSTransitionGroup.jsx ________ # -
|      |- routeCSSTransitionGroup.less _______ # 
|
|  |- backendService/
|    |- endpoint.js __________________________ # 
````
# geekpack commands
1. Generating new page  
  ```bash$ geekpack add *NewPage*```  
2. List current pages  
  ```bash$ geekpack list```
3. Remove old page  
  ```bash$ geekpack remove pageX```
4. Add another entry  
  ```bash$ geekpack addentry login -p login.js```  
5. Remove entry  
  ```bash$ geekpack rmentry login```  
