const path = require('path');

module.exports = (env,argv)=>{
    console.log(argv)
    const { mode = 'development' } = argv;
    const isProduction = mode === 'production';
    return{
        mode: isProduction ? 'production' : 'development',
        entry: {
            main:["./js/main.js","./js/topslide.js"]
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].js',
        },
        target: isProduction ? ['web', 'es5'] : 'web',//webpack v5부터 transfile을 기본적으로 es6한다.그래서 target을 명시해줘야함
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']//Babel 플러그인을 모아 둔 것, 공식 프리셋의 하나이며 필요한 플러그인 들을 프로젝트 지원 환경에 맞춰서 동적으로 결정
                            //지원 환경 설정 작업을 생략하면 기본값으로 설정,기본 설정은 모든 ES6+ 코드를 변환
                        }
                    }
                },
            ]
        },
        devtool: isProduction ? false : 'source-map',//편리한 디버깅
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            liveReload: true,
            open:true,
            hot: true,
            port: 9000,
        }
    }
};

