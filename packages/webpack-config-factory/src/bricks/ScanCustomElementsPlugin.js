const pluginName = "ScanCustomElementsPlugin";

module.exports = class ScanCustomElementsPlugin {
  constructor(packageName) {
    this.packageName = packageName;
  }
  // 将 `apply` 定义为其原型方法，此方法以 compiler 作为参数
  apply(compiler) {
    const brickSet = new Set();
    // tap(触及) 到 compilation hook，而在 callback 回调时，会将 compilation 对象作为参数，
    compiler.hooks.normalModuleFactory.tap(pluginName, factory => {
      factory.hooks.parser.for("javascript/auto").tap(pluginName, parser => {
        parser.hooks.callAnyMember.for("customElements").tap(pluginName, expression => {
          if (expression.callee.property.name === "define" && expression.arguments.length === 2) {
            const { type, value } = expression.arguments[0];
            if (type === "Literal") {
              if (!value.startsWith(`${this.packageName}.`)) {
                throw new Error(
                  `Invalid brick: "${value}", expecting prefixed with the package name: "${this.packageName}"`
                );
              }
              brickSet.add(value);
            } else {
              throw new Error("Please call `customElements.define()` only with literal string");
            }
          }
        });
      });
    });
    compiler.hooks.emit.tap(pluginName, compilation => {
      const bricks = Array.from(brickSet);
      const source = JSON.stringify({ bricks }, null, 2);
      compilation.assets["bricks.json"] = {
        source: () => source,
        size: () => source.length
      };
      // eslint-disable-next-line no-console
      console.log("Defined bricks:", bricks);
    });
  }
};
