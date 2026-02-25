import { useEffect, useState, useRef } from "react";
import { useFormAndValidation } from "../hooks/useFormAndValidation";
import ModalWithForm from "./ModalWithForm";
import { getArtistSuggestions } from "../utils/ticketmasterApi";

import "../blocks/SearchModal.css";

const GENRES = [
  { label: "Any", value: "" },
  { label: "Rock", value: "Rock" },
  { label: "Pop", value: "Pop" },
  { label: "Hip-Hop/Rap", value: "Hip-Hop/Rap" },
  { label: "Country", value: "Country" },
  { label: "Electronic", value: "Electronic" },
  { label: "R&B", value: "R&B" },
  { label: "Latin", value: "Latin" },
  { label: "Jazz", value: "Jazz" },
  { label: "Classical", value: "Classical" },
];

function SearchModal({
  onClose,
  isOpen,
  activeModal,
  fetchAndSetSearchResults,
}) {
  const {
    values,
    handleChange,
    isValid,
    setValues,
    setErrors,
    resetForm,
    setIsValid,
  } = useFormAndValidation();

  // Suggestions UI state
  const [suggestions, setSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Debounce timer ref
  const debounceRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setValues({
        genre: "",
        artist: "",
        attractionId: "",
        stateCode: "",
        startDate: "",
        endDate: "",
      });
      setSuggestions([]);
      setShowSuggestions(false);
      setErrors({ message: "" });
      setIsValid(false);
    }
  }, [isOpen, setValues, setErrors, setIsValid]);

  // Debounced fetch of artist suggestions
  useEffect(() => {
    if (!isOpen) return;
    if (values.attractionId) return;

    const q = (values.artist || "").trim();

    // Don't suggest for tiny input
    if (q.length < 3) {
      setSuggestions([]);
      setLoadingSuggestions(false);
      return;
    }

    // reset existing timer
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      setLoadingSuggestions(true);

      getArtistSuggestions(q)
        .then((data) => {
          setSuggestions(Array.isArray(data) ? data : []);
          setShowSuggestions(true);
        })
        .catch(() => setSuggestions([]))
        .finally(() => setLoadingSuggestions(false));
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [values.artist, isOpen]);

  // When user types, clear attractionId (since they are changing input)
  const handleArtistChange = (e) => {
    handleChange(e);
    setValues((prev) => ({ ...prev, attractionId: "" }));
    setShowSuggestions(true);
  };

  // When user clicks suggestion, lock in the selection
  const handleSelectSuggestion = (s) => {
    setValues((prev) => ({
      ...prev,
      artist: s.name,
      attractionId: s.id, // stable ID used by /api/events
    }));

    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (isValid) {
      fetchAndSetSearchResults(values);
      resetForm();
    }
  };

  return (
    <ModalWithForm
      name="form"
      title="Discover Events"
      isOpen={isOpen}
      activeModal={activeModal}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonClass={`modal__submit-button ${
        isValid ? "modal__submit-button_active" : ""
      }`}
      buttonText="Search"
    >
      {/* Genre dropdown (instead of free text) */}
      <label className="modal__label">
        Genre
        <select
          className="modal__input"
          name="genre"
          value={values.genre || ""}
          onChange={handleChange}
        >
          {GENRES.map((g) => (
            <option key={g.label} value={g.value}>
              {g.label}
            </option>
          ))}
        </select>
      </label>
      {/* Artist autocomplete */}
      <label className="modal__label">
        Artist
        <div className="modal__autocomplete">
          <input
            type="text"
            className="modal__input"
            name="artist"
            value={values.artist || ""}
            placeholder="Start typing an artist..."
            onChange={handleArtistChange}
            onFocus={() => setShowSuggestions(true)}
            autoComplete="off"
          />

          {showSuggestions &&
            (loadingSuggestions || suggestions.length > 0) && (
              <div className="modal__suggestions">
                {loadingSuggestions && (
                  <div className="modal__suggestion modal__suggestion_disabled">
                    Searching…
                  </div>
                )}

                {!loadingSuggestions &&
                  suggestions.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      className="modal__suggestion"
                      onClick={() => handleSelectSuggestion(s)}
                    >
                      {s.image ? (
                        <img
                          src={s.image}
                          alt={s.name}
                          className="modal__suggestion-img"
                        />
                      ) : (
                        <div className="modal__suggestion-img modal__suggestion-img_placeholder" />
                      )}
                      <span>{s.name}</span>
                    </button>
                  ))}
              </div>
            )}
        </div>
      </label>
      <label className="modal__label">
        State
        <input
          type="text"
          className="modal__input"
          name="stateCode"
          value={values.stateCode || ""}
          placeholder="e.g. NY for New York"
          maxLength={2}
          onChange={handleChange}
        />
      </label>
      <label className="modal__label">
        Start Date
        <input
          type="date"
          className="modal__input"
          name="startDate"
          value={values.startDate || ""}
          onChange={handleChange}
        />
      </label>
      <label className="modal__label">
        End Date
        <input
          type="date"
          className="modal__input"
          name="endDate"
          value={values.endDate || ""}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
}

export default SearchModal;
