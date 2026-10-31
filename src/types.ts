export type ErrorMessage ={
    message :string
}
export interface ErrorResponse{
    status:"error",
    data:null,
    errors:ErrorMessage[]
}
export type SuccessResponse<T>={
    status:"success",
    data:T,
    error:null
}

export type Paginated<T>={
    content:T,
    currentPage:number,
    hasNext:boolean,
    hasPervious:boolean,
    nextPageUrl:string |null,
    previousPageUrl:string | null,
    totalItems:number,
    totalPages:number
}

export type ResetDetails ={
    token:string,
    newPassword:string
}