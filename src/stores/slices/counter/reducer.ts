import { CaseReducer, PayloadAction } from '@reduxjs/toolkit'
import { CounterType } from '@/stores/slices/counter'

const increment: CaseReducer<CounterType, PayloadAction<number>> = (state, action) => ({
  ...state,
  value: state.value + action.payload,
})

const decrement: CaseReducer<CounterType, PayloadAction<number>> = (state, action) => ({
  ...state,
  value: state.value - action.payload,
})

const resetCount: CaseReducer<CounterType> = (state) => ({
  ...state,
  value: 0,
})

export default {
  increment,
  decrement,
  resetCount,
}
