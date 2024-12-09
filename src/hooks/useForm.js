
import React, { useState } from 'react'

export const useForm = (data = {}) => {

    const [formData, setFormData] = useState(data);

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setFormData({
            ...formData,
            [name]: value
        });  

    }
    
    return {
        ...formData,
        formData,
        handleChange,
    }
}    
