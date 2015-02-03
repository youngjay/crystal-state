# crystal-state
使用location或者hash存储状态的组件

# new

``` js
var State = require('crystal-state');

// 基于history
var state = new State.Location();
// 或者基于hash
var state = new State.Hash();

```
# onChange(fn) 监听状态变化事件

``` js

state.onChange(function(data) {
    console.log(data);
});

```

# start() 启动

``` js

state.start();

```

# getData() 获取当前的[data](#data) 

# setData(data) 设置当前的[data](#data) 
``` js
    state.setData({
        path: '/a/b',
        query: {
            a: 1
        }
    })
```


# data
- data.path String 当前的路径
- data.query Object 当前的参数

/a/b?c=1&d=2 转化成的data对象是

``` js
{
    "path": "/a/b",
    "query": {
        "c": 1,
        "d": 2
    }
}

```


