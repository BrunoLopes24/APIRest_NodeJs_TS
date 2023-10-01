import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import {AnyObject, Maybe, ObjectSchema, ValidationError } from 'yup';

type Tproperties = 'body'| 'header' | 'params' | 'query';

type TallSchemas = Record<Tproperties,ObjectSchema<AnyObject>>;

type TGetSchema = <T extends Maybe<AnyObject>>(schema: ObjectSchema<T>) => ObjectSchema<T>

type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TallSchemas>

type Tvalidation = (getAllSchemas: TGetAllSchemas) => RequestHandler;

export const validation: Tvalidation = (getAllSchemas) => async (req,res,next) => { // Middleware func (validation) que tem uma Arrows func com parâmetro getAllSchemas e retorna outra func que tem req,res e next
    const schemas = getAllSchemas(schema => schema);
    const errorResult: Record<string, Record<string,string>>= {}; // 

    Object.entries(schemas).forEach(([key, schema]) => {
        try{
            schema.validateSync(req[key as Tproperties], {abortEarly: false});  // Valida os erros e depois reclama
        }catch(e){
            const yupError = e as ValidationError;
            const  errors: Record<string,string> = { };
    
            yupError.inner.forEach(error => {   
                if (!error.path) return; 
                errors[error.path] = error.message;
            });
    
            errorResult[key] = errors;
        }
    });

    if (Object.entries(errorResult).length === 0) {
        return next();
    }else{
        return res.status(StatusCodes.BAD_REQUEST).json({ error: errorResult }); // Vai ser os dados que são enviados para o frontend.
    }
};