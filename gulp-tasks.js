const tslint = require('gulp-tslint');
const TASK_PREFIX = 'fe-';

function start() {
  require('build/main/index.js');
}

function task() {
  var dependencies = Array.prototype.slice.call(arguments);
  var handler = null;
  if (!dependencies.length) {
    return;
  }
  if (typeof dependencies[dependencies.length - 1] === 'function') {
    handler = dependencies[dependencies.length - 1];
    dependencies.splice(dependencies.length - 1, 1);
  }
  return {
    dependencies: dependencies,
    handler: handler
  };
}

function registerTasks(gulp, prefix, tasks) {
  const taskNames = Reflect.ownKeys(tasks);
  for (let taskName of taskNames) {
    let description = tasks[taskName];
    let dependencies = description.dependencies.map(dep=> {
      if (taskNames.indexOf(dep) >= 0) {
        return prefix + dep;
      }
      return dep;
    });
    gulp.task(prefix + taskName, dependencies, description.handler);
  }
}

module.exports = function (gulp) {
  const copy = require('./gulp/copy')(gulp);
  const compile = require('./gulp/compile')(gulp);
  const clean = require('./gulp/clean')(gulp);
  const watch = require('./gulp/watch')(gulp);
  const serve = require('./gulp/serve')(gulp);
  const taskMap = {
    'clean:main': task(copy.main),
    'clean:test': task(clean.test),
    'clean:resource': task(clean.resource),
    'compile:main': task(compile.main),
    'compile:test': task(compile.test),
    'copy:main': task('clean:main', copy.main),
    'copy:resource': task('clean:resource', copy.resource),
    'copy:test': task('clean:test', copy.test),
    'build:main': task('copy:main', 'compile:main'),
    'build:resource': task('copy:resource'),
    'build:test': task('copy:test', 'compile:test'),
    'build': task('build:resource', 'build:main', 'build:test'),
    'start': task('build', start),
    'watch': task('build', watch.watch(TASK_PREFIX)),
    'serve': task('build', serve.serve(TASK_PREFIX))
  };
  registerTasks(gulp, TASK_PREFIX, taskMap);
};
