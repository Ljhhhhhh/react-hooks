import { AnyAction, Reducer } from "redux";
import { fetchCategory } from "@/services/product";
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
