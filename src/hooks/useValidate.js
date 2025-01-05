import { useEffect, useState, useCallback } from "react";

export const useValidate = (validationSchema = {}, formData) => {
  const [errors, setErrors] = useState({});

  const handleValidations = useCallback(async () => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});//Si no hay errores, actualizamos los valores de errors
      return true
    } catch (error) {
      const newErrors = {};
      console.log('esto es error en useValidate', error)
      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);//Si hay errores, guardalos en errors
      return false
    }
  }, [validationSchema, formData]);

  // useEffect(() => {
  //   if (isSubmitted) {//Si se activa el evento en el handleSubmit, muestra los errores
  //     handleValidations();
  //   }
  // }, [isSubmitted, handleValidations]);

  return {
    errors,
    handleValidations,
  };
};