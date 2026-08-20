import {
    createContext,
    useContext,
    useState
} from "react";

const SignupContext = createContext(null);

export const SignupProvider = ({ children }) => {

    const [signupData, setSignupData] = useState({
        name: "",
        email: "",
        password: "",

        dateOfBirth: "",
        timeOfBirth: "",

        birthPlace: {
            name: "",
            city: "",
            state: "",
            country: ""
        }
    });

    return (
        <SignupContext.Provider
            value={{
                signupData,
                setSignupData
            }}
        >
            {children}
        </SignupContext.Provider>
    );
};

export const useSignup = () => {
    const context = useContext(SignupContext);

    if (!context) {
        throw new Error(
            "useSignup must be used inside SignupProvider"
        );
    }

    return context;
};