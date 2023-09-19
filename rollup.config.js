import typescript from 'rollup-plugin-typescript';
import scss from 'rollup-plugin-scss';
import copy from 'rollup-plugin-copy'

export default [{
  input: './src/main.ts',
  output: {
    file: './build/app.js'
  },
  plugins: [
    typescript(),
    copy({
      targets: [
        {src: './src/views/**/*', dest: './build/views'},
        {src: './appsscript.json', dest: './build/'}
    ]})
  ]
},
{
  input: './src/ui/index.ts',
  output: {
    banner: '<script type="text/javascript">',
    footer: '</script>',
    file: './build/ui.script.js.html'
  },
  plugins: [
    typescript(),
    scss({
      sourceMap: false,
      fileName: 'style.css.html',
      processor: css => {
        return `<style type="text/css">\n${css}\n</style>`
      }
    })
  ]
}]