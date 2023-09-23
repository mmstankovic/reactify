import { useState } from "react"

const useInput = (validateValue) => {
    const [enteredValue, setEnteredValue] = useState('')
    const [isTouched, setIsTouched] = useState(false)

    const enteredValueIsValid = validateValue(enteredValue)
    const inputHasError = !enteredValueIsValid && isTouched

    const valueChangeHandler = e => {
        setEnteredValue(e.target.value)
    }

    const inputBlurHandler = () => {
        setIsTouched(true)
    }

    return {
        value: enteredValue,
        valueIsValid: enteredValueIsValid,
        inputHasError: inputHasError,
        valueChangeHandler: valueChangeHandler,
        inputBlurHandler: inputBlurHandler
    }
}
export default useInput