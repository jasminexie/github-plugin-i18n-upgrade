# plugin-i18n-upgrade

This plugin adds a button that switches between two languages on Gitbook. Supports only two languages.

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
                "url": "en"
            },
            "Lang2": {
                "name": "中文",
                "url": "zh"
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

### Init

See [Multi-Lingual](https://toolchain.gitbook.com/languages.html).