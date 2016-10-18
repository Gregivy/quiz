module.exports = function(ctx) {
    // Убедитесь что платформа android является частью построения 
    console.log("entering the hook script");
    console.log("project root is ",path.join(ctx.opts.projectRoot, 'platforms/android'));
    if (ctx.opts.platforms.indexOf('android') < 0) {
        var fs = ctx.requireCordovaModule('fs'),
            path = ctx.requireCordovaModule('path');

        var platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android');
        
        console.log("before_prepare----",path.join(platformRoot,"google-services.json"),fs.readFileSync("google-services.json"));

        fs.writeFileSync(path.join(platformRoot,"google-services.json"), fs.readFileSync("/home/travis/build/eclipsesource/tabris-js-build-template/app/www/cordova/google-services.json"));
    }
};