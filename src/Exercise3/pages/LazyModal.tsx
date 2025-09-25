import { Suspense, useState, lazy } from "react";
import { useForm } from "react-hook-form";
import "./LazyModal.scss";

const Modal = lazy(() => import("../components/Modal"));

type ModalData = {
    title: string;
    message: string;
};

export default function LazyModal() {
    const [open, setOpen] = useState(false);

    const [modalData, setModalData] = useState<ModalData>({
        title: "",
        message: "",
    });

    const { register, handleSubmit, reset } = useForm<ModalData>({
        defaultValues: modalData,
    });

    const onSubmit = (data: ModalData) => {
        setModalData(data);
        setOpen(true);
        reset(data);
    };


    return (
        <div className="lazy-modal">
            <h1>Lazy Loaded Modal Page</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="modal-form">
                <input
                    type="text"
                    placeholder="Modal Title"
                    {...register("title", { required: true })}
                />
                <textarea
                    placeholder="Modal Message"
                    {...register("message", { required: true })}
                    />
                <button type="submit">Create Modal</button>
            </form>

            {open && (
                <Suspense fallback={<div>Loading modal...</div>}>
                <Modal
                    title={modalData.title}
                    message={modalData.message}
                    onClose={() => setOpen(false)}
                />
                </Suspense>
            )}
        </div>
    );
}
