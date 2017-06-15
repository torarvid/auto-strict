# auto-strict

Makes all local modules (that is, everything except the stuff in node_modules/) in Node get loaded
in strict mode. To add 'use strict' to all modules **including** the ones in node_modules, take a look
at https://github.com/isaacs/use-strict (which was my inspiration for this module). Or use
`node --use_strict` to get the same effect.

## Usage

In your entrypoint file, put this at the very top:

```javascript
'use strict';
require('auto-strict')
// That's it, now all your modules included after this line is strict forever.
```

Yeah, that's right, you still have to manually put `'use strict';` in your entrypoint file, because
at that point, we haven't yet had a chance to patch the module compilation. All modules required
after the `require('auto-strict')` line will have it.

## Remarks

The implementation works by patching Node's internal `module.prototype._compile` function. The only
thing it does, is check whether the file is not under the `node_modules` folder, and then prefixes
the file content with `'use strict';`
