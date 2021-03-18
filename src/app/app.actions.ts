import { createAction, props } from "@ngrx/store";
import { User } from "./models/user.model";

export const signupAction = createAction(
    '[SIGN UP PAGE] User signed up',
    props<{user: User}>()
)

export const getProductDetailsAction = createAction(
    '[PRODUCT PAGE] Product details were fetched',
    props<{data: any}>()
)

export const getProductNumAction = createAction(
    '[PRODUCT PAGE] Product Number fetched',
    props<{productId: number}>()
)

// export class GetProductNum implements Action {
//     type = '[PRODUCT PAGE] Product Number fetched';
//     constructor(public productNum: number) { }
// }