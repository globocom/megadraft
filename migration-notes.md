# Breaking changes

* every reference to plugin is now called atomicBlock
  * changed exports on `Megadraft.js`
  * changed props on `MegadraftEditor.js`
  * changed props on `Sidebar.js`
  * changed props on `Toolbar.js`

* draft-js-plugins handles default keybindings with the flag `defaultKeyBindings`
  * there should be further investigation but it's possible that Megadraft's code for keybindings can be removed

* write a migration plan for plugins
