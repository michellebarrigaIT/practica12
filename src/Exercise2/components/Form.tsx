import React, { useMemo, useReducer, useState } from 'react'
import './Form.scss'

type FormState = {
    name: string;
    email: string;
    newsletter: boolean;
};

type Action =
    | { type: "UPDATE_FIELD"; field: keyof FormState; value: string | boolean }
    | { type: "RESET_FORM" };

const initialState: FormState = {
    name: "",
    email: "",
    newsletter: false,
};

function reducer(state: FormState, action: Action): FormState {
    switch (action.type) {
        case "UPDATE_FIELD":
            return { ...state, [action.field]: action.value };
        case "RESET_FORM":
            return initialState;
        default:
            return state;
    }
}

function Form() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

    const isValid = useMemo(() => {
        return state.name.trim() !== "" && /\S+@\S+\.\S+/.test(state.email);
    }, [state.name, state.email]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: typeof errors = {};

        if (state.name.trim() === "") {
            newErrors.name = "Name is required";
        }
        if (!/\S+@\S+\.\S+/.test(state.email)) {
            newErrors.email = "Valid email is required";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            alert(`Form submitted!\nName: ${state.name}\nEmail: ${state.email}\nNewsletter: ${state.newsletter}`);
        }
    };

    return (
        <div className="form-container">
            <h2>Signup Form</h2>
            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        id="name"
                        type="text"
                        value={state.name}
                        onChange={(e) =>
                            dispatch({ type: "UPDATE_FIELD", field: "name", value: e.target.value })
                        }
                    />
                    {errors.name && <span className="error">{errors.name}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        type="email"
                        value={state.email}
                        onChange={(e) =>
                            dispatch({ type: "UPDATE_FIELD", field: "email", value: e.target.value })
                        }
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>

                <div className="form-group checkbox">
                    <label>
                        <input
                        type="checkbox"
                        checked={state.newsletter}
                        onChange={(e) =>
                            dispatch({ type: "UPDATE_FIELD", field: "newsletter", value: e.target.checked })
                        }
                        />
                        Subscribe to newsletter
                    </label>
                </div>

                <div className="buttons">
                    <button type="submit" disabled={!isValid}>
                        Submit
                    </button>
                    <button
                        type="button"
                        className="reset"
                        onClick={() => dispatch({ type: "RESET_FORM" })}
                    >
                        Reset
                    </button>
                </div>
            </form>
        </div>
  );
}

export default Form