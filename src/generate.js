// generate all writing, projects and portofolio from markdown files
const fs = require("fs");
const path = require("path");
var md = require('markdown-it')({
    html:         true,
    xhtmlOut:     false,
    breaks:       false,
    langPrefix:   'language-',
    linkify:      true,
    typographer:  true,
    quotes: '“”‘’',
    highlight: function (/*str, lang*/) { return ''; }
})
.use(require("markdown-it-sub"))
.use(require("markdown-it-sup"))
.use(require("markdown-it-mark"));

//
let result, result2;
let ext, meta;
let title, slug, thumbnail, description, tags, time, body;
let files, data;
let dir;
let writingDir = "./public/src/data/writing/", projectsDir = "./public/src/data/projects/", portofolioDir = "./public/src/data/portofolio/";
//
console.time("time")
async function generate(x, y, z){
    result = [];
    dir = "./src/content/" + x + "/";
    fs.readdirSync(y).forEach(file => {
        fs.unlinkSync(y + file);
    })
    files = fs.readdirSync(dir);
    files.forEach(file => {
        ext = path.extname(file);
        if(ext == ".md"){
            data = fs.readFileSync(dir + file, { encoding: "utf8" });
            meta = data.split("<- - - - - - - - - - meta - - - - - - - - - ->\n")[1].split("\n<-- - - - - - - - - ndzeux - - - - - - - - -->")[0];
            title = meta.split("title: ")[1].split("\n")[0].trim();
            slug = file.slice(0, -3).toLowerCase().replace(/[^\w-]+/g, ' ').trim().replace(/ /g, "-");
            thumbnail = meta.split("thumbnail: ")[1].split("\n")[0];
            description = meta.split("description: ")[1].split("\n")[0];
            tags = meta.split("tags: ")[1].split("\n")[0].split(", ");
            if(tags.indexOf("") > -1){
                tags[0] = "other";
            }
            body = md.render(data.split("<-- - - - - - - - - ndzeux - - - - - - - - -->\n\n")[1]);
            time = meta.split("time: ")[1].split("\n")[0];
            result.push({
                title, slug, thumbnail, description, tags, time
            });
            result2 = JSON.stringify({
                title, slug, thumbnail, description, tags, time, body
            });
            fs.writeFileSync(y + slug + ".json", result2);
        }
    });
    result.sort((a, b) => parseInt(b.time) - parseInt(a.time));
    fs.writeFileSync(y + `${z}.json`, JSON.stringify(result));
}
//
async function startGenerate(){
    console.log("Generate Writing, Projects, and Portofolio");
    generate("writing", writingDir, "all-writing");
    generate("projects", projectsDir, "all-projects");
    generate("portofolio", portofolioDir, "all-portofolio");
}
startGenerate();
console.timeEnd("time")
console.log("\n")