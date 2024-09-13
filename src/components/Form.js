"use client"
import { createContext, useContext, useEffect, useRef, useState } from "react";

import { useSearchParams } from "next/navigation";
const FormContext = createContext();

export function Form({children}) {
	const formRef = useRef(null);
    const searchParams = useSearchParams();
    console.log(searchParams)
    const [formState, setFormState] = useState({
        type: [searchParams.get('type')]
    });

    useEffect(() => {
        console.log(formState)
    }, [formState])

	return (
		<FormContext.Provider value={{ formRef, formState, setFormState}}>
			<form ref={formRef} method="GET">{children}</form>
		</FormContext.Provider>
	);
}

export function useForm() {
	return useContext(FormContext);
}
