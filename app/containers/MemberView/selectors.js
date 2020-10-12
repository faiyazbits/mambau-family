import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the memberView state domain
 */

const selectMemberViewDomain = state => state.memberView || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by MemberView
 */

const makeSelectMemberView = () =>
  createSelector(
    selectMemberViewDomain,
    substate => substate,
  );

export default makeSelectMemberView;
export { selectMemberViewDomain };
