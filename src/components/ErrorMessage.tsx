
type ErrorMessageProps = {
  children: React.ReactNode;
}
export const ErrorMessage = ( { children } : ErrorMessageProps ) => {
  return (
    <>
        <div>
            <p className="bg-red-50 text-red-500 p-3 uppercase text-sm font-bold text-center">{children}</p>
        </div>
    </>
  )
}
