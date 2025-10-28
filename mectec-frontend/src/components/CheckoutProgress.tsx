import "../assets/styles/checkoutprogress.css";

interface CheckoutProgressProps {
  step: number; // current step (1, 2, or 3)
}

export default function CheckoutProgress({ step }: CheckoutProgressProps) {
  const steps = [
    { id: 1, label: "Varukorg" },
    { id: 2, label: "Leverans" },
    { id: 3, label: "Bekräftelse" },
  ];

  return (
    <div className="checkout-progress">
      {steps.map((s, index) => (
        <div key={s.id} className="step">
          <div
            className={`circle ${step === s.id ? "active" : ""} ${
              step > s.id ? "completed" : ""
            }`}
          >
            {s.id}
          </div>
          <span className="label">{s.label}</span>

          {index < steps.length - 1 && (
            <div
              className={`line ${step > s.id ? "line-completed" : ""}`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
}
