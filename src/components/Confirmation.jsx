import { Button } from "./ui/button";
export const Confirmation=({message,onConfirmation,onCancel})=>{
return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

            <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-6">

                <h2 className="text-xl font-bold text-gray-800 mb-3">
                    Confirmar acción
                </h2>

                <p className="text-gray-600">
                    {message}
                </p>

                <div className="flex justify-end gap-3 mt-6">

                    <Button
                        variant="outline"
                        onClick={onCancel}
                    >
                        Cancelar
                    </Button>

                    <Button
                        className="bg-red-600 hover:bg-red-700"
                        onClick={onConfirmation}
                    >
                        Eliminar
                    </Button>

                </div>

            </div>

        </div>
    );

}