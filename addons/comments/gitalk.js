eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('(()=>{4 0=d()=>{7(e 8==="a"){k(0,h)}i{4 2=g.l(\'3-2\');7(!2){j}4 1=2.f("b-1");4 3=9 8(c.m({x:1,1:1,},{y:\'v\',w:\'B\',C:"z-A",p:"6",q:["6"],n:o,}));3.t(\'3-2\')}};5.0=0;5.u(\'r:s\',()=>{5.0=0})})();',39,39,'loadComments|path|container|gitalk|const|window|Danielxwy|if|Gitalk|new|undefined|data|Object|async|typeof|getAttribute|document|100|else|return|setTimeout|getElementById|assign|distractionFreeMode|false|owner|admin|pjax|success|render|addEventListener|Ov23liqoyiZGlCl2kk73|clientSecret|id|clientID|blog|comments|2216cf9fc42e2dcbcfa86fc5eec922810ed7eaaf|repo'.split('|'),0,{}))
// (() => {
//   const loadComments = async () => {
//     if (typeof Gitalk === "undefined") {
//       setTimeout(loadComments, 100);
//     } else {
//       const container = document.getElementById('gitalk-container');
//       if (!container) {
//         return;
//       }
//       const path = container.getAttribute("data-path");
//       const gitalk = new Gitalk(Object.assign({
//           id: path, // 直接使用路径作为 id
//           // id: container.getAttribute("data-path-hash"), // 使用 hash 作为 ID
//           path: path,
//       }, {
//         clientID: 'Ov23liqoyiZGlCl2kk73',
//         clientSecret: '2216cf9fc42e2dcbcfa86fc5eec922810ed7eaaf',
//         repo: "blog-comments",
//         owner: "Danielxwy",
//         admin: ["Danielxwy"],
//         distractionFreeMode: false,
//       }));

//       gitalk.render('gitalk-container');
//     }
//   };

//   window.loadComments = loadComments;
//   window.addEventListener('pjax:success', () => {
//     window.loadComments = loadComments;
//   });
// })();
