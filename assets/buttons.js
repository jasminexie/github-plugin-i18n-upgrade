require(['gitbook', 'jquery'], function(gitbook, $) {

    gitbook.events.bind('start', function(e, config) {

        var Lang1 = config.i18n.Lang1;
        var Lang2 = config.i18n.Lang2;

        var toggleLanguage = function () {
            var path = location.href;
            var currentLang;
            var newLang;
            var txt;
            if (path.indexOf(`/${Lang1.url}`) !== -1) {
                currentLang = Lang1.url;
                newLang = Lang2.url;
            } else if (path.indexOf(`/${Lang2.url}`) !== -1) {
                currentLang = Lang2.url;
                newLang = Lang1.url;
            }
            txt = new RegExp("\/" + currentLang +"[\/$\s]",'i');
            path = path.replace(txt, `/${newLang}/`);
            location.assign(path);
        };

        var isLang1 = function () {
            var path = location.href;
            return path.indexOf(`/${Lang1.url}`) !== -1;
        };


        if (!isLang1()) {
            gitbook.toolbar.createButton({
                text: Lang1.name,
                position: 'left',
                'onClick': function(e) {
                    e.preventDefault();
                    toggleLanguage();
                }
            });
        }

        if (isLang1()) {
            gitbook.toolbar.createButton({
                text: Lang2.name,
                position: 'left',
                'onClick': function(e) {
                    e.preventDefault();
                    toggleLanguage();
                }
            });
        }

    });
});