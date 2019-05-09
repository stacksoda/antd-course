import dva from 'dva';
import createLoading from 'dva-loading';

const runtimeDva = window.g_plugins.mergeConfig('dva');
let app = dva({
  history: window.g_history,
  
  ...(runtimeDva.config || {}),
});

window.g_app = app;
app.use(createLoading());
(runtimeDva.plugins || []).forEach(plugin => {
  app.use(plugin);
});

app.model({ namespace: 'list', ...(require('/Users/leanbi/Desktop/antd-course/src/model/list.js').default) });
app.model({ namespace: 'puzzlecards', ...(require('/Users/leanbi/Desktop/antd-course/src/model/puzzlecards.js').default) });
