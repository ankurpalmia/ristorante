import {createStore} from 'redux';
import {Dishes} from './dishes';
import {Promotions} from './promotions';
import {Leaders} from './leaders';
import {Comments} from './comments';
import {combineReducers} from 'redux';

export const ConfigureStore = () => {
    const store= createStore(
        combineReducers({
        dishes: Dishes,
        comments: Comments,
        leaders: Leaders,
        promotions: Promotions
        })
    );
    return store;
}