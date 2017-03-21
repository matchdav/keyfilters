# keyfilters

```
npm i matchdav/keyfilters
```

```javascript
let KeyFilter = require('mcd.keyfilters');

let things = [
  {
    type:'stick'
  },

  {
    type:'bug',
    flag:false
  },

  {
    type:'arachnid',
    flag:true
  },

  {
    type:'nation',
    flag:undefined
  },
];

let type = KeyFilter('type');
let flag = KeyFilter('flag');

console.log(things.filter(type.is('bug')).length); // 1
console.log(things.filter(flag.exists()).length); // 3

// works with Backbone Models, or any Configurable (has a 'get' method)
let thingsCollection = new Backbone.Collection(things);

console.log(thingsCollection.find(type.is('bug')).get('flag')) // true
console.log(thingsCollection.find(flag.is(false)).get('type')) // 'bug'

```

for more info, always read the unit tests!
