# grunt-messages-js-localization

> Generates js localization files from spring boot messages.properties files

## Getting Started
This plugin requires Grunt `~1.0.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-messages-js-localization --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-messages-js-localization');
```

## The "messages_js_localization" task

### Overview
In your project's Gruntfile, add a section named `messages_js_localization` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  messages_js_localization: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.defaultLanguage
Type: `String`
Default value: `'en'`

Language of the main message properties file (`messages.properties`)

#### options.messagesVariableName
Type: `String`
Default value: `'messages'`

Name of the messages global variable to refer to from other js.
```js
alert(messages.greeting);
```

#### options.messagesFilesRegex
Type: `String`
Default value: `/messages.+properties/ `

Regex to match properties files.

### Usage Examples

#### In a Spring boot directory tree:

```js
grunt.initConfig({
  messages_js_localization: {
    options: {
        defaultLanguage: 'en',
        messagesVariableName: 'messages',
        messagesFilesRegex: /messages.+properties/        
    },    
    your_target: {      
      files: {
        'src/main/resources/public/js': ['src/main/resources/*.properties'],
      }
    }
  },
});
```
The task will create a javascript file for each message properties file found at the source directory. So `messsages_es.properties` will be converted to `messages_es.js` in the javascript public folder defined in the options:

```properties
  greeting=¡Hola! ¡Bienvenido a nuestro sitio!
  lang.change=Cambiar el lenguaje
  lang.eng=Inglés
  lang.es=Español
  lang.fr=Francés
```
```js
const messages = { greeting: '¡Hola! ¡Bienvenido a nuestro sitio!',  lang: { change: 'Cambiar el lenguaje', eng: 'Inglés', es: 'Español', fr: 'Francés' }};
```
Then you could use it in your thymeleaf template:
```html
  <script th:src="@{'/js/messages_' + ${#locale}  + '.js'}"></script> 
  <script>
    console.log(messsages.greeting);
  </script>
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
[See releases](https://github.com/devilcius/grunt-messages-js-localization/releases)
