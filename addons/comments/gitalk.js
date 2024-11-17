(() => {
  const loadComments = async () => {
    if (typeof Gitalk === "undefined") {
      setTimeout(loadComments, 100);
    } else {
      const container = document.getElementById('gitalk-container');
      if (!container) {
        return;
      }
      const path = container.getAttribute("data-path");
      const gitalk = new Gitalk(Object.assign({
          id: path, // 直接使用路径作为 id
          // id: container.getAttribute("data-path-hash"), // 使用 hash 作为 ID
          path: path,
      }, {
        clientID: 'Ov23liqoyiZGlCl2kk73',
        clientSecret: '2216cf9fc42e2dcbcfa86fc5eec922810ed7eaaf',
        repo: "blog-comments",
        owner: "Danielxwy",
        admin: ["Danielxwy"],
        distractionFreeMode: false,
      }));

      gitalk.render('gitalk-container');
    }
  };

  window.loadComments = loadComments;
  window.addEventListener('pjax:success', () => {
    window.loadComments = loadComments;
  });
})();
