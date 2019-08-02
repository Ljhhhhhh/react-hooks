import { AnyAction, Reducer } from "redux";
import { fetchCategory, changeCategoryName } from "@/services/product";
import { EffectsCommandMap } from "dva";

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: {}) => T) => T }
) => void;

export interface UserModelState {
  [key: string]: string | number;
}

export interface CategoryState {
  list: any[],
  loading: boolean
}

export interface ModelType {
  namespace: string;
  state: CategoryState;
  effects: {
    getList: Effect;
    setCategoryName: Effect;
  };
  reducers: {
    setList: Reducer<{}>;
    setLoading: Reducer<{}>;
  };
}

const Model: ModelType = {
  namespace: "category",

  state: {
    list: [],
    loading: false
  },

  effects: {
    *getList({ payload }, { call, put }) {
      yield put({type: "setLoading"});
      const response = yield call(fetchCategory, payload)
      if (response.status === 0) {
        yield put({
          type: "setList",
          payload: response.data
        });
      }
    },
    *setCategoryName({ payload }, { call, put}) {
      const response = yield call(changeCategoryName, payload)
      if ( response.status === 0 ) {
        // getList() // 修改成功之后如何刷新当前页面
      }
    }
  },

  reducers: {
    setList(state, { payload }) {
      const list = payload.splice(0, 100)
      return {
        loading: false,
        list
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
