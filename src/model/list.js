import request from '../util/request';
import * as cardsService from '../service/cards';
const delay = (millisecond) => {
    return new Promise( resolve => {
        setTimeout(resolve, millisecond);
    });
};

export default {
    namespace: 'cards',
    state: {
        cardsList: [],
        statistic: {},
    },
    effects: {
        *queryList(_, sagaEffects) {
            const listData = [{
                id: '1',
                name : 'umi',
                desc : '极快的类 Next.js 的 React 应用框架',
                url  : 'https://umijs.org'
              },
              {
                id: '2',
                name : 'antd',
                desc : '一个服务于企业级产品的设计体系',
                url  : 'https://ant.design/index-cn'
              },
              {
                id: '3',
                name : 'antd-pro',
                desc : '一个服务于企业级产品的设计体系',
                url  : 'https://ant.design/index-cn'
              }
              ];
              const { call, put } = sagaEffects;
              yield call(delay, 3000);
              yield put({ type: 'initList', payload: listData });
        },
        *addOne({ payload }, {call, put}) {
            console.log('soda log addone state');
            yield call(delay, 2000);
            yield put({ type: 'addOneSome', payload})
        },
        *getStatistic({ payload }, { call, put }) {
            // console.log('getstatistic', payload)
            const rsp = yield call(cardsService.getStatistic, payload);
            console.log('get mock data ', rsp);
            yield put({
                type: 'saveStatistic',
                payload: {
                    id: payload,
                    data: rsp.result
                }
            })
        }
    },
    reducers: {
        initList( state, {payload} ) {
            const cardsList = [...payload];
            return {
                ...state,
                cardsList
            };
        },
        addOneSome(state, {payload}) {
            console.log('add some ')
            console.log('old state ', state);
            console.log('new payload ', payload);
            const cardsList = [].concat(state.cardsList,payload);
            console.log('cardList', cardsList);
            return {
                cardsList
            };
        },
        saveStatistic(state, { payload: { id, data }}) {
            console.log(' save statistic ', data);
            return {
                ...state,
                statistic: {
                    ...state.statistic,
                    [id]: data
                }
            }
        }
    }
};