import { anyTag, sameTag, SheriffConfig } from '@softarc/sheriff-core';

export const config: SheriffConfig = {
  enableBarrelLess: true,
  modules: {
    'src/app/domains/<domain>/<feature>': ['domain:<domain>', 'type:<feature>'],
    'src/app/shell': ['domain:shell'],
    'src/testing': ['testing'],
  },
  depRules: {
    // 'root' is a virtual module that includes all files not assigned to any specific module,
    // such as routes, app.config, app.component, main.ts, etc.
    // It is allowed to access everything without restriction.
    root: anyTag,

    // testing stuff (utils) should be able to access everything
    testing: anyTag,

    // everything can access testing stuff
    '*': 'testing',

    // domains can access from the same domain and shared
    'domain:*': [sameTag, 'domain:shared'],
    'domain:controlling': [sameTag, 'domain:shared'],

    // every type of module can access from the same type + util and model
    'type:*': [sameTag, 'type:util', 'type:model'],

    // feature modules can access ui and data stuff as well
    'type:feature': ['type:ui', 'type:data'],

    // data modules can access feature, ui and environment (e.g., a service which opens a dialog)
    'type:data': ['type:feature', 'type:ui'],

    noTag: 'noTag',
  },
};
