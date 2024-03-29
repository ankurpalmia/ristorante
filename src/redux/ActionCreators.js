import * as ActionTypes from './ActionTypes';

export const addComment = (dishId, author, rating, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload:{
        dishId: dishId,
        author: author,
        comment: comment,
        rating: rating
    }
});