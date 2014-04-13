// Local/development bookmarklet
(function() {
  var script=document.createElement('script');
  script.type='text/javascript';
  script.src='http://localhost:4567/quokka.js';
  document.body.appendChild(script);
})();
