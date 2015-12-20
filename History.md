0.3.3 / 2015-12-15
==================

  * fix bug in common chunk: chunk app and vendor only 
  * remove d3 from default dependency
  * refactor .babel.rc

0.3.0 / 2015-12-14
==================

  * support init a project inside an empty directory: geekpack init 
  * command to add and remove other entry:  
    *  geekpack addentry otherentry [-p xx.js] 
    *  geekpack rmentry otherentry
    *  add post hook for webpack.config