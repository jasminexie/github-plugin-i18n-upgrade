# plugin-i18n-upgrade

This plugin adds a button that switches between two languages on Gitbook. 

Developed and used for AppAdhoc User Documentation.

Supports only two languages.

### Configuration

The languages can be configured in **book.json**: (default values shown below)

```json
{
    "plugins": [
        "i18n-upgrade"
    ],
    "pluginsConfig": {
        "i18n": {
            "Lang1": {
                "name": "English",
                "url": "en",
                "include": "[\"index.html\"]"
            },
            "Lang2": {
                "name": "中文",
                "url": "zh",
                "include": "[\"index.html\"]"
            }
        }
    }
}
```

### Language parameters

The table below lists the meaning of language parameters:

Key | Description
---|---
name | Name to be displayed on the Gitbook page
url | Name of language directory (without '/')
include | Files that show the i18n button. if not specified, the button will be shown on all files.

The `include` field exists because developers wish to deploy a work-in-process gitbook translation. In AppAdhoc, the `include` field is automatically populated.


### Populating the `include` field

The script used by AppAdhoc to automatically populate the `include` field is the following:

```js
var fs = require('fs');

function stripEndSlashes(dir) {
    if (!dir || typeof dir !== 'string') {
        return '';
    }
    return dir.trim().slice(-1) === '/' ? dir.trim().slice(0, -1) : dir.trim();
}

function readDir(base, sub, res) {
    const dir = stripEndSlashes(stripEndSlashes(base) + '/' + stripEndSlashes(sub));
    if (!res || !(res instanceof Array)) {
        console.error('Invalid input: ', res);
    }
    const files = fs.readdirSync(dir);
    files.forEach(function (file) {
       if (file.split('.').length === 1) {
           // no '.' in name, might be directory. Recursive search.
           readDir(base, `${stripEndSlashes(sub)}/${file}`, res);
       } else if (file.toLowerCase() === 'summary.md') {
           // SUMMARY.md ignore
       } else if (file.split('.').pop() === 'md') {
           // change .md to .html, README to index, and push in the result array
           const htmlFile = file.replace('README', 'index').replace('.md', '.html');
           res.push(`${stripEndSlashes(sub)}/${htmlFile}`);
       }
    });
}

function generateBookConfig(res, name, url) {
    const obj = {name: name, url: url, include: ''};
    obj.include = JSON.stringify(res.map(function(str) {
        return '/' + url + str;
    }));
    return obj;
}

const result_zh = [];
const result_en = [];
readDir('./app/zh/', '', result_zh);
readDir('./app/en/', '', result_en);
try {
    const book = fs.readFileSync('./_book.json');
    const bookobj = JSON.parse(book);
    bookobj.pluginsConfig.i18n = {};
    bookobj.pluginsConfig.i18n.Lang1 = generateBookConfig(result_zh, 'English', 'en');
    bookobj.pluginsConfig.i18n.Lang2 = generateBookConfig(result_en, '中文', 'zh');
    fs.writeFileSync('./app/book.json', JSON.stringify(bookobj));
} catch (e) {
    console.error(e);
}
```

### Init

Set up i18n environment: see [Multi-Lingual](https://toolchain.gitbook.com/languages.html).