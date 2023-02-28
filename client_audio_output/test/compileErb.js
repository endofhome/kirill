const fs = require("node:fs");
const {execSync} = require("node:child_process");

const compileErb = (erbTemplatePath, binding) => {
    // binding example: `x = "some string";y = 1`;
    const erbTemplateContent = fs.readFileSync(erbTemplatePath, 'utf8');
    const renderScript = `${__dirname}/render_erb.sh`;
    const template = `"${erbTemplateContent}"`;
    const sanitisedBinding = `"${binding.replace(/"/g, `\\"`)}"`;
    const command = `${renderScript} ${template} ${sanitisedBinding}`;

    return execSync(command).toString();
}

module.exports = compileErb;