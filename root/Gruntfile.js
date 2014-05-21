module.exports = function (grunt) {
    var transport = require('grunt-cmd-transport');
    var style = transport.style.init(grunt);
    var text = transport.text.init(grunt);
    var script = transport.script.init(grunt);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        //提取依赖的模块ID
        transport: {
            options: {
                debug: false,
                paths: ['.'],
                alias: '<%= pkg.spm.alias %>',
                parsers: {
                    '.js': [script.jsParser],
                    '.css': [style.css2jsParser],
                    '.html': [text.html2jsParser]
                }
            },
            //提取业务
            bus: {
                options : {
                    idleading : 'js/'
                },
                files: [
                    {cwd: 'trunk/js', src: ['**/*.js'], dest: 'temp/js'},
                ]
            },
            //提取arale框架
            arale: {
                options : {
                    idleading : 'lib/arale/'
                },
                files: [
                    {cwd: 'trunk/lib/arale', src: ['**/*.js'], dest: 'temp/lib/arale'}
                ]
            },
            //提取template模板
            template: {
                options : {
                    idleading : 'template/'
                },
                files: [
                    {cwd: 'trunk/template', src: ['**/*.js'], dest: 'temp/template'}
                ]
            }
        },

        //合并相对依赖的文件
        concat: {
            options: {
                paths : ['.'],
                include: 'relative'
            },
            //合并业务
            bus: {
                options : {
                    include : 'all'
                },
                files: [
                    //业务模块
                    {expand: true,cwd: 'temp/js',src: '**/*.js',filter: 'isFile',dest: 'temp/js'}
                ]
            },
            //合并arale
            arale: {
                files: [
                    {expand: true,cwd: 'temp/lib/arale',src: '**/*.js',filter: 'isFile',dest: 'temp/lib/arale'}
                ]
            }
            //template模板已打包进业务模块中，不需要进行合并
        },
        //替换html时间戳，防止缓存
        replace: {
            dist: {
                options: {
                    variables: {
                        'timestamp': '<%= new Date().getTime() %>'
                    }
                },
                files: [
                    //html
                    {expand: true, flatten: true, src: ['trunk/*'], dest: 'temp/', filter: 'isFile'},
                    //css
                    {expand: true, flatten: true, src: ['trunk/css/*.css'], dest: 'temp/css/', filter: 'isFile'},
                    //seajs
                    {expand: true, cwd: 'trunk/seajs/', src: ['**'], dest: 'build/seajs/'}
                ]
            }
        },
        //添加CSS3前缀
        autoprefixer: {
            options: {
                browsers: ['last 10 version']
            },
            multiple_files: {
                expand: true,
                flatten: true,
                src: 'temp/css/*.css', // -> src/css/file1.css, src/css/file2.css
                dest: 'temp/css/' // -> dest/css/file1.css, dest/css/file2.css
            }
        },
        // 压缩合并 CSS 文件
        cssmin: {
            options: {
                report: 'gzip'
            },
            combine: {
                files: {
                    'build/css/index.css': ['temp/css/*.css']
                }
            }
        },
        // 压缩合并 JS 文件
        uglify: {
            options: {
                report: 'gzip',
                mangle: true, // Specify mangle: false to prevent changes to your variable and function names.
                banner: '/** \n' +
                    ' * -------------------------------------------------------------\n' +
                    ' * @version: <%= pkg.version%> \n' +
                    ' * @author: <%= pkg.author%> \n' +
                    ' * @description: <%= pkg.description%> \n' +
                    ' * @time: <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> \n' +
                    ' * ------------------------------------------------------------- \n' +
                    ' */ \n\n'
            },
            myTarget: {
                files: [
                    //业务压缩
                    {expand: true, flatten: true, src: ['temp/js/*.js'], dest: 'build/js/', filter: 'isFile'},
                    //异步加载的模块压缩
                    {expand: true, flatten: true, src: ['temp/js/index/async/*.js'], dest: 'build/js/index/async/', filter: 'isFile'},
                    //公用模块压缩
                    {expand: true, flatten: true, src: ['temp/js/common/*.js'], dest: 'build/js/common/', filter: 'isFile'},
                    //arale压缩
                    {expand: true, flatten: true, src: ['temp/lib/arale/*.js'], dest: 'build/lib/arale/', filter: 'isFile'}
                ]
            }
        },
        //压缩图片
        imagemin: {
            png: {
                options: {
                    optimizationLevel: 7
                },
                files: [
                    {
                        expand: true,
                        cwd: 'trunk/images/',
                        src: ['**/*.png'],
                        dest: 'build/images/',
                        ext: '.png'
                    }
                ]
            },
            jpg: {
                options: {
                    progressive: true
                },
                files: [
                    {
                        expand: true,
                        cwd: 'trunk/images/',
                        src: ['**/*.{jpg,gif}'],
                        dest: 'build/images/'
                    }
                ]
            }
        },
        //压缩html文件
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    removeCommentsFromCDATA:true
                    //collapseWhitespace: true
                },
                files: [
                    {expand: true, flatten: true, src: ['temp/*.html'], dest: 'build/', filter: 'isFile'}
                ]
            }
        },
        // 复制文件，打包到 dist 文件夹目录下
        copy: {
            main: {
                files: [
                    //复制图片
                    //{expand: true, cwd: 'src/img/', src: ['**'], dest: 'dist/img/'},
                    {expand: true, cwd: 'trunk/seajs/seajs-log/', src: ['**/*.js'], dest: 'build/seajs/seajs-log/'}
                    //{expand: true, flatten: true, src: ['.build/cache.manifest'], dest: 'dist/', filter: 'isFile'}
                    //{expand: true, cwd: 'src/js/game_config/', src: ['**'], dest: 'dist/js/game_config/'}
                    //复制html文件
                    //{expand: true, flatten: true, src: ['.build/*'], dest: 'dist/', filter: 'isFile'}
                ]
            }
        },

        //清理临时文件夹
        clean: {
            build: ['temp', 'build']
        }

    });
    grunt.loadNpmTasks('grunt-cmd-transport');
    grunt.loadNpmTasks('grunt-cmd-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-autoprefixer');

    grunt.registerTask('build', ['clean', 'transport', 'concat', 'replace','autoprefixer', 'cssmin', 'uglify', 'imagemin', 'htmlmin', 'copy']);
    grunt.registerTask('test', ['clean', 'transport','concat']);
};