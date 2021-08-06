class HTMLWebpackMonitorPlugin {
  constructor(options) {
    this.options = Object.assign({}, options);
  }

  apply(compiler) {
    compiler.hooks.compilation.tap(this.constructor.name, (compilation) => {
      compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tap(
        this.constructor.name,
        (htmlPluginData) => {
          if (!this.options.hash) {
            return;
          }
          const script = `
              <script>
                var _hmt = _hmt || [];
                (function() {
                  var hm = document.createElement("script");
                  hm.src = "https://hm.baidu.com/hm.js?${this.options.hash}";
                  var s = document.getElementsByTagName("script")[0];
                  s.parentNode.insertBefore(hm, s);
                })();
              </script>
          `;
          htmlPluginData.html = htmlPluginData.html.replace(
            "</body>",
            script + "</body>"
          );
          return htmlPluginData;
        }
      );
    });
  }
}

module.exports = HTMLWebpackMonitorPlugin;
