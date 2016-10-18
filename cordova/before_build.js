module.exports = function(ctx) {
    // Убедитесь что платформа android является частью построения 
    console.log("entering the hook script");
    if (ctx.opts.platforms.indexOf('android') > -1) {
        var fs = ctx.requireCordovaModule('fs'),
            path = ctx.requireCordovaModule('path');

        var platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android');
        
        console.log("before_build----",path.join(platformRoot,"google-services.json"),fs.readFileSync("google-services.json"));

        fs.writeFileSync(path.join(platformRoot,"google-services.json"), fs.readFileSync("google-services.json"));
    }
};