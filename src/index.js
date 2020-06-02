import Preview from './Preview'
import iconPath from './icon.png'

var fs = require('fs')
var cmd = require('node-cmd')
var executingArr = [];

export const icon = iconPath

export const fn = ({ term, display, actions}) => {
  var getData = () => {
    try {
      let data = fs.readdirSync(process.env.APPDATA + '/cerebro-ahk');
      if (data && data.length > 0) {
        // add the full path as a attribute
        for (let i=0; i<data.length; i++) {
          data[i] = {
            name: data[i],
            path: process.env.APPDATA + '/cerebro-ahk/' + data[i],
            isRunning: executingArr[data[i]]
          }
        }
        return data;
      }
    } catch(e) {
      return null;
    }
  }

  var search = (searchTerm) => {
    if ('autohotkey'.includes(searchTerm.toLowerCase()) || 'ahk'.includes(searchTerm.toLowerCase())) {
      let data = getData();
      display({
        icon,
        title: 'AutoHotKey Scripts Manager',
        getPreview: () => <Preview data={data} exec={exec} />
      })      
    }
  }

  var exec = (script) => {
    if (executingArr[script.name]) {
      cmd.run(`taskkill /im "${script.name}"`)
      executingArr[script.name] = false;
    }
    else {
      cmd.run(`"${script.path}"`);
      executingArr[script.name] = true      
    }
    actions.hideWindow();
  }

  search(term);
}
