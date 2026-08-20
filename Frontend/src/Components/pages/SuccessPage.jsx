import { useNavigate} from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import { Shell } from "../AuthShell";

export default function SuccessPage() {
    const navigate = useNavigate();

    return (
        <Shell>
            <div className="success-card">

                <div className="success-icon">
                    <Check size={22} strokeWidth={2.5} />
                </div>

                <h2 className="success-title">
                    You're all set!
                </h2>

                <p className="success-copy">
                    Your account has been successfully registered.
                    Your astrological profile has been created and
                    your chart is ready.
                </p>

                <button
                    className="submit-btn "
                    onClick={() => navigate("/today-prediction")}
                >
                    See Today's Prediction
                    <ArrowRight size={16} />
                </button>

            </div>
        </Shell>
    );
}