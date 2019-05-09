DVA 的 model 对象有几个基本的属性，需要大家了解
> 1. `namespace`：model 的命名空间，只能用字符串。一个大型应用可能包含多个 model，通过`namespace`区分。

> 2. `state`：当前 model 状态的初始值，表示当前状态。

> 3. `reducers`：用于处理同步操作，可以修改 state，由 action 触发。reducer 是一个纯函数，它接受当前的 state 及一个 action 对象。action 对象里面可以包含数据体（payload）作为入参，需要返回一个新的 state。

> 4. `effects`：用于处理异步操作（例如：与服务端交互）和业务逻辑，也是由 action 触发。但是，它不可以修改 state，要通过触发 action 调用 reducer 实现对 state 的间接操作。

> 5. `action`：是 reducers 及 effects 的触发器，一般是一个对象，形如{ type: 'add', payload: todo }，通过 type 属性可以匹配到具体某个 reducer 或者 effect，payload 属性则是数据体，用于传送给 reducer 或 effect。

首先，注意 dva model 的定义。一个基本的 dva model 最少具备两个成员：namespace 和 state。namespace 来作为一个 model 的唯一标识，state 中就是该 model 管理的数据。



其次，看页面文件的变化：我们删除了组件本身的 state，同时添加了 @connect(mapStateToProps)。connect 是连接 dva 和 React 两个平行世界的关键，一定要理解。



connect 让组件获取到两样东西：1. model 中的数据；2. 驱动 model 改变的方法。
connect 本质上只是一个 javascript 函数，通过 @ 装饰器语法使用，放置在组件定义的上方；
connect 既然是函数，就可以接受入参，第一个入参是最常用的，它需要是一个函数，我们习惯给它命名叫做 mapStateToProps，顾名思义就是把 dva model 中的 state 通过组件的 props 注入给组件。通过实现这个函数，我们就能实现把 dva model 的 state 注入给组件。


mapStateToProps 这个函数的入参 state 其实是 dva 中所有 state 的总合。对于初学 js 的人可能会很疑惑：这个入参是谁给传入的呢？其实你不用关心，你只需知道 dva 框架会适时调用 mapStateToProps，并传入 dva model state 作为入参，我们再次提醒：传入的 state 是个 "完全体"，包含了 所有 namespace 下的 state！我们自己定义的 dva model state 就是以 namespace 为 key 的 state 成员。所以 const namespace = 'puzzlecards' 中的 puzzlecards 必须和 model 中的定义完全一致。dva 期待 mapStateToProps 函数返回一个 对象，这个对象会被 dva 并入到 props 中，在上面的例子中我们取到数据后，把它改名为 cardList 并返回（ 注意返回的不是 cardList 本身，而是一个包含了 cardList 的对象！ ），cardList 就可以在子组件中通过 props 被访问到了。



注意 render 函数中通过 this.props.cardList 取到了数据，数据已经不再由组件自己管理，我们得到了第一步中的页面样子：


我们对 export 进行调整，将 dva 中的数据传入。\



function mapStateToProps(state) {
  return {
    cardsList: state.cards.cardsList,
    cardsLoading: state.loading.effects['cards/queryList'],
  };
}

export default connect(mapStateToProps)(List);


其中当用户 dispatch 对应 effect 时，dva 会自动注入对应 effect 的 loading 状态。
因而我们可以很方便的将 state.loading.effects 中的状态传入。
（对应 card modal 代码请参阅 src/modal/cards.js 文件。）