export const validationSchemas = {
    userName : {
        notEmpty: {
            errorMessage: "userName cannot be empty"
        },
        isString: {
            errorMessage: "userName must be a string"
        },
        isLength: {
            options:{
                min: 3, 
                max: 15
            },
            errorMessage: "userName must be atleast 3 to 15 characters"
        }
    },
    fullName:{
        notEmpty: {
            errorMessage: "fullName cannot be empty"
        },
        isString: {
            errorMessage: "fullName must be a string"
        },
        isLength: {
            options:{
                min: 5, 
                max: 30
            },
            errorMessage: "fullName must be atleast 5 to 30 characters"
        }
    }
}