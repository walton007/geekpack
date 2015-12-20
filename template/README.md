### 配置Node.js开发环境

1. 安装nvm
2. 利用nvm安装nodejs
3. 安装 tnpm
4. git (可参考这里[学习](http://pcottle.github.io/learnGitBranching/) )  


请参考[node.js阿里手册](http://node.alibaba-inc.com/env/README.html?spm=0.0.0.0.QpL0Ll)

### Getting Started

1. git clone **--recursive** http://gitlab.alibaba-inc.com/sd/projectX.git 
2. cd projectX && tnpm install
3. npm start

### How to Build
npm run build  

此时访问 __http://localhost:8088/__即可开始开发

### 目录结构

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
