const Joi = require('joi'); 
import express, {Request, Response} from 'express';

const middleware = (schema: any) => { 
  return (req: Request, res: Response, next: () => void) => { 
  const { error } = schema.validate(req.body); 
  const valid = error == null; 

  if (valid) { 
    next(); 
  } else { 
    const { details } = error; 
    const message = details.map((i: { message: any; }) => i.message).join(',');

   res.status(422).json({ error: message }) } 
  } 
} 
export default middleware;