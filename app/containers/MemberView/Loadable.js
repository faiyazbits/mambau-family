/**
 *
 * Asynchronously loads the component for MemberView
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
