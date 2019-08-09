// import { pagination } from './model';
import { AnyAction, Reducer } from "redux";
import { fetchProduct } from "@/services/product";
import { EffectsCommandMap } from "dva";
// import { message } from 'antd'

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: {}) => T) => T }
) => void;

export interface UserModelState {
  [key: string]: string | number;
}

export interface paginationProps {
  pageNum: number;
  total: number
}

export interface CategoryState {
  list: any[],
  pagination: paginationProps;
  // loading: boolean
}

export interface ModelType {
  namespace: string;
  state: CategoryState;
  effects: {
    getList: Effect;
    // setCategoryName: Effect;
    // createCategory: Effect;
  };
  reducers: {
    setList: Reducer<{}>;
    setLoading: Reducer<{}>;
  };
}

const Model: ModelType = {
  namespace: "product",

  state: {
    list: [],
    pagination: {
      pageNum: 1,
      total: 0
    }
    // loading: false
  },

  effects: {
    *getList({ payload }, { call, put }) {
      // yield put({type: "setLoading"});
      const response = yield call(fetchProduct, payload)
      if (response.status === 0) {
        yield put({
          type: "setList",
          payload: response.data
        });
      }
    },
    
    

    // *createCategory({ payload }, { call, put }) {
    //   const { parentCategoryId, ...data } = payload
    //   console.log(payload, 'payload')
    //   const response = yield call(createCreategory, data)
    //   if ( response.status === 0 ) {
    //     message.success(response.data || '新增品类成功')
    //     yield put({
    //       type: 'getList',
    //       payload: parentCategoryId
    //     })
    //   }
    // }
  },

  reducers: {
    setList(state, { payload }) {
      console.log(payload, 'payload')
      // const list = payload.splice(0, 100)
      return {
        // loading: false,
        list: payload.list,
        pagination: {
          pageNum: payload.pageNum,
          total: payload.total
        }
      };
    },
    setLoading(state) {
      return {
        ...state,
        loading: true
      }
    }
  }
};

export default Model;
