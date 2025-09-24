import { Suspense, useState, lazy } from "react";
import "./LazyModal.scss";

const Modal = lazy(() => import("../components/Modal"));

export default function LazyModal() {
    const [open, setOpen] = useState(false);

    return (
        <div className="lazy-modal">
            <button onClick={() => setOpen(true)}>Open Modal</button>

            {open && (
                <Suspense fallback={<div>Loading modal...</div>}>
                <Modal
                    title="Welcome!"
                    message="This modal was loaded lazily... zzz"
                    onClose={() => setOpen(false)}
                />
                </Suspense>
            )}
        </div>
    );
}
