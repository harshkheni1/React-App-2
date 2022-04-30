import actions from './actions'

const initialState = {
  shouldShowCallUI: false,
  callRequestInfo: {},
  virtualRoomInvocations: [],
  showInvocationLoader: false,
  isCallEnd: false,
  setCallId: null,
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    case actions.ADD_VIRTUAL_INVOCATION:
      return {
        ...state,
        virtualRoomInvocations: [...state.virtualRoomInvocations, action.payload],
      }
    case actions.REMOVE_VIRTUAL_INVOCATION:
      // eslint-disable-next-line no-case-declarations
      const invocationsToSave = state.virtualRoomInvocations.filter(
        (e) => e.invocationId !== action.payload,
      )
      return {
        ...state,
        virtualRoomInvocations: invocationsToSave,
        showInvocationLoader: invocationsToSave && invocationsToSave.length > 0,
      }
    case actions.EMPTY_VIRTUAL_INVOCATION:
      return { ...state, virtualRoomInvocations: [], showInvocationLoader: false }
    case actions.CALL_END:
      return { ...state, isCallEnd: action.payload }
    case actions.SET_CALL_ID:
      return { ...state, setCallId: action.payload }
    default:
      return state
  }
}
