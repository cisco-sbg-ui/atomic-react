const fs = require("fs");
const glob = require("glob");

const localDeclarations = [];
const declarations = [];
const files = glob.sync("../atomic-react/framework/components/**/index.js");

files.forEach((x) => {
  const path = x.split("/");
  console.log(`Adding ${path[4]}`);
  const data = fs.readFileSync(x, {encoding: "utf8", flag: "r"});

  if (data.includes("export {default} from")) {
    declarations.push({
      default: path[4],
      path: `@cisco-ats/atomic-react/lib/components/${path[4]}`
    });
    localDeclarations.push({
      default: path[4],
      path: `../lib/components/${path[4]}`
    });
    return;
  }

  declarations.push({
    default: path[4] + "Exports",
    members: Array.from(data.matchAll(/([\{,][\s]?|  )([\w]+)/g)).map(
      (y) => y[y.length - 1]
    ),
    path: `@cisco-ats/atomic-react/lib/components/${path[4]}`
  });
  localDeclarations.push({
    default: path[4] + "Exports",
    members: Array.from(data.matchAll(/([\{,][\s]?|  )([\w]+)/g)).map(
      (y) => y[y.length - 1]
    ),
    path: `../lib/components/${path[4]}`
  });
});

const template = (value) => `module.exports = function () {
  return {
    plugins: [
      [
        require("babel-plugin-auto-import"),
        {
          declarations: ${JSON.stringify(value)}
        }
      ]
    ]
  };
};
`;

fs.writeFile("babel-preset.js", template(declarations), {flag: "w+"}, (err) => {
  if (err) throw err;
  console.log("Babel preset successfully generated!");
});

fs.writeFile(
  "babel-preset-local.js",
  template(localDeclarations),
  {flag: "w+"},
  (err) => {
    if (err) throw err;
    console.log("Babel preset (local) successfully generated!");
  }
);
