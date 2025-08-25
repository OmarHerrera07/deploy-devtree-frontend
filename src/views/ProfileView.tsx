import { useForm } from "react-hook-form";
import { ErrorMessage } from "../components/ErrorMessage";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type { ProfileForm, User } from "../types";
import { updateUser, uploadedImage } from "../api/DevTree";
import { toast } from "sonner";

export const ProfileView = () => {
  const queryClient = useQueryClient();

  const data = queryClient.getQueryData<ProfileForm>(["user"])!;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      handle: data.handle,
      description: data.description,
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: updateUser,
    onError: ({ message }) => {
      toast.error(message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
  const updateImageMutation = useMutation({
    mutationFn: uploadedImage,
    onError: ({ message }) => {
      toast.error(message);
    },
    onSuccess: (data) => {
      queryClient.setQueryData( ['user'], (prevData: User) => {
        return {
          ...prevData,
          Image: data
        }
      } )
    },
  });

  const handleChangue = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) updateImageMutation.mutate(event.target.files[0]);
  };

  const handleUserProfileForm = (formData: ProfileForm) => {
    const user : User = queryClient.getQueryData(['user'])!
    user.description = formData.description
    user.handle = formData.handle
    updateProfileMutation.mutate( user );
  };

  return (
    <form
      className="bg-white p-10 rounded-lg space-y-5"
      onSubmit={handleSubmit(handleUserProfileForm)}
    >
      <legend className="text-2xl text-slate-800 text-center">
        Editar Información
      </legend>
      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="handle">Handle:</label>
        <input
          type="text"
          className="border-none bg-slate-100 rounded-lg p-2"
          placeholder="handle o Nombre de Usuario"
          {...register("handle", {
            required: "El nombre de Usuario es obligatorio",
          })}
        />
        {errors.handle && (
          <ErrorMessage> {errors.handle.message} </ErrorMessage>
        )}
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="description">Descripción:</label>
        <textarea
          className="border-none bg-slate-100 rounded-lg p-2"
          placeholder="Tu Descripción"
          {...register("description", {
            required: "La descripción es obligatoria",
          })}
        />
        {errors.description && (
          <ErrorMessage> {errors.description.message} </ErrorMessage>
        )}
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="handle">Imagen:</label>
        <input
          id="image"
          type="file"
          name="handle"
          className="border-none bg-slate-100 rounded-lg p-2"
          accept="image/*"
          onChange={handleChangue}
        />
      </div>

      <input
        type="submit"
        className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
        value="Guardar Cambios"
      />
    </form>
  );
};
