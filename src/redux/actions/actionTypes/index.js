import todos from './todos';
import auth from './auth';
import documents from './documents';
import profile from './profile';


module.exports = {
    ...todos,
    ...auth,
    ...documents,
    ...profile
};
