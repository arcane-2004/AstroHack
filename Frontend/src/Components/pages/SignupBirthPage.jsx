import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import { Shell, Field, BirthWheel, ProgressSteps } from "../AuthShell";
import axios from "axios";
import { useSignup } from "../context/SignupContext";

export default function SignupBirthPage() {
  const navigate = useNavigate();
  const {
    signupData,
    setSignupData
  } = useSignup();
  const [errors, setErrors] = useState({});

  // Guard: if someone lands on /signup/birth-details directly
  // (refresh, bookmarked link, typed URL) without finishing step 1,
  // send them back instead of showing a half-broken form.


  const validate = () => {
    const e = {};
    if (!signupData.dateOfBirth) e.dateOfBirth = "Enter your date of birth.";
    if (!signupData.timeOfBirth) e.timeOfBirth = "Enter your time of birth.";
    // if (!signupData.placeOfBirth.trim()) e.placeOfBirth = "Enter your place of birth.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        signupData,
        {
          withCredentials: true,
        }
      );

      console.log("Signup response:", response);
      if (response.status !== 201) {

        throw new Error("Failed to register user.");

      }
      console.log(response.data);
      navigate("/success", {
        state: {
          mode: "signup",
          signupData
        }
      });
      
    } catch (error) {

      console.error(
        error.response?.data || error.message
      );
      navigate("/signup")
    }
  };

  return (
    <Shell>
      <BirthWheel time={signupData.timeOfBirth} filled={!!signupData.birthPlace} />
      <h1 className="headline">Chart your beginning.</h1>
      <p className="subcopy">Now the coordinates that make your chart yours alone.</p>

      <div className="tabs" role="tablist">
        <Link to="/login" className="tab">Log in</Link>
        <Link to="/signup" className="tab tab-active">Sign up</Link>
      </div>

      <ProgressSteps step={2} />

      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className="divider">
          <span>Birth details</span>
          <span className="divider-hint">for your natal chart</span>
        </div>

        <Field label="Date of birth" error={errors.dateOfBirth}>
          <Calendar size={16} className="field-icon" />
          <input type="date" value={signupData.dateOfBirth} onChange={(e) => setSignupData({
            ...signupData,
            dateOfBirth: e.target.value
          })} className="input input-mono" />
        </Field>

        <Field label="Time of birth" error={errors.timeOfBirth} hint="Check your birth certificate — even 15 minutes shifts your rising sign.">
          <Clock size={16} className="field-icon" />
          <input type="time" value={signupData.timeOfBirth} onChange={(e) => setSignupData({
            ...signupData,
            timeOfBirth: e.target.value
          })} className="input input-mono" />
        </Field>

        <Field label="Place of birth" error={errors.birthPlace}>
          <MapPin size={16} className="field-icon" />
          <input type="text" placeholder="Name" value={signupData.birthPlace.name} onChange={(e) => setSignupData({
            ...signupData,
            birthPlace: {
              ...signupData.birthPlace,
              name: e.target.value
            }
          })} className="input" />
          <input type="text" placeholder="City" value={signupData.birthPlace.city} onChange={(e) => setSignupData({
            ...signupData,
            birthPlace: {
              ...signupData.birthPlace,
              city: e.target.value
            }
          })} className="input" />
          <input type="text" placeholder="State" value={signupData.birthPlace.state} onChange={(e) => setSignupData({
            ...signupData,
            birthPlace: {
              ...signupData.birthPlace,
              state: e.target.value
            }
          })} className="input" />
          <input type="text" placeholder="Country" value={signupData.birthPlace.country} onChange={(e) => setSignupData({
            ...signupData,
            birthPlace: {
              ...signupData.birthPlace,
              country: e.target.value
            }
          })} className="input" />
        </Field>

        <div className="btn-row">
          <button type="button" className="back-btn" onClick={() => navigate("/signup")}>Back</button>
          <button type="submit" className="submit-btn">
            Cast my chart <ArrowRight size={16} />
          </button>
        </div>
      </form>
    </Shell>
  );
}
