export type ValidationError = {
    message: string;
    type: string;
  }
  
  export type JoiError = {
    status: string;
    error: {
      original: unknown;
      details: ValidationError[];
    };
  }
  
  export type CustomError = {
    status: string;
    error: string;
  }
  
  