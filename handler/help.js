const fs = require('fs');

function resolve(lang) {

  if (fs.existsSync(`./language/${lang}.js`)) {
    return require(`./language/${lang}.js`);
  } else {
    return require(`./language/it.js`);
  }

}

global.lang = function(language, type, string, ...vars) {
   let locale = resolve(language)[type][string];

   let count = 0;
   if (typeof locale === 'string') locale = locale.replace(/%VAR%/g, () => vars[count] !== null ? vars[count] : "%VAR%");
   if (typeof locale === 'object') locale.description = locale.description.replace(/%VAR%/g, () => vars[count] !== null ? vars[count] : "%VAR%");

   return locale;
}